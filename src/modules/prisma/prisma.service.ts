import { Injectable } from "@nestjs/common"
import { PrismaClient } from "@prisma/client"

@Injectable()
export class PrismaService extends PrismaClient {
	async initializeDatabase() {
		let config = await this.globalConfig.findFirst()

		if (!config) {
			config = await this.globalConfig.create({
				data: {
					encryptionEnabled: false,
					logoutExpirationTime: 3,
					autoBackupPeriod: 1,
					registerByteCount: 2,
					modbusServerPort: 503,
					intervalTimeToSendPacketsInSeconds: 2,
				},
			})
		}

		return config
	}
}
