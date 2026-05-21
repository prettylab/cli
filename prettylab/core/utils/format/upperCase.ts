export const upperCase = (value: string) => {
  if (typeof value !== "string") {
    return value;
  }

  return value.toUpperCase();
};
