import { defineConfig } from "vitest/config";
import * as path from "node:path";

export default defineConfig({
	test: {
		name: "Persian Tools",
		server: {
			sourcemap: "inline",
		},
		fileParallelism: true,
		coverage: {
			clean: true,
			reporter: ["html", "html-spa"],
			all: false,
			cleanOnRerun: true,
			provider: "v8",
			reportOnFailure: true,
			reportsDirectory: path.resolve(__dirname, "./coverage"),
			include: ["**/src/**"],
		},
		dir: path.resolve(__dirname, "./test"),
		cache: false,
		globals: true,
	},
});
