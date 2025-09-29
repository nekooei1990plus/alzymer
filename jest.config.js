export default {
	rootDir: ".",
	moduleFileExtensions: ["js", "json", "ts"],
	extensionsToTreatAsEsm: [".ts", ".mts"],
	modulePaths: ["<rootDir>"],
	testRegex: "\\.test\\.ts$",
	coverageDirectory: "./coverage",
	coverageReporters: ["html"],
	testEnvironment: "node",
	coveragePathIgnorePatterns: [
		"<rootDir>/src/utils",
	],
	transform: {
		"^.+\\.(t|j)s$": ["@swc/jest"],
	},
}
