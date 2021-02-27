module.exports = {
	preset: "ts-jest",
	collectCoverage: true,
	testEnvironment: "node",
	moduleDirectories: ["src", "node_modules"],
	moduleFileExtensions: ["js", "ts", "json"],
	testPathIgnorePatterns: ["/node_modules/"],
	transformIgnorePatterns: ["<rootDir>/node_modules/"],
	setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
	collectCoverageFrom: [
		"!**/*.d.ts",
		"!**/node_modules/**",
		"src/**/*.ts",
		"!src/dummy/*.ts",
		"!src/modules/**/*.skip.ts",
		"!src/setupTests.js",
		"!src/index.ts",
	],
};
