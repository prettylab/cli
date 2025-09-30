import { execa } from "execa";
import { IsModuleDirty } from "./types.js";

const isModuleDirty = async (root: string, prefix: string): IsModuleDirty => {
  const { stdout } = await execa(
    "git",
    ["status", "--porcelain", "--", prefix],
    { cwd: root },
  );
  return stdout.trim().length > 0;
};

export default isModuleDirty;
