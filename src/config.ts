import { Transform } from "class-transformer"
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsPort, IsString, Validate } from "class-validator"
import { IsSumulationNotInProduction } from "./modules/validators/simulation"

export enum NodeEnvType {
	Production = "production",
	Development = "development",
	Test = "test",
	Docker = "docker",
}

export class Config {
	@IsString()
	public swaggerApiPath!: string

	@IsEnum(NodeEnvType)
	public NODE_ENV!: NodeEnvType

	@IsString()
	public swaggerApiDocPath!: string 

	@IsPort()
	public serverPort!: string

	@IsString()
	public DATABASE_CONNECTION_URL!: string

	@IsString() 
	public jwtSecret!: string

	@IsString()
	public uploadDirectory!: string

	@IsString()
	public backupDirectory!: string

	@IsString()
	public aesSecretInHex!: string

	@Transform(({ value }) => value === "true")
	@IsSumulationNotInProduction()
	@IsBoolean()
	public simulation!: boolean

	@IsString()
	@IsOptional()
	public mockDataPath?: string

	@IsPort()
	public tftpPort!: string

	@IsString()
	public tftpFileNameExported!: string

	@Transform(({ value }) => Number.parseInt(value))
	@IsNumber()
	public nemobusTimeoutInMs!: number
}
