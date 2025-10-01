import { Command } from "commander";
import isRootOfRepository from "../_utils/project/isRootOfRepository/isRootOfRepository.js";
import getConfig from "../_utils/project/_actions/getConfig/getConfig.js";
import runSubtree from "../_utils/git/runSubtree/runSubtree.js";
import definition from "../../config/definition.js";

const install = (program: Command) => {
  program
    .command(definition.install.command)
    .description(definition.install.description)
    .action(async (module) => {
      const root = isRootOfRepository();
      const cfg = getConfig(root);

      await runSubtree(root, "add", module, cfg);
    });
};

export default install;
