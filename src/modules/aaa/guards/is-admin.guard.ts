import type { CanActivate, ExecutionContext } from "@nestjs/common"
import type { TokenGuardData } from "./token.guard"
import { Injectable } from "@nestjs/common"
import { UserRole } from "@prisma/client"
import { ErrorService } from "src/modules/error/error.service"
import { AAAErrors } from "../constants/aaa.error"

@Injectable()
export class IsAdmin implements CanActivate {
	constructor(private error: ErrorService) { }

	canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest()
		const tokenData: TokenGuardData = request.headers._tokenGuard
		let result = false

		if (tokenData.user?.role === UserRole.Admin) {
			result = true
		}

		else {
			if (tokenData.tokenError) {
				console.error("VerifyToken Error:", tokenData.tokenError)
			}

			throw this.error.throwErrorToClient(AAAErrors.AccessDenied)
		}

		return result
	}
}
