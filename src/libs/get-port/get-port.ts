import type { AddressInfo, ListenOptions } from "node:net"
import net from "node:net"
import os from "node:os"

type Options = {
	/**
	A preferred port or an iterable of preferred ports to use.
	 */
	readonly port?: number

	/**
	Ports that should not be returned.
	You could, for example, pass it the return value of the `portNumbers()` function.
	 */
	readonly exclude?: Iterable<number>

	/**
	The host on which port resolution should be performed. Can be either an IPv4 or IPv6 address.
	By default, it checks availability on all local addresses defined in [OS network interfaces](https://nodejs.org/api/os.html#os_os_networkinterfaces). If this option is set, it will only check the given host.
	 */
	readonly host?: string
} & Omit<ListenOptions, "port">

class Locked extends Error {
	constructor(port: number) {
		super(`${port} is locked`)
	}
}

const lockedPorts = {
	old: new Set(),
	young: new Set(),
}

// On this interval, the old locked ports are discarded,
// the young locked ports are moved to old locked ports,
// and a new young set for locked ports are created.
const releaseOldLockedPortsIntervalMs = 1000 * 15

const minPort = 1024
const maxPort = 65_535

// Lazily create timeout on first use
let timeout: NodeJS.Timeout

function getLocalHosts() {
	const interfaces = os.networkInterfaces()

	// Add undefined value for createServer function to use default host,
	// and default IPv4 host in case createServer defaults to IPv6.
	const results = new Set([undefined, "0.0.0.0"])

	for (const _interface of Object.values(interfaces)) {
		for (const config of _interface) {
			results.add(config.address)
		}
	}

	return results
}

function checkAvailablePort(options: Options) {
	return new Promise<number>((resolve, reject) => {
		const server = net.createServer()
		server.unref()
		server.on("error", reject)

		server.listen(options, () => {
			const { port } = server.address() as AddressInfo
			server.close(() => {
				resolve(port)
			})
		})
	})
}

async function getAvailablePort(options: Options, hosts: Set<string>) {
	if (options.host || options.port === 0) {
		return checkAvailablePort(options)
	}

	for (const host of hosts) {
		try {
			await checkAvailablePort({ port: options.port, host })
		}
		catch (error) {
			if (!["EADDRNOTAVAIL", "EINVAL"].includes((error as any).code)) {
				throw error
			}
		}
	}

	return options.port
}

function* portCheckSequence(ports: Iterable<number>) {
	if (ports) {
		yield * ports
	}

	yield 0 // Fall back to 0 if anything else failed
}

export async function getPort(options?: Options): Promise<number> {
	let ports
	let exclude = new Set()

	if (options) {
		if (options.port) {
			ports = typeof options.port === "number" ? [options.port] : options.port
		}

		if (options.exclude) {
			const excludeIterable = options.exclude

			if (typeof excludeIterable[Symbol.iterator] !== "function") {
				throw new TypeError("The `exclude` option must be an iterable.")
			}

			for (const element of excludeIterable) {
				if (typeof element !== "number") {
					throw new TypeError("Each item in the `exclude` option must be a number corresponding to the port you want excluded.")
				}

				if (!Number.isSafeInteger(element)) {
					throw new TypeError(`Number ${element} in the exclude option is not a safe integer and can't be used`)
				}
			}

			exclude = new Set(excludeIterable)
		}
	}

	if (timeout === undefined) {
		timeout = setTimeout(() => {
			timeout = undefined

			lockedPorts.old = lockedPorts.young
			lockedPorts.young = new Set()
		}, releaseOldLockedPortsIntervalMs)

		// Does not exist in some environments (Electron, Jest jsdom env, browser, etc).
		if (timeout.unref) {
			timeout.unref()
		}
	}

	const hosts = getLocalHosts()

	for (const port of portCheckSequence(ports)) {
		try {
			if (exclude.has(port)) {
				continue
			}

			let availablePort = await getAvailablePort({ ...options, port }, hosts)
			while (lockedPorts.old.has(availablePort) || lockedPorts.young.has(availablePort)) {
				if (port !== 0) {
					throw new Locked(port)
				}

				availablePort = await getAvailablePort({ ...options, port }, hosts)
			}

			lockedPorts.young.add(availablePort)

			return availablePort
		}
		catch (error) {
			if (!["EADDRINUSE", "EACCES"].includes((error as any).code) && !(error instanceof Locked)) {
				throw error
			}
		}
	}

	throw new Error("No available ports found")
}

export function portNumbers(from: number, to: number): Iterable<number> {
	if (!Number.isInteger(from) || !Number.isInteger(to)) {
		throw new TypeError("`from` and `to` must be integer numbers")
	}

	if (from < minPort || from > maxPort) {
		throw new RangeError(`'from' must be between ${minPort} and ${maxPort}`)
	}

	if (to < minPort || to > maxPort) {
		throw new RangeError(`'to' must be between ${minPort} and ${maxPort}`)
	}

	if (from > to) {
		throw new RangeError("`to` must be greater than or equal to `from`")
	}

	function* generator(from: number, to: number) {
		for (let port = from; port <= to; port++) {
			yield port
		}
	}

	return generator(from, to)
}
