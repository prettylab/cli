export type ModuleCfg = {
  remote: string;
  branch: string;
  prefix: string;
  lockedAt?: string;
};

export type Config = {
  modules: Record<string, ModuleCfg>;
  defaultBranch?: string;
};
