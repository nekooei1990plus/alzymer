import type { Buffer } from "node:buffer"
import type { Socket } from "node:net"
import type { Connection } from "../interface/connection"
import { map, share, skip, Subject, zip } from "rxjs"
import { pingIp } from "src/common/utils"

export class TcpConnection implements Connection {
	private isTryingToConnect = false
	private timeoutRef: NodeJS.Timeout = null
	private pingTimerRef: NodeJS.Timeout = null
	private readonly conneectionTimeout = 1000
	private isConnected_ = false

	private lastConnectPromise: Promise<void>
	private connectionFailed$ = new Subject<void>()
	private data$ = new Subject<Buffer>()
	private connection$ = new Subject<void>()
	private close$ = new Subject<void>()
	private error$ = new Subject<Error>()

	private dataObservable = this.createDataObservable()
	private connectionObservable = this.createConnectionObservable()
	private closeObservable = this.createCloseObservable()
	private reconnectionObservable = this.createReconnectionObservable()
	private errorObservable = this.createErrorObservable()
	private connectionFailedObservable = this.createConnectionFailedObservable()

	constructor(private socket: Socket, private pingTimeoutInMs: number) {
		this.isConnected_ = !!this.socket.remoteAddress && !!this.socket.remotePort
		socket.setKeepAlive(true)

		/* Connection has internal logic based on onConnection & onClose Event
		 * needs to subscribe to them for their activation.
		 */
		this.onConnection()
			.subscribe(() => {
				this.isConnected_ = true
				this.startPingInteravally()
			})

		this.onClose().subscribe(() => {
			this.isConnected_ = false
			this.stopPingIntervally()
		})

		this.onError().subscribe()

		this.socket.on("close", () => this.emitClose())
		this.socket.on("data", data => this.data$.next(data))
		this.socket.on("connect", () => this.connection$.next())
		this.socket.on("error", err => this.error$.next(err))
	}

	private stopPingIntervally() {
		if (this.pingTimerRef) {
			clearInterval(this.pingTimerRef)
			this.pingTimerRef = null
		}
	}

	async startPingInteravally() {
		if (this.pingTimerRef)
			clearInterval(this.pingTimerRef)

		// this.checkPing()

		// this.pingTimerRef = setInterval(async () => await this.checkPing(), this.pingTimeoutInMs)
	}

	private async checkPing() {
		const hasPing = await pingIp(this.socket.remoteAddress)
		if (!hasPing) {
			this.emitClose()
		}

		return hasPing
	}

	write(data: Buffer): void {
		this.writeOrSave(data)
	}

	async connect(host: string, port: number) {
		if (this.isConnected() || this.isTryingToConnect) {
			return this.lastConnectPromise
		}

		this.isTryingToConnect = true

		this.lastConnectPromise = new Promise<void>((resolve, reject) => {
			this.socket.once("error", (error) => {
				this.timeoutRef?.unref()
				this.isTryingToConnect = false

				if (this.isConnected()) {
					return
				}

				reject(error)
				this.connectionFailed$.next()
			})

			this.socket.connect(port, host, () => {
				this.timeoutRef?.unref()
				this.isTryingToConnect = false
				resolve()
			})

			this.timeoutRef?.unref()
			this.timeoutRef = setTimeout(() => {
				this.timeoutRef.unref()
				this.isTryingToConnect = false
				if (this.isConnected()) {
					return
				}

				reject(new Error("Connection Timed Out"))
				this.connectionFailed$.next()
			}, this.conneectionTimeout)
		})

		return this.lastConnectPromise
	}

	disconnect(): void {
		this.socket.end()
		this.timeoutRef?.unref()
		this.isTryingToConnect = false
	}

	destroy() {
		this.disconnect()
		this.close$.complete()
		this.connection$.complete()
		this.connectionFailed$.complete()
		this.data$.complete()
		this.error$.complete()
	}

	isConnected(): boolean {
		return this.isConnected_
	}

	onData() {
		return this.dataObservable
	}

	getSocket() {
		return this.socket
	}

	onConnection() {
		return this.connectionObservable
	}

	onReconnection() {
		return this.reconnectionObservable
	}

	onClose() {
		return this.closeObservable
	}

	onError() {
		return this.errorObservable
	}

	onConnectionFailed() {
		return this.connectionFailedObservable
	}

	private createDataObservable() {
		return this.data$.asObservable()
	}

	private createConnectionObservable() {
		return this.connection$.asObservable()
	}

	private createCloseObservable() {
		return this.close$.asObservable()
	}

	private createConnectionFailedObservable() {
		return this.connectionFailed$.asObservable()
	}

	private createReconnectionObservable() {
		return zip(
			this.connectionObservable.pipe(skip(1)),
			this.closeObservable,
		)
			.pipe(
				map(() => undefined as void),
				share(),
			)
	}

	private createErrorObservable() {
		return this.error$.asObservable()
	}

	private writeOrSave(data: Buffer) {
		this.socket.write(data)
	}

	private emitClose() {
		// Only Publish `close` event whenever we are truly connected.
		if (this.isConnected_) {
			this.close$.next()
		}
	}
}
