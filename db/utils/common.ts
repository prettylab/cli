export const q = (x: string) => `\`${x}\``;

export const assignEditableValues = (
  editable: readonly string[],
  payload: any,
  data: any,
) => {
  for (const k of editable) {
    if (payload[k] !== undefined) {
      data[k] = payload[k];
    }
  }

  if (!Object.keys(data).length) {
    throw new Error("No editable fields provided.");
  }
};

export const getData = (rows: any) => {
  return Array.isArray(rows) ? rows : [];
};
