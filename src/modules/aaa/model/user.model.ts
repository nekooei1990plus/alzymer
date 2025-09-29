import { ApiProperty } from "@nestjs/swagger"
import { UserRole } from "@prisma/client"

class PartialUserModel {
	@ApiProperty({ type: String })
	username: string

	@ApiProperty({ enum: UserRole, enumName: "UserRole" })
	role: UserRole

	@ApiProperty({ type: String })
	id: string
}

export class UserModel extends PartialUserModel {
	@ApiProperty({ type: String })
	description: string

	@ApiProperty({ type: String })
	name: string

	@ApiProperty({ type: Boolean })
	canDiagnosis: boolean

	@ApiProperty({ type: Boolean })
	active: boolean

	@ApiProperty({ type: Boolean })
	isEngineer: boolean
}

export class UserModelWithToken extends PartialUserModel {
	@ApiProperty({ type: String })
	token: string
}
