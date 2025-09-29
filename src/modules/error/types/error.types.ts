import type { HttpStatus } from "@nestjs/common"

/**
 * The Error Information Type
 */
export type ErrorInfo = {
	code: number
	module: string
	faMessage: string
	enMessage: string
	statusCode?: HttpStatus
}

/**
 * This type used for the object that collects all the errors
 */
export type TranslationMapRecordType = Record<string, ErrorUnit>
export type ErrorUnit = {
	[key: number]: ErrorInfo
}

/**
 * Used for Find Error
 */
export type FindErrorInput = Omit<CreateErrorInput, "error">
export type CreateErrorInput = {
	module: string
	code: number
	error?: Error
}

/**
 * Used for creating new error
 */
export type GenerateErrorType = Record<string, ErrorType>
export type ErrorType = {
	message: string
	translation?: string
	code?: number
	module?: string
	statusCode?: number
	timestamp: string
	path: string
	debugError?: Error
}
