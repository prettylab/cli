import { Command } from "commander";
import isRootOfRepository from "../_utils/project/isRootOfRepository/isRootOfRepository.js";
import getConfig from "../_utils/project/_actions/getConfig/getConfig.js";
import runSubtree from "../_utils/runSubtree/runSubtree.js";
import definition from "../../config/definition.js";

const push = (program: Command) => {
  program
    .command(definition.push.command)
    .description(definition.push.description)
    .action(async (m) => {
      const root = isRootOfRepository();
      const cfg = getConfig(root);

      await runSubtree(root, "push", m, cfg);
    });
};

export default push;
