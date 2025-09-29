import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsString, ValidateNested } from "class-validator"

class ChangeUsernameData {
	@ApiProperty({ type: String })
	@IsString()
	oldUsername: string

	@ApiProperty({ type: String })
	@IsString()
	newUsername: string
}

export class ChangeUsernameInput {
	@ApiProperty({ type: ChangeUsernameData })
	@Type(() => ChangeUsernameData)
	@ValidateNested()
	data: ChangeUsernameData
}
