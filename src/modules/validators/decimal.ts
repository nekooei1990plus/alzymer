import type { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from "class-validator"
import { applyDecorators, Injectable } from "@nestjs/common"
import { Decimal, Decimal as PrismaDecimal } from "@prisma/client/runtime/library"

import { Transform, Type } from "class-transformer"
import { IsArray, IsDefined, registerDecorator, ValidatorConstraint } from "class-validator"
import { tryCatchIntoResult } from "src/common/utils"

export function IsDecimal(validationOptions?: ValidationOptions): PropertyDecorator {
	return () => function (object: any, propertyName: string) {
		registerDecorator({
			target: object.constructor,
			propertyName,
			options: validationOptions,
			validator: IsDecimalImpl,
		})
	}
}

export function ToDecimal() {
	return Transform(({ value }) => {
		if (value === null || value === undefined)
			return null // Handle null/undefined values
		const result = tryCatchIntoResult(() => new PrismaDecimal(value))
		if (result.isOk()) {
			return result.value
		}
		return null // Return null if transformation fails
	})
}

export function ToDecimalArray() {
	return Transform(({ value }) => {
		if (value === null || value === undefined || !Array.isArray(value))
			return null // Handle null/undefined values
		const result = tryCatchIntoResult(() => value.map(item => new Decimal(item)))
		if (result.isOk()) {
			return result.value
		}
		return null // Return null if transformation fails
	})
}

export function TransformDecimal() {
	return applyDecorators(
		IsDefined(),
		ToDecimal(),
		Type(() => Decimal),
	)
}

export function TransformDecimalArray() {
	return applyDecorators(
		IsDefined(),
		ToDecimalArray(),
		Type(() => Decimal),
		IsArray(),
	)
}

@ValidatorConstraint({})
@Injectable()
export class IsDecimalImpl implements ValidatorConstraintInterface {
	validate(input: any, _validationArguments?: ValidationArguments) {
		return input instanceof PrismaDecimal
	}

	defaultMessage(validationArguments: ValidationArguments) {
		const fieldName = validationArguments?.property || "Field"
		const message = `${fieldName} must be a valid Date`
		return message
	}
}
