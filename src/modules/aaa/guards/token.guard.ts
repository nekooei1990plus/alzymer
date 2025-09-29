import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { UserRole as Role } from "@prisma/client"
import { Config } from "src/config"
import { PrismaService } from "src/modules/prisma/prisma.service"

export type TokenGuardData = {
	user?: {
		username: string
		id: string
		role: Role
	}
	tokenError?: {
		name: string
		message: string
		date?: Date
		expiredAt?: number
	}
}

@Injectable()
export class TokenGuard implements CanActivate {
	constructor(
		private jwt: JwtService,
		private prisma: PrismaService,
		private config: Config,
	) { }

	async canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest()
		const authorization: string = request.headers.authorization || ""
		const token = authorization
			.replace("Bearer ", "")
			.replace("jwt ", "")

		try {
			const bodyData = this.jwt.verify(token, { secret: this.config.jwtSecret })
			const tokenData: TokenGuardData = {}

			if (bodyData) {
				const userId = bodyData.id
				const foundUser = await this.prisma.user.findFirst({ where: { id: userId } })

				if (foundUser) {
					tokenData.user = {
						role: foundUser.role,
						id: foundUser.id,
						username: foundUser.username,
					}
				}

				request.headers._tokenGuard = tokenData
			}
		}
		catch (tokenError) {
			const tokenData: TokenGuardData = { tokenError: (tokenError as any) }
			request.headers._tokenGuard = tokenData
		}

		return true
	}
}
