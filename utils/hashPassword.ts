import bcrypt from "bcryptjs";

export const hashPassword = (raw: string) => {
  return bcrypt.hash(raw, 12);
};
