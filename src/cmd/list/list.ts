import { Command } from "commander";
import * as kleur from "kleur";
import warning from "../_utils/display/logs/messages/warning.js";
import isRootOfRepository from "../_utils/project/isRootOfRepository/isRootOfRepository.js";
import getConfig from "../_utils/project/_actions/getConfig/getConfig.js";
import logWarning from "../_utils/display/logs/caller/logWarning.js";
import definition from "../../config/definition.js";

const list = (program: Command) => {
  program
    .command(definition.list.command)
    .description(definition.list.description)
    .action(() => {
      const root = isRootOfRepository();
      const cfg = getConfig(root);
      const names = Object.keys(cfg.modules);

      if (!names.length) {
        logWarning(warning.NO_MODULES_FOUND);
        return;
      }

      names.forEach((n) => {
        const m = cfg.modules[n];
        console.log(
          `${kleur.bold(n)} → ${m.remote} (${m.branch}) @ ${m.prefix}`,
        );
      });
    });
};

export default list;
