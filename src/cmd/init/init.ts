import path from "path";
import fs from "fs";
import os from "os";
import { Command } from "commander";
import prompts from "prompts";
import { defaultConfigFile } from "../../config/configFiles.js";
import success from "../_utils/display/logs/messages/success.js";
import isRootOfRepository from "../_utils/project/isRootOfRepository/isRootOfRepository.js";
import { Config } from "../_utils/project/_actions/getConfig/types.js";
import logSuccess from "../_utils/display/logs/caller/logSuccess.js";
import definition from "../../config/definition.js";

const init = (program: Command) => {
  program
    .command(definition.init.command)
    .description(definition.init.description)
    .action(async () => {
      const root = isRootOfRepository();
      const answers: any = await prompts([
        {
          name: "squash",
          type: "toggle",
          message: "Squash history?",
          initial: true,
          active: "yes",
          inactive: "no",
        },
        {
          name: "defaultBranch",
          type: "text",
          message: "Default branch",
          initial: "main",
        },
      ]);

      const cfg: Config = {
        modules: {},
        defaultBranch: answers.defaultBranch,
        squash: answers.squash,
      };

      const file = path.join(root, defaultConfigFile);
      fs.writeFileSync(file, JSON.stringify(cfg, null, 2) + os.EOL);
      logSuccess(success.CREATED_CONFIG_FILE);
    });
};

export default init;
