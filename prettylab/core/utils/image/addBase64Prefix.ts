export const addBase64Prefix = (mimeType: string, str: string) => {
  return `data:${mimeType};base64,${str}`;
};
