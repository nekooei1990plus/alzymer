import { spawn } from "node:child_process"
import process from "node:process"
import { program } from "commander"
import { configDotenv } from "dotenv"

program
	.option("--exec", "Execute Typescript file")

program.allowExcessArguments()

function setEnv() {
	const envPath = ".env.test"
	process.env.NODE_ENV = "test"
	configDotenv({ path: envPath, override: true })
}

async function main() {
	program.parse()

	const flags = program.opts()
	setEnv()

	const appendedArgs = "exec" in flags ? ["bun", "--bun", ...program.args] : program.args

	const [mainCommand, ...subCommands] = appendedArgs

	// Spawn a new child process with the custom environment variables
	spawn(mainCommand!, subCommands, {
		shell: true, // For allowing environment variable expansion
		env: process.env, // Merging customEnv with the current process environment
		stdio: "inherit",
	})
}

main()
