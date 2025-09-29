import type { INestApplication } from "@nestjs/common"
import type { NestFastifyApplication } from "@nestjs/platform-fastify"
import type { IncomingMessage, ServerResponse } from "node:http"
import process from "node:process"
import FastifyMultipart from "@fastify/multipart"
import { Logger } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { FastifyAdapter } from "@nestjs/platform-fastify"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { AppModule } from "./app.module"
import { setupCors, setupGlobalValidation, setupShutdownHooks } from "./common/utils"
import { Config } from "./config"
import { SoftwareName } from "./constants"

// Change Terminal Title
process.title = SoftwareName

export async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())
	const config = app.get(Config)
	const logger = new Logger(SoftwareName)

	setupShutdownHooks(app)
	setupGlobalValidation(app, config)
	setupSwagger(app, config)
	setupCors(app)

	app.register(FastifyMultipart as any)
	await app.listen(config.serverPort, "0.0.0.0")

	logger.log(`${SoftwareName} Succesfully started.`)

	return app
}

function setupSwagger(app: INestApplication, config: Config) {
	const documentBuilder = new DocumentBuilder()
		.setTitle("Swagger APIs")
		.setDescription("The Swagger APIs description")
		.setVersion("1.0")
		.build()

	const document = SwaggerModule.createDocument(app, documentBuilder)
	SwaggerModule.setup(config.swaggerApiPath, app, document)
	app.use(config.swaggerApiDocPath, (_req: IncomingMessage, res: ServerResponse) => {
		res.setHeader("Content-Type", "application/json")
		res.end(JSON.stringify(document))
	})
	return document
}

bootstrap()
