import { PrismaClient } from "@prisma/client"
import { hashSha1 } from "./utils"

export const defaultTestPassword = "123456789"

export async function createUserQuery(prisma: PrismaClient) {
	const password = hashSha1(defaultTestPassword)

	await prisma.user.createMany({
		data: [
			{
				id: "22d13300-9d50-46b1-92cd-6c985e33eb31",
				canDiagnosis: true,
				description: "",
				password,
				name: "test",
				role: "Root",
				username: "root",
			},
			{
				id: "22d13300-9d50-46b1-92cd-6c985e33eb32",
				canDiagnosis: true,
				description: "",
				password,
				name: "test",
				role: "Admin",
				username: "admin",
			},
			{
				id: "22d13300-9d50-46b1-92cd-6c985e33eb33",
				canDiagnosis: true,
				description: "",
				password,
				name: "test",
				role: "Monitor",
				username: "monitor",
			},
		],
	})
}

export async function resetDatabase(prisma: PrismaClient) {
	await prisma.$transaction([
		prisma.userLog.deleteMany({}),
		prisma.nodeFeatureValue.deleteMany({}),
		prisma.nodeModule.deleteMany({}),
		prisma.nodeLEDGroup.deleteMany({}),
		prisma.nodePropertyFeature.deleteMany({}),
		prisma.nodePropertyGroup.deleteMany({}),
		prisma.node.deleteMany({}),
		prisma.nodeGroup.deleteMany({}),
		prisma.channel.deleteMany({}),
		prisma.user.deleteMany({}),
		prisma.cabinet.deleteMany({}),
		prisma.room.deleteMany({}),
		prisma.portFeature.deleteMany({}),
		prisma.moduleFeatureValueOption.deleteMany({}),
		prisma.monitoringFeature.deleteMany({}),
		prisma.feature.deleteMany({}),
		prisma.port.deleteMany({}),
		prisma.tag.deleteMany({}),
		prisma.module.deleteMany({}),
		prisma.moduleType.deleteMany({}),
		prisma.unit.deleteMany({}),
		prisma.unitGroup.deleteMany({}),
		prisma.nodeFaultCode.deleteMany({}),
		prisma.moduleFaultCode.deleteMany({}),
		prisma.globalConfig.deleteMany({}),
		prisma.tagGroup.deleteMany({}),
	])

	await prisma.globalConfig.create({
		data: {
			autoBackupPeriod: 1,
			encryptionEnabled: false,
			logoutExpirationTime: 1,
			registerByteCount: 2,
			modbusServerPort: 503,
		},
	})

	await createUserQuery(prisma)
}
