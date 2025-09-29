import { exec } from "node:child_process"
import { promises as fs } from "node:fs"
import os from "node:os"
import * as path from "node:path"
import { promisify } from "node:util"
import { Command } from "commander"
import { findBunBinary } from "./script-utils"

const execAsync = promisify(exec)

const program = new Command()

program
	.name("generate-service")
	.description("Generate a system service for a Bun project (Linux systemd or Windows NSSM)")
	.option("--apply", "Actually apply the service (install it)")
	.parse(process.argv)

const options = program.opts()

async function getPackageName(): Promise<string> {
	const pkgPath = path.join(process.cwd(), "package.json")
	const pkgRaw = await fs.readFile(pkgPath, "utf-8")
	const pkg = JSON.parse(pkgRaw)
	return (pkg.name || "bun-app").replace(/\s+/g, "-").toLowerCase()
}

async function getCurrentUser(): Promise<string> {
	const { stdout } = await execAsync(process.platform === "win32" ? "echo %USERNAME%" : "whoami")
	return stdout.trim()
}

async function generateLinuxService(serviceName: string, bunBinary: string, user: string) {
	const cwd = process.cwd()
	const serviceContent = `
[Unit]
Description=Bun Service - ${serviceName}
After=network.target

[Service]
ExecStart=${bunBinary} start
Restart=always
User=${user}
WorkingDirectory=${cwd}

[Install]
WantedBy=multi-user.target
`.trimStart()

	const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "bun-service-"))
	const tmpPath = path.join(tmpDir, `${serviceName}.service`)
	const targetPath = `/etc/systemd/system/${serviceName}.service`

	if (options.apply) {
		await fs.writeFile(tmpPath, serviceContent)
		await execAsync(`sudo mv ${tmpPath} ${targetPath}`)
		await execAsync(`sudo systemctl daemon-reload`)
		await execAsync(`sudo systemctl enable ${serviceName}`)
		await execAsync(`sudo systemctl start ${serviceName}`)
		console.log(`✅ Linux systemd service '${serviceName}' installed and started.`)
	}
	else {
		await fs.writeFile(tmpPath, serviceContent)
		console.log(`📝 Preview written to: ${tmpPath}`)
		console.log(`➡️ To apply it manually:
  sudo mv ${tmpPath} ${targetPath}
  sudo systemctl daemon-reload
  sudo systemctl enable ${serviceName}
  sudo systemctl start ${serviceName}`)
	}
}

async function generateWindowsService(serviceName: string, bunBinary: string) {
	const cwd = process.cwd()
	const scriptContent = `
# Install Bun Windows Service via NSSM
nssm install "${serviceName}" "${bunBinary}" start
nssm set "${serviceName}" AppStdout "${cwd}\\stdout.log"
nssm set "${serviceName}" AppStderr "${cwd}\\stderr.log"
nssm set "${serviceName}" AppDirectory "${cwd}"
nssm set "${serviceName}" Start SERVICE_AUTO_START
nssm restart "${serviceName}"
`.trimStart()

	const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "bun-service-"))
	const scriptPath = path.join(tmpDir, `${serviceName}-install.ps1`)
	await fs.writeFile(scriptPath, scriptContent)

	if (options.apply) {
		try {
			console.log(`⚙️ Registering service "${serviceName}" via NSSM...`)
			await execAsync(`powershell -ExecutionPolicy Bypass -File "${scriptPath}"`)
			console.log(`✅ Windows service '${serviceName}' installed via NSSM.`)
		}
		catch (err) {
			console.error("❌ Failed to apply Windows service:", err)
			process.exit(1)
		}
	}
	else {
		console.log(`📝 Install script created at: ${scriptPath}`)
		console.log(`➡️ To install the service manually:
  powershell -ExecutionPolicy Bypass -File "${scriptPath}"`)
	}
}

async function main() {
	const platform = process.platform

	let serviceName: string
	try {
		serviceName = await getPackageName()
	}
	catch {
		console.error("❌ Could not read package.json in current directory.")
		process.exit(1)
	}

	const bunBinary = await findBunBinary()
	if (!bunBinary) {
		console.error("❌ Could not find Bun binary.")
		process.exit(1)
	}

	const user = await getCurrentUser()

	if (platform === "linux") {
		await generateLinuxService(serviceName, bunBinary, user)
	}
	else if (platform === "win32") {
		await generateWindowsService(serviceName, bunBinary)
	}
	else {
		console.error(`❌ Unsupported platform: ${platform}`)
		process.exit(1)
	}
}

main()
