import fs from "fs";
import path from "path";
import json from "rollup-plugin-json";
import babel from "rollup-plugin-babel";
import { uglify } from "rollup-plugin-uglify";
import node from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import progress from "rollup-plugin-progress";
import { name, dependencies, version } from "../package.json";

const copyright = `// Persian-tools.js v${version} Copyright ${new Date().getFullYear()} Ali.Torki`;

const base = path.resolve(__dirname, "..");
const src = path.resolve(base, "src");
const dist = path.resolve(base, "dist");

// Ensure dist directory exists
if (!fs.existsSync(dist)) {
  fs.mkdirSync(dist);
}

function minify() {
  return uglify({
    output: {
      beautify: false,
      comments: false,
      preamble: copyright
    },
    compress: {
      drop_console: true
    },
    ie8: true,
    warnings: false,
    sourceMap: false
  });
}

function config({ input = null, plugins = [], output = {}, external = [] }) {
  return {
    input: input || path.resolve(src, "index.js"),
    plugins: [
      node(),
      // Polyfill require() from dependencies.
      commonjs({
        include: "node_modules/**"
      }),
      json(),
      // We need babel to compile the compiled_api.js generated proto file from es6 to es5.
      babel({
        plugins: ["external-helpers"]
      }),
      progress(),
      ...plugins
    ],
    output: {
      banner: copyright,
      ...output
    },
    external: [...Object.keys(dependencies), ...external],
    onwarn: warning => {
      let { code } = warning;
      if (
        code === "CIRCULAR_DEPENDENCY" ||
        code === "CIRCULAR" ||
        code === "THIS_IS_UNDEFINED"
      ) {
        return;
      }
      console.warn("WARNING: ", warning.toString());
    }
  };
}

export default config;
export { dist, name, src, base, minify };
