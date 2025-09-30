import { Command } from "commander";
import definition from "../config/definition.js";

const pretty = (program: Command) => {
  program
    .name(definition.pretty.name)
    .description(definition.pretty.description);
};

export default pretty;
