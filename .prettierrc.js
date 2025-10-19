module.exports = {
	printWidth: 120,
	tabWidth: 2,
	useTabs: true,
	semi: true,
	trailingComma: "all",
	experimentalTernaries: true,
	overrides: [
		{
			files: [".prettierrc", ".json"],
			options: { parser: "json", useTabs: false },
		},
		{
			files: ["*.md", "*.mdx"],
			options: { parser: "mdx" },
		},
		{
			files: ["*.yaml", "*.yml"],
			options: { parser: "yaml" },
		},
	],
};
