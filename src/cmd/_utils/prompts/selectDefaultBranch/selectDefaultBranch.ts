import prompts from "prompts";

const selectDefaultBranch = async (defaultBranch: string) => {
  return await prompts({
    name: "selectedDefaultBranch",
    type: "text",
    message: "Default branch",
    initial: defaultBranch,
  });
};

export default selectDefaultBranch;
