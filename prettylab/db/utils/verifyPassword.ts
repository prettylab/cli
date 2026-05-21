import bcrypt from "bcryptjs";

export const verifyPassword = (plain: string, hash: string) => {
  return bcrypt.compare(plain, hash);
};
