import prisma from "../../prisma";
import { utils } from "../utils";
import APIError from "../utils/error";

export const getUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const getUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
  });
};

export const createUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const oldUser = await getUserByEmail(data.email);
  if (oldUser) {
    throw new APIError(409, "User already exists");
  }

  const hashedPassword = await utils.hashPassword(data.password);

  await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    },
  });

  return true;
};

export const loginUser = async (email: string, password: string) => {
  const oldUser = await getUserByEmail(email);
  if (!oldUser) {
    throw new APIError(404, "User not found");
  }

  const isPasswordValid = await utils.comparePassword(
    password,
    oldUser.password
  );

  if (!isPasswordValid) {
    throw new APIError(401, "Invalid password");
  }

  const token = utils.generateRefreshToken({ email: oldUser.email });

  await prisma.user.update({
    where: { id: oldUser.id },
    data: { token },
  });

  return token;
};

export const refreshToken = async (refreshToken: string) => {
  const user = await prisma.user.findFirst({
    where: { token: refreshToken },
  });
  if (!user) {
    throw new APIError(401, "Invalid refresh token");
  }

  const token = utils.generateAccessToken({ email: user.email });

  return token;
};

export const logoutUser = async (refreshToken: string) => {
  const user = await prisma.user.findFirst({
    where: { token: refreshToken },
  });
  if (!user) {
    throw new APIError(401, "Invalid refresh token");
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { token: null },
  });

  return true;
};
