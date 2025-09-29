import type { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from "class-validator"
import type { DateTime } from "luxon"
import { Injectable } from "@nestjs/common"
import { registerDecorator, ValidatorConstraint } from "class-validator"

@ValidatorConstraint({})
@Injectable()
export class IsLuxonImpl implements ValidatorConstraintInterface {
	validate(luxon: DateTime, _validationArguments?: ValidationArguments) {
		return luxon.isValid
	}

	defaultMessage(validationArguments?: ValidationArguments) {
		const fieldName = validationArguments.property
		const message = `${fieldName} must be a valid Date`
		return message
	}
}
/**
 * @description Checks if a given value is a Luxon object.
 */
export function IsLuxon(validationOptions?: ValidationOptions) {
	return function (object: any, propertyName: string) {
		registerDecorator({
			target: object.constructor,
			propertyName,
			options: validationOptions,
			validator: IsLuxonImpl,
		})
	}
}
