import type { Socket } from "node:net"
import type { Connection } from "../interface/connection"
import { Buffer } from "node:buffer"
import { map, mergeAll, Observable, share } from "rxjs"
import { AesEncription } from "src/libs/aes/aes-encryption"
import { Result } from "../interface/node-client"
import { ModbusPacket, ModbusPacketUtils } from "../modbus-packet-parser"
import { TcpConnection } from "./tcp-connection"

export class ModbusTcpConnection implements Connection {
	private remainingBuffer = Buffer.alloc(0) as Buffer<ArrayBufferLike>
	private connection: TcpConnection = null
	private encryption: AesEncription = null
	private packetDataObservable: Observable<ModbusParseOutput> = null

	constructor(socket: Socket, private aesSecretInHex: string, private isEncrypted: boolean, private pingInterval: number) {
		this.connection = new TcpConnection(socket, pingInterval)
		this.encryption = new AesEncription(this.aesSecretInHex)
		this.packetDataObservable = this.createPacketDataObservable()
	}

	write(buffer: Buffer): void {
		if (this.isEncrypted) {
			const { data } = this.encryption.encrypt(buffer)
			buffer = data
		}

		this.connection.write(buffer)
	}

	async connect(host: string, port: number) {
		await this.connection.connect(host, port)
	}

	disconnect(): void {
		this.connection.disconnect()
	}

	destroy() {
		this.connection.destroy()
	}

	isConnected(): boolean {
		return this.connection.isConnected()
	}

	onData() {
		return this.connection.onData()
	}

	onPacketData() {
		return this.packetDataObservable
	}

	getSocket() {
		return this.connection.getSocket()
	}

	onConnection() {
		return this.connection.onConnection()
	}

	onReconnection() {
		return this.connection.onReconnection()
	}

	onClose() {
		return this.connection.onClose()
	}

	onError() {
		return this.connection.onError()
	}

	onConnectionFailed() {
		return this.connection.onConnectionFailed()
	}

	setEncrypted(isEncrypted: boolean) {
		this.isEncrypted = isEncrypted
	}

	createPacketDataObservable() {
		return this.connection.onData()
			.pipe(
				map(rawBuffer => this.parseBuffer(rawBuffer)),
				mergeAll(),
				share(),
			)
	}

	private parseBuffer(rawBuffer: Buffer<ArrayBufferLike>) {
		let currentBuffer: Buffer<ArrayBufferLike> = Buffer.concat([this.remainingBuffer, rawBuffer])
		const output: ModbusParseOutput[] = []

		if (currentBuffer.length > 30_000_000) {
			this.remainingBuffer = null
			this.remainingBuffer = Buffer.alloc(0)
			return output
		}

		while (true) {
			if (currentBuffer.length === 0)
				break

			if (this.isEncrypted) {
				const { remainingBuffer, segment, status } = this.parseOneSegmentEncrypted(currentBuffer)
				if (status === "ok") {
					output.push(segment)
					this.remainingBuffer = remainingBuffer
					currentBuffer = remainingBuffer
				}
				else if (status === "wait") {
					this.remainingBuffer = remainingBuffer
					break
				}
				else {
					this.remainingBuffer = Buffer.alloc(0)
					break
				}
			}

			else {
				const { remainingBuffer, segment } = this.parseOneSegment(currentBuffer)

				if (segment.parsedData.isOk) {
					output.push(segment)
					this.remainingBuffer = remainingBuffer
					currentBuffer = remainingBuffer
				}
				else {
					this.remainingBuffer = Buffer.alloc(0)
					break
				}
			}
		}

		return output
	}

	private parseOneSegmentEncrypted(fullBuffer: Buffer) {
		const output: {
			segment: ModbusParseOutput | null
			remainingBuffer: Buffer<ArrayBufferLike>
			status: EncryptionParseStatus
		} = {
			remainingBuffer: Buffer.alloc(0),
			segment: null,
			status: "flush",
		}

		const messageLen = this.encryption.getFullLength(fullBuffer.readUInt16BE())
		if (fullBuffer.byteLength < messageLen) {
			// Return early as we should wait !
			output.remainingBuffer = fullBuffer
			output.status = "wait"

			// Early return
			return output
		}

		const slicedMessage = fullBuffer.subarray(0, messageLen)
		const decrypted = this.encryption.decrypt(slicedMessage)

		if (decrypted.isOk) {
			const remainingBuffer = fullBuffer.subarray(messageLen)
			const { buffer, parsedData } = this.parse(decrypted.data)
			const segment: ModbusParseOutput = { buffer, parsedData }

			output.segment = segment
			output.remainingBuffer = remainingBuffer
			output.status = "ok"
		}
		else {
			// Message is corrupted, should be deleted
			output.status = "flush"
		}

		return output
	}

	private parseOneSegment(fullBuffer: Buffer) {
		let remainingBuffer: Buffer<ArrayBufferLike> = Buffer.alloc(0)
		const { buffer, fullMessageSize, parsedData } = this.parse(fullBuffer)
		const segment: ModbusParseOutput = { buffer, parsedData }

		// Since message length is not known, flushing the message if not parsed
		if (parsedData.isOk) {
			remainingBuffer = fullBuffer.subarray(fullMessageSize)
		}

		return {
			segment,
			remainingBuffer,
		}
	}

	private parse(plainBuffer: Buffer) {
		const buffer: Result<Buffer> = {
			isOk: false,
			data: null,
			error: null,
		}

		let fullMessageSize = 0

		const parsedData = ModbusPacketUtils.parseHeader(plainBuffer)
		if (parsedData.isOk) {
			fullMessageSize = parsedData.data.header.fullMessageSize
			buffer.data = plainBuffer.subarray(0, fullMessageSize)
		}
		else {
			// Packet might not even have data, so we should utilize fullMessageSize with default.
			fullMessageSize = parsedData.data?.header?.fullMessageSize || 0
			buffer.error = parsedData.error
			buffer.data = plainBuffer.subarray(0, fullMessageSize)
			console.error("Malforced Packet")
		}

		return { buffer, parsedData, fullMessageSize }
	}
}

export type ModbusParseOutput = {
	buffer: Result<Buffer>
	parsedData: Result<ModbusPacket>
}

type EncryptionParseStatus = "ok" | "wait" | "flush"
