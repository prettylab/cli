#!/usr/bin/env node
import { Command } from "commander";
import definition from "./config/definition.js";

const program = new Command();

Object.values(definition).map((command) => {
  command.caller(program);
});

program.parseAsync(process.argv);
