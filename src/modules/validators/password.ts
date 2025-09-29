import type { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from "class-validator"
import { Injectable } from "@nestjs/common"
import { registerDecorator, ValidatorConstraint } from "class-validator"

@ValidatorConstraint({})
@Injectable()
export class PasswordImpl implements ValidatorConstraintInterface {
	validate(password: unknown, _validationArguments?: ValidationArguments) {
		const isStr = typeof password === "string"
		if (!isStr)
			return false

		const hasLetters = (/[A-Z]+/i).test(password)
		const hasNumbers = (/\d+/).test(password)
		return hasLetters && hasNumbers
	}

	defaultMessage(validationArguments?: ValidationArguments) {
		const fieldName = validationArguments.property
		const message = `${fieldName} must be a valid password`
		return message
	}
}
/**
 * @description Checks if a given value is a Luxon object.
 */
export function Password(validationOptions?: ValidationOptions) {
	return function (object: any, propertyName: string) {
		registerDecorator({
			target: object.constructor,
			propertyName,
			options: validationOptions,
			validator: PasswordImpl,
		})
	}
}
