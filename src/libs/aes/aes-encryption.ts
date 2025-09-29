import { Buffer } from "node:buffer"
import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto"
import { Result } from "../modbus/interface/node-client"

// Encryption -> [ encryptedMessageLen, iv(12), tag(16), encryptedMessage ]
export class AesEncription {
	private readonly encryptionAlgorithm = "aes-256-gcm"
	private readonly ivLength = 12 // 96 bits
	private readonly tagLen = 16
	private readonly messageLenByteCount = 2
	private secretKey: Buffer = null

	constructor(secretkeyInHex: string) {
		this.secretKey = Buffer.from(secretkeyInHex, "hex")
		const keyLen = this.secretKey.length
		if (keyLen !== 32)
			throw new Error(`Encryption Key Must be 32 bytes, but was ${keyLen} bytes`)
	}

	encrypt(plainBuffer: Buffer) {
		const result: Result<Buffer> = { isOk: false, data: null, error: null }
		const messageLen = plainBuffer.byteLength

		try {
			const iv = randomBytes(this.ivLength)
			const cipher = createCipheriv(this.encryptionAlgorithm, this.secretKey, iv, { authTagLength: this.tagLen })

			const firstPart = cipher.update(plainBuffer)
			const finalPart = cipher.final()
			const tag = cipher.getAuthTag()

			const messageLenBuffer = Buffer.alloc(this.messageLenByteCount)
			messageLenBuffer.writeUInt16BE(messageLen)

			const encryptedData = Buffer.concat([messageLenBuffer, iv, tag, firstPart, finalPart])

			result.data = encryptedData
			result.isOk = true
		}

		catch (e) {
			result.error = e as Error
		}

		return result
	}

	decrypt(buffer: Buffer) {
		const result: Result<Buffer> = { isOk: false, data: null, error: null }
		try {
			const messageLen = buffer.readUInt16BE()
			const messageStartIndex = this.messageLenByteCount + this.ivLength + this.tagLen
			const messageEndIndex = messageStartIndex + messageLen
			const iv = buffer.subarray(this.messageLenByteCount, this.messageLenByteCount + this.ivLength)
			const tag = buffer.subarray(this.messageLenByteCount + this.ivLength, messageStartIndex)

			const encryptedData = buffer.subarray(messageStartIndex, messageEndIndex)
			const decipher = createDecipheriv(this.encryptionAlgorithm, this.secretKey, iv, { authTagLength: this.tagLen })
			decipher.setAuthTag(tag)

			const decryptedData = Buffer.concat([decipher.update(encryptedData), decipher.final()])
			result.data = decryptedData
			result.isOk = true
		}
		catch (e) {
			result.error = e as Error
			result.data = Buffer.alloc(0)
		}

		return result
	}

	getFullLength(firstTwoByteInUInt: number) {
		return this.messageLenByteCount + this.ivLength + this.tagLen + firstTwoByteInUInt
	}
}
