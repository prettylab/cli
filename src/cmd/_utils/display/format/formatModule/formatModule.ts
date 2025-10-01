import kleur from "kleur";

const formatModule = (name: string, module: any): string => {
  return `${kleur.bold(name)} → ${module.remote} (${module.branch}) @ ${module.prefix}`;
};

export default formatModule;
