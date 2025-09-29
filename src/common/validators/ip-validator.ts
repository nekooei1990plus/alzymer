import type { ValidatorConstraintInterface } from "class-validator"
import { ValidatorConstraint } from "class-validator"

@ValidatorConstraint({ name: "customText", async: false })
export class IpValidator implements ValidatorConstraintInterface {
	validate(text: string) {
		const ipSplitted = text.split(".")
		const size = ipSplitted.length
		if (size !== 4) {
			return false
		}
		let isValid = true
		for (let index = 0; index < size; index++) {
			const temp = +ipSplitted.at(index)
			if (Number.isNaN(temp) || temp < 0 || temp > 255) {
				isValid = false
				break
			}
		}
		return isValid
	}

	defaultMessage() {
		return "Inserted IP is not valid."
	}
}
