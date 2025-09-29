import { ApiProperty } from "@nestjs/swagger"
import { UserRole } from "@prisma/client"

export class LoginOutput {
	@ApiProperty({ type: String })
	token: string

	@ApiProperty({ type: String })
	name: string

	@ApiProperty({ type: String })
	username: string

	@ApiProperty({ enum: UserRole, enumName: "UserRole" })
	role: UserRole

	@ApiProperty({ type: String })
	id: string

	@ApiProperty({ type: Boolean })
	active: boolean

	@ApiProperty({ type: Boolean })
	diagnosis: boolean

	@ApiProperty({ type: Boolean })
	isEngineer: boolean
}
