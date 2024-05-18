import { Router } from "express";
import userRouter from "./user.routes";
import categoryRouter from "./category.routes";
import subcategoryRouter from "./subcategoy.routes";

const routes = Router();

routes.use("/users", userRouter);
routes.use("/category", categoryRouter);
routes.use("/subcategory", subcategoryRouter);

export default routes;
