import bcrypt from "bcrypt";
import APIError from "./error";

export async function hashPassword(password: string) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
  } catch (error) {
    throw new APIError(500, "Error hashing password");
  }
}

export async function comparePassword(password: string, hash: string) {
  try {
    const match = await bcrypt.compare(password, hash);
    return match;
  } catch (error) {
    throw new APIError(500, "Error hashing password");
  }
}
