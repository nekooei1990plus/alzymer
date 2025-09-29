import { Module } from "@nestjs/common"
import { IsDecimalImpl } from "./decimal"
import { IsLuxonImpl } from "./luxon"
import { PasswordImpl } from "./password"
import { IsSumulationNotInProductionImpl } from "./simulation"

@Module({
	providers: [IsLuxonImpl, IsDecimalImpl, IsSumulationNotInProductionImpl, PasswordImpl],
	exports: [IsLuxonImpl, IsDecimalImpl, IsSumulationNotInProductionImpl, PasswordImpl],
})
export class ValidatorsModule { }
