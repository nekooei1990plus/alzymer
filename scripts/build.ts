import { spawn } from "node:child_process"
import { promises as fs } from "node:fs"
import { join, resolve } from "node:path"
import { name } from "../package.json"

const entry = resolve("src/main.ts")
const outDir = resolve("release")
const outfile = resolve(outDir, name)
const envFile = resolve(".env")
const packagesToInstall = ["class-transformer", "class-validator", "fastify"]

const bunArgs = [
	"build",
	"--compile",
	"--target=bun-windows-x64",
	entry,
	"--outfile",
	outfile,
	"--external",
	"@nestjs/microservices",
	"--external",
	"@nestjs/websockets/socket-module",
	"--external",
	"@fastify/view",
	"--external",
	"@nestjs/platform-express",
	"--external",
	"class-transformer",
	"--external",
	"class-validator",
]

async function runCommand(command: string, args: string[], cwd?: string): Promise<void> {
	return new Promise((resolve, reject) => {
		const proc = spawn(command, args, {
			stdio: "inherit",
			shell: true,
			cwd,
		})

		proc.on("exit", (code) => {
			if (code === 0)
				resolve()
			else reject(new Error(`Command "${command} ${args.join(" ")}" failed with code ${code}`))
		})

		proc.on("error", (err) => {
			reject(new Error(`Failed to run command: ${err.message}`))
		})
	})
}

async function setupReleaseProject() {
	try {
		await fs.mkdir(outDir, { recursive: true })

		// ✅ Manually write minimal package.json to make release/ a Bun project
		const pkgPath = join(outDir, "package.json")
		try {
			await fs.access(pkgPath)
			console.log("📦 package.json already exists in release/")
		}
		catch {
			console.log("📝 Writing minimal package.json in release/...")
			await fs.writeFile(pkgPath, JSON.stringify({ name, version: "0.0.0", private: true }, null, 2))
		}

		console.log("📦 Installing dependencies in release/...")
		await runCommand("bun", ["add", ...packagesToInstall], outDir)
		console.log("✅ Dependencies installed in release/")
	}
	catch (err) {
		console.error("❌ Failed to setup release folder:", err)
		process.exit(1)
	}
}

async function runBunBuild(): Promise<void> {
	await runCommand("bun", bunArgs)
}

async function copyEnvFile() {
	try {
		await fs.copyFile(envFile, resolve(outDir, ".env"))
		console.log("✅ .env file copied to release/")
	}
	catch (err) {
		if ((err as NodeJS.ErrnoException).code === "ENOENT") {
			console.warn("⚠️ .env file not found, skipping copy.")
		}
		else {
			console.error("❌ Failed to copy .env file:", err)
		}
	}
}

async function build() {
	try {
		await setupReleaseProject()
		await runBunBuild()
		await copyEnvFile()
		console.log("🎉 Build completed successfully.")
	}
	catch (err) {
		console.error("❌ Build failed:", (err as Error).message)
		process.exit(1)
	}
}

build()
