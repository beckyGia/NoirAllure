import { Category } from "../models/Category.js";
import Product from "../models/Product.js";

export const recalculateCategoryCounts = async () => {
  const categories = await Category.find(); // Get all categories

  for (const category of categories) {
    let productCount;
    if (category.level === "primary") {
      productCount = await Product.countDocuments({
        primaryCategory: category._id,
      });
    } else if (category.level === "secondary") {
      productCount = await Product.countDocuments({
        secondaryCategory: category._id,
      });
    } else if (category.level === "tertiary") {
      productCount = await Product.countDocuments({
        tertiaryCategory: category._id,
      });
    } else if (category.level === "quaternary") {
      productCount = await Product.countDocuments({
        quaternaryCategory: category._id,
      });
    }

    // Update the productCount field in the Category schema
    await Category.findByIdAndUpdate(category._id, { productCount });
  }
};

// export const updateCategoryCount = async (categoryId, level) => {
//   if (!categoryId) return;

//   let filter = {};
//   if (level === "primary") filter = { primaryCategory: categoryId };
//   if (level === "secondary") filter = { secondaryCategory: categoryId };
//   if (level === "tertiary") filter = { tertiaryCategory: categoryId };
//   if (level === "quaternary") filter = { quaternaryCategory: categoryId };

//   const productCount = await Product.countDocuments(filter);

//   await Category.findByIdAndUpdate(categoryId, { productCount });
// };
