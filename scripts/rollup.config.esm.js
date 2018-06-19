import path from "path";
import config, { dist } from "./rollup.config";

export default config({
	output: {
		format: "es",
		sourcemap: true,
		file: path.resolve(dist, "index.esm.js")
	}
});
