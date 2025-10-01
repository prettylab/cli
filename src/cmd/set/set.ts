import { Command } from "commander";
import success from "../_utils/display/logs/messages/success.js";
import isRootOfRepository from "../_utils/project/isRootOfRepository/isRootOfRepository.js";
import getConfig from "../_utils/project/_actions/getConfig/getConfig.js";
import logSuccess from "../_utils/display/logs/caller/logSuccess.js";
import definition from "../../config/definition.js";
import saveFile from "../_utils/file/saveFile/saveFile.js";
import createModuleVar from "../_utils/project/_actions/createModuleVar/createModuleVar.js";

const set = (program: Command) => {
  program
    .command(definition.set.command)
    .description(definition.set.description)
    .option("--remote <url>", "Git remote URL")
    .option("--branch <name>", "Branch name")
    .option("--prefix <path>", "Local prefix path")
    .action((name, options) => {
      const root = isRootOfRepository();
      const config = getConfig(root);

      config.modules[name] = {
        remote: createModuleVar(options, name, config, "remote"),
        branch: createModuleVar(
          options,
          name,
          config,
          "branch",
          config.defaultBranch ?? "main",
        ),
        prefix: createModuleVar(
          options,
          name,
          config,
          "prefix",
          `src/prettylab/${name}`,
        ),
      };

      saveFile(root, config);
      logSuccess(success.SAVED_MODULE(name));
    });
};

export default set;
