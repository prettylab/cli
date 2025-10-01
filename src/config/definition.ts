import pretty from "../cmd/pretty.js";
import install from "../cmd/install/install.js";
import { defaultConfigFile } from "./configFiles.js";
import init from "../cmd/init/init.js";
import list from "../cmd/list/list.js";
import pull from "../cmd/pull/pull.js";
import push from "../cmd/push/push.js";
import add from "../cmd/add/add.js";
import status from "../cmd/status/status.js";
import sync from "../cmd/sync/sync.js";

const definition = {
  pretty: {
    name: "pretty",
    description:
      "Command-line tool to install and update prettylab dependencies",
    caller: (program) => pretty(program),
  },
  install: {
    command: "install <module>",
    description: "Install a module into this repo",
    caller: (program) => install(program),
  },
  init: {
    command: "init",
    description: `Create a ${defaultConfigFile} interactively in this repo`,
    caller: (program) => init(program),
  },
  list: {
    command: "list",
    description: "List configured modules",
    caller: (program) => list(program),
  },
  pull: {
    command: "pull <module>",
    description: "Pull latest changes for a module into this repo",
    caller: (program) => pull(program),
  },
  push: {
    command: "push <module>",
    description: "Push local changes back to the module upstream",
    caller: (program) => push(program),
  },
  add: {
    command: "Add <module>",
    description: `Add or update a module in ${defaultConfigFile}`,
    // TODO: ADD HERE OPTIONS
    caller: (program) => add(program),
  },
  status: {
    command: "status",
    description:
      "Show dirty/ahead/behind for all modules (or a specific one with --module)",
    // TODO: ADD HERE OPTIONS
    caller: (program) => status(program),
  },
  sync: {
    command: "sync",
    description:
      "Pull all modules; optionally push those with local commits ahead of upstream",
    // TODO: ADD HERE OPTIONS
    caller: (program) => sync(program),
  },
};

export default definition;
