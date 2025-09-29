import { exec as execNonPromise } from "node:child_process"
import { cp, rm, writeFile } from "node:fs/promises"
import { resolve } from "node:path"
import { promisify } from "node:util"
import { need } from "@yao-pkg/pkg-fetch"
import consola from "consola"
import glob from "fast-glob"

const exec = promisify(execNonPromise)

const slaveTsFilePath = resolve("./packages/slave/slave.ts")

async function main() {
	consola.info("Downloading Node ...")

	const { linux, windows } = await downloadNode()

	consola.info("Bundling project into one file ...")

	await rm("./bin", { force: true, recursive: true })

	await exec(`ncc build ${slaveTsFilePath} -o bin -Ctm`)

	consola.info("Bundling into one file ...")

	const prismaClients = await glob("./node_modules/prisma/*.node", { absolute: true, stats: true })

	const promiseList = prismaClients.map((item) => {
		return cp(item.path, `./bin/${item.name}`)
	})

	await Promise.all(promiseList)

	await rm("./bin/client", { force: true, recursive: true })

	consola.info("Creating custom node executables ...")

	await exec("node --experimental-sea-config scripts/sea.json")

	await Promise.all([
		injectNode(linux, "linux"),
		injectNode(windows, "windows"),
	])

	await Promise.all([
		rm("./bin/index.js"),
		rm("./bin/slave.blob"),
		writeFile("./bin/.env", `
tftpPort = 69
DATABASE_CONNECTION_URL = "postgresql://postgres:123456@localhost:5432/eng"
aesSecretInHex = "5ca2b0cc581e4f50d91e722b3c365130a1de0de2064f7a7e561824cd29372a1f"
mockDataPath = "./mock-data.json"
		`),
		writeFile("./bin/mock-data.json", getSampleMockData()),
	])

	consola.success("Native executables were built.")
}

async function injectNode(nodePath: string, platform: "linux" | "windows") {
	const isWin = platform == "windows"
	const exeFilePath = `./bin/slave${isWin ? ".exe" : ""}`

	await cp(nodePath, exeFilePath)
	await exec(`npx postject ${exeFilePath} NODE_SEA_BLOB ./bin/slave.blob --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2`)
}

async function downloadNode() {
	const windows = await need({
		arch: "x64",
		nodeRange: "node20",
		platform: "windows",
	})

	const linux = await need({
		arch: "x64",
		nodeRange: "node20",
		platform: "linux",
	})

	return {
		windows,
		linux,
	}
}

function getSampleMockData() {
	return JSON.stringify({
		"2584cc31-a02a-428b-8dc8-437e06cfeb5b": {
			nodeFaultCode: 1,
			ledGroupInfo: {
				"4afd8137-98a3-4db5-8934-d990afd223de": {
					connectionValues: 65535,
					ledValues: 45535,
				},
			},
			modules: {
				"d0745a50-aa16-488f-b47c-1ab339b5147f": {
					moduleFaultCode: 1,
					fCodes: [
						7,
						8,
					],
					monitoringFeatures: [
						{
							ioValue: 1,
							logicValue: 2,
							forceValue: 3,
							forceStatus: 0,
						},
						{
							ioValue: 4,
							logicValue: 5,
							forceValue: 6,
							forceStatus: 1,
						},
					],
				},
			},
		},
	}, null, 2)
}

main()
