import { promises as fs } from "node:fs"
import { cp, mkdir, rm, writeFile } from "node:fs/promises"
import { platform } from "node:os"
import { join, resolve } from "node:path"
import * as path from "node:path"

async function fileExists(filePath: string): Promise<boolean> {
	try {
		await fs.access(filePath)
		return true
	}
	catch {
		return false
	}
}

async function findBunExeViaScoop(): Promise<string | null> {
	const userProfile = process.env.USERPROFILE
	if (!userProfile)
		return null

	const bunPath = path.join(userProfile, "scoop", "apps", "bun", "current", "bun.exe")

	if (await fileExists(bunPath)) {
		return bunPath
	}

	return null
}

async function findBunExeInPath(): Promise<string | null> {
	const pathEnv = process.env.PATH
	if (!pathEnv)
		return null

	const paths = pathEnv.split(path.delimiter)

	for (const p of paths) {
		const bunPath = path.join(p, "bun.exe")
		if (await fileExists(bunPath)) {
			return bunPath
		}
	}

	return null
}

async function findBunExe(): Promise<string | null> {
	const scoopPath = await findBunExeViaScoop()
	if (scoopPath)
		return scoopPath

	return await findBunExeInPath()
}

const outDir = resolve("release")
const outputDir = resolve(".output")

async function copyFiles(bunPath: string) {
	// Clean release directory
	await rm(outDir, { recursive: true, force: true })
	await mkdir(outDir, { recursive: true })

	// Copy .output folder
	await cp(outputDir, join(outDir, ".output"), { recursive: true, dereference: true })

	// Copy bun.exe or bun binary
	await fs.copyFile(bunPath, join(outDir, platform() === "win32" ? "bun.exe" : "bun"))

	// Write the batch or shell launcher
	const isWin = platform() === "win32"
	const launcherContent = isWin
		? `@echo off
setlocal
set SCRIPT_DIR=%~dp0
set BUN_PATH=%SCRIPT_DIR%bun.exe
set ENTRY_FILE=%SCRIPT_DIR%.output\\server\\index.mjs

if not exist "%ENTRY_FILE%" (
    echo ❌ Entry file not found: %ENTRY_FILE%
    pause
    exit /b 1
)

"%BUN_PATH%" "%ENTRY_FILE%"
endlocal
`
		: `#!/bin/sh
SCRIPT_DIR=$(dirname "$0")
BUN_PATH="$SCRIPT_DIR/bun"
ENTRY_FILE="$SCRIPT_DIR/.output/server/index.mjs"

if [ ! -f "$ENTRY_FILE" ]; then
  echo "❌ Entry file not found: $ENTRY_FILE"
  exit 1
fi

"$BUN_PATH" "$ENTRY_FILE"
`

	const launcherName = isWin ? "start.bat" : "start.sh"
	await writeFile(join(outDir, launcherName), launcherContent, { mode: 0o755, encoding: "utf8" })
}

async function build() {
	try {
		const bunPath = await findBunExe()
		console.log("📍 Found bun at:", bunPath)

		await copyFiles(bunPath)

		console.log(`✅ Build complete! Run the launcher in the 'release' folder.`)
	}
	catch (err) {
		console.error("❌ Build failed:", (err as Error).message)
		process.exit(1)
	}
}

build()
