import { ModuleCfg } from "../../project/_actions/getConfig/types.js";

const getModulesContent = (modules: any, selectedModules: any) => {
  return Object.fromEntries(
    Object.entries(modules).filter(([key]) => selectedModules.includes(key)),
  ) as Record<string, ModuleCfg>;
};

export default getModulesContent;
