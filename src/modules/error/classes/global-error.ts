import type { ErrorInfo } from "../types/error.types"

/**
 * Create new error exception for Override Project Errors
 */
export class GlobalError extends Error {
	constructor(public errorContext: ErrorInfo, public error?: Error) {
		super(errorContext.enMessage)
	}
}
