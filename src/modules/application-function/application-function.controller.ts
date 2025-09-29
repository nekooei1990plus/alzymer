import { Controller, Post, UseGuards } from "@nestjs/common"
import { ApiOperation, ApiResponse } from "@nestjs/swagger"
import { UserRole } from "@prisma/client"
import { HasRoles } from "../aaa/decorators/has-roles.decorator"
import { IsLoggedIn } from "../aaa/guards/is-logged-in.guard"
import { ApplicationFunctionService } from "./application-function.service"
import { ReadApplicationFunctionOutput } from "./dto/read-application-function.output"

@Controller("applicationFunction")
export class ApplicationFunctionController {
	constructor(private appFunction: ApplicationFunctionService) { }

	/**
	 * Any user can see Application functions
	 * @returns List of application functions
	 * @throws {AAAErrors.AccessDenied} if the user does not have permission to call this api
	 */
	@Post("readApplicationFunction")
	@ApiOperation({ operationId: "readApplicationFunction" })
	@ApiResponse({ type: ReadApplicationFunctionOutput, status: 200 })
	@UseGuards(IsLoggedIn)
	@HasRoles(UserRole.Root, UserRole.Admin, UserRole.Monitor)
	readApplicationFunction() {
		return this.appFunction.readApplicationFunction()
	}
}
