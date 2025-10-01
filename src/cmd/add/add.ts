import { Command } from "commander";
import isRootOfRepository from "../_utils/project/isRootOfRepository/isRootOfRepository.js";
import getConfig from "../_utils/project/_actions/getConfig/getConfig.js";
import runSubtree from "../_utils/runSubtree/runSubtree.js";
import definition from "../../config/definition.js";

const add = (program: Command) => {
  program
    .command(definition.add.command)
    .description(definition.add.description)
    .action(async (module) => {
      const root = isRootOfRepository();
      const cfg = getConfig(root);

      await runSubtree(root, "add", module, cfg);
    });
};

export default add;
