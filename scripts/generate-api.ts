import { generateApi } from "swagger-typescript-api"

async function generateSwagger() {
	const url = `${process.env.NUXT_PUBLIC_SERVER_ADDRESS}/api-docs`
	const outputPath = `${process.cwd()}/src/utils/swagger`

	await generateApi({
		name: "api.ts",
		output: outputPath,
		url,
		extractEnums: true,
		cleanOutput: true,
		patch: true,
	})
}

generateSwagger()
