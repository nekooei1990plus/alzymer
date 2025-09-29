import { exec } from "node:child_process"
import { access } from "node:fs/promises"
import { homedir, platform } from "node:os"
import path from "node:path"
import { promisify } from "node:util"

const execAsync = promisify(exec)

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath)
    return true
  }
  catch {
    return false
  }
}

async function findBunViaScoop(): Promise<string | null> {
  if (platform() !== "win32")
    return null
  const userProfile = process.env.USERPROFILE
  if (!userProfile)
    return null

  const bunPath = path.join(userProfile, "scoop", "apps", "bun", "current", "bun.exe")
  return (await fileExists(bunPath)) ? bunPath : null
}

async function findBunInCommonUnixPaths(): Promise<string | null> {
  const home = homedir()
  const candidates = [
    path.join(home, ".bun", "bin", "bun"),
    "/usr/local/bin/bun",
    "/usr/bin/bun",
  ]

  for (const p of candidates) {
    if (await fileExists(p))
      return p
  }

  return null
}

async function findBunInPath(): Promise<string | null> {
  const pathEnv = process.env.PATH
  if (!pathEnv)
    return null

  const delimiter = path.delimiter
  const paths = pathEnv.split(delimiter)

  const binaryName = platform() === "win32" ? "bun.exe" : "bun"

  for (const p of paths) {
    const bunPath = path.join(p, binaryName)
    if (await fileExists(bunPath)) {
      return bunPath
    }
  }

  return null
}

async function findBunViaWhichOrWhere(): Promise<string | null> {
  try {
    const cmd = platform() === "win32" ? "where bun" : "which bun"
    const { stdout } = await execAsync(cmd)
    const firstMatch = stdout.trim().split(/\r?\n/)[0]
    if (!firstMatch)
      return null

    return (await fileExists(firstMatch)) ? firstMatch : null
  }
  catch {
    return null
  }
}

export async function findBunBinary(): Promise<string | null> {
  return (
    (await findBunViaScoop())
    || (await findBunInCommonUnixPaths())
    || (await findBunInPath())
    || (await findBunViaWhichOrWhere())
    || null
  )
}
