import { Command } from "commander";
import kleur from "kleur";
import isRootOfRepository from "../_utils/project/isRootOfRepository/isRootOfRepository.js";
import {
  getConfig,
  requireModule,
  saveConfig,
} from "../_utils/project/_actions/getConfig/getConfig.js";
import definition from "../../config/definition.js";

const unlock = (program: Command) => {
  program
    .command(definition.unlock.command)
    .description(definition.unlock.description)
    .action(async (name: string) => {
      const root = isRootOfRepository();
      const config = getConfig(root);
      const mod = requireModule(config, name);

      if (!mod.lockedAt) {
        console.log(kleur.yellow(`! '${name}' is not locked.`));
        return;
      }

      const previous = mod.lockedAt;
      const { lockedAt, ...rest } = mod;
      config.modules[name] = rest;
      saveConfig(root, config);

      console.log(
        kleur.green(
          `✓ Unlocked '${name}' (was at ${previous.slice(0, 7)}). Future pulls follow '${mod.branch}'.`,
        ),
      );
    });
};

export default unlock;
