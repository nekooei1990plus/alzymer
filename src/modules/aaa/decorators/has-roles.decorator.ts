import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common"
import { HasRole } from "../guards/has-role.guard"

export function HasRoles(...roles: string[]) {
	return applyDecorators(
		SetMetadata("roles", roles),
		UseGuards(HasRole),
	)
}
