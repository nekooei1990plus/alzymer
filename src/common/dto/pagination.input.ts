import { ApiExtraModels, ApiProperty, ApiPropertyOptional, getSchemaPath } from "@nestjs/swagger"
import { IsBoolean, IsNumber, IsOptional, Min } from "class-validator"

/**
 * Data transfer object for Pagination Input
 */
export class PaginationData {
	@ApiPropertyOptional({ type: Number, default: 10, minimum: 0 })
	@IsOptional()
	@Min(0)
	@IsNumber()
	take: number = 10

	@ApiPropertyOptional({ type: Number, default: 0, minimum: 0 })
	@IsOptional()
	@Min(0)
	@IsNumber()
	skip: number = 0
}

class PaginationTakeAll {
	@ApiProperty({ type: Boolean })
	@IsBoolean()
	takeAll: boolean
}

@ApiExtraModels(PaginationData, PaginationTakeAll)
export class PaginationTakeAllData {
	@Min(0)
	@IsNumber()
	take: number = 10

	@Min(0)
	@IsNumber()
	skip: number = 0

	@IsBoolean()
	takeAll: boolean = false
}

export const TakeAllPagination = {
	oneOf: [
		{ $ref: getSchemaPath(PaginationTakeAll) },
		{ $ref: getSchemaPath(PaginationData) },
	],
}
