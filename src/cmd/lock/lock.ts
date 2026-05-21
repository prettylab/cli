import { Command } from "commander";
import kleur from "kleur";
import { execa } from "execa";
import isRootOfRepository from "../_utils/project/isRootOfRepository/isRootOfRepository.js";
import {
  getConfig,
  requireModule,
  saveConfig,
} from "../_utils/project/_actions/getConfig/getConfig.js";
import isRemoteExists from "../_utils/git/isRemoteExists/isRemoteExists.js";
import definition from "../../config/definition.js";

const resolveCommit = async (
  root: string,
  remoteAlias: string,
  ref: string,
) => {
  await execa("git", ["fetch", remoteAlias, ref], {
    stdio: "inherit",
    cwd: root,
  });
  const { stdout } = await execa("git", ["rev-parse", "FETCH_HEAD"], {
    cwd: root,
  });
  return stdout.trim();
};

const lock = (program: Command) => {
  program
    .command(definition.lock.command)
    .description(definition.lock.description)
    .action(async (name: string, ref?: string) => {
      const root = isRootOfRepository();
      const config = getConfig(root);
      const mod = requireModule(config, name);

      const remoteAlias = `prettylab-${name}`;
      await isRemoteExists(root, remoteAlias, mod.remote);

      const target = ref ?? mod.branch;
      console.log(
        kleur.cyan(`→ Resolving '${target}' on ${mod.remote}...`),
      );
      const sha = await resolveCommit(root, remoteAlias, target);

      config.modules[name] = { ...mod, lockedAt: sha };
      saveConfig(root, config);

      console.log(
        kleur.green(`✓ Locked '${name}' at ${sha.slice(0, 7)} (${target}).`),
      );
    });
};

export default lock;
