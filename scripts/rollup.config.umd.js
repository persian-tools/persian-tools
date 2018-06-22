import path from "path";
import config, { dist, name, minify } from "./rollup.config";

export default [
	config({
		output: {
			format: "umd",
			extend: true,
			sourcemap: true,
			name: "persian-tools",
			file: path.resolve(dist, name + ".umd.js")
		}
	}),
	config({
		plugins: [minify()],
		output: {
			format: "umd",
			name: "persian-tools-min",
			file: path.resolve(dist, name + ".umd.min.js")
		}
	})
];
