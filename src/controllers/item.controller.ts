import { Request, Response } from "express";
import { services } from "../services";
import APIError from "../utils/error";

export async function getAllItems(req: Request, res: Response) {
  try {
    const items = await services.getAllItems();
    return res.status(200).json({
      status: "success",
      data: items,
      message: "Items",
    });
  } catch (error) {
    const err = error as APIError;
    return res
      .status(err.status)
      .json({ status: "error", message: err.message });
  }
}

export async function getItemById(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ status: "error", message: "Invalid input" });
  }

  try {
    const item = await services.getItemById(id);
    if (!item) {
      return res
        .status(404)
        .json({ status: "error", message: "Item not found" });
    }
    return res.status(200).json({
      status: "success",
      data: item,
      message: "Item",
    });
  } catch (error) {
    const err = error as APIError;
    return res
      .status(err.status)
      .json({ status: "error", message: err.message });
  }
}

export async function getItemByName(req: Request, res: Response) {
  const { name } = req.params;
  if (!name) {
    return res.status(400).json({ status: "error", message: "Invalid input" });
  }

  try {
    const item = await services.getItemByName(name);
    if (!item) {
      return res
        .status(404)
        .json({ status: "error", message: "Item not found" });
    }
    return res.status(200).json({
      status: "success",
      data: item,
      message: "Item",
    });
  } catch (error) {
    const err = error as APIError;
    return res
      .status(err.status)
      .json({ status: "error", message: err.message });
  }
}

export async function getItemsByCategoryId(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ status: "error", message: "Invalid input" });
  }

  try {
    const items = await services.getItemsByCategoryId(id);
    return res.status(200).json({
      status: "success",
      data: items,
      message: "Items",
    });
  } catch (error) {
    const err = error as APIError;
    return res
      .status(err.status)
      .json({ status: "error", message: err.message });
  }
}

export async function getItemsByCategoryName(req: Request, res: Response) {
  const { name } = req.params;
  if (!name) {
    return res.status(400).json({ status: "error", message: "Invalid input" });
  }

  try {
    const items = await services.getItemsByCategoryName(name);
    return res.status(200).json({
      status: "success",
      data: items,
      message: "Items",
    });
  } catch (error) {
    const err = error as APIError;
    return res
      .status(err.status)
      .json({ status: "error", message: err.message });
  }
}

export async function getItemsBySubcategoryId(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ status: "error", message: "Invalid input" });
  }

  try {
    const items = await services.getItemsBySubcategoryId(id);
    return res.status(200).json({
      status: "success",
      data: items,
      message: "Items",
    });
  } catch (error) {
    const err = error as APIError;
    return res
      .status(err.status)
      .json({ status: "error", message: err.message });
  }
}

export async function getItemsBySubcategoryName(req: Request, res: Response) {
  const { name } = req.params;
  if (!name) {
    return res.status(400).json({ status: "error", message: "Invalid input" });
  }

  try {
    const items = await services.getItemsBySubcategoryName(name);
    return res.status(200).json({
      status: "success",
      data: items,
      message: "Items",
    });
  } catch (error) {
    const err = error as APIError;
    return res
      .status(err.status)
      .json({ status: "error", message: err.message });
  }
}

export async function searchItems(req: Request, res: Response) {
  const { name } = req.params;
  if (!name) {
    return res.status(400).json({ status: "error", message: "Invalid input" });
  }

  try {
    const items = await services.searchItems(name);
    return res.status(200).json({
      status: "success",
      data: items,
      message: "Items",
    });
  } catch (error) {
    const err = error as APIError;
    return res
      .status(err.status)
      .json({ status: "error", message: err.message });
  }
}

export async function createItem(req: Request, res: Response) {
  const {
    name,
    image,
    desc,
    taxApplicable,
    taxNumber,
    taxType,
    baseCost,
    discount,
    categoryName,
    subcategoryName,
  } = req.body;

  if (
    !name ||
    !image ||
    !desc ||
    (taxApplicable !== true && taxApplicable !== false) ||
    !baseCost ||
    !discount
  ) {
    return res.status(400).json({ status: "error", message: "Invalid input" });
  }

  if (taxApplicable && (!taxNumber || !taxType)) {
    return res.status(400).json({ status: "error", message: "Invalid input" });
  }

  if (
    (categoryName && subcategoryName) ||
    (!categoryName && !subcategoryName)
  ) {
    return res.status(400).json({ status: "error", message: "Invalid input" });
  }

  const price = baseCost - discount;

  if (categoryName) {
    try {
      await services.createItem({
        name,
        image,
        desc,
        taxApplicable,
        taxNumber,
        taxType,
        baseCost,
        discount,
        price,
        categoryName,
      });
      return res
        .status(200)
        .json({ status: "success", message: "Item created" });
    } catch (error) {
      const err = error as APIError;
      return res
        .status(err.status)
        .json({ status: "error", message: err.message });
    }
  } else if (subcategoryName) {
    try {
      await services.createItem({
        name,
        image,
        desc,
        taxApplicable,
        taxNumber,
        taxType,
        baseCost,
        discount,
        price,
        subcategoryName,
      });
      return res
        .status(200)
        .json({ status: "success", message: "Item created" });
    } catch (error) {
      const err = error as APIError;
      return res
        .status(err.status)
        .json({ status: "error", message: err.message });
    }
  }
}

export async function updateItem(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ status: "error", message: "Invalid input" });
  }

  const {
    name,
    image,
    desc,
    taxApplicable,
    taxNumber,
    taxType,
    baseCost,
    discount,
    categoryName,
    subcategoryName,
  } = req.body;

  if (name || categoryName || subcategoryName) {
    return res
      .status(403)
      .json({ status: "error", message: "Cannot update name or category" });
  }

  if (taxApplicable && (!taxNumber || !taxType)) {
    return res.status(400).json({ status: "error", message: "Invalid input" });
  }

  const price = baseCost - discount;

  try {
    await services.updateItem(id, {
      image,
      desc,
      taxApplicable,
      taxNumber,
      taxType,
      baseCost,
      discount,
      price,
    });
    return res.status(200).json({ status: "success", message: "Item updated" });
  } catch (error) {
    const err = error as APIError;
    return res
      .status(err.status)
      .json({ status: "error", message: err.message });
  }
}

export async function deleteItem(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ status: "error", message: "Invalid input" });
  }

  try {
    await services.deleteItem(id);
    return res.status(200).json({
      status: "success",
      message: "Item deleted",
    });
  } catch (error) {
    const err = error as APIError;
    return res
      .status(err.status)
      .json({ status: "error", message: err.message });
  }
}
