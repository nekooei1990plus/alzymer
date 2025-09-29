/* eslint-disable ts/no-unsafe-function-type */
import type { TypeHelpOptions } from "class-transformer"
import { applyDecorators } from "@nestjs/common"
import { Type } from "class-transformer"
import { IsArray, IsDefined, ValidateNested } from "class-validator"

export function Instance(typeFunction?: (type?: TypeHelpOptions) => Function) {
	return applyDecorators(
		IsDefined(),
		Type(typeFunction),
		ValidateNested(),
	)
}

export function ArrayInstance(typeFunction?: (type?: TypeHelpOptions) => Function) {
	return applyDecorators(
		IsDefined(),
		Type(typeFunction),
		IsArray(),
		ValidateNested(),
	)
}
