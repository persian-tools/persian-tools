import fs from "fs";
import path from "path";
import json from "rollup-plugin-json";
import replace from "rollup-plugin-replace";
import node from "rollup-plugin-node-resolve";
import progress from "rollup-plugin-progress";
import { terser } from "rollup-plugin-terser";
import sourceMaps from "rollup-plugin-sourcemaps";
import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import pkg from "./package.json";

const copyright = `// Persian-tools.js v${pkg.version} Copyright ${new Date().getFullYear()} Ali.Torki`;

const base = path.resolve(__dirname, "..");
const dist = path.resolve(base, "dist");

fs.unlink("dist/index.d.ts", () => {});

// Ensure dist directory exists
if (!fs.existsSync(dist)) {
	fs.mkdirSync(dist);
}

module.exports = {
	input: path.resolve("src/index.ts"),
	output: [
		{
			file: pkg.main,
			format: "cjs",
		},
		{
			file: pkg.module,
			format: "es",
			sourcemap: true,
		},
		{
			file: pkg.browser,
			format: "umd",
			name: "PersianTools",
			sourcemap: true,
		},
	],
	watch: {
		include: "src/**",
	},
	plugins: [
		typescript({
			rollupCommonJSResolveHack: false,
			clean: true,
		}),
		json(),
		resolve({ jsnext: true, main: true, browser: true, preferBuiltins: false }),
		commonjs(),
		node(),
		progress(),
		terser({
			compress: {
				unused: false,
				collapse_vars: false,
			},
			output: {
				comments: false,
			},
		}),
		// Resolve source maps to the original source
		sourceMaps(),
		replace({
			exclude: "node_modules/**",
			ENV: JSON.stringify(process.env.NODE_ENV || "development"),
		}),
	],
	external: [...Object.keys(pkg.dependencies || {})],
	onwarn: (warning) => {
		const { code } = warning;
		if (code === "CIRCULAR_DEPENDENCY" || code === "CIRCULAR" || code === "THIS_IS_UNDEFINED") {
			return;
		}
		console.warn("WARNING: ", warning.toString());
	},
};
