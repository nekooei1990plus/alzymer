import type { BittyConfigType, BufferType } from "./types"
import { Decimal } from "@prisma/client/runtime/library"
import { copyBuffer, createParser, endianness, getUnpackLen, unpack_ } from "./utils"

/**
 * Pack a array of numbers to a byte buffer.
 * All other packing functions are interfaces to this function.
 * @param values The values to pack.
 * @param buffer The buffer to write on.
 * @param config type definition.
 * @param index The buffer index to start writing.
 * @param clamp True to clamp ints on overflow.
 * @return The next index to write.
 * @throws {Error} If the type definition is not valid.
 * @throws {RangeError} On overflow if clamp is set to false.
 * @throws {TypeError} If 'values' is not a array of numbers.
 * @throws {TypeError} If 'values' is not a array of ints and type is int.
 */
export function packArrayTo(
	values: Array<Decimal.Value>,
	buffer: BufferType,
	config: BittyConfigType,
	index: number = 0,
	clamp: boolean = false,
) {
	const packer = createParser(config, clamp)

	const offset = Math.ceil(config.bits / 8)
	let i = 0
	const start = index

	for (let valuesLen = values.length; i < valuesLen; i++) {
		index = packer.pack(buffer, values[i]!, index)
	}
	if (config.be) {
		endianness(buffer, offset, start, index)
	}

	return index
}

/**
 * Pack a number to a byte buffer.
 * @param value The value.
 * @param buffer The byte buffer to write on.
 * @param config The type definition.
 * @param index The buffer index to write.
 * @param clamp True to clamp ints on overflow.
 * @return The next index to write.
 * @throws {Error} If the type definition is not valid.
 * @throws {RangeError} On overflow if clamp is set to false.
 * @throws {TypeError} If 'value' is not a number.
 * @throws {TypeError} If 'value' is not a int and type is int.
 */
export function packTo(
	value: Decimal.Value,
	buffer: BufferType,
	config: BittyConfigType,
	index: number = 0,
	clamp: boolean = false,
) {
	return packArrayTo([value], buffer, config, index, clamp)
}

/**
 * Unpack a number from a byte buffer.
 * @param buffer The byte buffer.
 * @param config theType The type definition.
 * @param index The buffer index to read.
 * @param safe If set to false, extra bytes in the end of
 *   the input array are ignored and input buffers with insufficient bytes will
 *   write nothing to the output array. If safe is set to true the function
 *   will throw a 'Bad buffer length' error on the aforementioned cases.
 * @throws {Error} If the type definition is not valid.
 * @throws {Error} On bad input buffer length if on safe mode.
 */
export function unpack(buffer: BufferType, config: BittyConfigType, index = 0, safe = false) {
	const output: Decimal[] = []
	unpackArrayTo(buffer, config, output, index, index + Math.ceil(config.bits / 8), safe)
	return output[0]
}

/**
 * Unpack a array of numbers from a byte buffer to a array or a typed array.
 * All other unpacking functions are interfaces to this function.
 * @param buffer The byte buffer.
 * @param config The type definition.
 * @param output The output array or typed array.
 * @param start The buffer index to start reading.
 * @param end The buffer index to stop reading.
 * @param safe If set to false, extra bytes in the end of
 *   the input array are ignored and input buffers with insufficient bytes will
 *   write nothing to the output array. If safe is set to true the function
 *   will throw a 'Bad buffer length' error on the aforementioned cases.
 * @throws {Error} If the type definition is not valid.
 * @throws {Error} On bad input buffer length if on safe mode.
 */
export function unpackArrayTo(
	buffer: BufferType,
	config: BittyConfigType,
	output: Decimal[],
	start: number = 0,
	end: number = buffer.length,
	safe: boolean = false,
) {
	const packer = createParser(config, false)
	// getUnpackLen_ will adjust the end index according to the size
	// of the input buffer and the byte offset or throw a error on bad
	// end index if safe=true
	end = getUnpackLen(buffer, start, end, packer.getOffset(), safe)

	if (config.be) {
		const readBuffer = copyBuffer(buffer)
		if (config.be) {
			endianness(readBuffer, packer.getOffset(), start, end)
		}
		unpack_(readBuffer, output, start, end, packer)
	}
	else {
		unpack_(buffer, output, start, end, packer)
	}
}

export { BittyConfigType }
