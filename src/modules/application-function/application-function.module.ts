import { Module } from "@nestjs/common"
import { AaaModule } from "../aaa/aaa.module"
import { ErrorModule } from "../error/error.module"
import { PrismaModule } from "../prisma/prisma.module"
import { ApplicationFunctionController } from "./application-function.controller"
import { ApplicationFunctionService } from "./application-function.service"

@Module({
	providers: [ApplicationFunctionService],
	controllers: [ApplicationFunctionController],
	imports: [AaaModule, PrismaModule, ErrorModule],
})
export class ApplicationFunctionModule { }
