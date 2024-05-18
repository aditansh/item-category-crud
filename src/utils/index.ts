import { comparePassword, hashPassword } from "./password";
import { generateAccessToken, generateRefreshToken } from "./token";

export const utils = {
  hashPassword: hashPassword,
  comparePassword: comparePassword,

  generateAccessToken: generateAccessToken,
  generateRefreshToken: generateRefreshToken,
};
