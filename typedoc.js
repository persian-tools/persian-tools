module.exports = {
	out: "./docs/",
	readme: "README.md",
	name: "Persian Tools",
	includes: "./src",
	entryPoints: ["./src/index.ts"],
	exclude: ["**/test/**/*", "**/*.js", "**/dist/**/*", "**/src/dummy/**"],
	excludeExternals: true,
	includeVersion: true,
	excludePrivate: false,
};
