import kleur from "kleur";
import { execa } from "execa";
import { Config } from "../../project/_actions/getConfig/types.js";
import isRemoteExists from "../isRemoteExists/isRemoteExists.js";

const runSubtree = async (
  root: string,
  action: "add" | "pull" | "push",
  name: string,
  config: Config,
) => {
  const mod = config.modules[name];
  if (!mod) {
    console.error(kleur.red(`Unknown module '${name}'. Use 'pretty list'.`));
    process.exit(1);
  }

  const remoteAlias = `prettylab-${name}`;
  await isRemoteExists(root, remoteAlias, mod.remote);

  const branch = mod.branch || config.defaultBranch || "main";
  const prefix = mod.prefix;

  if (action === "add") {
    const args = [
      "subtree",
      "add",
      "--prefix",
      prefix,
      remoteAlias,
      branch,
      "--squash",
    ];
    await execa("git", args, { stdio: "inherit", cwd: root });
  } else if (action === "pull") {
    const args = [
      "subtree",
      "pull",
      "--prefix",
      prefix,
      remoteAlias,
      branch,
      "--squash",
    ];
    await execa("git", args, { stdio: "inherit", cwd: root });
  } else if (action === "push") {
    const args = ["subtree", "push", "--prefix", prefix, remoteAlias, branch];
    await execa("git", args, { stdio: "inherit", cwd: root });
  }
};

export default runSubtree;
