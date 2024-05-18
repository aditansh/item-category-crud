import {
  createUser,
  getUserByEmail,
  getUserById,
  loginUser,
  logoutUser,
  refreshToken,
} from "./user.services";

export const services = {
  getUserByEmail: getUserByEmail,
  getUserById: getUserById,
  createUser: createUser,
  loginUser: loginUser,
  refreshToken: refreshToken,
  logoutUser: logoutUser,
};
