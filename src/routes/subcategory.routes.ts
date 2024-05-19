import { Router } from "express";
import {
  createSubcategory,
  updateSubcategory,
  getAllSubcategories,
  getSubcategoryById,
  getSubcategoryByName,
  getSubcategoriesByCategoryId,
  getSubcategoriesByCategoryName,
  deleteSubcategory,
} from "../controllers/subcategories.controller";

const subcategoryRouter = Router();

subcategoryRouter.post("/create", createSubcategory);
subcategoryRouter.patch("/update/:id", updateSubcategory);
subcategoryRouter.get("/all", getAllSubcategories);
subcategoryRouter.get("/id/:id", getSubcategoryById);
subcategoryRouter.get("/name/:name", getSubcategoryByName);
subcategoryRouter.get("/category/id/:id", getSubcategoriesByCategoryId);
subcategoryRouter.get("/category/name/:name", getSubcategoriesByCategoryName);
subcategoryRouter.delete("/delete/:id", deleteSubcategory);

export default subcategoryRouter;
