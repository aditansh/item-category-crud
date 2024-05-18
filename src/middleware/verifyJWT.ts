import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../constants";

export default async function verifyJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers.authorization;
  const jwt = authorization ? authorization.split(" ")[1] : "";
  try {
    if (!ACCESS_TOKEN_SECRET) {
      return res
        .status(500)
        .json({ status: "error", message: "internal server error" });
    }
    const decoded = jsonwebtoken.verify(
      jwt,
      ACCESS_TOKEN_SECRET
    ) as unknown as Record<string, string>;

    if (!decoded) {
      return res.status(401).json({ status: "fail", message: "Unauthorized" });
    }

    req["userId"] = decoded["userId"];

    next();
  } catch (error) {
    console.log(`error: ${error}`);
    return res.status(400).json({ status: "fail", message: "Invalid Token" });
  }
}
