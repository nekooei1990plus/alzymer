import { Buffer } from "node:buffer"
import { Decimal } from "@prisma/client/runtime/library"
import { Observable } from "rxjs"
import { IntervalTimeUnitEnum } from "src/modules/node/dto/node-module/interval-time-unit.enum"

export enum WhichIntervalTimeEnum {
	readMonitoringFeatureIntervalTime = 0,
	readNodeFaultIntervalTime = 1,
}

export type CloseInfo = {
	hostAddress: string
	port: number
}

export type NodeClientConnectionInfo = { ipList: string[], nodeId: string, port: number, activeLink?: string }

export type NodeClient = {
	isConnected: () => boolean

	getConnectionInfo: () => { ipList: string[], nodeId: string, port: number, activeLink?: string }

	setIpList: (ipList: string[]) => void

	setServerPort: (port: number) => void

	disconnect: () => void

	destroy: () => void

	connect: () => Promise<void>

	format: (nodeModuleId: string, portId: string) => Promise<Result<void>>

	writeLEDPanel: (value: WriteLedInput[]) => Promise<Result<void>>

	readLEDPanel: () => Promise<Result<ReadLedPanelData[]>>

	setTimeInterval: (whichIntervalTime: WhichIntervalTimeEnum, timeInterval: number, unit: IntervalTimeUnitEnum) => Promise<Result<void>>

	onlineMonitoringRead: (nodeModuleId: string, portId: string) => Promise<Result<OnlineMonitoringData[]>>

	applyMonitoringForce: (forceInput: OnlineMonitoringData[], nodeModuleId: string, portId: string) => Promise<Result<void>>

	readNodeTime: () => Promise<Result<NodeTimeOutput>>

	setNodeTime: (time: Date) => Promise<Result<void>>

	getNodeFault: () => Promise<Result<number>>

	getAllModulesError: () => Promise<Result<AllModuleErrorsData[]>>

	getNodeModuleFCodes: (nodeModuleId: string) => Promise<Result<NodeModuleFCodes>>

	readFeature: (nodeModuleId: string, portId: string) => Promise<Result<FeatureValue[]>>

	writeFeature: (nodeModuleId: string, portId: string, featuresValue: FeatureValue[]) => Promise<Result<void>>

	onPacketData: () => Observable<{ request: Buffer, response: Buffer }>

	setEncryption: (status: boolean) => void

	onConnection: () => Observable<void>

	onClose: () => Observable<CloseInfo>

	ping: () => Promise<boolean>
}

export type WriteLedInput = {
	connectionStatus: number
	value: number
}

export type NodeTimeOutput = {
	diff: number
	time: Date
}

export type TimeValue = {
	time: string
	value: number
}

export type FeatureValue = {
	value: Decimal[]
	unitValue?: number
}

export type OnlineMonitoringData = {
	ioValue: Decimal
	logicValue: Decimal
	forceValue: Decimal
	forceStatus: Decimal
}

export type ReadLedPanelData = {
	ledGroupId: string
	connectionStatus: number
	value: number
}

export type AllModuleErrorsData = {
	nodeModuleId: string
	encodingNumber: number
}

export type NodeModuleFCodes = {
	fCodes: number[]
}

export type Result<T = any, U extends Error = Error> = {
	isOk: boolean
	data?: T
	error?: U
}
