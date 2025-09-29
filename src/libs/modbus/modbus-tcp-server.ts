import { createServer, Server } from "node:net"
import { Subject } from "rxjs"
import { ModbusParseOutput, ModbusTcpConnection } from "./connections/modbus-tcp-connection"

export class ModbusTcpServer {
	private connectionList: ModbusTcpConnection[] = []
	private server: Server = null
	private newConnection$ = new Subject<ModbusTcpConnection>()
	private data$ = new Subject<ModbusPacketData>()
	private onNewConnectionObservable = this.newConnection$.asObservable()
	private onDataObservable = this.data$.asObservable()

	constructor(
		private ip: string,
		private port: number,
		private aesSecretInHex: string,
		private isEncryptionEnabled: boolean,
		private pingTimeout: number,
	) {
		this.createServer()
	}

	private createServer() {
		this.server = createServer((socket) => {
			const connection = new ModbusTcpConnection(socket, this.aesSecretInHex, this.isEncryptionEnabled, this.pingTimeout)
			this.newConnection$.next(connection)
			this.connectionList.push(connection)

			connection.onClose()
				.subscribe(() => {
					this.connectionList = this.connectionList.filter(item => item != connection)
					connection.destroy()
				})

			connection.onPacketData()
				.subscribe((data) => {
					this.data$.next({ connection, data })
				})
		})
	}

	setEncryption(status: boolean) {
		this.isEncryptionEnabled = status
	}

	listen(cb?: () => void) {
		this.server.listen(this.port, this.ip, cb)
	}

	close() {
		this.server.close()
	}

	destroy() {
		this.data$.complete()
		this.newConnection$.complete()
	}

	onNewConnection() {
		return this.onNewConnectionObservable
	}

	onPacketData() {
		return this.onDataObservable
	}
}

export type ModbusPacketData = {
	connection: ModbusTcpConnection
	data: ModbusParseOutput
}
