import { Request, Response } from "express";
import APIError from "../utils/error";
import { services } from "../services";

export async function createSubcategory(req: Request, res: Response) {
  const { name, image, desc, taxApplicable, taxNumber, taxType, categoryName } =
    req.body;

  if (
    !name ||
    !image ||
    !desc ||
    !categoryName ||
    (taxApplicable !== true && taxApplicable !== false)
  ) {
    return res.status(400).json({ status: "error", message: "Invalid input" });
  }

  if (taxApplicable && (!taxNumber || !taxType)) {
    return res.status(400).json({ status: "error", message: "Invalid input" });
  }

  try {
    await services.createSubcategory({
      name,
      image,
      desc,
      taxApplicable,
      taxNumber,
      taxType,
      categoryName,
    });
    return res
      .status(200)
      .json({ status: "success", message: "Subcategory created" });
  } catch (error) {
    const err = error as APIError;
    return res
      .status(err.status)
      .json({ status: "error", message: err.message });
  }
}

export async function updateSubcategory(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ status: "error", message: "Invalid input" });
  }

  const { name, image, desc, taxApplicable, taxNumber, taxType, categoryName } =
    req.body;

  if (name || categoryName) {
    return res
      .status(403)
      .json({ status: "error", message: "Cannot update name or category" });
  }

  if (taxApplicable && (!taxNumber || !taxType)) {
    return res.status(400).json({ status: "error", message: "Invalid input" });
  }

  try {
    await services.updateSubcategory(id, {
      image,
      desc,
      taxApplicable,
      taxNumber,
      taxType,
    });
    return res
      .status(200)
      .json({ status: "success", message: "Subcategory updated" });
  } catch (error) {
    const err = error as APIError;
    return res
      .status(err.status)
      .json({ status: "error", message: err.message });
  }
}

export async function getAllSubcategories(req: Request, res: Response) {
  try {
    const subcategories = await services.getAllSubcategories();
    return res.status(200).json({
      status: "success",
      data: subcategories,
      message: "All subcategories",
    });
  } catch (error) {
    const err = error as APIError;
    return res
      .status(err.status)
      .json({ status: "error", message: err.message });
  }
}

export async function getSubcategoryById(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ status: "error", message: "Invalid input" });
  }

  try {
    const subcategory = await services.getSubcategoryById(id);
    if (!subcategory) {
      return res
        .status(404)
        .json({ status: "error", message: "Subcategory not found" });
    }
    return res.status(200).json({
      status: "success",
      data: subcategory,
      message: "Subcategory",
    });
  } catch (error) {
    const err = error as APIError;
    return res
      .status(err.status)
      .json({ status: "error", message: err.message });
  }
}

export async function getSubcategoryByName(req: Request, res: Response) {
  const { name } = req.params;
  if (!name) {
    return res.status(400).json({ status: "error", message: "Invalid input" });
  }

  try {
    const subcategory = await services.getSubcategoryByName(name);
    if (!subcategory) {
      return res
        .status(404)
        .json({ status: "error", message: "Subcategory not found" });
    }
    return res.status(200).json({
      status: "success",
      data: subcategory,
      message: "Subcategory",
    });
  } catch (error) {
    const err = error as APIError;
    return res
      .status(err.status)
      .json({ status: "error", message: err.message });
  }
}

export async function getSubcategoriesByCategoryId(
  req: Request,
  res: Response
) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ status: "error", message: "Invalid input" });
  }

  try {
    const subcategories = await services.getSubcategoriesByCategoryId(id);
    if (!subcategories) {
      return res
        .status(404)
        .json({ status: "error", message: "Subcategories not found" });
    }
    return res.status(200).json({
      status: "success",
      data: subcategories,
      message: "Subcategories by category id",
    });
  } catch (error) {
    const err = error as APIError;
    return res
      .status(err.status)
      .json({ status: "error", message: err.message });
  }
}

export async function getSubcategoriesByCategoryName(
  req: Request,
  res: Response
) {
  const { name } = req.params;
  if (!name) {
    return res.status(400).json({ status: "error", message: "Invalid input" });
  }

  try {
    const subcategories = await services.getSubcategoriesByCategoryName(name);
    if (!subcategories) {
      return res
        .status(404)
        .json({ status: "error", message: "Subcategories not found" });
    }
    return res.status(200).json({
      status: "success",
      data: subcategories,
      message: "Subcategories by category name",
    });
  } catch (error) {
    const err = error as APIError;
    return res
      .status(err.status)
      .json({ status: "error", message: err.message });
  }
}

export async function deleteSubcategory(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ status: "error", message: "Invalid input" });
  }

  try {
    await services.deleteSubcategory(id);
    return res
      .status(200)
      .json({ status: "success", message: "Subcategory deleted" });
  } catch (error) {
    const err = error as APIError;
    return res
      .status(err.status)
      .json({ status: "error", message: err.message });
  }
}
