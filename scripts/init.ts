import process from "node:process"
import { Prisma, PrismaClient } from "@prisma/client"
import { generate } from "generate-password"
import { exec } from "promisify-child-process"
import { hashSha1 } from "src/common/utils"

async function main() {
	const primsa = new PrismaClient()

	console.log("Creating First User...")

	try {
		const password = generate({ numbers: true })

		await exec("npx prisma db push", { env: process.env })

		await primsa.user.create({
			data: {
				canDiagnosis: true,
				name: "Root",
				password: hashSha1(password),
				role: "Root",
				username: "root",
			},
		})
		console.log(password)

		console.log(`User Created, Loging with username "root" and password "${password}"`)
	}
	catch (e) {
		const isPrismaError = e instanceof Prisma.PrismaClientKnownRequestError

		if (isPrismaError && e.code == "P2002") {
			console.error("User Already Exists, Nothing to do, Exitting.")
			process.exit(1)
		}

		else {
			console.error(e)
			process.exit(1)
		}
	}
}

main()
