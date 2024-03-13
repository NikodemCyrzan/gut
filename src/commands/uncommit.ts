import chalk from "chalk";
import ArgsParser from "../argsParser";
import { readFile, writeFile } from "../files";
import { readCommits, writeCommits } from "./parsers";
import logText from "../console";

const uncommit = async (argsParser: ArgsParser) => {
	// read all commits
	const commitsPath = ".brifka/mem/commits",
		[commitsStatus, commits] = await readFile(commitsPath, readCommits);

	if (!commitsStatus) {
		console.error(chalk.red(`\n${logText.COMMIT_NOT_EXISTING}\n`));
		return;
	}

	// remove last
	const removedCommit = commits.pop();

	if (!removedCommit) {
		console.error(chalk.red(`\n${logText.COMMITS_EMPTY}\n`));
		return;
	}

	// write commits
	await writeFile(commitsPath, writeCommits(commits));

	console.error(
		`\n${chalk.green(logText.COMMIT_REMOVE_SUCCESS)}\n\n${logText.COMMIT_INFO(removedCommit.hash, removedCommit.timestamp, removedCommit.title)}\n`
	);
};

export default uncommit;
