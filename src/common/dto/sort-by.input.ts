import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsBoolean, IsOptional, IsString } from "class-validator"

/**
 * Data transfer object for Sort By Input
 */
export class SortByData {
	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsString()
	field?: string

	@ApiPropertyOptional({ type: Boolean, default: true })
	@IsOptional()
	@IsBoolean()
	descending = true

	constructor(input: SortByData) {
		Object.assign(this, input)
	}
}
