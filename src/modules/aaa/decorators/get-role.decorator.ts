import type { ExecutionContext } from "@nestjs/common"
import type { TokenGuardData } from "../guards/token.guard"
import { createParamDecorator } from "@nestjs/common"

// Dependent on "Token" Guard.
export const GetUserRole = createParamDecorator(
	(data: unknown, context: ExecutionContext) => {
		const request = context.switchToHttp().getRequest()
		const tokenData: TokenGuardData = request.headers._tokenGuard
		return tokenData.user?.role
	},
)
