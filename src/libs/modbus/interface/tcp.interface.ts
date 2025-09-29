import { Buffer } from "node:buffer"
import { Socket } from "node:net"
import { Observable } from "rxjs"

export type TcpClientConnectInput = {
	address: string
	port: number
}

export type TcpClientOptions = {
	/**
	 * @description whether to retry to connect on disconnection (in miliseconds)
	 * @default 1000
	 */
	retryDelay?: number | false
	/**
	 * @description wheter to buffer while writing if not socket is not connected
	 * @default true
	 */
	buffering?: boolean
}

export type TcpServerListenOptions = {
	port: number
	address: string
}

export type TcpServerOptions = {
	/**
	 * @description wheter to buffer while writing if not socket is not connected
	 * @default true
	 */
	buffering?: boolean
}

export type Connection<SocketType> = {
	onData: () => Observable<Buffer>
	onClose: () => Observable<boolean>
	onError: () => Observable<Error>
	onConnection: () => Observable<void>
	onReconnection: () => Observable<void>
	write: (buffer: Buffer) => boolean
	destroy: () => void
	disconnect: () => void
	isConnected: () => boolean
	getSocket: () => SocketType
	onConnectionFailed: () => Observable<void>
	connect: (host: string, port: number) => Promise<void>
}

export type ITcpConnection = Connection<Socket>
