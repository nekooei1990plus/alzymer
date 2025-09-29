import { Body, Controller, Post, UseGuards } from "@nestjs/common"
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger"
import { UserRole } from "@prisma/client"
import { AaaService } from "./aaa.service"
import { GetUserId } from "./decorators/get-user.decorator"
import { HasRoles } from "./decorators/has-roles.decorator"
import { ChangePasswordForUserInput } from "./dto/change-password-for-user.input"
import { ChangePasswordInput } from "./dto/change-password.input"
import { ChangeUsernameInput } from "./dto/change-username.input"
import { LoginInput } from "./dto/login.input"
import { LoginOutput } from "./dto/login.output"
import { MeOutput } from "./dto/me.output"
import { IsLoggedIn } from "./guards/is-logged-in.guard"
import { UserModel } from "./model/user.model"

@Controller("aaa")
export class AaaController {
	constructor(private aaa: AaaService) { }

	/**
	 * User can login to system using this api.
	 *
	 * @param input Login input data containing username and password
	 * @returns user token if username and password are correct and user is active
	 * @throws {AAAErrors.IncorrectUsernameOrPassword} if the username or password is incorrect.
	 * @throws {AAAErrors.AccessDenied} if the user is inactive.
	 */
	@Post("login")
	@ApiOperation({ operationId: "login" })
	@ApiBody({ type: LoginInput })
	@ApiResponse({ type: LoginOutput, status: 200 })
	async login(@Body() input: LoginInput): Promise<LoginOutput> {
		return this.aaa.login(input)
	}

	/**
	 * User can change password using this api.
	 *
	 * @param input Change password input
	 * @param userId user id
	 * @returns User Model
	 * @throws {AAAErrors.OldPasswordIsWrong} if the user is inactive.
	 */
	@Post("changePassword")
	@ApiOperation({ operationId: "changePassword" })
	@ApiBody({ type: ChangePasswordInput })
	@ApiResponse({ type: UserModel, status: 200 })
	@UseGuards(IsLoggedIn)
	async changePassword(@Body() input: ChangePasswordInput, @GetUserId() userId: string) {
		return this.aaa.changePassword(input, userId)
	}

	/**
	 * User can change username using this api.
	 *
	 * @param input Change username input
	 * @param userId user id
	 * @returns User Model
	 * @throws {AAAErrors.OldUsernameIsWrong} if the user is inactive.
	 */
	@Post("changeUsername")
	@ApiOperation({ operationId: "changeUsername" })
	@ApiBody({ type: ChangeUsernameInput })
	@ApiResponse({ type: UserModel, status: 200 })
	@UseGuards(IsLoggedIn)
	async changeUsername(@Body() input: ChangeUsernameInput, @GetUserId() userId: string) {
		return this.aaa.changeUsername(input, userId)
	}

	/**
	 * Root user can change other's password.
	 *
	 * @param input Change other's password input
	 * @returns User Model
	 * @throws {AAAErrors.AccessDenied} if the user is not Root.
	 */
	@Post("changePasswordForUser")
	@ApiOperation({ operationId: "changePasswordForUser" })
	@ApiBody({ type: ChangePasswordForUserInput })
	@ApiResponse({ type: UserModel, status: 200 })
	@UseGuards(IsLoggedIn)
	@HasRoles(UserRole.Root, UserRole.Admin)
	async changePasswordForUser(@Body() input: ChangePasswordForUserInput) {
		return this.aaa.changePasswordForUser(input)
	}

	/**
	 * User can retrive their infomation using this api.
	 *
	 * @returns logged user information
	 * @throws {AAAErrors.TokenNotValid} if token is not valid.
	 */
	@UseGuards(IsLoggedIn)
	@Post("me")
	@ApiOperation({ operationId: "me" })
	@ApiResponse({ type: MeOutput, status: 200 })
	async me(@GetUserId() userId: string): Promise<MeOutput> {
		return this.aaa.me(userId)
	}
}
