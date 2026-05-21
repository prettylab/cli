import { ModuleCfg } from "../../project/_actions/getConfig/types.js";

const getModulesContent = (
  modules: any,
  selectedModules: string[],
): Record<string, ModuleCfg> => {
  return Object.fromEntries(
    selectedModules.map((name) => {
      const mod = modules[name] ?? {};
      return [
        name,
        {
          remote: mod.remote,
          branch: mod.branch,
          prefix: `prettylab/${name}`,
        },
      ];
    }),
  );
};

export default getModulesContent;
