// url-encoder.ts

import clipboard from "clipboardy"
import { Command } from "commander"
// Function to encode a string as a URL parameter
function encodeAsUrlParameter(inputString: string): string {
	return encodeURIComponent(inputString)
}

// Main function to handle command line arguments
function main() {
	// Create a new commander program
	const program = new Command()

	// Define the command and its options
	program
		.name("url-encoder")
		.description("Encode a string as a URL parameter")
		.argument("<string>", "The string to encode")
		.action(async (inputString) => {
			// Encode the string as a URL parameter
			const encodedString = encodeAsUrlParameter(inputString)
			console.log(`Encoded Value: ${encodedString} - Copied to Clipboard`)
			await clipboard.write(encodedString)
		})

	// Parse the command line arguments
	program.parse(process.argv)
}

// Run the main function
main()
