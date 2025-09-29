import type { ChangePasswordForUserInput } from "./dto/change-password-for-user.input"
import type { ChangePasswordInput } from "./dto/change-password.input"
import type { ChangeUsernameInput } from "./dto/change-username.input"
import type { LoginInput } from "./dto/login.input"
import type { LoginOutput } from "./dto/login.output"
import type { MeOutput } from "./dto/me.output"
import type { PayloadType } from "./types/payload.type"
import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { fullUserFieldSelect } from "src/common/structs"
import { hashSha1 } from "src/common/utils"
import { ErrorService } from "../error/error.service"
import { PrismaService } from "../prisma/prisma.service"
import { AAAErrors } from "./constants/aaa.error"
import { UserModel, UserModelWithToken } from "./model/user.model"

@Injectable()
export class AaaService {
	constructor(
		private prisma: PrismaService,
		private error: ErrorService,
		private jwt: JwtService,
	) {
	}

	async me(requesterId: string) {
		const user = await this.prisma.user.findFirst({ where: { id: requesterId } })

		if (!user) {
			throw this.error.throwErrorToClient(AAAErrors.TokenNotValid)
		}

		const output: MeOutput = {
			active: user.active,
			diagnosis: user.canDiagnosis,
			id: user.id,
			name: user.name,
			role: user.role,
			username: user.username,
			isEngineer: user.isEngineer,
		}

		return output
	}

	async login({ data }: LoginInput): Promise<LoginOutput> {
		const username = data.username.toLowerCase()
		const password = data.password

		const user = await this.verifyIfUserIsValid(username, password)
		let expirationDays = 1
		const globalConfig = await this.prisma.globalConfig.findFirst()
		if (globalConfig) {
			expirationDays = globalConfig.logoutExpirationTime
		}

		const payload: PayloadType = {
			username,
			name: user.name,
			id: user.id,
			role: user.role,
			active: user.active,
			diagnosis: user.canDiagnosis,
			isEngineer: user.isEngineer,
		}

		const token = this.signPayload(payload, expirationDays)

		return { ...payload, token }
	}

	async changePassword({ data }: ChangePasswordInput, requesterId: string): Promise<UserModel> {
		const { newPassword, oldPassword } = data

		const foundedUser = await this.checkIfPasswordIsValid(oldPassword, requesterId)
		const newHashedPassword = hashSha1(newPassword)

		await this.prisma.user.update({
			data: { password: newHashedPassword, isPasswordChanged: false },
			where: { id: requesterId },
		})

		return foundedUser
	}

	async changeUsername({ data }: ChangeUsernameInput, requesterId: string): Promise<UserModelWithToken> {
		const { newUsername, oldUsername } = data

		const foundedUser = await this.checkIfUsernameIsValid(oldUsername, requesterId)

		const updatedUser = await this.prisma.user.update({
			data: { username: newUsername },
			where: { id: requesterId },
			select: fullUserFieldSelect,
		})

		const payload: PayloadType = {
			username: newUsername,
			name: foundedUser.name,
			id: foundedUser.id,
			role: foundedUser.role,
			active: foundedUser.active,
			diagnosis: foundedUser.canDiagnosis,
			isEngineer: foundedUser.isEngineer,
		}

		let expirationDays = 1
		const globalConfig = await this.prisma.globalConfig.findFirst()
		if (globalConfig) {
			expirationDays = globalConfig.logoutExpirationTime
		}

		const token = this.signPayload(payload, expirationDays)

		return { ...updatedUser, token }
	}

	async changePasswordForUser({ data }: ChangePasswordForUserInput): Promise<UserModel> {
		const { newPasswordForUser, userId } = data
		const userToEditPassword = await this.findUserById(userId)
		if (!userToEditPassword) {
			throw this.error.throwErrorToClient(AAAErrors.UserDoesNotExist)
		}

		return await this.prisma.user.update({
			where: {
				id: userId,
			},
			data: {
				password: hashSha1(newPasswordForUser),
				isPasswordChanged: true,
			},
			select: fullUserFieldSelect,
		})
	}

	private async verifyIfUserIsValid(username: string, plainPassword: string) {
		const hashedPassword = hashSha1(plainPassword)
		const user = await this.prisma.user.findFirst({ where: { username, password: hashedPassword } })

		if (!user) {
			throw this.error.throwErrorToClient(AAAErrors.IncorrectUsernameOrPassword)
		}
		if (user && !user.active) {
			throw this.error.throwErrorToClient(AAAErrors.AccessDenied)
		}

		return user
	}

	async findUserById(id: string) {
		return await this.prisma.user.findFirst({
			where: {
				id,
			},
			select: fullUserFieldSelect,
		})
	}

	private async checkIfPasswordIsValid(oldPassword: string, requesterId: string) {
		const oldHashedPassword = hashSha1(oldPassword)
		const foundedUser = await this.prisma.user.findFirst({
			where: {
				id: requesterId,
				password: oldHashedPassword,
			},
			select: fullUserFieldSelect,
		})

		if (!foundedUser) {
			throw this.error.throwErrorToClient(AAAErrors.OldPasswordIsWrong)
		}

		return foundedUser
	}

	private async checkIfUsernameIsValid(oldUsername: string, requesterId: string) {
		const foundedUser = await this.prisma.user.findFirst({
			where: {
				username: oldUsername,
			},
			select: fullUserFieldSelect,
		})

		if (!foundedUser || foundedUser.id !== requesterId) {
			throw this.error.throwErrorToClient(AAAErrors.OldUsernameIsWrong)
		}

		return foundedUser
	}

	private signPayload(input: PayloadType, expirationDays: number) {
		return this.jwt.sign(input, {
			expiresIn: `${expirationDays} days`,
		})
	}
}
