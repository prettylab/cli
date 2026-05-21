import pretty from "../cmd/pretty.js";
import install from "../cmd/install/install.js";
import { defaultConfigFile } from "./configFiles.js";
import init from "../cmd/init/init.js";
import pull from "../cmd/pull/pull.js";
import push from "../cmd/push/push.js";
import lock from "../cmd/lock/lock.js";
import unlock from "../cmd/unlock/unlock.js";

const definition = {
  pretty: {
    name: "pretty",
    description:
      "Command-line tool to install and update prettylab dependencies",
    caller: (program) => pretty(program),
  },
  init: {
    command: "init",
    description: `Create a ${defaultConfigFile} interactively and pull selected modules`,
    caller: (program) => init(program),
  },
  install: {
    command: "install",
    description: `Select additional modules to add to ${defaultConfigFile} and pull them`,
    caller: (program) => install(program),
  },
  pull: {
    command: "pull <module>",
    description:
      "Stash local changes, pull the module from its remote, restore the stash, and show a summary",
    caller: (program) => pull(program),
  },
  push: {
    command: "push <module>",
    description:
      "Commit local changes under the module's folder with a custom message and push them upstream",
    caller: (program) => push(program),
  },
  lock: {
    command: "lock <module> [commit]",
    description:
      "Lock a module to a specific remote commit (defaults to the current tip of its branch)",
    caller: (program) => lock(program),
  },
  unlock: {
    command: "unlock <module>",
    description: "Remove the lock so the module follows its branch again",
    caller: (program) => unlock(program),
  },
};

export default definition;
