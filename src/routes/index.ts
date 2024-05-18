import { Router } from "express";
import userRouter from "./user.routes";
import categoryRouter from "./category.routes";
import subcategoryRouter from "./subcategoy.routes";
import verifyJWT from "../middleware/verifyJWT";
import itemRouter from "./item.routes";

const routes = Router();

routes.use("/users", userRouter);
routes.use("/category", verifyJWT, categoryRouter);
routes.use("/subcategory", verifyJWT, subcategoryRouter);
routes.use("/item", verifyJWT, itemRouter);

export default routes;
