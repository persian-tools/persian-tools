import { defineConfig } from "vitest/config";
import { resolve } from "node:path";

export default defineConfig({
	test: {
		fileParallelism: true,
		name: "Persian Tools",
		benchmark: {
			include: ["./benchmarks/**/*.bench.ts"],
		},
		typecheck: {
			enabled: true,
			checker: "tsc",
			ignoreSourceErrors: true,
			tsconfig: resolve(process.cwd(), "./tsconfig.json"),
		},
		coverage: {
			clean: true,
			provider: "v8",
			cleanOnRerun: true,
			reportOnFailure: true,
			include: ["**/src/**"],
			exclude: [
				"**/src/**/*.spec.ts",
				"**/src/**/*.test.ts",
				"**/src/**/*.bench.ts",
				"**/src/**/*.d.ts",
				"**/src/**/*.config.ts",
				"**/src/**/index.ts",
			],
			processingConcurrency: 4,
			reporter: ["clover", "json", "html", "html-spa"],
			reportsDirectory: resolve(__dirname, "./coverage"),
		},
		globals: true,
		isolate: true,
		update: true,
		printConsoleTrace: true,
		pool: "vmForks",
	},
});
