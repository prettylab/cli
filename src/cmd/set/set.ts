import { Command } from "commander";
import path from "path";
import fs from "fs";
import os from "os";
import { defaultConfigFile } from "../../config/configFiles.js";
import success from "../_utils/display/logs/messages/success.js";
import isRootOfRepository from "../_utils/project/isRootOfRepository/isRootOfRepository.js";
import getConfig from "../_utils/project/_actions/getConfig/getConfig.js";
import logSuccess from "../_utils/display/logs/caller/logSuccess.js";
import definition from "../../config/definition.js";

const set = (program: Command) => {
  program
    .command(definition.set.command)
    .description(definition.set.description)
    .option("--remote <url>", "Git remote URL")
    .option("--branch <name>", "Branch name")
    .option("--prefix <path>", "Local prefix path")
    .action((name, opts) => {
      const root = isRootOfRepository();
      const cfg = getConfig(root);

      cfg.modules[name] = {
        remote: opts.remote ?? cfg.modules[name]?.remote ?? "",
        branch:
          opts.branch ??
          cfg.modules[name]?.branch ??
          cfg.defaultBranch ??
          "main",
        prefix:
          opts.prefix ?? cfg.modules[name]?.prefix ?? `src/shared/${name}`,
      };

      const file = path.join(root, ".pretty-subtree.json");
      fs.writeFileSync(file, JSON.stringify(cfg, null, 2) + os.EOL);
      logSuccess(success.SAVED_MODULE(name));
    });
};

export default set;
