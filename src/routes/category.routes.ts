import { Router } from "express";
import {
  createCategory,
  updateCategory,
  getAllCategories,
  getCategoryById,
  getCategoryByName,
  deleteCategory,
} from "../controllers/categories.controller";

const categoryRouter = Router();

categoryRouter.post("/create", createCategory);
categoryRouter.patch("/update/:id", updateCategory);
categoryRouter.get("/all", getAllCategories);
categoryRouter.get("/id/:id", getCategoryById);
categoryRouter.get("/name/:name", getCategoryByName);
categoryRouter.delete("/delete/:id", deleteCategory);

export default categoryRouter;
