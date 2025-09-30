import path from "path";
import fs from "fs";
import error from "../../display/logs/messages/error.js";
import logError from "../../display/logs/caller/logError.js";

const isRootOfRepository = (): string => {
  let p = process.cwd();

  while (p !== path.parse(p).root) {
    if (fs.existsSync(path.join(p, ".git"))) return p;
    p = path.dirname(p);
  }

  logError(error.NOT_IN_GIT_REPOSITORY);
  process.exit(1);
};

export default isRootOfRepository;
