import mongoose from "mongoose";
import fs from "fs";
import dotenv from "dotenv";
import categories from "./data/category.js";
import products from "./data/products.js";
import productCategories from "./data/productCategories.js";
//import Product from "./models/Product.js"; // Replace with your model path
import { Category } from "./models/Category.js";
import cloudinary from "./config/cloudinary.js";
//import connectDB from "./config/db.js";

const MONGO_URI =
  "mongodb+srv://starTrek:STARtrek%21@cluster0.ufelvl9.mongodb.net/NoirAllure?retryWrites=true&w=majority";
// dotenv.config();
// connectDB();

const bulkUpdateCategories = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    // Check if MongoDB is connected before proceeding
    if (mongoose.connection.readyState !== 1) {
      throw new Error("MongoDB connection is not open.");
    }

    //     console.log("Connected to MongoDB");

    // Fetch all categories and subcategories
    const allCategories = await Category.find();

    //     const allSubCategories = await SubCategory.find({});

    //     for (const category of allSubCategories) {
    //       const linkName = category.title
    //         .replaceAll(/& /gi, "")
    //         .split(" ")
    //         .join("-")
    //         .toLowerCase();

    //       await SubCategory.updateOne(
    //         { _id: category._id }, // Match by document ID
    //         {
    //           $set: {
    //             linkName: linkName,
    //           },
    //         }
    //       );
    //     }

    for (const category of allCategories) {
      // const title = category.title;
      // const index = categories.findIndex((cat) => cat.title === title);
      // const catImage = categories[index].image;
      // const imageResponse = await cloudinary.uploader.upload(catImage, {
      //   folder: "noirAllure/categories",
      // });
      // let uploadedImageUrl = imageResponse.secure_url;
      const array = await Category.find({ parentCategoryId: category._id });
      await Category.updateOne(
        { _id: category._id },
        {
          $set: {
            subCategories: array,
          },
        }
      );
    }

    //     // // Helper function to recursively build subcategory hierarchy
    //     // const buildSubCategoryHierarchy = (parentCategoryId, level) => {
    //     //   // Filter subcategories based on parentCategoryId and level
    //     //   const subCategoriesAtLevel = allSubCategories.filter(
    //     //     (subcategory) =>
    //     //       subcategory.parentCategoryId?.toString() === parentCategoryId &&
    //     //       subcategory.level === level
    //     //   );

    //     //   const subCategoryMap = {};

    //     //   // Recursively find and map subcategories for each subcategory
    //     //   subCategoriesAtLevel.forEach((subcategory) => {
    //     //     const childSubCategories = buildSubCategoryHierarchy(
    //     //       subcategory._id.toString(),
    //     //       getNextLevel(level)
    //     //     );
    //     //     subCategoryMap[subcategory._id] = childSubCategories;

    //     //     // Update each subcategory with its sub-subcategories
    //     //     subcategory.subCategories = childSubCategories;
    //     //     subcategory.save(); // Save the updated subcategory
    //     //   });

    //     //   return subCategoriesAtLevel.map((subcategory) => subcategory._id); // Return current level subcategories
    //     // };

    //     // // Function to get the next level in the hierarchy
    //     // const getNextLevel = (level) => {
    //     //   const levels = ["primary", "secondary", "tertiary", "quaternary"];
    //     //   const currentIndex = levels.indexOf(level);
    //     //   return levels[currentIndex + 1] || null;
    //     // };

    //     // // Start with primary categories and associate them with subcategories
    //     // allCategories.forEach((category) => {
    //     //   if (category.level === "primary") {
    //     //     const subCategories = buildSubCategoryHierarchy(
    //     //       category._id.toString(),
    //     //       "secondary"
    //     //     );
    //     //     category.subCategories = subCategories;
    //     //     category.save(); // Save the updated category with its subcategories
    //     //   }
    //     // });

    console.log("Category subcategories updated successfully!");
  } catch (error) {
    console.error("Error updating categories in bulk:", error.message);
  } finally {
    // Close the connection
    //await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
};

bulkUpdateCategories();

const migrateSubCategoriesToCategories = async () => {
  try {
    // Connect to your MongoDB database
    await mongoose.connect(MONGO_URI, {
      //useNewUrlParser: true,
      //useUnifiedTopology: true,
    });

    const secondaryCategory = await Category.find({ level: "secondary" });
    console.log(secondaryCategory.length);

    // // Get all existing subcategories
    // const subcategories = await SubCategory.find();

    // for (const subCategory of subcategories) {
    //   // Find an existing category that matches the subcategory title and parentCategoryId
    //   const existingCategory = await Category.findOne({
    //     title: subCategory.title,
    //     parentCategoryId: subCategory.parentCategoryId,
    //   });

    //   if (!existingCategory) {
    //     // Create a new category for each subcategory that doesn't exist already
    //     const newCategory = new Category({
    //       title: subCategory.title,
    //       linkName: subCategory.linkName,
    //       level: subCategory.level,
    //       parentCategoryId: subCategory.parentCategoryId,
    //       subCategories: subCategory.subCategories,
    //       oldId: subCategory._id,
    //     });

    //     // Save the new category to the database
    //     await newCategory.save();
    //     console.log(`Migrated subcategory: ${subCategory.title}`);
    //   } else {
    //     console.log(`Category already exists: ${subCategory.title}`);
    //   }

    //   // Optionally, update the SubCategory document if needed
    //   subCategory.migrated = true;
    //   await subCategory.save();
    // }

    console.log("Migration completed successfully.");
    mongoose.connection.close(); // Close the connection when done
  } catch (error) {
    console.error("Migration failed:", error);
  }
};

// Run the migration script
//migrateSubCategoriesToCategories();

//const bulkUpdateCategories = async () => {
//   try {
//     await mongoose.connect(MONGO_URI, {
//       // useNewUrlParser: true,
//       // useUnifiedTopology: true,
//     });

//     // Check if MongoDB is connected before proceeding
//     if (mongoose.connection.readyState !== 1) {
//       throw new Error("MongoDB connection is not open.");
//     }
//     console.log("Connected to MongoDB");

//     // Fetch all categories and log the first few to verify their structure
//     const allCategories = await Category.find({});
//     //console.log("Found categories:", allCategories.slice(0, 5));

//     // Perform the bulk update to unset the 'oldId' field in all categories
//     const result = await Category.updateMany(
//       {}, // Empty query to target all documents
//       { $unset: { oldId: "" } } // Removes the 'oldId' field
//     );

//     // Log the result object to check the update status
//     console.log("Bulk update result:", result);

//     if (result.acknowledged) {
//       console.log(
//         `Bulk update completed: ${result.modifiedCount} categories updated.`
//       );
//     } else {
//       console.log("No categories were modified.");
//     }
//   } catch (error) {
//     console.error("Error updating categories in bulk:", error.message);
//   } finally {
//     // Close the connection
//     await mongoose.disconnect();
//     console.log("Disconnected from MongoDB");
//   }
// };

// // Call the function to perform the bulk update
// bulkUpdateCategories();

// const createCategories = async () => {
//   try {
//     await mongoose.connect(MONGO_URI);
//     for (const categoryData of categoriesData) {
//       const existingCategory = await Category.findById(categoryData._id);
//       if (!existingCategory) {
//         const subCategoryObjectIds = categoryData.subCategories.map(
//           (id) => new mongoose.Types.ObjectId(id)
//         );

//         const newCategory = new Category({
//           title: categoryData.title,
//           linkName: categoryData.linkName,
//           image: categoryData.image,
//           level: categoryData.level,
//           subCategories: subCategoryObjectIds,
//           oldId: categoryData._id,
//         });
//         await newCategory.save();
//         console.log(`Created category: ${categoryData.title}`);
//       }
//     }
//     mongoose.connection.close();
//   } catch (error) {
//     console.error("Error creating categories:", error);
//   }
// };

// createCategories();

const updateSubCategories = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    // Fetch all subcategories
    const subCategories = await SubCategory.find();
    console.log(subCategories.length);

    for (const subCategory of subCategories) {
      // Assuming you have a way to map subcategory back to its new parent category
      const newParentCategory = await Category.findOne({
        oldId: subCategory.parentCategoryId,
      });

      if (newParentCategory) {
        subCategory.parentCategoryId = newParentCategory._id;
        await subCategory.save();
        console.log(`Updated subcategory: ${subCategory.title}`);
      }
    }

    mongoose.connection.close();
  } catch (error) {
    console.error("Error updating subcategories:", error);
  }
};

//updateSubCategories();

const updateProductCategories = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    // Fetch all products
    const products = await Product.find();
    console.log(products.length);

    for (const product of products) {
      // Update the category and subCategory references in the product
      // This is assuming products reference old category IDs by _id or similar
      if (product.secondaryCategory) {
        const newCategory = await Category.findOne({
          oldId: product.secondaryCategory,
        });
        if (newCategory) {
          product.secondaryCategory = newCategory._id;
          await product.save();
        }
      }

      // if (product.subCategories) {
      //   // For each subCategory, find and update with the new ID
      //   for (let i = 0; i < product.subCategories.length; i++) {
      //     const subCategory = await SubCategory.findById(
      //       product.subCategories[i]
      //     );
      //     if (subCategory) {
      //       const newSubCategory = await SubCategory.findOne({
      //         oldSubCategoryId: subCategory._id,
      //       });
      //       if (newSubCategory) {
      //         product.subCategories[i] = newSubCategory._id;
      //       }
      //     }
      //   }
      //   await product.save();
      // }/

      console.log(`Updated product: ${product.title}`);
    }

    mongoose.connection.close();
  } catch (error) {
    console.error("Error updating products:", error);
  }
};

//updateProductCategories();

// const deleteNonPrimaryCategories = async () => {
//   try {
//     // Connect to your MongoDB database
//     await mongoose.connect(MONGO_URI, {
//       // useNewUrlParser: true,
//       // useUnifiedTopology: true,
//     });

//     // Delete categories that are not primary
//     const result = await Category.deleteMany({ level: { $ne: "primary" } });

//     console.log(`Deleted ${result.deletedCount} non-primary categories.`);
//     mongoose.connection.close(); // Close the connection when done
//   } catch (error) {
//     console.error("Error deleting non-primary categories:", error);
//   }
// };

// //Call the function to delete non-primary categories
// deleteNonPrimaryCategories();

// const categoryCounts = [];

// // Step 2: Loop through products and count categories
// products.forEach(({ categories }) => {
//   categories.forEach((category, index) => {
//     // Ensure the index exists in `categoryCounts`
//     if (!categoryCounts[index]) {
//       categoryCounts[index] = {};
//     }
//     // Increment count for the current category
//     categoryCounts[index][category] =
//       (categoryCounts[index][category] || 0) + 1;
//   });
// });

// // Output results
// console.log(categoryCounts);

// [
//   {
//     Makeup: 49,
//     Skincare: 11,
//     "Bath & Body": 4,
//     Fragrance: 4,
//     Hair: 1,
//     "Tools & Brushes": 1,
//   },
//   {
//     Lip: 6,
//     Face: 19,
//     Masks: 2,
//     "Body Moisturizers": 3,
//     Eye: 9,
//     Cheek: 6,
//     Women: 4,
//     Cleansers: 3,
//     Moisturizers: 2,
//     "Hair Styling & Treatments": 1,
//     "Lip Balms & Treatments": 2,
//     "Value & Gift Sets": 3,
//     "Brushes & Applicators": 8,
//     Treatments: 2,
//   },
//   {
//     "Lip Stain & Tint": 2,
//     "Setting & Finishing Spray": 1,
//     "Face Masks": 1,
//     "Hand Cream & Foot Cream": 1,
//     "Concealer & Corrector": 6,
//     Blush: 5,
//     Eyeliner: 3,
//     "Body Lotions & Body Oils": 1,
//     Perfume: 2,
//     "Sheet Masks": 1,
//     Lipstick: 2,
//     "BB & CC Cream": 1,
//     Foundation: 3,
//     "Face Wash & Cleansers": 1,
//     "Highlighter & Illuminator": 3,
//     "Mists & Essences": 2,
//     "Body Mist & Hair Mist": 2,
//     "Hair Masks": 1,
//     Eyebrows: 1,
//     Exfoliators: 1,
//     "Tinted Moisturiser": 2,
//     Bronzer: 2,
//     "Face Brushes": 6,
//     "Face Serums": 2,
//     Powder: 2,
//     "Body Lotions & Body Oils ": 1,
//     "Lip Liner": 2,
//     "Sponges & Applicators": 1,
//     Contour: 1,
//     "Face Primer": 2,
//     Mascara: 2,
//     "Brush Cleaners": 1,
//     Toners: 1,
//   },
//   { "Under Eye Concealer": 3 },
// ];

// const productCategories = products.map((product) => {
//   return {
//     name: product.name,
//     id: product.id,
//     categories: product.categories,
//     variants: product.optionVariants,
//   };
// });

// // Output results
// // Write final data back to a file
// fs.writeFileSync(
//   "productCategories.json",
//   JSON.stringify(productCategories, null, 2),
//   "utf-8"
// );
// console.log("Final data has been written to 'finalData.json'");

// const categoryTree = {};

// products.forEach(({ categories }) => {
//   let currentLevel = categoryTree;

//   categories.forEach((category) => {
//     if (!currentLevel[category]) {
//       currentLevel[category] = {};
//     }
//     currentLevel = currentLevel[category];
//   });
// });

// console.log(JSON.stringify(categoryTree, null, 2));
let obj = {
  Makeup: {
    Lip: {
      "Lip Stain & Tint": {},
      Lipstick: {},
      "Lip Liner": {},
    },
    Face: {
      "Setting & Finishing Spray": {},
      "Concealer & Corrector": {},
      "BB & CC Cream": {},
      Foundation: {},
      "Highlighter & Illuminator": {},
      "Tinted Moisturiser": {},
      Powder: {},
      Bronzer: {},
      Contour: {},
      "Face Primer": {},
    },
    Eye: {
      "Concealer & Corrector": {
        "Under Eye Concealer": {},
      },
      Eyeliner: {},
      Eyebrows: {},
      Mascara: {},
    },
    Cheek: {
      Blush: {},
      Bronzer: {},
    },
    "Value & Gift Sets": {},
    "Brushes & Applicators": {
      "Face Brushes": {},
      "Sponges & Applicators": {},
      "Brush Cleaners": {},
    },
  },
  Skincare: {
    Masks: {
      "Face Masks": {},
      "Sheet Masks": {},
    },
    Cleansers: {
      "Face Wash & Cleansers": {},
      Exfoliators: {},
      Toners: {},
    },
    Moisturizers: {
      "Mists & Essences": {},
    },
    "Lip Balms & Treatments": {},
    Treatments: {
      "Face Serums": {},
    },
  },
  "Bath & Body": {
    "Body Moisturizers": {
      "Hand Cream & Foot Cream": {},
      "Body Lotions & Body Oils": {},
    },
    "Value & Gift Sets": {},
  },
  Fragrance: {
    Women: {
      Perfume: {},
      "Body Mist & Hair Mist": {},
    },
  },
  Hair: {
    "Hair Styling & Treatments": {
      "Hair Masks": {},
    },
  },
  "Tools & Brushes": {
    "Value & Gift Sets": {},
  },
};

// const mergedProducts = products.map((product) => {
//   const updatedProduct = productCategories.find(
//     (upd) => upd.id === product.id && upd.name === product.name
//   );

//   return updatedProduct
//     ? { ...product, ...updatedProduct } // Merge updated fields
//     : product; // Keep original if no update found
// });

// //console.log(mergedProducts);
// fs.writeFileSync(
//   "mergedProducts.json",
//   JSON.stringify(mergedProducts, null, 2),
//   "utf-8"
// );
// console.log("Final data has been written to 'finalData.json'");
