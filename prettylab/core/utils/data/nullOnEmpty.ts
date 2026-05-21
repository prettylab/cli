const nullOnEmpty = (value: string) => {
  if (value === "") {
    return null;
  }

  return !value ? null : value;
};

export default nullOnEmpty;
