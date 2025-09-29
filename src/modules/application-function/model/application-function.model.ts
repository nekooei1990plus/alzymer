import { ApiProperty } from "@nestjs/swagger"
import { ApplicationFunctionType } from "src/libs/modbus/interface/connection"

export class ApplicationFunctionModel {
	@ApiProperty({ type: String })
	name: string

	@ApiProperty({ enum: ApplicationFunctionType })
	encodingNumber: ApplicationFunctionType
}
