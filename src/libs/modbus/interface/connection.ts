import type { Buffer } from "node:buffer"
import type { Socket } from "node:net"
import type { Observable } from "rxjs"
import { ApplicationFunctionModel } from "src/modules/application-function/model/application-function.model"

export type Connection = {
	onConnectionFailed: () => Observable<void>
	onClose: () => Observable<void>
	onError: () => Observable<Error>
	onConnection: () => Observable<void>
	onReconnection: () => Observable<void>
	onData: (() => Observable<Buffer>) & (() => Observable<Buffer>) & (() => Observable<Buffer>) & (() => Observable<Buffer>)
	write: (data: Buffer) => void
	isConnected: () => boolean
	getSocket: () => Socket
	connect: (host: string, port: number) => Promise<void>
	disconnect: () => void
	destroy: () => void
}

export enum ApplicationFunctionType {
	ReadFeature = 1,
	WriteFeature = 2,
	Format = 3,
	ReadLEDPanel = 4,
	WriteLEDPanel = 5,
	SetTimeInterval = 6,
	OnlineMonitoringRead = 7,
	ApplyMonitoringForce = 8,
	ResetMonitoringForce = 9,
	ReadNodeTime = 10,
	SetNodeTime = 11,
	ReadNodeFault = 12,
	ReadModuleFaults = 13,
	ReadNodeModuleFCodes = 14,
}

export const ApplicationFunctionList: ApplicationFunctionModel[] = [
	{
		name: "ReadFeature",
		encodingNumber: ApplicationFunctionType.ReadFeature,
	},
	{
		name: "WriteFeature",
		encodingNumber: ApplicationFunctionType.WriteFeature,
	},
	{
		name: "Format",
		encodingNumber: ApplicationFunctionType.Format,
	},
	{
		name: "ReadLEDPanel",
		encodingNumber: ApplicationFunctionType.ReadLEDPanel,
	},
	{
		name: "WriteLEDPanel",
		encodingNumber: ApplicationFunctionType.WriteLEDPanel,
	},
	{
		name: "SetTimeInterval",
		encodingNumber: ApplicationFunctionType.SetTimeInterval,
	},
	{
		name: "OnlineMonitoringRead",
		encodingNumber: ApplicationFunctionType.OnlineMonitoringRead,
	},
	{
		name: "ApplyMonitoringForce",
		encodingNumber: ApplicationFunctionType.ApplyMonitoringForce,
	},
	{
		name: "ResetMonitoringForce",
		encodingNumber: ApplicationFunctionType.ResetMonitoringForce,
	},
	{
		name: "ReadNodeTime",
		encodingNumber: ApplicationFunctionType.ReadNodeTime,
	},
	{
		name: "SetNodeTime",
		encodingNumber: ApplicationFunctionType.SetNodeTime,
	},
	{
		name: "ReadNodeFault",
		encodingNumber: ApplicationFunctionType.ReadNodeFault,
	},
	{
		name: "ReadModuleFaults",
		encodingNumber: ApplicationFunctionType.ReadModuleFaults,
	},
	{
		name: "ReadNodeModuleFCodes",
		encodingNumber: ApplicationFunctionType.ReadNodeModuleFCodes,
	},
]
