import { execa } from "execa";

/* ---------------------------------------- */
/* Fetch updates from the remote repository */
/* ---------------------------------------- */

const fetchRemote = async (root: string, remoteAlias: string) => {
  await execa("git", ["fetch", remoteAlias, "--prune"], { cwd: root });
};

export default fetchRemote;
