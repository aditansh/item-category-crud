import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../constants";

export async function signup(req: Request, res: Response) {
  const {name, email, password} = req.body;
  return res.status(200).json({ status: "success", message: "User signed up" });
}

export async function login(req: Request, res: Response) {
  return res.status(200).json({ status: "success", message: "User logged in" });
}

export async function refreshToken(req: Request, res: Response) {
  return res
    .status(200)
    .json({ status: "success", message: "Token refreshed" });
}

export async function logout(req: Request, res: Response) {
  return res
    .status(200)
    .json({ status: "success", message: "User logged out" });
}
