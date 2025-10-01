import { execa } from "execa";
import logSuccess from "../../display/logs/caller/logSuccess.js";

const isRemoteExists = async (root: string, name: string, url: string) => {
  const { stdout } = await execa("git", ["remote"], { cwd: root });
  const remotes = stdout.split(/\r?\n/);

  if (!remotes.includes(name)) {
    await execa("git", ["remote", "add", name, url], { cwd: root });
    logSuccess(`Added remote '${name}' → ${url}`);
  }
};

export default isRemoteExists;
