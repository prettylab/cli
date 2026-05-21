export const lowerCase = (value: string) => {
  if (typeof value !== "string") {
    return value;
  }

  return value.toLowerCase();
};
