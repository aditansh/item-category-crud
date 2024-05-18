import prisma from "../../prisma";
import APIError from "../utils/error";
import { getCategoryByName } from "./categories.services";
import { getSubcategoryByName } from "./subcategories.services";

export const getAllItems = async () => {
  return prisma.item.findFirst({});
};

export const getItemById = async (id: string) => {
  return prisma.item.findUnique({
    where: { id },
  });
};

export const getItemByName = async (name: string) => {
  return prisma.item.findUnique({
    where: { name },
  });
};

export const getItemsByCategoryId = async (id: string) => {
  const category = await prisma.category.findUnique({
    where: { id },
  });
  if (!category) {
    throw new APIError(404, "Category not found");
  }

  return prisma.item.findMany({
    where: { categoryId: id },
  });
};

export const getItemsByCategoryName = async (name: string) => {
  const category = await prisma.category.findUnique({
    where: { name },
  });
  if (!category) {
    throw new APIError(404, "Category not found");
  }

  return prisma.item.findMany({
    where: { categoryId: category.id },
  });
};

export const getItemsBySubcategoryId = async (id: string) => {
  const subcategory = await prisma.subcategory.findUnique({
    where: { id },
  });
  if (!subcategory) {
    throw new APIError(404, "Subcategory not found");
  }

  return prisma.item.findMany({
    where: { subcategoryId: id },
  });
};

export const getItemsBySubcategoryName = async (name: string) => {
  const subcategory = await prisma.subcategory.findUnique({
    where: { name },
  });
  if (!subcategory) {
    throw new APIError(404, "Subcategory not found");
  }

  return prisma.item.findMany({
    where: { subcategoryId: subcategory.id },
  });
};

export const searchItems = async (name: string) => {
  return prisma.item.findMany({
    where: {
      name: {
        contains: name,
      },
    },
  });
};

export const createItem = async (data: {
  name: string;
  image: string;
  desc: string;
  taxApplicable?: boolean;
  taxNumber?: string;
  taxType?: string;
  baseCost: number;
  discount: number;
  price: number;
  categoryName?: string;
  subcategoryName?: string;
}) => {
  const item = await getItemByName(data.name);
  if (item) {
    throw new APIError(409, "Item already exists");
  }

  if (data.categoryName) {
    const category = await getCategoryByName(data.categoryName);
    if (!category) {
      throw new APIError(404, "Category not found");
    }

    if (data.taxApplicable !== true && data.taxApplicable !== false) {
      await prisma.item.create({
        data: {
          name: data.name,
          image: data.image,
          description: data.desc,
          taxApplicable: category.taxApplicable,
          taxNumber: category.taxNumber,
          taxType: category.taxType,
          baseCost: data.baseCost,
          discount: data.discount,
          price: data.price,
          category: {
            connect: {
              id: category.id,
            },
          },
        },
      });
    } else {
      if (data.taxApplicable && data.taxNumber && data.taxType) {
        await prisma.item.create({
          data: {
            name: data.name,
            image: data.image,
            description: data.desc,
            taxApplicable: data.taxApplicable,
            taxNumber: parseInt(data.taxNumber),
            taxType: data.taxType,
            baseCost: data.baseCost,
            discount: data.discount,
            price: data.price,
            category: {
              connect: {
                id: category.id,
              },
            },
          },
        });
      } else {
        await prisma.item.create({
          data: {
            name: data.name,
            image: data.image,
            description: data.desc,
            taxApplicable: false,
            baseCost: data.baseCost,
            discount: data.discount,
            price: data.price,
            category: {
              connect: {
                id: category.id,
              },
            },
          },
        });
      }
    }
  } else if (data.subcategoryName) {
    const subcategory = await getSubcategoryByName(data.subcategoryName);
    if (!subcategory) {
      throw new APIError(404, "Subcategory not found");
    }

    if (data.taxApplicable !== true && data.taxApplicable !== false) {
      await prisma.item.create({
        data: {
          name: data.name,
          image: data.image,
          description: data.desc,
          taxApplicable: subcategory.taxApplicable,
          taxNumber: subcategory.taxNumber,
          taxType: subcategory.taxType,
          baseCost: data.baseCost,
          discount: data.discount,
          price: data.price,
          subcategory: {
            connect: {
              id: subcategory.id,
            },
          },
        },
      });
    } else {
      if (data.taxApplicable && data.taxNumber && data.taxType) {
        await prisma.item.create({
          data: {
            name: data.name,
            image: data.image,
            description: data.desc,
            taxApplicable: data.taxApplicable,
            taxNumber: parseInt(data.taxNumber),
            taxType: data.taxType,
            baseCost: data.baseCost,
            discount: data.discount,
            price: data.price,
            subcategory: {
              connect: {
                id: subcategory.id,
              },
            },
          },
        });
      } else {
        await prisma.item.create({
          data: {
            name: data.name,
            image: data.image,
            description: data.desc,
            taxApplicable: false,
            baseCost: data.baseCost,
            discount: data.discount,
            price: data.price,
            subcategory: {
              connect: {
                id: subcategory.id,
              },
            },
          },
        });
      }
    }
  }

  return true;
};

export const updateItem = async (
  id: string,
  data: {
    image?: string;
    desc?: string;
    taxApplicable?: boolean;
    taxNumber?: string;
    taxType?: string;
    baseCost?: number;
    discount?: number;
    price?: number;
  }
) => {
  const item = await prisma.item.findUnique({
    where: { id },
  });
  if (!item) {
    throw new APIError(404, "Item not found");
  }

  if (data.taxApplicable && data.taxNumber && !data.taxType) {
    await prisma.item.update({
      where: { id },
      data: {
        image: data.image ?? item.image,
        description: data.desc ?? item.description,
        baseCost: data.baseCost ?? item.baseCost,
        discount: data.discount ?? item.discount,
        price: data.price ?? item.price,
        taxApplicable: data.taxApplicable,
        taxNumber: parseInt(data.taxNumber),
        taxType: data.taxType,
      },
    });
  } else {
    await prisma.item.update({
      where: { id },
      data: {
        image: data.image ?? item.image,
        description: data.desc ?? item.description,
        baseCost: data.baseCost ?? item.baseCost,
        discount: data.discount ?? item.discount,
        price:
          (data.baseCost ?? item.baseCost) - (data.discount ?? item.discount),
        taxApplicable: data.taxApplicable ?? item.taxApplicable,
      },
    });
  }

  return true;
};

export const deleteItem = async (id: string) => {
  const item = await prisma.item.findUnique({
    where: { id },
  });
  if (!item) {
    throw new APIError(404, "Item not found");
  }

  await prisma.item.delete({
    where: { id },
  });

  return true;
};
