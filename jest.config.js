module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	modulePathIgnorePatterns: ["dist/.*", "src/.*"],
	testPathIgnorePatterns: ["node_modules/", "dist/", "src/"]
};
