import { Router } from "express";
import {
  createCategory,
  updateCategory,
  getAllCategories,
  getCategoryById,
  getCategoryByName,
  deleteCategory,
} from "../controllers/categories.contorller";

const categoryRouter = Router();

categoryRouter.post("/create", createCategory);
categoryRouter.patch("/update/:id", updateCategory);
categoryRouter.get("/all", getAllCategories);
categoryRouter.get("/:id", getCategoryById);
categoryRouter.get("/:name", getCategoryByName);
categoryRouter.delete("/:id", deleteCategory);

export default categoryRouter;
