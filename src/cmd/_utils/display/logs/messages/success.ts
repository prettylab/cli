import { defaultConfigFile } from "../../../../../config/configFiles.js";

const success = {
  CREATED_CONFIG_FILE: `Created ${defaultConfigFile}`,
  SAVED_MODULE: (name: string) => `Saved module '${name}'.`,
};

export default success;
