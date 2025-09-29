import { Buffer } from "node:buffer"
import { Socket } from "node:net"
import { catchError, filter, firstValueFrom, map, share, Subject, tap, timeout } from "rxjs"
import { pingIp } from "src/common/utils"
import { ModbusTcpConnection } from "./connections/modbus-tcp-connection"
import { ApplicationFunctionType } from "./interface/connection"
import { CreateReadInputRegisterRequestRawData, CreateReadInputRegistersResponseRawData, CreateWriteMultipleRegistersRequestRawData, CreateWriteMultipleRegistersResponseRawData, ModbusPacketUtils } from "./modbus-packet-parser"

/**
 * @example
 * const client = new ModBusTcpClient("127.0.0.1", 502)
 * client.connect()
 * client.onConnection()
 * .subscribe(async () => {
 * 	try {
 * 		await client.writeMultipleRegisters(0, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
 * 		const response = await client.readHoldingtRegisters(0, 10)
 * 	}
 * 	catch {
 * 		//
 * 	}
 * })
 */
export class ModBusTcpClient {
	private connection: ModbusTcpConnection = null
	private requestResponsePair$ = new Subject<{
		request: Buffer
		response: Buffer
		parsedRequest: CreateReadInputRegisterRequestRawData | CreateWriteMultipleRegistersRequestRawData
		parsedResponse?: CreateWriteMultipleRegistersResponseRawData | CreateReadInputRegistersResponseRawData
	}>()

	private requestTimeout$ = new Subject<{ request: Buffer }>()
	private unknownPacket$ = new Subject<Buffer>()
	private transactionId = 1

	constructor(
		private hostAddress: string,
		private port: number,
		isEncrypted: boolean,
		aesSecret: string,
		private timeout: number,
	) {
		this.connection = new ModbusTcpConnection(new Socket(), aesSecret, isEncrypted, timeout)
		this.onPacketData().subscribe()
	}

	getInfo() {
		return {
			hostAddress: this.hostAddress,
			port: this.port,
		}
	}

	/**
	 * Execute ReadHoldingRegisters Request (Function Code 0x03)
	 * @param {number} start Start Address.
	 * @param {number} count Register Quantity.
	 * @example
	 * await client.readHoldingRegisters(0, 10)
	 */
	readHoldingRegisters(start: number, count: number, appFunction: ApplicationFunctionType = null) {
		const currentTransactionId = this.transactionId
		const { payload, rawData } = ModbusPacketUtils.createReadInputRegistersPayload({
			start,
			count,
			appFunction,
			transactionId: this.transactionId,
		})

		this.connection.write(payload.getBuffer())
		this.incrementTransactionId()

		return firstValueFrom(
			this.connection.onPacketData()
				.pipe(
					timeout(this.timeout),
					catchError((_err, caught) => {
						this.requestTimeout$.next({ request: payload.getBuffer() })
						throw caught
					}),
					filter(({ parsedData }) => {
						return parsedData.data.header.transactionId === currentTransactionId
					}),
					tap(({ parsedData }) => {
						const completeData = ModbusPacketUtils.checkForErrorCodes(parsedData.data)
						if (!completeData.isOk)
							throw completeData.error
					}),
					map(({ parsedData, buffer }) => {
						const completeData = ModbusPacketUtils.parseReadInputRegisterResponse(parsedData.data)
						if (completeData.isOk) {
							this.requestResponsePair$.next({
								request: payload.getBuffer(),
								response: buffer.data,
								parsedRequest: rawData,
								parsedResponse: {
									appFunction: parsedData.data.header.appFunctionCode,
									date: parsedData.data.header.date,
									transactionId: parsedData.data.header.transactionId,
									protocolId: parsedData.data.header.protocolId,
									messageLen: parsedData.data.header.messageLen,
									unitId: parsedData.data.header.unitId,
									functionCode: parsedData.data.header.functionCode,
									numberOfBytes: completeData.data.byteCount,
									dataBuffer: completeData.data.payload,
								},
							})

							return completeData.data
						}
						else {
							this.requestResponsePair$.next({
								request: payload.getBuffer(),
								response: buffer.data,
								parsedRequest: rawData,
								parsedResponse: null,
							})
						}

						throw completeData.error
					}),
				),
		)
	}

	/**
	 * Execute WriteMultipleRegisters Request (Function Code 0x10)
	 * @param {number} start Address.
	 * @param {number[] | Buffer} values Values either as an Array[UInt16] or a Buffer.
	 * @example
	 * await client.writeMultipleRegisters(10, [1,5,2,4])
	 * @example
	 * const buff = Buffer.from([0x12, 0x34, 0x56, 0x78, 0x9A, 0xBC, 0xDE, 0xF0]);
	 * await client.writeMultipleRegisters(10, buff)
	 */
	writeMultipleRegisters(start: number, values: number[] | Buffer, appFunction: ApplicationFunctionType = null) {
		const currentTransactionId = this.transactionId
		const { payload, rawData } = ModbusPacketUtils.createWriteMultipleRegistersPayload({
			start,
			values,
			appFunction,
			transactionId: this.transactionId,
		})

		this.connection.write(payload.getBuffer())
		this.incrementTransactionId()

		return firstValueFrom(
			this.connection.onPacketData()
				.pipe(
					timeout(this.timeout),
					catchError((_err, caught) => {
						this.requestTimeout$.next({ request: payload.getBuffer() })
						throw caught
					}),
					filter(({ parsedData }) => parsedData.data.header.transactionId === currentTransactionId),
					tap(({ parsedData }) => {
						const completeData = ModbusPacketUtils.checkForErrorCodes(parsedData.data)
						if (!completeData.isOk)
							throw completeData.error
					}),
					map(({ parsedData, buffer }) => {
						const completeData = ModbusPacketUtils.parseWriteMultipleRegisterResponse(parsedData.data)
						if (completeData.isOk) {
							this.requestResponsePair$.next({
								request: payload.getBuffer(),
								response: buffer.data,
								parsedRequest: rawData,
								parsedResponse: {
									appFunction: parsedData.data.header.appFunctionCode,
									date: parsedData.data.header.date,
									transactionId: parsedData.data.header.transactionId,
									protocolId: parsedData.data.header.protocolId,
									messageLen: parsedData.data.header.messageLen,
									unitId: parsedData.data.header.unitId,
									functionCode: parsedData.data.header.functionCode,
									start: completeData.data.start,
									numberOfRegisters: completeData.data.quantity,
								},
							})

							return completeData.data
						}
						else {
							this.requestResponsePair$.next({
								request: payload.getBuffer(),
								response: buffer.data,
								parsedRequest: rawData,
								parsedResponse: null,
							})
						}

						throw completeData.error
					}),
				),
		)
	}

	write(buffer: Buffer) {
		this.connection.write(buffer)
	}

	async connect() {
		await this.connection.connect(this.hostAddress, this.port)
	}

	disconnect() {
		this.connection.disconnect()
	}

	destroy() {
		this.connection.destroy()
	}

	onRawData() {
		return this.connection.onData()
	}

	onConnectionFailed() {
		return this.connection.onConnectionFailed()
	}

	createPacketDataObservable() {
		return this.connection.onPacketData()
			.pipe(
				filter((item) => {
					if (!item.buffer.isOk || !item.parsedData.isOk) {
						this.unknownPacket$.next(item.buffer.data)
					}
					return item.parsedData.isOk
				}),
				share(),
			)
	}

	onRequestResponse() {
		return this.requestResponsePair$.asObservable()
	}

	onRequestTimeout() {
		return this.requestTimeout$.asObservable()
	}

	onClose() {
		return this.connection.onClose()
	}

	onConnection() {
		return this.connection.onConnection()
	}

	onReconnection() {
		return this.connection.onReconnection()
	}

	onPacketData() {
		return this.connection.onPacketData()
	}

	onError() {
		return this.connection.onError()
	}

	isConnected() {
		return this.connection.isConnected()
	}

	ping() {
		return pingIp(this.hostAddress)
	}

	getConnection() {
		return this.connection
	}

	setEncryption(status: boolean) {
		this.connection.setEncrypted(status)
	}

	onUnknownPacket() {
		return this.unknownPacket$.asObservable()
	}

	private incrementTransactionId() {
		this.transactionId = (this.transactionId + 1) % 0xFFFF
	}
}
