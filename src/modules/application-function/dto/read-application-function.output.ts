import { ApiResponseProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsArray } from "class-validator"
import { ApplicationFunctionModel } from "../model/application-function.model"

/**
 * Represents the output for reading Application function data.
 */
export class ReadApplicationFunctionOutput {
	/**
	 * An array of channel data (Application Function) records.
	 */
	@ApiResponseProperty({ type: [ApplicationFunctionModel] })
	@IsArray()
	@Type(() => ApplicationFunctionModel)
	data: ApplicationFunctionModel[]
}
