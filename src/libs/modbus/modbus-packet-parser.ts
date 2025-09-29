import { Buffer } from "node:buffer"
import { ApplicationFunctionType } from "./interface/connection"
import { Result } from "./interface/node-client"
import { ErrorCode, ModbusError } from "./modbus-error"
import { convertDateToBuffer, PacketUtils } from "./packet-utils"

export enum FC {
	ReadHoldingRegisters = 0x3,
	WriteMultipleRegisters = 0x10,
}

export class ModbusPacketUtils {
	static appFunctionHeaderSize = 10

	static createReadInputRegistersPayload(input: CreateReadInputRegisterPayloadInput) {
		if (input.start > 0xFFFF) {
			throw new Error("InvalidStartAddress")
		}

		const packetSize = 12 + (input.appFunction ? this.getAppFunctionHeaderSize() : 0)
		const payload = new PacketUtils(Buffer.alloc(packetSize))

		const rawData: CreateReadInputRegisterRequestRawData = {
			date: null,
			appFunction: input.appFunction,
			transactionId: input.transactionId,
			protocolId: 0x0,
			messageLen: 0x06,
			unitId: 0x0,
			functionCode: FC.ReadHoldingRegisters,
			start: input.start,
			numberOfRegisters: input.count,
		}

		if (input.appFunction) {
			rawData.date = this.appendAppFunctionHeader(input.appFunction, payload)
		}

		payload.writeUInt16BE(rawData.transactionId) // transaction id
		payload.writeUInt16BE(rawData.protocolId) // protocol id
		payload.writeUInt16BE(rawData.messageLen) // message len
		payload.writeUInt8(rawData.unitId) // unit id
		payload.writeUInt8(rawData.functionCode) // function code
		payload.writeUInt16BE(rawData.start) // start address
		payload.writeUInt16BE(rawData.numberOfRegisters) // quantitiy of coils

		return { payload, rawData }
	}

	static createWriteMultipleRegistersPayload(input: CreateWriteMultipleRegistersPayloadInput) {
		if (input.start > 0xFFFF) {
			throw new Error("InvalidStartAddress")
		}

		if (Array.isArray(input.values) && input.values.length > 0x7B) {
			throw new Error("InvalidArraySize")
		}

		if (input.values instanceof Buffer && input.values.length > 0x7B * 2) {
			throw new Error("InvalidBufferSize")
		}

		if (!(input.values instanceof Buffer) && !Array.isArray(input.values)) {
			throw new TypeError("InvalidType_MustBeBufferOrArray")
		}

		const numberOfBytes = input.values instanceof Buffer ? input.values.length : Math.floor(input.values.length * 2)
		const quantity = input.values instanceof Buffer ? Math.floor(input.values.length / 2) : input.values.length
		const messageLen = 7 + numberOfBytes

		const bufferLen = 6 + messageLen + (input.appFunction ? this.getAppFunctionHeaderSize() : 0)
		const payload = new PacketUtils(Buffer.alloc(bufferLen))

		const rawData: CreateWriteMultipleRegistersRequestRawData = {
			date: null,
			appFunction: input.appFunction,
			transactionId: input.transactionId,
			protocolId: 0x0,
			messageLen,
			unitId: 0x0,
			functionCode: FC.WriteMultipleRegisters,
			start: input.start,
			numberOfRegisters: quantity,
			numberOfBytes,
			dataBuffer: this.convertDataArrayToBuffer(input.values),
		}

		if (input.appFunction) {
			rawData.date = this.appendAppFunctionHeader(rawData.appFunction, payload)
		}

		payload.writeUInt16BE(rawData.transactionId)
		payload.writeUInt16BE(rawData.protocolId)
		payload.writeUInt16BE(rawData.messageLen)
		payload.writeUInt8(rawData.unitId)
		payload.writeUInt8(rawData.functionCode)
		payload.writeUInt16BE(rawData.start)
		payload.writeUInt16BE(rawData.numberOfRegisters)
		payload.writeUInt8(rawData.numberOfBytes)
		payload.copyFrom(rawData.dataBuffer)

		return { payload, rawData }
	}

	static createWriteMultipleRegistersResponsePayload(input: CreateWriteMultipleRegistersResponsePayloadInput) {
		const bufferLen = (input.appFunction ? this.getAppFunctionHeaderSize() : 0) + 12
		const payload = new PacketUtils(Buffer.alloc(bufferLen))

		const rawData: CreateWriteMultipleRegistersResponseRawData = {
			date: null,
			appFunction: input.appFunction,
			transactionId: input.transactionId,
			protocolId: 0x0,
			messageLen: 6,
			unitId: 0x0,
			functionCode: FC.WriteMultipleRegisters,
			start: input.start,
			numberOfRegisters: input.numberOfRegisters,
		}

		if (input.appFunction) {
			rawData.date = this.appendAppFunctionHeader(input.appFunction, payload)
		}

		payload.writeUInt16BE(rawData.transactionId)
		payload.writeUInt16BE(rawData.protocolId)
		payload.writeUInt16BE(rawData.messageLen)
		payload.writeUInt8(rawData.unitId)
		payload.writeUInt8(rawData.functionCode)
		payload.writeUInt16BE(rawData.start)
		payload.writeUInt16BE(rawData.numberOfRegisters)

		return { payload, rawData }
	}

	static createReadInputRegistersResponsePayload(input: CreateReadInputRegisterResponsePayloadInput) {
		const valueByteCount = input.values instanceof Buffer ? input.values.length : input.values.length * 2
		const bufferLen = (input.appFunction ? this.getAppFunctionHeaderSize() : 0) + 9 + valueByteCount
		const messageLen = valueByteCount + 3

		const payload = new PacketUtils(Buffer.alloc(bufferLen))

		const rawData: CreateReadInputRegistersResponseRawData = {
			date: null,
			appFunction: input.appFunction,
			transactionId: input.transactionId,
			protocolId: 0x0,
			messageLen,
			unitId: 0x0,
			functionCode: FC.ReadHoldingRegisters,
			numberOfBytes: valueByteCount,
			dataBuffer: this.convertDataArrayToBuffer(input.values),
		}

		if (input.appFunction) {
			rawData.date = this.appendAppFunctionHeader(input.appFunction, payload)
		}

		payload.writeUInt16BE(rawData.transactionId)
		payload.writeUInt16BE(rawData.protocolId)
		payload.writeUInt16BE(rawData.messageLen)
		payload.writeUInt8(rawData.unitId)
		payload.writeUInt8(rawData.functionCode)
		payload.writeUInt8(rawData.numberOfBytes)
		payload.copyFrom(rawData.dataBuffer)

		return { payload, rawData }
	}

	static parseWriteMultipleRegisterResponse(packet: ModbusPacket) {
		const result: Result<WriteMultipleRegisterResponse> = { isOk: false, data: null, error: null }
		const payload = new PacketUtils(packet.payload)

		if (packet.header.functionCode !== FC.WriteMultipleRegisters) {
			result.error = new Error("Invalid Response Function Code")
			return result
		}

		try {
			const start = payload.readUInt16BE()
			const quantity = payload.readUInt16BE()

			const output: WriteMultipleRegisterResponse = {
				start,
				quantity,
			}

			result.data = output
			result.isOk = true

			return result
		}

		catch {
			return result
		}
	}

	static parseWriteMultipleRegisterRequest(packet: ModbusPacket) {
		const result: Result<WriteMultipleRegisterRequest> = { isOk: false, data: null, error: null }
		const payload = new PacketUtils(packet.payload)

		try {
			const startAddress = payload.readUInt16BE()
			const registerCount = payload.readUInt16BE()
			const numberOfBytes = payload.readUInt8()
			const buffer = payload.subarray()

			const values: number[] = []

			for (let index = 0; index < registerCount; index++) {
				const value = payload.readUInt16BE()
				values.push(value)
			}

			result.isOk = true
			result.data = {
				startAddress,
				numberOfBytes,
				registerCount,
				values,
				buffer,
			}
		}

		catch (e) {
			result.error = e as Error
		}

		return result
	}

	static parseReadInputRegisterRequest(packet: ModbusPacket) {
		const result: Result<ReadHoldingRegistersRequest> = { isOk: false, data: null, error: null }
		const payload = new PacketUtils(packet.payload)

		try {
			const start = payload.readUInt16BE()
			const registerCount = payload.readUInt16BE()

			result.isOk = true
			result.data = {
				start,
				registerCount,
			}
		}

		catch (e) {
			result.error = e as Error
		}

		return result
	}

	static parseReadInputRegisterResponse(packet: ModbusPacket) {
		const payloadUtils = new PacketUtils(packet.payload)
		const result: Result<ReadHoldingRegistersResponse> = {
			isOk: false,
			data: null,
			error: null,
		}

		if (packet.header.functionCode !== FC.ReadHoldingRegisters) {
			result.error = new Error("Invalid Response Function Code")
			return result
		}

		try {
			const byteCount = payloadUtils.readUInt8()
			const payload = payloadUtils.subarray(byteCount)
			const values = []
			for (let i = 0; i < byteCount / 2; i++)
				values.push(payloadUtils.readUInt16BE())

			const output: ReadHoldingRegistersResponse = {
				byteCount,
				payload,
				values,
			}

			result.data = output
			result.isOk = true
		}
		catch (e) {
			result.error = e as Error
		}

		return result
	}

	static parseHeader(buffer: Buffer): Result<ModbusPacket> {
		const result: Result<ModbusPacket> = { isOk: false, data: null, error: null }
		let appFunctionCode: number = null
		let date: Date = null

		try {
			if (!buffer || buffer.length < 8) {
				throw new Error("Recived Packet is too small to be parsed.")
			}

			const chunk = buffer.readUInt16BE(2)
			const hasAppFunction = chunk !== 0
			const packet = new PacketUtils(buffer)

			if (hasAppFunction) {
				appFunctionCode = packet.readUInt8()
				date = new Date(
					packet.readUInt16BE(),
					packet.readUInt8(),
					packet.readUInt8(),
					packet.readUInt8(),
					packet.readUInt8(),
					packet.readUInt8(),
					packet.readUInt16BE(),
				)
			}

			const transactionId = packet.readUInt16BE() // transaction id
			const protocolId = packet.readUInt16BE() // protocol id
			const messageByteCount = packet.readUInt16BE() // message len
			const unitId = packet.readUInt8() // unit id
			const functionCode = packet.readUInt8() // function code
			const payload = packet.subarray(messageByteCount - 2)
			const fullMessageSize = (hasAppFunction ? this.getAppFunctionHeaderSize() : 0) + 6 + messageByteCount

			const header: ModbusHeader = {
				fullMessageSize,
				date,
				appFunctionCode,
				transactionId,
				protocolId,
				messageLen: messageByteCount,
				unitId,
				functionCode,
			}

			if (unitId !== 0) {
				throw new Error("Unit Id Must be zero in packet.")
			}

			if (protocolId !== 0) {
				throw new Error("Protocol Id Must be zero in packet.")
			}

			result.data = { header, payload }
			result.isOk = true
		}

		catch (e) {
			console.error("Malformed Modbus Packer Recieved !")
			console.error(e)
		}

		return result
	}

	static isErrorFunctionCode(functionCode: FC) {
		if (functionCode > 0x80) {
			return true
		}
		return false
	}

	static checkForErrorCodes(input: ModbusPacket) {
		const hasError = this.isErrorFunctionCode(input.header.functionCode)
		const result: Result<never, ModbusError> = { isOk: true }
		if (hasError) {
			const utils = new PacketUtils(input.payload)
			const code = utils.readUInt8() as ErrorCode
			result.error = new ModbusError(input.header.functionCode, code)
			result.isOk = false
		}

		return result
	}

	static getAppFunctionHeaderSize() {
		return this.appFunctionHeaderSize
	}

	static appendAppFunctionHeader(appFunction: ApplicationFunctionType, payload: PacketUtils) {
		const date = new Date()

		const buffer = convertDateToBuffer(date)
		payload.writeUInt8(appFunction)
		payload.copyFrom(buffer)

		return date
	}

	static convertDataArrayToBuffer(input: Buffer | number[]) {
		const numberOfBytes = input instanceof Buffer ? input.length : input.length * 2
		const payload = new PacketUtils(Buffer.alloc(numberOfBytes))

		if (input instanceof Buffer) {
			const buffer = new PacketUtils(input)
			for (let i = 0; i < buffer.getBuffer().length; i += 2)
				payload.writeUInt16BE(buffer.readUInt16BE())
		}

		else if (Array.isArray(input)) {
			for (const value of input)
				payload.writeUInt16BE(value)
		}

		return payload.getBuffer()
	}
}

type WriteMultipleRegisterResponse = {
	start: number
	quantity: number
}

export type WriteMultipleRegisterRequest = {
	numberOfBytes: number
	registerCount: number
	startAddress: number
	values: number[]
	buffer: Buffer
}

type ModbusHeader = {
	fullMessageSize: number
	appFunctionCode?: number
	date?: Date
	transactionId: number
	protocolId: number
	messageLen: number
	unitId: number
	functionCode: FC
}

export type ModbusPacket = {
	header: ModbusHeader
	payload: Buffer
}

type ReadHoldingRegistersResponse = {
	byteCount: number
	payload: Buffer
	values: number[]
}

export type ReadHoldingRegistersRequest = {
	start: number
	registerCount: number
}

type CreateReadInputRegisterPayloadInput = {
	start: number
	count: number
	transactionId: number
	appFunction?: ApplicationFunctionType
}

type CreateReadInputRegisterResponsePayloadInput = {
	transactionId: number
	appFunction?: ApplicationFunctionType
	values: number[] | Buffer
}

type CreateWriteMultipleRegistersPayloadInput = {
	start: number
	values: number[] | Buffer
	transactionId: number
	appFunction?: ApplicationFunctionType
}

type CreateWriteMultipleRegistersResponsePayloadInput = {
	appFunction?: ApplicationFunctionType
	transactionId: number
	start: number
	numberOfRegisters: number
}

export type CreateReadInputRegisterRequestRawData = {
	date?: Date
	appFunction?: ApplicationFunctionType
	transactionId: number
	protocolId: number
	messageLen: number
	unitId: number
	functionCode: FC.ReadHoldingRegisters
	start: number
	numberOfRegisters: number
}

export type CreateWriteMultipleRegistersRequestRawData = {
	date?: Date
	appFunction?: ApplicationFunctionType
	transactionId: number
	protocolId: number
	messageLen: number
	unitId: number
	functionCode: FC.WriteMultipleRegisters
	start: number
	numberOfRegisters: number
	numberOfBytes: number
	dataBuffer: Buffer
}

export type CreateWriteMultipleRegistersResponseRawData = {
	date?: Date
	appFunction?: ApplicationFunctionType
	transactionId: number
	protocolId: number
	messageLen: number
	unitId: number
	functionCode: FC
	start: number
	numberOfRegisters: number
}

export type CreateReadInputRegistersResponseRawData = {
	date?: Date
	appFunction?: ApplicationFunctionType
	transactionId: number
	protocolId: number
	messageLen: number
	unitId: number
	functionCode: FC
	numberOfBytes: number
	dataBuffer: Buffer
}
