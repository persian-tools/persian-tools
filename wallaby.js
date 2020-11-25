module.exports = (wallaby) => {
	return {
		files: ["src/**/*.ts"],
		tests: ["test/**/*.spec.ts"],
		compilers: {
			"**/*.ts": wallaby.compilers.typeScript({
				module: "commonjs",
				useStandardDefaults: true,
				typescript: require("typescript"),
			}),
		},
	};
};
