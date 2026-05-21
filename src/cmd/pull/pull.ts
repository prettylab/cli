import { Command } from "commander";
import kleur from "kleur";
import { execa } from "execa";
import isRootOfRepository from "../_utils/project/isRootOfRepository/isRootOfRepository.js";
import {
  getConfig,
  requireModule,
} from "../_utils/project/_actions/getConfig/getConfig.js";
import runSubtree from "../_utils/git/runSubtree/runSubtree.js";
import definition from "../../config/definition.js";

const headSha = async (root: string) => {
  const { stdout } = await execa("git", ["rev-parse", "HEAD"], { cwd: root });
  return stdout.trim();
};

const isDirty = async (root: string) => {
  const { stdout } = await execa("git", ["status", "--porcelain"], {
    cwd: root,
  });
  return stdout.trim().length > 0;
};

const countCommits = async (root: string, from: string, to: string) => {
  const { stdout } = await execa(
    "git",
    ["rev-list", "--count", `${from}..${to}`],
    { cwd: root },
  );
  return parseInt(stdout.trim(), 10) || 0;
};

const pull = (program: Command) => {
  program
    .command(definition.pull.command)
    .description(definition.pull.description)
    .action(async (name: string) => {
      const root = isRootOfRepository();
      const config = getConfig(root);
      const mod = requireModule(config, name);

      const dirty = await isDirty(root);
      let stashed = false;

      if (dirty) {
        console.log(
          kleur.yellow(`! Local changes detected — stashing before pull...`),
        );
        await execa(
          "git",
          ["stash", "push", "-u", "-m", `pretty-pull-${name}`],
          { stdio: "inherit", cwd: root },
        );
        stashed = true;
      }

      const before = await headSha(root);

      console.log(
        kleur.cyan(
          `→ Pulling '${name}' from ${mod.remote} (${mod.lockedAt ? `locked@${mod.lockedAt.slice(0, 7)}` : mod.branch})`,
        ),
      );

      try {
        await runSubtree(root, "pull", name, config);
      } catch (err) {
        if (stashed) {
          console.log(
            kleur.yellow(`! Pull failed — restoring stashed changes...`),
          );
          await execa("git", ["stash", "pop"], { stdio: "inherit", cwd: root });
        }
        throw err;
      }

      const after = await headSha(root);
      const added = await countCommits(root, before, after);

      if (stashed) {
        console.log(kleur.cyan(`→ Restoring stashed changes...`));
        await execa("git", ["stash", "pop"], { stdio: "inherit", cwd: root });
      }

      if (added === 0) {
        console.log(kleur.green(`✓ '${name}' is already up to date.`));
      } else {
        console.log(
          kleur.green(
            `✓ Pulled ${added} new commit${added === 1 ? "" : "s"} into '${mod.prefix}'.`,
          ),
        );
      }
    });
};

export default pull;
