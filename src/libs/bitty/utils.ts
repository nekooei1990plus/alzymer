import type { BittyConfigType, BufferType, Parser } from "./types"
import { DecimalParser } from "./parsers/decimal-parser"

/**
 * Adjust the end index according to the input buffer length and the
 * type offset.
 * @param buffer The byte buffer.
 * @param start The buffer index to start reading.
 * @param end The buffer index to stop reading.
 * @param offset The number of bytes used by the type.
 * @param safe True for size-safe buffer reading.
 * @throws {Error} On bad buffer length, if safe.
 */
export function getUnpackLen(
	buffer: BufferType,
	start: number,
	end: number,
	offset: number,
	safe: boolean,
) {
	const extra = (end - start) % offset
	if (safe && (extra || buffer.length < offset)) {
		throw new Error("Bad buffer length")
	}
	return end - extra
}

/**
 * Copy a byte buffer as a Array or Uint8Array.
 * @param buffer The byte buffer.
 */
export function copyBuffer(buffer: BufferType) {
	if (buffer.constructor === Array) {
		return buffer.slice()
	}
	return new Uint8Array(buffer)
}

export function unpack_<T>(
	buffer: BufferType,
	output: Array<T>,
	start: number,
	end: number,
	parser: Parser<T>,
) {
	const offset = parser.getOffset()

	for (let index = 0, j = start; j < end; j += offset, index++) {
		// Use the parser's unpack method and store the result as a Decimal in the output
		output[index] = parser.unpack(buffer, j)
	}
}

export function createParser(config: BittyConfigType, clamp: boolean) {
	return new DecimalParser(config.bits, config.signed, clamp)
}

/**
 * Swap the byte ordering in a buffer. The buffer is modified in place.
 * @param {Array<number> | Uint8Array} bytes The bytes.
 * @param {number} offset The byte offset.
 * @param {number} [start] The start index.
 * @param {number} [end] The end index.
 */
export function endianness(
	bytes: Array<number> | Uint8Array,
	offset: number,
	start: number = 0,
	end: number = bytes.length,
): void {
	for (let index = start; index < end; index += offset) {
		swap_(bytes, offset, index)
	}
}

/**
 * Swap the byte order of a value in a buffer. The buffer is modified in place.
 * @param {Array<number> | Uint8Array} bytes The bytes.
 * @param {number} offset The byte offset.
 * @param {number} index The start index.
 * @private
 */
function swap_(
	bytes: Array<number> | Uint8Array,
	offset: number,
	index: number,
): void {
	offset--
	for (let x = 0; x < offset; x++) {
		const theByte = bytes[index + x]
		bytes[index + x] = bytes[index + offset]!
		bytes[index + offset] = theByte!
		offset--
	}
}
