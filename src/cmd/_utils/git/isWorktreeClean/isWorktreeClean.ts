import { execa } from "execa";
import { IsWorktreeClean } from "./types.js";

const isWorktreeClean = async (root: string): IsWorktreeClean => {
  const { stdout } = await execa("git", ["status", "--porcelain"], {
    cwd: root,
  });
  return stdout.trim().length === 0;
};

export default isWorktreeClean;
