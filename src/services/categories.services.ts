import prisma from "../../prisma";
import APIError from "../utils/error";

export const getCategoryByName = async (name: string) => {
  return await prisma.category.findUnique({
    where: { name },
    include: {
      subcategories: true,
      items: true,
    },
  });
};

export const getCategoryById = async (id: string) => {
  return await prisma.category.findUnique({
    where: { id },
    include: {
      subcategories: true,
      items: true,
    },
  });
};

export const getAllCategories = async () => {
  return prisma.category.findMany({
    include: {
      subcategories: true,
      items: true,
    },
  });
};

export const deleteCategory = async (id: string) => {
  const category = await getCategoryById(id);
  if (!category) {
    throw new APIError(404, "Category not found");
  }

  return prisma.category.delete({
    where: { id },
  });
};

export const createCategory = async (data: {
  name: string;
  image: string;
  desc: string;
  taxApplicable: boolean;
  taxNumber?: string;
  taxType?: string;
}) => {
  const oldCategory = await getCategoryByName(data.name);
  if (oldCategory) {
    throw new APIError(409, "Category already exists");
  }

  if (data.taxApplicable && data.taxNumber && data.taxType) {
    await prisma.category.create({
      data: {
        name: data.name,
        image: data.image,
        description: data.desc,
        taxApplicable: data.taxApplicable,
        taxNumber: parseInt(data.taxNumber),
        taxType: data.taxType,
      },
    });
  } else {
    await prisma.category.create({
      data: {
        name: data.name,
        image: data.image,
        description: data.desc,
        taxApplicable: data.taxApplicable,
      },
    });
  }

  return true;
};

export const updateCategory = async (
  id: string,
  data: {
    image?: string;
    desc?: string;
    taxApplicable?: boolean;
    taxNumber?: string;
    taxType?: string;
  }
) => {
  const category = await getCategoryById(id);
  if (!category) {
    throw new APIError(404, "Category not found");
  }

  if (data.taxApplicable && data.taxNumber && data.taxType) {
    await prisma.category.update({
      where: { id },
      data: {
        image: data.image ?? category.image,
        description: data.desc ?? category.description,
        taxApplicable: data.taxApplicable,
        taxNumber: parseInt(data.taxNumber),
        taxType: data.taxType,
      },
    });
  } else {
    await prisma.category.update({
      where: { id },
      data: {
        image: data.image ?? category.image,
        description: data.desc ?? category.description,
        taxApplicable: data.taxApplicable ?? category.taxApplicable,
      },
    });
  }

  return true;
};
