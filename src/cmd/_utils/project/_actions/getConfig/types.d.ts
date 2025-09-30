export type ModuleCfg = { remote: string; branch: string; prefix: string };
export type Config = {
  modules: Record<string, ModuleCfg>;
  defaultBranch?: string;
  squash?: boolean;
};
