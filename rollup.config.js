import fs from "fs";
import path from "path";
import json from "rollup-plugin-json";
import node from "rollup-plugin-node-resolve";
import progress from "rollup-plugin-progress";
import { terser } from "rollup-plugin-terser";
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
		},
		{
			file: pkg.browser,
			format: "umd",
			name: "PersianTools",
		},
	],
	plugins: [
		typescript({
			typescript: require("typescript"),
		}),
		json(),
		resolve({ browser: true, preferBuiltins: true }),
		commonjs(),
		node(),
		progress(),
		terser(),
	],
	external: [...Object.keys(pkg.dependencies || {})],
	onwarn: warning => {
		const { code } = warning;
		if (code === "CIRCULAR_DEPENDENCY" || code === "CIRCULAR" || code === "THIS_IS_UNDEFINED") {
			return;
		}
		console.warn("WARNING: ", warning.toString());
	},
};
