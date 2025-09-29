import process from "node:process"
import { Module } from "@nestjs/common"
import { TypedConfigModule } from "nest-typed-config"
import { Config } from "./config"
import { AaaModule } from "./modules/aaa/aaa.module"
import { ApplicationFunctionModule } from "./modules/application-function/application-function.module"
import { ErrorModule } from "./modules/error/error.module"
import { ValidatorsModule } from "./modules/validators/validators.module"

@Module({
	imports: [
		TypedConfigModule.forRoot({
			schema: Config,
			load: () => {
				// Bug Related to `bun` (https://github.com/oven-sh/bun/issues/10167)
				return {
					...process.env,
					NODE_ENV: process.env.NODE_ENV,
				}
			},
		}),
		AaaModule,
		ApplicationFunctionModule,
		ErrorModule,
		ValidatorsModule,
	],
	providers: [],
})
export class AppModule {}
