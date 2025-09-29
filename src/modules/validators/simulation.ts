import type { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from "class-validator"
import { Injectable } from "@nestjs/common"
import { registerDecorator, ValidatorConstraint } from "class-validator"
import { NodeEnvType } from "src/config"

@ValidatorConstraint({})
@Injectable()
export class IsSumulationNotInProductionImpl implements ValidatorConstraintInterface {
	validate(simulation: boolean, _validationArguments?: ValidationArguments) {
		return !simulation || process.env.NODE_ENV !== NodeEnvType.Production
	}

	defaultMessage() {
		const message = `Simulation mode should be deactivated in production mode.`
		return message
	}
}
/**
 * @description Checks if a given value is a Luxon object.
 */
export function IsSumulationNotInProduction(validationOptions?: ValidationOptions) {
	return function (object: any, propertyName: string) {
		registerDecorator({
			target: object.constructor,
			propertyName,
			options: validationOptions,
			validator: IsSumulationNotInProductionImpl,
		})
	}
}
