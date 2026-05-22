import { Command } from "commander";
import kleur from "kleur";
import prompts from "prompts";
import { execa } from "execa";
import fs from "fs";
import path from "path";
import isRootOfRepository from "../_utils/project/isRootOfRepository/isRootOfRepository.js";
import {
  getConfig,
  requireModule,
} from "../_utils/project/_actions/getConfig/getConfig.js";
import runSubtree from "../_utils/git/runSubtree/runSubtree.js";
import definition from "../../config/definition.js";

const isIgnored = async (root: string, prefix: string) => {
  try {
    await execa("git", ["check-ignore", "-q", prefix], { cwd: root });
    return true;
  } catch {
    return false;
  }
};

const prefixHasChanges = async (root: string, prefix: string) => {
  const { stdout } = await execa(
    "git",
    ["status", "--porcelain", "--", prefix],
    { cwd: root },
  );
  return stdout.trim().length > 0;
};

const push = (program: Command) => {
  program
    .command(definition.push.command)
    .description(definition.push.description)
    .action(async (name: string) => {
      const root = isRootOfRepository();
      const config = getConfig(root);
      const mod = requireModule(config, name);

      if (mod.lockedAt) {
        console.log(
          kleur.red(
            `✗ '${name}' is locked at ${mod.lockedAt.slice(0, 7)}. Unlock it before pushing.`,
          ),
        );
        process.exit(1);
      }

      if (!fs.existsSync(path.join(root, mod.prefix))) {
        console.log(
          kleur.red(
            `✗ '${mod.prefix}' does not exist. Run 'pretty pull ${name}' or reinstall the module.`,
          ),
        );
        process.exit(1);
      }

      if (await isIgnored(root, mod.prefix)) {
        console.log(
          kleur.red(
            `✗ '${mod.prefix}' is excluded by .gitignore — git subtree needs this folder to be tracked. Remove it from .gitignore and try again.`,
          ),
        );
        process.exit(1);
      }

      const hasChanges = await prefixHasChanges(root, mod.prefix);
      if (!hasChanges) {
        console.log(
          kleur.yellow(`! No changes detected under '${mod.prefix}'.`),
        );
        return;
      }

      const { message } = await prompts({
        type: "text",
        name: "message",
        message: `Commit message for '${name}'`,
        validate: (v: string) => (v.trim().length > 0 ? true : "Required"),
      });

      if (!message) return;

      console.log(kleur.cyan(`→ Committing changes under '${mod.prefix}'...`));
      await execa("git", ["add", "--", mod.prefix], {
        stdio: "inherit",
        cwd: root,
      });
      await execa("git", ["commit", "-m", message], {
        stdio: "inherit",
        cwd: root,
      });

      console.log(
        kleur.cyan(`→ Pushing '${name}' to ${mod.remote} (${mod.branch})...`),
      );
      await runSubtree(root, "push", name, config);

      console.log(kleur.green(`✓ Pushed '${name}' upstream.`));
    });
};

export default push;
