import { HttpStatus } from "@nestjs/common"
import { ModuleNames } from "src/constants"

/**
 *Definition of aaa module errors
 */
export const AAAErrors = {
	IncorrectUsernameOrPassword: {
		code: 1,
		module: ModuleNames.AAAModule,
		enMessage: "The username or password is incorrect",
		faMessage: "نام کاربری یا پسورد اشتباه است",
		statusCode: HttpStatus.BAD_REQUEST,
	},
	OldPasswordIsWrong: {
		code: 2,
		module: ModuleNames.AAAModule,
		enMessage: "Old Password is wrong.",
		faMessage: "رمز عبور قدیمی صحیح نیست.",
	},
	OldUsernameIsWrong: {
		code: 3,
		module: ModuleNames.AAAModule,
		enMessage: "Old Username is wrong.",
		faMessage: "نام کاربری قدیمی صحیح نیست.",
	},
	TokenNotValid: {
		code: 4,
		module: ModuleNames.AAAModule,
		enMessage: "Token is not valid.",
		faMessage: "توکن ارائه شده معتبر نمی باشد.",
	},
	AccessDenied: {
		code: 5,
		module: ModuleNames.AAAModule,
		enMessage: "Access denied",
		faMessage: "اجازه دسترسی وجود ندارد",
		statusCode: HttpStatus.BAD_REQUEST,
	},
	UserDoesNotExist: {
		code: 6,
		module: ModuleNames.AAAModule,
		enMessage: "َUser not found",
		faMessage: "کاربر مورد نظر یافت نشد",
		statusCode: HttpStatus.BAD_REQUEST,
	},
}
