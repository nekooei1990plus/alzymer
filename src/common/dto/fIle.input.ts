import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class FileInput {
	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsString()
	fieldname: string

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsString()
	originalname: string

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsString()
	encoding: string

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsString()
	mimetype: string

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsString()
	destination: string

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsString()
	filename: string

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsString()
	path: string

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsNumber()
	size: number
}
