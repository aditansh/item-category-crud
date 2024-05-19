import { Request, Response } from "express";
import APIError from "../utils/error";
import { services } from "../services";

export async function createCategory(req: Request, res: Response) {
  const { name, image, desc, taxApplicable, taxNumber, taxType } = req.body;
  if (
    !name ||
    !image ||
    !desc ||
    (taxApplicable !== true && taxApplicable !== false)
  ) {
    return res.status(400).json({ status: "error", message: "Invalid input" });
  }

  if (taxApplicable && (!taxNumber || !taxType)) {
    return res.status(400).json({ status: "error", message: "Invalid input" });
  }

  try {
    await services.createCategory({
      name,
      image,
      desc,
      taxApplicable,
      taxNumber,
      taxType,
    });
    return res
      .status(200)
      .json({ status: "success", message: "Category created" });
  } catch (error) {
    const err = error as APIError;
    return res
      .status(err.status)
      .json({ status: "error", message: err.message });
  }
}

export async function updateCategory(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ status: "error", message: "Invalid input" });
  }

  const { name, image, desc, taxApplicable, taxNumber, taxType } = req.body;
  if (name) {
    return res
      .status(403)
      .json({ status: "error", message: "Cannot update name" });
  }

  if (taxApplicable && (!taxNumber || !taxType)) {
    return res.status(400).json({ status: "error", message: "Invalid input" });
  }

  try {
    await services.updateCategory(id, {
      image,
      desc,
      taxApplicable,
      taxNumber,
      taxType,
    });
    return res
      .status(200)
      .json({ status: "success", message: "Category updated" });
  } catch (error) {
    const err = error as APIError;
    return res
      .status(err.status)
      .json({ status: "error", message: err.message });
  }
}

export async function getAllCategories(req: Request, res: Response) {
  try {
    const categories = await services.getAllCategories();
    return res
      .status(200)
      .json({ status: "success", data: categories, message: "All Categories" });
  } catch (error) {
    const err = error as APIError;
    return res
      .status(err.status)
      .json({ status: "error", message: err.message });
  }
}

export async function getCategoryById(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ status: "error", message: "Invalid input" });
  }

  try {
    const category = await services.getCategoryById(id);
    if (!category) {
      throw new APIError(404, "Category not found");
    }
    return res
      .status(200)
      .json({ status: "success", data: category, message: "Category by id" });
  } catch (error) {
    const err = error as APIError;
    return res
      .status(err.status)
      .json({ status: "error", message: err.message });
  }
}

export async function getCategoryByName(req: Request, res: Response) {
  const { name } = req.params;
  if (!name) {
    return res.status(400).json({ status: "error", message: "Invalid input" });
  }

  try {
    const category = await services.getCategoryByName(name);
    if (!category) {
      throw new APIError(404, "Category not found");
    }
    return res
      .status(200)
      .json({ status: "success", data: category, message: "Category by name" });
  } catch (error) {
    const err = error as APIError;
    return res
      .status(err.status)
      .json({ status: "error", message: err.message });
  }
}

export async function deleteCategory(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ status: "error", message: "Invalid input" });
  }

  try {
    await services.deleteCategory(id);
    return res
      .status(200)
      .json({ status: "success", message: "Category deleted" });
  } catch (error) {
    const err = error as APIError;
    return res
      .status(err.status)
      .json({ status: "error", message: err.message });
  }
}
