import path from "path";
import globby from "globby";
import config, { dist, src, minify } from "./rollup.config";

export default (async load => {
	let paths = await load(["./src/modules/*.js"]);

	if (paths.length > 0) {
		paths = paths.map(local => path.basename(local, ".js"));
		let buildConfig = [];
		paths.forEach(pathName => {
			buildConfig.push(
				config({
					input: path.resolve(`${src}/modules`, pathName + ".js"),
					output: {
						format: "umd",
						name: pathName,
						extend: true,
						file: path.resolve(`${dist}/modules`, pathName + ".js")
					}
				})
			);

			buildConfig.push(
				config({
					input: path.resolve(`${src}/modules`, pathName + ".js"),
					output: {
						format: "umd",
						name: pathName,
						extend: true,
						file: path.resolve(
							`${dist}/modules`,
							pathName + ".min.js"
						)
					},
					plugins: [minify()]
				})
			);
		});

		return buildConfig;
	} else {
		return new Error("Not found any module");
	}
})(globby);
