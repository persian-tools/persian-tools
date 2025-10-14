module.exports = {
	printWidth: 120,
	tabWidth: 4,
	useTabs: true,
	semi: true,
	trailingComma: "all",
	experimentalTernaries: true,
	overrides: [
		{
			files: [".prettierrc", ".json"],
			options: { parser: "json", useTabs: false, tabWidth: 2 },
		},
		{
			files: ["*.md", "*.mdx"],
			options: { parser: "mdx" },
		},
		{
			files: ["*.yaml", "*.yml"],
			options: { parser: "yaml", useTabs: true, tabWidth: 2 },
		},
	],
};
