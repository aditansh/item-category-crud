import { Request, Response } from "express";

export function createCategory(req: Request, res: Response) {
  return res.send("Create Category");
}

export function updateCategory(req: Request, res: Response) {
  return res.send("Update Category");
}

export function getAllCategories(req: Request, res: Response) {
  return res.send("Get All Categories");
}

export function getCategoryById(req: Request, res: Response) {
  return res.send("Get Category By ID");
}

export function getCategoryByName(req: Request, res: Response) {
  return res.send("Get Category By Name");
}

export function deleteCategory(req: Request, res: Response) {
  return res.send("Delete Category");
}
