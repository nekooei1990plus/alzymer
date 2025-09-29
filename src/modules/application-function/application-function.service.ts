import type { ReadApplicationFunctionOutput } from "./dto/read-application-function.output"
import { Injectable } from "@nestjs/common"
import { ApplicationFunctionList } from "src/libs/modbus/interface/connection"

@Injectable()
export class ApplicationFunctionService {
	readApplicationFunction() {
		const output: ReadApplicationFunctionOutput = {
			data: ApplicationFunctionList,
		}

		return output
	}
}
