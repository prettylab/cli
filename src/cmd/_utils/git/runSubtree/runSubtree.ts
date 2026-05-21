import kleur from "kleur";
import { execa } from "execa";
import { Config } from "../../project/_actions/getConfig/types.js";
import isRemoteExists from "../isRemoteExists/isRemoteExists.js";

const runSubtree = async (
  root: string,
  action: "add" | "pull" | "push",
  name: string,
  config: Config,
  refOverride?: string,
) => {
  const mod = config.modules[name];
  if (!mod) {
    console.error(kleur.red(`Unknown module '${name}'.`));
    process.exit(1);
  }

  const remoteAlias = `prettylab-${name}`;
  await isRemoteExists(root, remoteAlias, mod.remote);

  const ref =
    refOverride ?? mod.lockedAt ?? mod.branch ?? config.defaultBranch ?? "main";
  const prefix = mod.prefix;

  const baseArgs = ["subtree", action, "--prefix", prefix, remoteAlias, ref];
  const args = action === "push" ? baseArgs : [...baseArgs, "--squash"];

  await execa("git", args, { stdio: "inherit", cwd: root });
};

export default runSubtree;
