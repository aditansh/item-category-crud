import prisma from "../../prisma";
import APIError from "../utils/error";

export const getSubcategoryByName = async (name: string) => {
  return await prisma.subcategory.findUnique({
    where: { name },
    include: {
      items: true,
    },
  });
};

export const getSubcategoryById = async (id: string) => {
  return await prisma.subcategory.findUnique({
    where: { id },
    include: {
      items: true,
    },
  });
};

export const getAllSubcategories = async () => {
  return prisma.subcategory.findMany({
    include: {
      items: true,
    },
  });
};

export const getSubcategoriesByCategoryId = async (id: string) => {
  const category = await prisma.category.findUnique({
    where: { id },
  });
  if (!category) {
    throw new APIError(404, "Category not found");
  }
  return prisma.subcategory.findMany({
    where: { categoryId: id },
    include: {
      items: true,
    },
  });
};

export const getSubcategoriesByCategoryName = async (name: string) => {
  const category = await prisma.category.findUnique({
    where: { name },
  });
  if (!category) {
    throw new APIError(404, "Category not found");
  }

  return prisma.subcategory.findMany({
    where: { categoryId: category.id },
    include: {
      items: true,
    },
  });
};

export const createSubcategory = async (data: {
  name: string;
  image: string;
  desc: string;
  taxApplicable?: boolean;
  taxNumber?: string;
  taxType?: string;
  categoryName: string;
}) => {
  const oldSubcategory = await getSubcategoryByName(data.name);
  if (oldSubcategory) {
    throw new APIError(409, "Subcategory already exists");
  }

  const category = await prisma.category.findUnique({
    where: { name: data.categoryName },
  });
  if (!category) {
    throw new APIError(404, "Category not found");
  }

  if (data.taxApplicable !== true && data.taxApplicable !== false) {
    await prisma.subcategory.create({
      data: {
        name: data.name,
        image: data.image,
        description: data.desc,
        taxApplicable: category.taxApplicable,
        taxNumber: category.taxNumber,
        taxType: category.taxType,
        category: {
          connect: {
            id: category.id,
          },
        },
      },
    });
  } else {
    if (data.taxApplicable && data.taxNumber && data.taxType) {
      await prisma.subcategory.create({
        data: {
          name: data.name,
          image: data.image,
          description: data.desc,
          taxApplicable: data.taxApplicable,
          taxNumber: parseInt(data.taxNumber),
          taxType: data.taxType,
          category: {
            connect: {
              id: category.id,
            },
          },
        },
      });
    } else {
      await prisma.subcategory.create({
        data: {
          name: data.name,
          image: data.image,
          description: data.desc,
          taxApplicable: data.taxApplicable,
          category: {
            connect: {
              id: category.id,
            },
          },
        },
      });
    }
  }

  return true;
};

export const updateSubcategory = async (
  id: string,
  data: {
    image?: string;
    desc?: string;
    taxApplicable?: boolean;
    taxNumber?: string;
    taxType?: string;
  }
) => {
  const subcategory = await prisma.subcategory.findUnique({
    where: { id },
  });
  if (!subcategory) {
    throw new APIError(404, "Subcategory not found");
  }

  if (data.taxApplicable !== true && data.taxApplicable !== false) {
    await prisma.subcategory.update({
      where: { id },
      data: {
        image: data.image ?? subcategory.image,
        description: data.desc ?? subcategory.description,
      },
    });
  } else {
    if (data.taxApplicable && data.taxNumber && data.taxType) {
      await prisma.subcategory.update({
        where: { id },
        data: {
          image: data.image ?? subcategory.image,
          description: data.desc ?? subcategory.description,
          taxApplicable: data.taxApplicable,
          taxNumber: parseInt(data.taxNumber),
          taxType: data.taxType,
        },
      });
    } else {
      await prisma.subcategory.update({
        where: { id },
        data: {
          image: data.image ?? subcategory.image,
          description: data.desc ?? subcategory.description,
          taxApplicable: data.taxApplicable ?? subcategory.taxApplicable,
        },
      });
    }
  }

  return true;
};

export const deleteSubcategory = async (id: string) => {
  const subcategory = await prisma.subcategory.findUnique({
    where: { id },
  });
  if (!subcategory) {
    throw new APIError(404, "Subcategory not found");
  }

  await prisma.subcategory.delete({
    where: { id },
  });

  return true;
};
