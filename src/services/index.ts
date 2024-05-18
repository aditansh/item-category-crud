import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  getCategoryByName,
  updateCategory,
} from "./categories.services";
import {
  createSubcategory,
  deleteSubcategory,
  getAllSubcategories,
  getSubcategoriesByCategoryId,
  getSubcategoriesByCategoryName,
  getSubcategoryById,
  getSubcategoryByName,
  updateSubcategory,
} from "./subcategories.services";
import {
  createUser,
  getUserByEmail,
  getUserById,
  loginUser,
  logoutUser,
  refreshToken,
} from "./user.services";

export const services = {
  getUserByEmail: getUserByEmail,
  getUserById: getUserById,
  createUser: createUser,
  loginUser: loginUser,
  refreshToken: refreshToken,
  logoutUser: logoutUser,

  getAllCategories: getAllCategories,
  getCategoryById: getCategoryById,
  getCategoryByName: getCategoryByName,
  createCategory: createCategory,
  updateCategory: updateCategory,
  deleteCategory: deleteCategory,

  getAllSubcategories: getAllSubcategories,
  getSubcategoriesByCategoryId: getSubcategoriesByCategoryId,
  getSubcategoriesByCategoryName: getSubcategoriesByCategoryName,
  getSubcategoryById: getSubcategoryById,
  getSubcategoryByName: getSubcategoryByName,
  createSubcategory: createSubcategory,
  updateSubcategory: updateSubcategory,
  deleteSubcategory: deleteSubcategory,
};
