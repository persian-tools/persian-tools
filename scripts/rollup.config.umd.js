import path from "path";
import config, { dist, name } from "./rollup.config";

export default config({
	output: {
		format: "umd",
		name: "persian-tools",
		extend: true,
		file: path.resolve(dist, name + ".js")
	}
});
