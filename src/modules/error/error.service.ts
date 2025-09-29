import type { CreateErrorInput, ErrorInfo, FindErrorInput, TranslationMapRecordType } from "./types/error.types"
import { HttpStatus, Injectable } from "@nestjs/common"
import { GlobalError } from "./classes/global-error"

@Injectable()
export class ErrorService {
	/**
	 * All project errors are saved in this object
	 */
	private translationMap: TranslationMapRecordType = {}

	/**
	 * Generate new Translation for Error
	 * @param errInfo Target error for generate
	 * @returns The result of the operation
	 */
	createNewErrorTranslation(errInfo: ErrorInfo) {
		errInfo.statusCode = errInfo.statusCode || HttpStatus.BAD_REQUEST
		this.translationMap[errInfo.module] = this.translationMap[errInfo.module] || {}
		this.translationMap[errInfo.module][errInfo.code] = errInfo
	}

	createNewErrorTranslations(errInfoList: ErrorInfo[]) {
		for (const errorInfo of errInfoList) this.createNewErrorTranslation(errorInfo)
	}

	/**
	 * Find error in translationMap
	 * @param error Target Error
	 * @returns Error found or null
	 */
	private findErrorTranslation(error: FindErrorInput): ErrorInfo {
		const { code, module } = error
		return this.translationMap[module] ? this.translationMap[module][code] : null
	}

	/**
	 * Throw error to Client
	 * @param errorData Target error data
	 * @returns Throw Error to Client
	 * @example
	 * ```ts
	 * Location: In auth.service.ts
	 * export class AuthService {
	 *
	 *      constructor(
	 *          private error: ErrorService,
	 *      ) {}
	 *
	 *      private async verifyUserExistanceByUserId(userId: string): Promise<Users> {
	 *          const user = await this.prisma.users.findUnique({
	 *              where: {
	 *                  id: userId,
	 *              },
	 *          });
	 *
	 *          if (!user) throw this.error.throwErrorToClient({ errorData: AuthErrors.UserNotFound });
	 *
	 *          return user;
	 *      }
	 *
	 * }
	 * ```
	 */
	throwErrorToClient(errorData: CreateErrorInput): GlobalError {
		const { code, error, module } = errorData
		const candidateError = this.findErrorTranslation({ module, code })

		return new GlobalError(candidateError, error)
	}
}
