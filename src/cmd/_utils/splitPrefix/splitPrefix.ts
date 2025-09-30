import { execa } from "execa";
import { SplitPrefix } from "./types.js";

const splitPrefix = async (root: string, prefix: string): SplitPrefix => {
  const { stdout } = await execa(
    "git",
    ["subtree", "split", "--prefix", prefix],
    { cwd: root },
  );
  return stdout.trim();
};

export default splitPrefix;
