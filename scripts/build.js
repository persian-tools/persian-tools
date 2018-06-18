const shell = require("shelljs");
const chalk = require("chalk");

// remove dist dir
shell.rm("-rf", "./dist");

const umdBuild = shell.exec("npm run build:umd", { silent: true }).code;
const esmBuild = shell.exec("npm run build:esm", { silent: true }).code;
const modulesBuild = shell.exec("npm run build:modules", { silent: true }).code;

if (umdBuild !== 0) {
	console.log(chalk.red("Error: UMD build failed"));
	shell.exit(1);
} else {
	console.log(chalk.green("UMD build was successfully created"));
}

if (esmBuild !== 0) {
	console.log(chalk.red("Error: ESM build failed"));
	shell.exit(1);
} else {
	console.log(chalk.green("ESM build was successfully created"));
}

if (modulesBuild !== 0) {
	console.log(chalk.red("Error: Modules build failed"));
	shell.exit(1);
} else {
	console.log(chalk.green("The build of modules was successfully created"));
}
