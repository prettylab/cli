import { Command } from "commander";
import getConfig from "../_utils/project/_actions/getConfig/getConfig.js";
import isRootOfRepository from "../_utils/project/isRootOfRepository/isRootOfRepository.js";
import runSubtree from "../_utils/runSubtree/runSubtree.js";
import definition from "../../config/definition.js";

const pull = (program: Command) => {
  program
    .command(definition.pull.command)
    .description(definition.pull.description)
    .action(async (m) => {
      const root = isRootOfRepository();
      const cfg = getConfig(root);

      await runSubtree(root, "pull", m, cfg);
    });
};

export default pull;
