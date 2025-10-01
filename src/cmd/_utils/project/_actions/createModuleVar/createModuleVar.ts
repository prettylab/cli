const createModuleVar = (
  options: any,
  name: string,
  config: any,
  key: string,
  defaultValue: string = "",
) => {
  return options[key] ?? config.modules[name]?.[key] ?? defaultValue;
};

export default createModuleVar;
