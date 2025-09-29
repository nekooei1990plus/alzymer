import type { CanActivate, ExecutionContext } from "@nestjs/common"
import type { TokenGuardData } from "./token.guard"
import { Injectable } from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { ErrorService } from "src/modules/error/error.service"
import { AAAErrors } from "../constants/aaa.error"

@Injectable()
export class HasRole implements CanActivate {
	constructor(private reflector: Reflector, private error: ErrorService) { }

	canActivate(context: ExecutionContext) {
		const roles = this.reflector.get<string[]>("roles", context.getHandler())
		const request = context.switchToHttp().getRequest()
		const tokenData: TokenGuardData = request.headers._tokenGuard
		let result = false

		for (const role of roles) {
			if (tokenData.user?.role === role) {
				result = true
				break
			}
		}

		if (!result) {
			throw this.error.throwErrorToClient(AAAErrors.AccessDenied)
		}

		return result
	}
}
