import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean } from "class-validator"

/**
 * Data transfers object to Id Input
 */
export class SuccessOutput {
	@ApiProperty({ type: Boolean })
	@IsBoolean()
	success: boolean
}
