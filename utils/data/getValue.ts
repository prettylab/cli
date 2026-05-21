const getValue = (data: any, path?: string) => {
  if (typeof path === "undefined") return data;

  const normalizedPath = path.replace(/\[(\d+)\]/g, ".$1");

  return normalizedPath.split(".").reduce((acc: any, part: string) => {
    if (acc == null) return undefined;
    return acc[part];
  }, data);
};

export default getValue;
