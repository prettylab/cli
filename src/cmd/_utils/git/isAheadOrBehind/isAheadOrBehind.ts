import { execa } from "execa";
import { IsAheadOrBehind } from "./types.js";

/* --------------------------------------------------------- */
/* Returns how many commits local is ahead and behind remote */
/* --------------------------------------------------------- */

const isAheadOrBehind = async (
  root: string,
  localSha: string,
  remoteRef: string,
): IsAheadOrBehind => {
  const { stdout } = await execa(
    "git",
    ["rev-list", "--left-right", "--count", `${localSha}...${remoteRef}`],
    { cwd: root },
  );
  const [aheadStr, behindStr] = stdout.trim().split(/\s+/);

  return {
    ahead: parseInt(aheadStr || "0", 10),
    behind: parseInt(behindStr || "0", 10),
  };
};

export default isAheadOrBehind;
