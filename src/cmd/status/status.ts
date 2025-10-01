import { Command } from "commander";
import warning from "../_utils/display/logs/messages/warning.js";
import isWorktreeClean from "../_utils/git/isWorktreeClean/isWorktreeClean.js";
import isRootOfRepository from "../_utils/project/isRootOfRepository/isRootOfRepository.js";
import getConfig from "../_utils/project/_actions/getConfig/getConfig.js";
import logWarning from "../_utils/display/logs/caller/logWarning.js";
import moduleStatus from "../_utils/moduleStatus/moduleStatus.js";
import formatStatus from "../_utils/display/format/formatStatus/formatStatus.js";
import definition from "../../config/definition.js";
import log from "../_utils/display/logs/caller/log.js";

const status = (program: Command) => {
  program
    .command(definition.status.command)
    .description(definition.status.description)
    .option("--module <name>", "Check a single module")
    .action(async (opts) => {
      const root = isRootOfRepository();
      const config = getConfig(root);
      const names = opts.module ? [opts.module] : Object.keys(config.modules);

      if (!names.length) {
        logWarning(warning.NO_MODULES_FOUND);
        return;
      }

      const clean = await isWorktreeClean(root);
      if (!clean) {
        logWarning(warning.DIRTY_WORKTREE);
      }

      for (const name of names) {
        const status = await moduleStatus(root, name, config);
        log(formatStatus(status));
      }
    });
};

export default status;
