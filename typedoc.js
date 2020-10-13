module.exports = {
	out: "./docs/",
	readme: "README.md",
	name: "Persian Tools",
	includes: "./src",
	exclude: ["**/test/**/*", "**/*.js", "**/dist/**/*", "**/src/dummy/**"],
	mode: "modules",
	excludeExternals: true,
	includeDeclarations: true,
	includeVersion: true,
	excludeNotExported: true,
	excludePrivate: false,
	experimentalDecorators: true,
};
