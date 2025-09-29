import type { OnModuleInit } from "@nestjs/common"
import { Module } from "@nestjs/common"
import { APP_GUARD } from "@nestjs/core"
import { JwtModule } from "@nestjs/jwt"
import { Config } from "src/config"
import { ErrorModule } from "../error/error.module"
import { ErrorService } from "../error/error.service"
import { PrismaModule } from "../prisma/prisma.module"
import { AaaController } from "./aaa.controller"
import { AaaService } from "./aaa.service"
import { AAAErrors } from "./constants/aaa.error"
import { IsAdmin } from "./guards/is-admin.guard"
import { IsLoggedIn } from "./guards/is-logged-in.guard"
import { TokenGuard } from "./guards/token.guard"

@Module({
	controllers: [AaaController],
	imports: [
		JwtModule.registerAsync({
			inject: [Config],
			useFactory(config: Config) {
				return {
					secret: config.jwtSecret,
				}
			},
		}),
		PrismaModule,
		ErrorModule,
	],
	providers: [
		AaaService,
		IsAdmin,
		IsLoggedIn,
		{
			provide: APP_GUARD,
			useClass: TokenGuard,
		},
	],
	exports: [
		JwtModule,
		AaaService,
		IsAdmin,
		IsLoggedIn,
	],
})
export class AaaModule implements OnModuleInit {
	constructor(private errors: ErrorService) { }

	onModuleInit() {
		this.registerErrors()
	}

	private registerErrors() {
		this.errors.createNewErrorTranslations(Object.values(AAAErrors))
	}
}
