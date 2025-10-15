import { defineConfig } from "bunup";
import { $ } from "bun";
import { version } from "./package.json" assert { type: "json" };

// Get git commit hash
let commitHash = "unknown";
const gitFile = Bun.file(".git");
try {
	if (await gitFile.exists()) {
		const commit = await $`git rev-parse --short HEAD`;
		commitHash = commit.text("utf-8").trim();
	}
} catch {
	// Fallback if the git command fails
	commitHash = "dev";
}

// Get a build timestamp
const buildTime = new Date().toISOString();

// Create footer with version and build info
const createFooter = () =>
	`
// 🚀 Persian Tools v${version} (${commitHash})
// Built on ${buildTime}
// Created with ❤️ by Ali Torki <ali_4286@live.com>
// https://github.com/persian-tools/persian-tools
`.trim();

/**
 * @internal
 */
const config = defineConfig([
	{
		entry: ["src/index.ts"],
		format: ["esm"],
		outDir: "./build/esm",
		footer: createFooter(),
		dts: true,
		clean: true,
		minify: true,
		exports: true,
		report: {
			brotli: true,
			gzip: true,
			// Maximum bundle size in bytes. Will warn if exceeded.
			maxBundleSize: 830 * 1024, // 830 KB
		},
		shims: true,
		unused: true,
		splitting: true,
		sourcemap: false,
		minifyWhitespace: true,
		minifyIdentifiers: true,
		minifySyntax: true,
		name: "ESM Bundle",
	},
	{
		entry: ["src/index.ts"],
		format: ["cjs"],
		outDir: "./build/cjs",
		footer: createFooter(),
		dts: true,
		clean: true,
		minify: true,
		exports: true,
		report: {
			brotli: true,
			gzip: true,
			// Maximum bundle size in bytes. Will warn if exceeded.
			maxBundleSize: 830 * 1024, // 830 KB
		},
		shims: true,
		unused: true,
		splitting: true,
		sourcemap: false,
		minifyWhitespace: true,
		minifyIdentifiers: true,
		minifySyntax: true,
		name: "CJS Bundle",
	},
]);

export default config;
