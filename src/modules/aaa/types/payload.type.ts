import type { UserRole } from "@prisma/client"

export type PayloadType = {
	username: string
	name: string
	role: UserRole
	id: string
	active: boolean
	diagnosis: boolean
	isEngineer: boolean
}
