import path from "path";
import fs from "fs";
import os from "os";
import { defaultConfigFile } from "../../../../../config/configFiles.js";
import error from "../../../display/logs/messages/error.js";
import { Config } from "./types.js";
import logError from "../../../display/logs/caller/logError.js";

export const configPath = (root: string) => path.join(root, defaultConfigFile);

export const getConfig = (root: string): Config => {
  const file = configPath(root);

  if (!fs.existsSync(file)) {
    logError(error.MISSING_CONFIG);
    process.exit(1);
  }

  return JSON.parse(fs.readFileSync(file, "utf8"));
};

export const saveConfig = (root: string, config: Config) => {
  fs.writeFileSync(
    configPath(root),
    JSON.stringify(config, null, 2) + os.EOL,
  );
};

export const requireModule = (config: Config, name: string) => {
  const mod = config.modules?.[name];
  if (!mod) {
    logError(`Unknown module '${name}'. Check ${defaultConfigFile}.`);
    process.exit(1);
  }
  return mod;
};

export default getConfig;
