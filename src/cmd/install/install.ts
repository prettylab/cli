import { Command } from "commander";
import path from "path";
import fs from "fs";
import isRootOfRepository from "../_utils/project/isRootOfRepository/isRootOfRepository.js";
import fetchModules from "../_utils/modules/fetchModules/fetchModules.js";
import selectModules from "../_utils/prompts/selectModules/selectModules.js";
import getModulesContent from "../_utils/modules/getModulesContent/getModulesContent.js";
import saveFile from "../_utils/file/saveFile/saveFile.js";
import runSubtree from "../_utils/git/runSubtree/runSubtree.js";
import { Config } from "../_utils/project/_actions/getConfig/types.js";
import definition from "../../config/definition.js";
import { defaultConfigFile } from "../../config/configFiles.js";
import logSuccess from "../_utils/display/logs/caller/logSuccess.js";
import success from "../_utils/display/logs/messages/success.js";

const readExistingConfig = (root: string): Config | null => {
  const file = path.join(root, defaultConfigFile);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf8"));
};

const install = (program: Command) => {
  program
    .command(definition.install.command)
    .description(definition.install.description)
    .action(async () => {
      const root = isRootOfRepository();
      const { modules, defaultBranch } = await fetchModules();

      const existing = readExistingConfig(root);
      const installed = new Set(
        existing ? Object.keys(existing.modules ?? {}) : [],
      );

      const available: Record<string, any> = Object.fromEntries(
        Object.entries(modules).filter(([key]) => !installed.has(key)),
      );

      if (Object.keys(available).length === 0) {
        logSuccess("All available modules are already installed.");
        return;
      }

      const { selectedModules } = await selectModules(available);

      if (!selectedModules || selectedModules.length === 0) return;

      const newModules = getModulesContent(modules, selectedModules);

      const config: Config = {
        modules: { ...(existing?.modules ?? {}), ...newModules },
        defaultBranch: existing?.defaultBranch ?? defaultBranch,
      };

      saveFile(root, config);

      for (const module of selectedModules) {
        await runSubtree(root, "add", module, config);
      }

      for (const name of selectedModules) {
        logSuccess(success.SAVED_MODULE(name));
      }
    });
};

export default install;
