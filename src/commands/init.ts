import chalk from "chalk";
import ArgsParser from "../argsParser";
import { Config } from "../config";
import fs from "node:fs/promises";
import { createDirectory, writeFile } from "../files";
import logText from "../console";
import { BRIGNORE, COMMITS, CONFIG, HEAD, REPOSITORY, TRACKED } from "../paths";

const init = async (argsParser: ArgsParser) => {
	writeFile(COMMITS);
	writeFile(TRACKED);
	writeFile(HEAD);

	createDirectory(REPOSITORY);

	const defaultConfig: Config = {
		env: {
			"BRIFKA_EXAMPLE": JSON.parse(await fs.readFile("package.json", "utf8"))?.version ?? "error"
		},
		ftp: {
			host: "localhost",
			port: "default",
			user: "anonymus",
			password: "anonymus@",
			directory: "",
		},
	};

	writeFile(CONFIG, JSON.stringify(defaultConfig, undefined, 2));
	writeFile(BRIGNORE, CONFIG);

	writeFile("example.js", `console.log("%BRIFKA_EXAMPLE%");`);

	console.log(chalk.green(`\n${logText.INIT_SUCCESS}\n`));
};

export default init;
