import { Command } from "commander";
import success from "../_utils/display/logs/messages/success.js";
import isRootOfRepository from "../_utils/project/isRootOfRepository/isRootOfRepository.js";
import { Config } from "../_utils/project/_actions/getConfig/types.js";
import logSuccess from "../_utils/display/logs/caller/logSuccess.js";
import definition from "../../config/definition.js";
import fetchModules from "../_utils/modules/fetchModules/fetchModules.js";
import selectModules from "../_utils/prompts/selectModules/selectModules.js";
import getModulesContent from "../_utils/modules/getModulesContent/getModulesContent.js";
import saveFile from "../_utils/file/saveFile/saveFile.js";
import runSubtree from "../_utils/git/runSubtree/runSubtree.js";

const init = (program: Command) => {
  program
    .command(definition.init.command)
    .description(definition.init.description)
    .action(async () => {
      const root = isRootOfRepository();
      const { modules, defaultBranch } = await fetchModules();
      const { selectedModules } = await selectModules(modules);

      if (!selectedModules || selectedModules.length === 0) return;

      const config: Config = {
        modules: getModulesContent(modules, selectedModules),
        defaultBranch,
      };

      saveFile(root, config);

      for (const module of selectedModules) {
        await runSubtree(root, "add", module, config);
      }

      logSuccess(success.CREATED_CONFIG_FILE);
    });
};

export default init;
