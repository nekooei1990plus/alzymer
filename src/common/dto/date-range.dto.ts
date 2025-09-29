import { ApiPropertyOptional } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import { IsOptional } from "class-validator"
import { DateTime } from "luxon"
import { IsLuxon } from "src/modules/validators/luxon"

export class DateRange {
	@ApiPropertyOptional({ type: String })
	@Transform(({ value }) => DateTime.fromISO(value))
	@IsOptional()
	@IsLuxon()
	endDate?: DateTime

	@ApiPropertyOptional({ type: String })
	@Transform(({ value }) => DateTime.fromISO(value))
	@IsOptional()
	@IsLuxon()
	startDate?: DateTime
}
