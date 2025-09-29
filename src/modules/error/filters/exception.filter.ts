import type { ArgumentsHost, ExceptionFilter } from "@nestjs/common"
import type { FastifyReply, FastifyRequest } from "fastify"
import type { Config } from "src/config"
import type { ErrorType } from "../types/error.types"
import { Catch, HttpException, HttpStatus } from "@nestjs/common"
import { NodeEnvType } from "src/config"
import { GlobalError } from "../classes/global-error"

@Catch()
export class CoreExceptionFilter implements ExceptionFilter {
	constructor(private config: Config) { }

	catch(exception: unknown, host: ArgumentsHost) {
		const productMode = this.config.NODE_ENV == NodeEnvType.Production
		const testMode = this.config.NODE_ENV == NodeEnvType.Test

		const ctx = host.switchToHttp()
		const response = ctx.getResponse<FastifyReply>()
		const request = ctx.getRequest<FastifyRequest>()

		const errorData: ErrorType = {
			path: request.url,
			message: null,
			timestamp: new Date().toISOString(),
		}

		/**
		 * Parsing error
		 */
		if (exception instanceof GlobalError) {
			errorData.message = exception.errorContext.enMessage
			errorData.translation = exception.errorContext.faMessage
			errorData.statusCode = exception.errorContext.statusCode
			errorData.debugError = exception.error
			errorData.code = exception.errorContext.code
			errorData.module = exception.errorContext.module
		}
		else if (exception instanceof HttpException) {
			errorData.message = exception.message
			errorData.statusCode = exception.getStatus()
			errorData.debugError = exception
		}
		else if (exception instanceof Error) {
			errorData.message = exception.message
			errorData.statusCode = HttpStatus.INTERNAL_SERVER_ERROR
			errorData.debugError = exception
		}
		else if (typeof exception == "string") {
			errorData.message = exception
			errorData.statusCode = HttpStatus.INTERNAL_SERVER_ERROR
			errorData.debugError = new Error(exception)
		}
		else {
			errorData.message = exception as string
			errorData.statusCode = HttpStatus.INTERNAL_SERVER_ERROR
			errorData.debugError = new Error(errorData.message)
		}

		if (productMode) {
			delete errorData.debugError
			delete errorData.code
			delete errorData.module
		}

		if (!testMode) {
			console.error(errorData)
		}

		const responseData = JSON.stringify(errorData)
		response.status(errorData.statusCode)
		response.send(responseData)
	}
}
