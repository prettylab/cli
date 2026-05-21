import crypto from "crypto";

export const generateClientToken = (length: number = 32) => {
  const raw = crypto.randomBytes(length).toString("base64url");
  return { raw, hash: hashStringSHA256(raw) };
};

export const hashStringSHA256 = (input: string) => {
  return crypto.createHash("sha256").update(input).digest("hex");
};

export const checkIfHashMatches = (input: string, hash: string) => {
  const inputHash = hashStringSHA256(input);
  return inputHash === hash;
};
