import type { NestFastifyApplication } from "@nestjs/platform-fastify"
import process from "node:process"
import { FastifyAdapter } from "@nestjs/platform-fastify"
import { Test, TestingModule } from "@nestjs/testing"
import { PrismaClient, UserRole } from "@prisma/client"
import { transformAndValidate } from "class-transformer-validator"
import { spawn } from "promisify-child-process"
import { AppModule } from "src/app.module"
import { Config } from "src/config"
import { getPort } from "src/libs/get-port/get-port"
import { PrismaService } from "src/modules/prisma/prisma.service"
import { Api } from "./api"
import { defaultTestPassword, resetDatabase } from "./database-utils"
import { ParsedDatabaseUrl, setupCors, setupGlobalValidation, setupShutdownHooks } from "./utils"

export class TestApiCaller {
	constructor(private port: number) {
		this.serverAddress = `http://localhost:${this.port}`
		this.api = new Api({
			// @ts-expect-error TsError
			customFetch: async (input: RequestInfo, init?: RequestInit) => {
				const headers = init.headers as Record<string, string>
				const authorization = this.cachedHeader[this.mode] || undefined
				headers.authorization = authorization

				return fetch(input, init)
			},
			baseUrl: this.serverAddress,
		})
	}

	api: Api<unknown> = null
	private serverAddress: string = null
	private mode: UserRole = null
	private cachedHeader = {
		[UserRole.Admin]: null as UserRole,
		[UserRole.Monitor]: null as UserRole,
		[UserRole.Root]: null as UserRole,
	}

	async loginAs(username: string, password: string) {
		this.mode = null
		const { data: { token, role } } = await this.api.aaa.login({ data: { username, password } })
		this.cachedHeader[role] = token as UserRole
		this.mode = role
	}

	setAnonymousMode() {
		this.mode = null
	}

	async setMode(mode: UserRole) {
		const username = mode.toLowerCase()
		const password = defaultTestPassword
		await this.loginAs(username, password)
	}
}

export class TestInitializer {
	moduleRef: TestingModule = null
	app: NestFastifyApplication = null
	config: Config = null
	prisma: PrismaService = null
	apiCaller: TestApiCaller = null
	private schemaName: string = null
	private static counter = 1

	async init() {
		this.schemaName = this.generateSchemaName()
		const databaseUrl = new ParsedDatabaseUrl(process.env.DATABASE_CONNECTION_URL)
		databaseUrl.setSchema(this.schemaName)
		process.env.DATABASE_CONNECTION_URL = databaseUrl.toString()

		await this.createSchema()
		await this.createModule(databaseUrl.toString())
	}

	async cleanUp() {
		await resetDatabase(this.prisma)
	}

	async destroy() {
		await this.prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${this.schemaName}" CASCADE;`)
		await this.app.close()
	}

	private async createSchema() {
		await spawn("npx", ["prisma", "db", "push", "--skip-generate"], { encoding: "utf-8", env: process.env })
	}

	private async createModule(databaseUrl: string) {
		const prisma = new PrismaService({
			datasourceUrl: databaseUrl,
		})

		const config = await transformAndValidate(Config, process.env)

		this.moduleRef = await Test
			.createTestingModule({ imports: [AppModule] })
			.overrideProvider(PrismaService)
			.useValue(prisma)
			.overrideProvider(Config)
			.useValue(config)
			.compile()

		this.app = this.moduleRef.createNestApplication<NestFastifyApplication>(new FastifyAdapter())
		this.config = config
		this.prisma = prisma

		setupGlobalValidation(this.app, this.config)
		setupCors(this.app)
		setupShutdownHooks(this.app)

		const port = await getPort()
		this.apiCaller = new TestApiCaller(port)

		await this.app.listen(port, "0.0.0.0")
	}

	private generateSchemaName(): string {
		return `schema-${process.pid}-${TestInitializer.counter++}`
	}

	get api() {
		return this.apiCaller.api
	}
}

export async function createNodePre(prisma: PrismaClient, roomName: string, cabinetName: string, channelName: string, groupName: string) {
	const room = await prisma.room.create({
		data: {
			name: roomName,
			description: "desc",
		},
	})

	const _cabinet = await prisma.cabinet.create({
		data: {
			name: cabinetName,
			roomId: room.id,
			description: "desc",
		},
	})

	await prisma.channel.create({
		data: {
			description: "desc",
			name: channelName,
		},
	})

	await prisma.nodeGroup.create({
		data: {
			name: groupName,
			color: "red",
		},
	})
}

export async function createPortPre(prisma: PrismaClient, moduleTypeName: string, name: string, description: string) {
	const moduleType = await prisma.moduleType.create({
		data: {
			isMemoryType: true,
			name: moduleTypeName,
		},
	})

	const defaultModule = await prisma.module.create({
		data: {
			name,
			description,
			moduleTypeId: moduleType.id,
		},
	})

	return defaultModule
}
