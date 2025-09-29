import type { BufferType, Parser } from "../types"

/**
 * A class to write and read integer numbers to and from byte buffers.
 */
export class IntParser implements Parser<number> {
	private offset: number
	private max: number
	private min: number

	/**
	 * @param {number} bits The number of bits used by the integer.
	 * @param {boolean} [signed] True for signed, false otherwise.
	 * @param {boolean} [clamp] True to clamp on overflow.
	 */
	constructor(private bits: number, private signed: boolean = false, private clamp: boolean = false) {
		this.bits = bits
		this.offset = Math.ceil(bits / 8)
		this.max = 2 ** bits - 1
		this.min = 0

		if (signed) {
			this.max = 2 ** bits / 2 - 1
			this.min = -this.max - 1
		}
	}

	/**
	 * Write one unsigned integer to a byte buffer.
	 * @param {BufferType} buffer An array of bytes.
	 * @param {number} num The number. Overflows are truncated.
	 * @param {number} [index] The index being written in the byte buffer.
	 * @return {number} The next index to write on the byte buffer.
	 * @throws {RangeError} On overflow if clamp is set to false.
	 * @throws {TypeError} If num is not an integer.
	 */
	pack(buffer: BufferType, num: number, index: number = 0): number {
		if (typeof num !== "number" || !Number.isFinite(num) || Math.floor(num) !== num) {
			throw new TypeError(" ")
		}

		num = this.checkBoundries(num)

		for (let i = 0; i < this.offset; i++) {
			buffer[index] = Math.floor(num / 2 ** (i * 8)) & 255
			index++
		}

		return index
	}

	/**
	 * Read one unsigned integer from a byte buffer.
	 * Does not check for overflows.
	 * @param {BufferType} buffer An array of bytes.
	 * @param {number} [index] The index to read.
	 * @return {number}
	 * @private
	 */
	unpack(buffer: BufferType, index: number = 0): number {
		if (this.signed)
			return this.unpackSigned(buffer, index)

		return this.unpackUnsigned(buffer, index)
	}

	getOffset() {
		return this.offset
	}

	/**
	 * Read one unsigned integer from a byte buffer.
	 * Does not check for overflows.
	 * @param {BufferType} buffer An array of bytes.
	 * @param {number} [index] The index to read.
	 * @return {number}
	 * @private
	 */
	private unpackUnsigned(buffer: BufferType, index: number = 0): number {
		let num = 0

		for (let x = 0; x < this.offset; x++) {
			num += buffer[index + x]! * 256 ** x
		}

		return num
	}

	/**
	 * Read one two's complement signed integer from a byte buffer.
	 * @param {BufferType} buffer An array of bytes.
	 * @param {number} [index] The index to read.
	 * @return {number}
	 * @private
	 */
	private unpackSigned(buffer: BufferType, index: number = 0): number {
		return this.signValue(this.unpackUnsigned(buffer, index))
	}

	/**
	 * Throws a RangeError if the number is out of boundaries, return
	 * the number otherwise.
	 * @param {number} num The number.
	 * @return {number}
	 * @throws {RangeError} If the number is out of boundaries.
	 * @private
	 */
	private checkBoundries(num: number): number {
		if (this.clamp) {
			return this.clampValue(num)
		}

		if (num > this.max || num < this.min) {
			throw new RangeError(`${num} should be between (${this.min}, ${this.max})`)
		}

		return num
	}

	/**
	 * Clamp values on overflow.
	 * @param {number} num The number.
	 * @private
	 */
	private clampValue(num: number): number {
		if (num > this.max) {
			return this.max
		}
		else if (num < this.min) {
			return this.min
		}

		return num
	}

	/**
	 * Sign a number.
	 * @param {number} num The number.
	 * @return {number}
	 * @private
	 */
	private signValue(num: number): number {
		if (num > this.max) {
			num -= (this.max * 2) + 2
		}

		return num
	}
}
