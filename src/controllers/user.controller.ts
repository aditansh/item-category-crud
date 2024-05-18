import { Request, Response } from "express";
import APIError from "../utils/error";
import { services } from "../services";

export async function signup(req: Request, res: Response) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ status: "error", message: "Invalid input" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ status: "error", message: "Password too short" });
  }

  try {
    await services.createUser({ name, email, password });
    return res
      .status(200)
      .json({ status: "success", message: "User signed up" });
  } catch (error) {
    const err = error as APIError;
    return res
      .status(err.status)
      .json({ status: "error", message: err.message });
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ status: "error", message: "Invalid input" });
  }

  try {
    const token = await services.loginUser(email, password);
    return res
      .status(200)
      .json({ status: "success", message: "User logged in", data: { token } });
  } catch (error) {
    const err = error as APIError;
    return res
      .status(err.status)
      .json({ status: "error", message: err.message });
  }
}

export async function refreshToken(req: Request, res: Response) {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ status: "error", message: "Invalid input" });
  }

  try {
    const token = await services.refreshToken(refreshToken);
    return res
      .status(200)
      .json({ status: "success", message: "Token refreshed", data: { token } });
  } catch (error) {
    const err = error as APIError;
    return res
      .status(err.status)
      .json({ status: "error", message: err.message });
  }
}

export async function logout(req: Request, res: Response) {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ status: "error", message: "Invalid input" });
  }

  try {
    await services.logoutUser(refreshToken);
    return res
      .status(200)
      .json({ status: "success", message: "User logged out" });
  } catch (error) {
    const err = error as APIError;
    return res
      .status(err.status)
      .json({ status: "error", message: err.message });
  }
}
