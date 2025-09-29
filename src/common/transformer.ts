import { Prisma } from "@prisma/client"
import { FeatureModel } from "src/modules/feature/model/feature.model"
import { NodeModuleModel } from "src/modules/node/model/node-module.model"
import { NodeModel } from "src/modules/node/model/node.model"
import { UnitModel } from "src/modules/unit/model/unit.model"
import { defaultFeatureFieldSelect, defaultNodeFieldSelect, defaultNodeModuleFieldSelect } from "./structs"

export type FeaturePrismaModel = Prisma.FeatureGetPayload<{ select: typeof defaultFeatureFieldSelect }>
export type NodePrismaModel = Prisma.NodeGetPayload<{ select: typeof defaultNodeFieldSelect }>
export type NodeModulePrismaModel = Prisma.NodeModuleGetPayload<{ select: typeof defaultNodeModuleFieldSelect }>

export class PrismaTransformer {
	static transformFeature(input: FeaturePrismaModel) {
		const unitModels: UnitModel[] = []

		for (const unitGroup of input.unitGroups) {
			for (const unitItem of unitGroup.units) {
				unitModels.push({
					encodingNumber: unitItem.encodingNumber,
					id: unitItem.id,
					unitGroupId: unitItem.unitGroupId,
					name: unitItem.name,
					unitGroup: { id: unitGroup.id, name: unitGroup.name },
				})
			}
		}

		const output: FeatureModel = {
			description: input.description,
			name: input.name,
			id: input.id,
			isBigEndian: input.isBigEndian,
			isFreeVolume: input.isFreeVolume,
			isIp: input.isIp,
			isSigned: input.isSigned,
			isTotalVolume: input.isTotalVolume,
			linearCoefficient: input.linearCoefficient,
			linearConstant: input.linearConstant,
			manualRegisterCount: input.manualRegisterCount,
			powerExponent: input.powerExponent,
			type: input.type,
			units: unitModels,
			valueOptions: input.valueOptions,
			valueType: input.valueType,
			isGroupRegister: input.isGroupRegister,
			isTime: input.isTime,
		}

		return output
	}

	static transformNode(item: NodePrismaModel) {
		const output: NodeModel = {
			id: item.id,
			channelId: item.channelId,
			cabinetId: item.cabinetId,
			includeAppFunctions: item.includeAppFunctions,
			name: item.name,
			description: item.description,
			ip: item.ip,
			secondaryIp: item.secondaryIp,
			cabinetName: item.cabinet.name,
			channelName: item.channel.name,
			nodeGroupName: item.group.name,
			nodeGroupId: item.nodeGroupId,
			roomId: item.cabinet.roomId,
			roomName: item.cabinet.room.name,
			exportIsNeeded: item.exportIsNeeded,
		}

		return output
	}

	static transformNodeModule(item: NodeModulePrismaModel) {
		const output: NodeModuleModel = {
			id: item.id,
			module: item.module,
			moduleId: item.moduleId,
			moduleOrder: item.moduleOrder,
			node: PrismaTransformer.transformNode(item.node),
			nodeId: item.nodeId,
			aliasName: item.aliasName,
			linearCoefficient: item.linearCoefficient.toString(),
			linearConstant: item.linearConstant.toString(),
			powerExponent: item.powerExponent.toString(),
		}

		return output
	}
}
