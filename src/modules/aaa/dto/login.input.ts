import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsString, ValidateNested } from "class-validator"
import { Trim } from "src/common/utils"

class LoginData {
	@ApiProperty({ type: String })
	@Trim()
	@IsString()
	username: string

	@ApiProperty({ type: String })
	@IsString()
	password: string
}

export class LoginInput {
	@ApiProperty({ type: LoginData })
	@Type(() => LoginData)
	@ValidateNested()
	data: LoginData
}
