import type { INestApplication } from "@nestjs/common"
import type { NestFastifyApplication } from "@nestjs/platform-fastify"
import { createHash } from "node:crypto"
import { access } from "node:fs/promises"
import { URL } from "node:url"
import { ValidationPipe } from "@nestjs/common"
import { PrismaClient } from "@prisma/client"
import { Decimal } from "@prisma/client/runtime/library"
import { Transform } from "class-transformer"
import cleanDeep from "clean-deep"
import { err, ok, Result } from "neverthrow"

import { promise } from "ping"
import { Config } from "src/config"
import { getPort } from "src/libs/get-port/get-port"
import { CoreExceptionFilter } from "src/modules/error/filters/exception.filter"
import { PaginationData, PaginationTakeAllData } from "./dto/pagination.input"

export function hashSha1(input: string): string {
	const sha1 = createHash("sha1")
	sha1.update(input)
	return sha1.digest("hex")
}

export function setupCors(app: INestApplication) {
	app.enableCors()
}

export function setupGlobalValidation(app: NestFastifyApplication, config: Config) {
	app.useGlobalFilters(new CoreExceptionFilter(config))
	app.useGlobalPipes(new ValidationPipe({
		transform: true,
		whitelist: true,
	}))
}

export function setupShutdownHooks(app: NestFastifyApplication) {
	app.enableShutdownHooks()
}

export async function fileExists(filePath: string) {
	try {
		await access(filePath)
		return true
	}
	catch {
		return false
	}
}

export async function getAvalableServerPort(prisma: PrismaClient) {
	const [{ modbusServerPort }, config] = await Promise.all([
		prisma.globalConfig.findFirst(),
		prisma.node.findFirst({
			orderBy: { serverPort: "desc" },
		}),
	])

	const serverPort = config?.serverPort ? config.serverPort + 1 : await getPort()

	if (serverPort > 65535) {
		return modbusServerPort
	}
	else {
		return serverPort
	}
}

type SortbyType<T extends string> = {
	field: T
	descending: boolean
}

export function createSortBy<T extends string>(input: SortbyType<T>) {
	const result: Record<string, "asc" | "desc"> = {}
	result[input.field] = input.descending ? "desc" : "asc"
	return cleanDeep(result)
}

export function createSoryByField<T extends string>(value: SortbyType<T>, target: T) {
	if (value.field == target)
		return value.descending ? "desc" : "asc"
}

export function transformPagination(input: PaginationTakeAllData | PaginationData) {
	const pagination = {
		take: undefined as number,
		skip: undefined as number,
	}

	if ("takeAll" in input && !input.takeAll) {
		pagination.skip = input.skip
		pagination.take = input.take
	}

	return pagination
}

export async function pingIp(ipAddress: string) {
	try {
		const session = await promise.probe(ipAddress, { timeout: 1 })
		return session.alive
	}
	catch {
		return false
	}
}

export class ParsedDatabaseUrl {
	private parsedURL: URL = null

	constructor(conenctionString: string) {
		this.parsedURL = new URL(conenctionString)
	}

	toString() {
		return this.parsedURL.toString()
	}

	setSchema(newSchema: string) {
		this.parsedURL.searchParams.set("schema", newSchema)
		return this
	}

	toObject() {
		return {
			username: this.parsedURL.username,
			password: this.parsedURL.password,
			hostname: this.parsedURL.hostname,
			// Removing '/' from start
			database: this.parsedURL.pathname.slice(1),
			port: this.parsedURL.port,
			schema: this.parsedURL.searchParams.get("schema") || "public",
		}
	}
}

export function isInRange(number: Decimal, bytes: number, signed: boolean): boolean {
	let result: boolean = false
	const bits = new Decimal(bytes).times(8) // Convert bytes to bits

	if (!signed) {
		const maxValue = new Decimal(2).pow(bits).minus(1) // Max value for unsigned
		const minValue = new Decimal(0) // Min value for unsigned
		result = number.gte(minValue) && number.lte(maxValue)
	}
	else {
		const base = new Decimal(2).pow(bits.minus(1)) // Base for signed
		const maxValue = base.minus(1) // Max value for signed
		const minValue = base.negated() // Min value for signed
		result = number.gte(minValue) && number.lte(maxValue)
	}

	return result
}

export function Trim() {
	return Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
}

export function tryCatchIntoResult<E extends Error, Fn extends (...args: readonly any[]) => any>(fn: Fn): Result<ReturnType<Fn>, E> {
	try {
		return ok(fn())
	}
	catch (e) {
		return err(e as E)
	}
}

export async function tryCatchIntoAsyncResult<E extends Error, Fn extends (...args: readonly any[]) => Promise<any>>(fn: Fn) {
	try {
		const value: Awaited<ReturnType<Fn>> = await fn()
		return ok(value)
	}
	catch (e) {
		return err(e as E)
	}
}
