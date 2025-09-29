import type { BufferType, Parser } from "../types"
import { Decimal } from "@prisma/client/runtime/library"

/**
 * A class to write and read decimals to and from byte buffers.
 */
export class DecimalParser implements Parser<Decimal> {
	private offset: number
	private max: Decimal
	private min: Decimal

	/**
	 * @param {number} bits The number of bits used by the integer.
	 * @param {boolean} [signed] True for signed, false otherwise.
	 * @param {boolean} [clamp] True to clamp on overflow.
	 */
	constructor(private bits: number, private signed: boolean = false, private clamp: boolean = false) {
		this.offset = Math.ceil(bits / 8)
		this.max = new Decimal(2).pow(bits).minus(1)
		this.min = new Decimal(0)

		if (signed) {
			this.max = new Decimal(2).pow(bits).dividedBy(2).minus(1)
			this.min = this.max.negated().minus(1)
		}
	}

	/**
	 * Write one unsigned integer to a byte buffer.
	 * @param {Uint8Array | Array<Decimal>} buffer An array of bytes.
	 * @param {Decimal} num The number. Overflows are truncated.
	 * @param {number} [index] The index being written in the byte buffer.
	 * @return {number} The next index to write on the byte buffer.
	 * @throws {RangeError} On overflow if clamp is set to false.
	 * @throws {TypeError} If num is not an integer.
	 */
	pack(buffer: Uint8Array | number[], num: Decimal.Value, index: number = 0): number {
		if (!Decimal.floor(num).equals(num)) {
			throw new TypeError("Input is not an Integer")
		}

		let value = this.normalizeNumber(num)
		value = this.checkBoundries(value)

		for (let i = 0; i < this.offset; i++) {
			buffer[index] = value.dividedBy(new Decimal(2).pow(i * 8)).floor().mod(256).toNumber()
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
	unpack(buffer: BufferType, index: number = 0): Decimal {
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
	 * @param {Uint8Array} buffer An array of bytes.
	 * @param {number} [index] The index to read.
	 * @return {number}
	 * @private
	 */
	private unpackUnsigned(buffer: BufferType, index: number = 0): Decimal {
		let num = new Decimal(0)

		for (let x = 0; x < this.offset; x++) {
			num = num.plus(new Decimal(buffer[index + x]!).times(new Decimal(256).pow(x)))
		}

		return num
	}

	/**
	 * Read one two's complement signed integer from a byte buffer.
	 * @param {Uint8Array} buffer An array of bytes.
	 * @param {number} [index] The index to read.
	 * @private
	 */
	private unpackSigned(buffer: BufferType, index: number = 0): Decimal {
		return this.signValue(this.unpackUnsigned(buffer, index))
	}

	/**
	 * Throws a RangeError if the number is out of boundaries, return
	 * the number otherwise.
	 * @param {Decimal} num The number.
	 * @throws {RangeError} If the number is out of boundaries.
	 * @private
	 */
	private checkBoundries(num: Decimal): Decimal {
		if (this.clamp) {
			return this.clampValue(num)
		}

		if (num.greaterThan(this.max) || num.lessThan(this.min)) {
			throw new RangeError(`${num} should be between (${this.min}, ${this.max})`)
		}

		return num
	}

	/**
	 * Clamp values on overflow.
	 * @param {Decimal} num The number.
	 * @private
	 */
	private clampValue(num: Decimal): Decimal {
		if (num.greaterThan(this.max)) {
			return this.max
		}
		else if (num.lessThan(this.min)) {
			return this.min
		}

		return num
	}

	/**
	 * Sign a number.
	 * @param {Decimal} num The number.
	 * @return {number}
	 * @private
	 */
	private signValue(num: Decimal): Decimal {
		if (num.greaterThan(this.max)) {
			num = num.minus(this.max.times(2).plus(2))
		}

		return num
	}

	private normalizeNumber(num: Decimal.Value): Decimal {
		if (num instanceof Decimal)
			return num
		return new Decimal(num)
	}
}
