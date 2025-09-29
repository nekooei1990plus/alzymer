import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsString, ValidateNested } from "class-validator"
import { Password } from "src/modules/validators/password"

class ChangePasswordData {
	@ApiProperty({ type: String })
	@IsString()
	oldPassword: string

	@ApiProperty({ type: String })
	@Password()
	newPassword: string
}

export class ChangePasswordInput {
	@ApiProperty({ type: ChangePasswordData })
	@Type(() => ChangePasswordData)
	@ValidateNested()
	data: ChangePasswordData
}
