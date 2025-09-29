import { Buffer } from "node:buffer"
import { Decimal } from "@prisma/client/runtime/library"
import { BittyConfigType, packTo, unpack } from "src/libs/bitty"

type FeatureTypeData = {
	isBigEndian: boolean
	isSigned: boolean
}

export class PacketUtils {
	private currentIndex = 0
	constructor(private buffer: Buffer) { }

	restore(index: number) {
		this.currentIndex = index
	}

	getBuffer() {
		return this.buffer
	}

	getIndex() {
		return this.currentIndex
	}

	resetIndex() {
		this.currentIndex = 0
	}

	readFeature(feature: FeatureTypeData, byteCount: number) {
		let output: Decimal = null
		if (feature.isSigned && feature.isBigEndian) {
			output = this.readIntBE(byteCount)
		}
		else if (feature.isSigned && !feature.isBigEndian) {
			output = this.readIntLE(byteCount)
		}
		else if (!feature.isSigned && feature.isBigEndian) {
			output = this.readUIntBE(byteCount)
		}
		else if (!feature.isSigned && !feature.isBigEndian) {
			output = this.readUIntLE(byteCount)
		}

		return output
	}

	writeFeature(feature: FeatureTypeData, byteCount: number, value: Decimal.Value) {
		if (feature.isSigned && feature.isBigEndian) {
			this.writeIntBE(byteCount, value)
		}
		else if (feature.isSigned && !feature.isBigEndian) {
			this.writeIntLE(byteCount, value)
		}
		else if (!feature.isSigned && feature.isBigEndian) {
			this.writeUIntBE(byteCount, value)
		}
		else if (!feature.isSigned && !feature.isBigEndian) {
			this.writeUIntLE(byteCount, value)
		}
	}

	readIntBE(byteCount: number) {
		if (byteCount === 1) {
			return new Decimal(this.readInt8())
		}

		if (byteCount === 2) {
			return new Decimal(this.readInt16BE())
		}

		if (byteCount === 4) {
			return new Decimal(this.readInt32BE())
		}

		const config: BittyConfigType = {
			signed: true,
			bits: byteCount * 8,
			be: true,
		}

		const value = unpack(this.buffer, config, this.currentIndex)
		this.currentIndex += byteCount

		return value
	}

	readUIntBE(byteCount: number) {
		if (byteCount === 1) {
			return new Decimal(this.readInt8())
		}

		if (byteCount === 2) {
			return new Decimal(this.readUInt16BE())
		}

		if (byteCount === 4) {
			return new Decimal(this.readUInt32BE())
		}

		const config: BittyConfigType = {
			signed: false,
			bits: byteCount * 8,
			be: true,
		}

		const value = unpack(this.buffer, config, this.currentIndex)
		this.currentIndex += byteCount

		return value
	}

	readUIntLE(byteCount: number) {
		if (byteCount === 1) {
			return new Decimal(this.readInt8())
		}

		if (byteCount === 2) {
			return new Decimal(this.readUInt16LE())
		}

		if (byteCount === 4) {
			return new Decimal(this.readUInt32LE())
		}

		const config: BittyConfigType = {
			signed: false,
			bits: byteCount * 8,
			be: false,
		}

		const value = unpack(this.buffer, config, this.currentIndex)
		this.currentIndex += byteCount

		return value
	}

	readIntLE(byteCount: number) {
		if (byteCount === 1) {
			return new Decimal(this.readInt8())
		}

		if (byteCount === 2) {
			return new Decimal(this.readInt16LE())
		}

		if (byteCount === 4) {
			return new Decimal(this.readInt32LE())
		}

		const config: BittyConfigType = {
			signed: true,
			bits: byteCount * 8,
			be: false,
		}

		const value = unpack(this.buffer, config, this.currentIndex)
		this.currentIndex += byteCount

		return value
	}

	writeUIntBE(byteCount: number, input: Decimal.Value) {
		const value = this.normalizeDecimalInput(input)

		if (byteCount === 1) {
			return new Decimal(this.writeUInt8(value.toNumber()))
		}

		if (byteCount === 2) {
			return new Decimal(this.writeUInt16BE(value.toNumber()))
		}

		if (byteCount === 4) {
			return new Decimal(this.writeUInt32BE(value.toNumber()))
		}

		const config: BittyConfigType = {
			signed: false,
			bits: byteCount * 8,
			be: true,
		}

		packTo(value, this.buffer, config, this.currentIndex)
		this.currentIndex += byteCount
	}

	writeIntBE(byteCount: number, input: Decimal.Value) {
		const value = this.normalizeDecimalInput(input)

		if (byteCount === 1) {
			return new Decimal(this.writeInt8(value.toNumber()))
		}

		if (byteCount === 2) {
			return new Decimal(this.writeInt16BE(value.toNumber()))
		}

		if (byteCount === 4) {
			return new Decimal(this.writeInt32BE(value.toNumber()))
		}

		const config: BittyConfigType = {
			signed: true,
			bits: byteCount * 8,
			be: true,
		}

		packTo(value, this.buffer, config, this.currentIndex)
		this.currentIndex += byteCount
	}

	writeUIntLE(byteCount: number, input: Decimal.Value) {
		const value = this.normalizeDecimalInput(input)

		if (byteCount === 1) {
			return new Decimal(this.writeInt8(value.toNumber()))
		}

		if (byteCount === 2) {
			return new Decimal(this.writeUInt16LE(value.toNumber()))
		}

		if (byteCount === 4) {
			return new Decimal(this.writeUInt32LE(value.toNumber()))
		}

		const config: BittyConfigType = {
			signed: false,
			bits: byteCount * 8,
			be: false,
		}

		packTo(value, this.buffer, config, this.currentIndex)
		this.currentIndex += byteCount
	}

	writeIntLE(byteCount: number, input: Decimal.Value) {
		const value = this.normalizeDecimalInput(input)

		if (byteCount === 1) {
			return new Decimal(this.writeInt8(value.toNumber()))
		}

		if (byteCount === 2) {
			return new Decimal(this.writeInt16LE(value.toNumber()))
		}

		if (byteCount === 4) {
			return new Decimal(this.writeInt32LE(value.toNumber()))
		}

		const config: BittyConfigType = {
			signed: true,
			bits: byteCount * 8,
			be: false,
		}

		packTo(value, this.buffer, config, this.currentIndex)
		this.currentIndex += byteCount
	}

	copyFrom(source: Buffer) {
		source.copy(this.buffer, this.currentIndex)
		this.currentIndex += source.length
	}

	skip(count: number) {
		this.currentIndex += count
	}

	subarray(count?: number): Buffer {
		const endIndex = count ? this.currentIndex + count : undefined
		return this.buffer.subarray(this.currentIndex, endIndex)
	}

	readUInt8(): number {
		const output = this.buffer.readUInt8(this.currentIndex)
		this.currentIndex += 1
		return output
	}

	readUInt16BE(): number {
		const output = this.buffer.readUInt16BE(this.currentIndex)
		this.currentIndex += 2
		return output
	}

	readUInt32LE(): number {
		const output = this.buffer.readUInt32LE(this.currentIndex)
		this.currentIndex += 4
		return output
	}

	readUInt32BE(): number {
		const output = this.buffer.readUInt32BE(this.currentIndex)
		this.currentIndex += 4
		return output
	}

	readInt8(): number {
		const output = this.buffer.readInt8(this.currentIndex)
		this.currentIndex += 1
		return output
	}

	readUInt16LE(): number {
		const output = this.buffer.readUInt16LE(this.currentIndex)
		this.currentIndex += 2
		return output
	}

	readInt16LE(): number {
		const output = this.buffer.readInt16LE(this.currentIndex)
		this.currentIndex += 2
		return output
	}

	readInt16BE(): number {
		const output = this.buffer.readInt16BE(this.currentIndex)
		this.currentIndex += 2
		return output
	}

	readInt32LE(): number {
		const output = this.buffer.readInt32LE(this.currentIndex)
		this.currentIndex += 4
		return output
	}

	readInt32BE(): number {
		const output = this.buffer.readInt32BE(this.currentIndex)
		this.currentIndex += 4
		return output
	}

	readFloatLE(): number {
		const output = this.buffer.readFloatLE(this.currentIndex)
		this.currentIndex += 4
		return output
	}

	readFloatBE(): number {
		const output = this.buffer.readFloatBE(this.currentIndex)
		this.currentIndex += 4
		return output
	}

	readDoubleLE(): number {
		const output = this.buffer.readDoubleLE(this.currentIndex)
		this.currentIndex += 8
		return output
	}

	readDoubleBE(): number {
		const output = this.buffer.readDoubleBE(this.currentIndex)
		this.currentIndex += 8
		return output
	}

	writeUInt8(value: number): number {
		const output = this.buffer.writeUInt8(value, this.currentIndex)
		this.currentIndex += 1
		return output
	}

	writeUInt16LE(value: number): number {
		const output = this.buffer.writeUInt16LE(value, this.currentIndex)
		this.currentIndex += 2
		return output
	}

	writeUInt16BE(value: number): number {
		const output = this.buffer.writeUInt16BE(value, this.currentIndex)
		this.currentIndex += 2
		return output
	}

	writeUInt32LE(value: number): number {
		const output = this.buffer.writeUInt32LE(value, this.currentIndex)
		this.currentIndex += 4
		return output
	}

	writeUInt32BE(value: number): number {
		const output = this.buffer.writeUInt32BE(value, this.currentIndex)
		this.currentIndex += 4
		return output
	}

	writeInt8(value: number): number {
		const output = this.buffer.writeInt8(value, this.currentIndex)
		this.currentIndex += 1
		return output
	}

	writeInt16LE(value: number): number {
		const output = this.buffer.writeInt16LE(value, this.currentIndex)
		this.currentIndex += 2
		return output
	}

	writeInt16BE(value: number): number {
		const output = this.buffer.writeInt16BE(value, this.currentIndex)
		this.currentIndex += 2
		return output
	}

	writeInt32LE(value: number): number {
		const output = this.buffer.writeInt32LE(value, this.currentIndex)
		this.currentIndex += 4
		return output
	}

	writeInt32BE(value: number): number {
		const output = this.buffer.writeInt32BE(value, this.currentIndex)
		this.currentIndex += 4
		return output
	}

	writeFloatLE(value: number): number {
		const output = this.buffer.writeFloatLE(value, this.currentIndex)
		this.currentIndex += 4
		return output
	}

	writeFloatBE(value: number): number {
		const output = this.buffer.writeFloatBE(value, this.currentIndex)
		this.currentIndex += 4
		return output
	}

	writeDoubleLE(value: number): number {
		const output = this.buffer.writeDoubleLE(value, this.currentIndex)
		this.currentIndex += 8
		return output
	}

	writeDoubleBE(value: number): number {
		const output = this.buffer.writeDoubleBE(value, this.currentIndex)
		this.currentIndex += 8
		return output
	}

	private normalizeDecimalInput(input: Decimal.Value) {
		if (input instanceof Decimal)
			return input

		return new Decimal(input)
	}
}

export function convertDateToBuffer(date: Date) {
	const packet = new PacketUtils(Buffer.allocUnsafe(9))
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()
	const miliSecond = date.getMilliseconds()

	packet.writeUInt16BE(year)
	packet.writeUInt8(month)
	packet.writeUInt8(day)
	packet.writeUInt8(hour)
	packet.writeUInt8(minute)
	packet.writeUInt8(second)
	packet.writeUInt16BE(miliSecond)

	return packet.getBuffer()
}

export function convertDateToRegister(date: Date, registerByteCount: number) {
	const packet = new PacketUtils(Buffer.allocUnsafe(registerByteCount * 7))
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()
	const miliSecond = date.getMilliseconds()

	packet.writeUIntBE(registerByteCount, year)
	packet.writeUIntBE(registerByteCount, month)
	packet.writeUIntBE(registerByteCount, day)
	packet.writeUIntBE(registerByteCount, hour)
	packet.writeUIntBE(registerByteCount, minute)
	packet.writeUIntBE(registerByteCount, second)
	packet.writeUIntBE(registerByteCount, miliSecond)

	return packet.getBuffer()
}

export function convertRegisterToDate(buffer: Buffer, registerByteCount: number) {
	const packet = new PacketUtils(buffer)
	const year = packet.readUIntBE(registerByteCount)
	const month = packet.readUIntBE(registerByteCount).minus(1)
	const day = packet.readUIntBE(registerByteCount)
	const hour = packet.readUIntBE(registerByteCount)
	const minute = packet.readUIntBE(registerByteCount)
	const second = packet.readUIntBE(registerByteCount)
	const miliSecond = packet.readUIntBE(registerByteCount)

	return new Date(year.toNumber(), month.toNumber(), day.toNumber(), hour.toNumber(), minute.toNumber(), second.toNumber(), miliSecond.toNumber())
}

export function convertNowToBuffer() {
	return convertDateToBuffer(new Date())
}

export function convertNowToRegister(registerByteCount: number) {
	return convertDateToRegister(new Date(), registerByteCount)
}
