import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { createInterface } from "node:readline";
import { fileURLToPath } from "node:url";

const cwd = fileURLToPath(new URL("../", import.meta.url));
const branch = "main";
const remote = "origin";

function run(command, args, { capture = false, failure } = {}) {
	const result = spawnSync(command, args, {
		cwd,
		encoding: "utf8",
		stdio: capture ? ["ignore", "pipe", "pipe"] : "inherit",
	});
	if (result.error) throw new Error(`${failure ?? command}：${result.error.message}`);
	if (result.status !== 0) {
		const detail = result.stderr?.trim();
		throw new Error(`${failure ?? `${command} 执行失败`}${detail ? `\n${detail}` : ""}`);
	}
	return result.stdout ?? "";
}

const git = (args, options) => run("git", args, options);
const readGit = (args) => git(args, { capture: true });
const changes = () =>
	readGit(["-c", "core.quotepath=false", "status", "--porcelain=v1", "--untracked-files=all"]);

async function confirm() {
	const prompt = createInterface({ input: process.stdin, output: process.stdout });
	try {
		const answer = await new Promise((resolve) => {
			prompt.once("close", () => resolve(""));
			prompt.question("输入 y 开始发布；直接回车取消：", resolve);
		});
		return /^y(?:es)?$/i.test(answer.trim());
	} finally {
		prompt.close();
	}
}

async function publish() {
	if (readGit(["rev-parse", "--show-prefix"]).trim() !== "") {
		throw new Error("请把发布脚本放在博客仓库的根目录下使用。");
	}
	if (readGit(["branch", "--show-current"]).trim() !== branch) {
		throw new Error(`当前不在 ${branch} 分支。请先切回 ${branch}，再运行发布脚本。`);
	}
	const gitDir = readGit(["rev-parse", "--absolute-git-dir"]).trim();
	if (["MERGE_HEAD", "CHERRY_PICK_HEAD", "REVERT_HEAD", "rebase-apply", "rebase-merge"]
		.some((state) => existsSync(join(gitDir, state)))) {
		throw new Error("仓库有尚未完成的合并、变基或撤销操作。请先处理完再发布。");
	}

	const pushUrl = readGit(["remote", "get-url", "--push", remote]).trim();
	const head = readGit(["rev-parse", "HEAD"]).trim();
	console.log(`发布目标：${pushUrl.replace(/^(https?:\/\/)[^/@]+@/i, "$1")} → ${branch}`);
	git(["fetch", "--no-tags", remote, `refs/heads/${branch}`], {
		failure: "无法检查 GitHub 上的分支，请检查网络或登录状态。",
	});
	const upstream = readGit(["rev-parse", "FETCH_HEAD"]).trim();
	const [ahead, behind] = readGit(["rev-list", "--left-right", "--count", `${head}...${upstream}`])
		.trim()
		.split(/\s+/)
		.map(Number);
	if (behind > 0) throw new Error("GitHub 上有本地尚未同步的提交。请先同步 main，再重新发布。");

	const pending = changes();
	if (!pending && ahead === 0) {
		console.log("没有需要发布的改动。");
		return;
	}

	const message = process.argv[2]?.trim() || "更新博客";
	if (ahead > 0) {
		console.log(`\n待推送的本地提交：\n${readGit(["log", "--oneline", `${upstream}..${head}`]).trimEnd()}`);
	}
	if (pending) console.log(`\n将提交以下改动（含未跟踪的新文件）：\n${pending.trimEnd()}\n提交说明：${message}`);
	if (!(await confirm())) {
		console.log("已取消，未提交或推送。");
		return;
	}

	console.log("\n正在构建站点和搜索索引…");
	const buildFailure = "构建失败，未提交或推送。请查看上方报错。";
	if (process.platform === "win32") {
		run(process.env.ComSpec || "cmd.exe", ["/d", "/c", "pnpm build"], { failure: buildFailure });
	} else {
		run("pnpm", ["build"], { failure: buildFailure });
	}

	if (readGit(["rev-parse", "HEAD"]).trim() !== head ||
		readGit(["branch", "--show-current"]).trim() !== branch || changes() !== pending) {
		throw new Error("构建期间分支、提交或改动列表发生变化。请重新运行并检查待发布内容。");
	}
	if (pending) {
		git(["add", "--all"]);
		git(["commit", "-m", message], { failure: "提交失败，尚未推送。请查看上方报错。" });
	}
	git(["push", remote, `HEAD:refs/heads/${branch}`], {
		failure: "推送失败。本地提交仍在，排除问题后可再次运行脚本。",
	});
	console.log("\n已推送到 GitHub。请到 Cloudflare Pages 的「部署」查看上线状态。");
}

try {
	await publish();
} catch (error) {
	console.error(`\n发布未完成：${error.message}`);
	process.exitCode = 1;
}
