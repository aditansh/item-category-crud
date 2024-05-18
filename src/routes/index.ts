import { Router } from "express";
import userRouter from "./user.routes";
import categoryRouter from "./category.routes";

const routes = Router();

routes.use("/users", userRouter);
routes.use("/category", categoryRouter);

export default routes;
