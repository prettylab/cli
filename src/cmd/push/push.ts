import { Command } from "commander";
import isRootOfRepository from "../_utils/project/isRootOfRepository/isRootOfRepository.js";
import getConfig from "../_utils/project/_actions/getConfig/getConfig.js";
import runSubtree from "../_utils/git/runSubtree/runSubtree.js";
import definition from "../../config/definition.js";

const push = (program: Command) => {
  program
    .command(definition.push.command)
    .description(definition.push.description)
    .action(async (module) => {
      const root = isRootOfRepository();
      const config = getConfig(root);

      await runSubtree(root, "push", module, config);
    });
};

export default push;
