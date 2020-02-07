module.exports = {
	printWidth: 120,
	tabWidth: 4,
	useTabs: true,
	semi: true,
	trailingComma: "all",
	overrides: [
		{
			files: [".prettierrc", ".json"],
			options: { parser: "json", useTabs: false, tabWidth: 2 },
		},
	],
};
