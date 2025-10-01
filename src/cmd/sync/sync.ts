import { Command } from "commander";
import kleur from "kleur";
import isRootOfRepository from "../_utils/project/isRootOfRepository/isRootOfRepository.js";
import getConfig from "../_utils/project/_actions/getConfig/getConfig.js";
import warning from "../_utils/display/logs/messages/warning.js";
import logWarning from "../_utils/display/logs/caller/logWarning.js";
import runSubtree from "../_utils/git/runSubtree/runSubtree.js";
import moduleStatus from "../_utils/modules/moduleStatus/moduleStatus.js";
import definition from "../../config/definition.js";
import log from "../_utils/display/logs/caller/log.js";
import logError from "../_utils/display/logs/caller/logError.js";
import logSuccess from "../_utils/display/logs/caller/logSuccess.js";

const sync = (program: Command) => {
  program
    .command(definition.sync.command)
    .description(definition.sync.description)
    .option("--push", "After pulling, push modules that are ahead", false)
    .action(async (opts) => {
      const root = isRootOfRepository();
      const config = getConfig(root);
      const names = Object.keys(config.modules);

      if (!names.length) {
        logWarning(warning.NO_MODULES_FOUND);
        return;
      }

      for (const name of names) {
        log(kleur.bold(`\n[Pull] ${name}`));

        try {
          await runSubtree(root, "pull", name, config);
        } catch (error) {
          logError(`[Pull failed] ${name}: ${String(error)}`);
        }
      }

      if (opts.push) {
        for (const name of names) {
          const status = await moduleStatus(root, name, config);

          if (!(status.ahead > 0)) {
            log(kleur.gray(`[Skip push] ${name} is not ahead.`));
            continue;
          }

          log(kleur.bold(`\n[Push] ${name} (ahead:${status.ahead})`));

          try {
            await runSubtree(root, "push", name, config);
          } catch (error) {
            logError(`[Push failed] ${name}: ${String(error)}`);
          }
        }
      }

      logSuccess("\nSync complete.");
    });
};

export default sync;
