import { Router } from "express";
import {
  signup,
  login,
  refreshToken,
  logout,
} from "../controllers/user.controller";

const userRouter = Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/token", refreshToken);
userRouter.post("/logout", logout);

export default userRouter;

