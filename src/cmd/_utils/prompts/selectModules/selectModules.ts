import prompts from "prompts";

const selectModules = async (modules: any) => {
  return await prompts({
    type: "multiselect",
    name: "selectedModules",
    message: "Select modules to install:",
    choices: Object.keys(modules).map((key) => ({
      title: key,
      value: key,
    })),
    hint: "Space to select. Return to submit",
    instructions: false,
  });
};

export default selectModules;
