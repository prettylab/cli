import path from "path";
import fs from "fs";
import { configFiles } from "../../../../../config/configFiles.js";
import error from "../../../display/logs/messages/error.js";
import { Config } from "./types.js";
import logError from "../../../display/logs/caller/logError.js";

/* --------------------------- */
/* Get configuration from file */
/* --------------------------- */

const getConfig = (root: string): Config => {
  for (const files of configFiles) {
    const file = path.join(root, files);

    if (fs.existsSync(file)) {
      const raw = fs.readFileSync(file, "utf8");
      return JSON.parse(raw);
    }
  }

  logError(error.MISSING_CONFIG);
  process.exit(1);
};

export default getConfig;
