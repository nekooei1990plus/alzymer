import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsString, IsUUID, MinLength, ValidateNested } from "class-validator"

class ChangePasswordForUserData {
	@ApiProperty({ type: String })
	@IsString()
	@IsUUID()
	userId: string

	@ApiProperty({ type: String })
	@IsString()
	@MinLength(8)
	newPasswordForUser: string
}

export class ChangePasswordForUserInput {
	@ApiProperty({ type: ChangePasswordForUserData })
	@Type(() => ChangePasswordForUserData)
	@ValidateNested()
	data: ChangePasswordForUserData
}
