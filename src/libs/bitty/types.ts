export type BittyConfigType = { bits: number, signed?: boolean, be?: boolean }

export type Parser<T> = {
	unpack: (buffer: Uint8Array | number[], index: number) => T
	pack: (buffer: Uint8Array | number[], num: T, index?: number) => number
	getOffset: () => number
}

export type BufferType = Uint8Array | Array<number>
