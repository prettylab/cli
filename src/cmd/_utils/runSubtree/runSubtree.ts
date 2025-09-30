import * as kleur from "kleur";
import { execa } from "execa";
import { Config } from "../project/_actions/getConfig/types.js";
import isRemoteExists from "../git/isRemoteExists/isRemoteExists.js";

const runSubtree = async (
  root: string,
  action: "add" | "pull" | "push",
  mname: string,
  cfg: Config,
) => {
  const mod = cfg.modules[mname];
  if (!mod) {
    console.error(
      kleur.red(`Unknown module '${mname}'. Use 'pretty-subtree list'.`),
    );
    process.exit(1);
  }
  const remoteAlias = `pretty-${mname}`;
  await isRemoteExists(root, remoteAlias, mod.remote);

  const branch = mod.branch || cfg.defaultBranch || "main";
  const prefix = mod.prefix;
  const squash = cfg.squash !== false;

  if (action === "add") {
    const args = ["subtree", "add", "--prefix", prefix, remoteAlias, branch];
    if (squash) args.push("--squash");
    await execa("git", args, { stdio: "inherit", cwd: root });
  } else if (action === "pull") {
    const args = ["subtree", "pull", "--prefix", prefix, remoteAlias, branch];
    if (squash) args.push("--squash");
    await execa("git", args, { stdio: "inherit", cwd: root });
  } else if (action === "push") {
    const args = ["subtree", "push", "--prefix", prefix, remoteAlias, branch];
    await execa("git", args, { stdio: "inherit", cwd: root });
  }
};

export default runSubtree;
