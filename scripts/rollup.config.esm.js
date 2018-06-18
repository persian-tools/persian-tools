import path from "path";
import config, { dist, name } from "./rollup.config";

export default config({
	output: {
		format: "es",
		sourcemap: true,
		file: path.resolve(dist, name + ".esm.js")
	}
});
