import { execa } from "execa";

const fetchRemote = async (root: string, remoteAlias: string) => {
  await execa("git", ["fetch", remoteAlias, "--prune"], { cwd: root });
};

export default fetchRemote;
