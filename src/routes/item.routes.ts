import { Router } from "express";
import {
  createItem,
  updateItem,
  deleteItem,
  getAllItems,
  getItemById,
  getItemByName,
  getItemsByCategoryId,
  getItemsByCategoryName,
  getItemsBySubcategoryId,
  getItemsBySubcategoryName,
  searchItems,
} from "../controllers/item.controller";

const itemRouter = Router();

itemRouter.post("/create", createItem);
itemRouter.patch("/update/:id", updateItem);
itemRouter.delete("/delete/:id", deleteItem);
itemRouter.get("/all", getAllItems);
itemRouter.get("/id/:id", getItemById);
itemRouter.get("/name/:name", getItemByName);
itemRouter.get("/category/id/:id", getItemsByCategoryId);
itemRouter.get("/category/name/:name", getItemsByCategoryName);
itemRouter.get("/subcategory/id/:id", getItemsBySubcategoryId);
itemRouter.get("/subcategory/name/:name", getItemsBySubcategoryName);
itemRouter.get("/search/:name", searchItems);

export default itemRouter;
