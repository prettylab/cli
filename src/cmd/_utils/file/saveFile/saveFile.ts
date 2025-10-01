import path from "path";
import { defaultConfigFile } from "../../../../config/configFiles.js";
import fs from "fs";
import os from "os";
import { Config } from "../../project/_actions/getConfig/types.js";

const saveFile = (root: any, config: Config) => {
  const file = path.join(root, defaultConfigFile);
  fs.writeFileSync(file, JSON.stringify(config, null, 2) + os.EOL);
};

export default saveFile;
