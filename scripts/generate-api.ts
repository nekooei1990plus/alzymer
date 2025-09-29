import process from "node:process"
import { generateApi } from "swagger-typescript-api"

async function generateSwagger() {
	const url = `http://localhost:${process.env.serverPort}${process.env.swaggerApiDocPath}`
	const outputPath = `${process.cwd()}/src/common`

	await generateApi({
		name: "api.ts",
		output: outputPath,
		url,
		extractEnums: true,
	})
}

generateSwagger()
