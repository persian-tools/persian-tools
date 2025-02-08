import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
	entries: [
		{
			name: "persian-tools",
			input: "./src/index.ts",
			outDir: "./build",
			format: "esm",
		},
		{
			name: "persian-tools",
			input: "./src/index.ts",
			outDir: "./build",
			ext: "cjs",
			format: "cjs",
		},
	],
	outDir: "build",
	declaration: "compatible",
	sourcemap: true,
	clean: true,
	failOnWarn: false,
	rollup: {
		emitCJS: true,
		esbuild: {
			minify: true,
			color: true,
			globalName: "PersianTools",
			treeShaking: true,
		},
	},
});
