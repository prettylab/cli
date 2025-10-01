import { Command } from "commander";
import warning from "../_utils/display/logs/messages/warning.js";
import isRootOfRepository from "../_utils/project/isRootOfRepository/isRootOfRepository.js";
import getConfig from "../_utils/project/_actions/getConfig/getConfig.js";
import logWarning from "../_utils/display/logs/caller/logWarning.js";
import definition from "../../config/definition.js";
import log from "../_utils/display/logs/caller/log.js";
import formatModule from "../_utils/display/format/formatModule/formatModule.js";

const list = (program: Command) => {
  program
    .command(definition.list.command)
    .description(definition.list.description)
    .action(() => {
      const root = isRootOfRepository();
      const config = getConfig(root);
      const names = Object.keys(config.modules);

      if (!names.length) {
        logWarning(warning.NO_MODULES_FOUND);
        return;
      }

      names.forEach((name) => {
        const module = config.modules[name];
        log(formatModule(name, module));
      });
    });
};

export default list;
