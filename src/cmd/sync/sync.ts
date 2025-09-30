import { Command } from "commander";
import * as kleur from "kleur";
import isRootOfRepository from "../_utils/project/isRootOfRepository/isRootOfRepository.js";
import getConfig from "../_utils/project/_actions/getConfig/getConfig.js";
import warning from "../_utils/display/logs/messages/warning.js";
import logWarning from "../_utils/display/logs/caller/logWarning.js";
import runSubtree from "../_utils/runSubtree/runSubtree.js";
import moduleStatus from "../_utils/moduleStatus/moduleStatus.js";
import definition from "../../config/definition.js";

const sync = (program: Command) => {
  program
    .command(definition.sync.command)
    .description(definition.sync.description)
    .option("--push", "After pulling, push modules that are ahead", false)
    .action(async (opts) => {
      const root = isRootOfRepository();
      const cfg = getConfig(root);
      const names = Object.keys(cfg.modules);

      if (!names.length) {
        logWarning(warning.NO_MODULES_FOUND);
        return;
      }

      for (const n of names) {
        console.log(kleur.bold(`\n[Pull] ${n}`));
        try {
          await runSubtree(root, "pull", n, cfg);
        } catch (e) {
          console.error(kleur.red(`[Pull failed] ${n}: ${String(e)}`));
        }
      }
      if (opts.push) {
        for (const n of names) {
          const s = await moduleStatus(root, n, cfg);
          if (s.ahead > 0) {
            console.log(kleur.bold(`\n[Push] ${n} (ahead:${s.ahead})`));
            try {
              await runSubtree(root, "push", n, cfg);
            } catch (e) {
              console.error(kleur.red(`[Push failed] ${n}: ${String(e)}`));
            }
          } else {
            console.log(kleur.gray(`[Skip push] ${n} is not ahead.`));
          }
        }
      }
      console.log(kleur.green("\nSync complete."));
    });
};

export default sync;
