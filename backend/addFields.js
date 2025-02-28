import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Product from "./models/Product.js"; // Replace with your model path
import { Category } from "./models/Category.js";

dotenv.config();

connectDB();

// const addFieldsToDocuments = async () => {
//   try {
//     const products = await Product.find();

//     // Iterate over each document and update it with random values
//     for (const product of products) {
//       const randomForYou = Math.random() >= 0.9;
//       const randomIsTrending = Math.random() >= 0.85;

//       await Product.updateOne(
//         { _id: product._id }, // Match by document ID
//         {
//           $set: {
//             forYou: randomForYou,
//             isTrending: randomIsTrending,
//           },
//         }
//       );
//     }

//     console.log("Fields added to all documents successfully!");
//     await mongoose.disconnect();
//   } catch (error) {
//     console.error("Error adding fields:", error.message);
//   }
// };

//addFieldsToDocuments();

const sizeChart = {
  Foundation: "1oz / 30mL",
  Concealer: "0.25oz / 7mL",
  Powder: "1oz / 30mL",
  Blush: "0.3oz / 10g",
  Bronzer: "0.3oz / 10g",
  Highlighter: "0.2oz / 6g",
  Eyeshadow: "0.5oz / 1.5g",
  Eyeliner: "0.03oz / 1g",
  Mascara: "0.3oz / 10mL",
  Lipstick: "0.1oz / 3g",
  Lipstain: "0.16oz / 15mL",
  Lipliner: "0.04oz / 1.2g",
  "Sheet Masks": "1 piece",
  "Face Masks": "1 piece",
  "Eye Concealer": "0.22oz / 6mL",
  "Unknown Category": "0.5oz / 15mL",
};

const findClosestSize = (categoryName) => {
  if (!categoryName) return "Unknown Size";

  // Try exact match first
  if (sizeChart[categoryName]) {
    return sizeChart[categoryName];
  }

  // Try fuzzy matching by checking if any key in `sizeChart` exists within `categoryName`
  for (const key in sizeChart) {
    if (categoryName.toLowerCase().includes(key.toLowerCase())) {
      return sizeChart[key];
    }
  }

  return "Unknown Size"; // Default if no match found
};

const addSizeToVariants = async () => {
  try {
    const products = await Product.find();
    console.log(`Total products found: ${products.length}`);

    if (products.length === 0) {
      console.log("No products found. Exiting...");
      return;
    }

    // Fetch all categories at once
    const categoryIds = new Set(
      products.flatMap((product) => [
        product.primaryCategory,
        product.secondaryCategory,
        product.tertiaryCategory,
        product.quaternaryCategory,
      ])
    );

    const categories = await Category.find({ _id: { $in: [...categoryIds] } });
    const categoryMap = new Map(
      categories.map((cat) => [cat._id.toString(), cat.title.trim()])
    );

    console.log("Category Map Loaded:", categoryMap);

    for (const product of products) {
      console.log(`\n🔹 Processing product: ${product._id}`);

      if (!Array.isArray(product.variants) || product.variants.length === 0) {
        console.log(`❌ Skipping ${product._id} - No variants found`);
        continue;
      }

      if (
        !Array.isArray(product.variantTypeCategory) ||
        !product.variantTypeCategory.includes("shade")
      ) {
        console.log(`❌ Skipping ${product._id} - No 'shade' category`);
        continue;
      }

      // Determine last non-empty category
      const lastCategoryId =
        product.quaternaryCategory ||
        product.tertiaryCategory ||
        product.secondaryCategory ||
        product.primaryCategory;

      console.log("🛠 Last Category ID:", lastCategoryId);

      if (!lastCategoryId) {
        console.log(`❌ Skipping ${product._id} - No valid category found`);
        continue;
      }

      const lastCategoryName = categoryMap.get(lastCategoryId.toString());

      if (!lastCategoryName) {
        console.log(`❌ Skipping ${product._id} - Category not found in DB`);
        continue;
      }

      console.log(`✅ Last Category Name: "${lastCategoryName}"`);

      // Get size from sizeChart
      const size =
        sizeChart[lastCategoryName] ||
        sizeChart[lastCategoryName.toLowerCase()] ||
        "0.5oz / 15mL";

      console.log(`📏 Assigned Size: "${size}"`);

      let updated = false;
      let updatedVariants = product.variants.map((variant, index) => {
        console.log(`\n🔹 Variant ${index}:`, JSON.stringify(variant, null, 2));

        if (!variant || typeof variant !== "object") {
          console.log(`❌ Skipping variant ${index} - Not an object`);
          return variant;
        }

        if (!variant.name) {
          console.log(`❌ Skipping variant ${index} - Missing 'name' property`);
          return variant;
        }

        if (variant.size === size) {
          console.log(`✅ Variant ${index} already has correct size: ${size}`);
          return variant;
        }

        console.log(`📌 Updating Variant ${index} → New size: ${size}`);

        updated = true;
        return { ...variant.toObject(), size }; // Ensure Mongoose object is converted
      });
      if (!updated) {
        console.log(`✅ No changes needed for ${product._id}`);
        continue;
      }

      console.log(`🔄 Updating Product ${product._id} in DB...`);

      const updatedProduct = await Product.findByIdAndUpdate(
        product._id,
        { $set: { variants: updatedVariants } },
        { new: true, runValidators: true }
      );

      console.log(`✅ Successfully updated ${product._id}`);
    }

    console.log("🎉 Size property added to relevant variants successfully!");

    setTimeout(async () => {
      await mongoose.disconnect();
    }, 3000);
  } catch (error) {
    console.error("❌ Error updating variants:", error.message);
  }
};

//addSizeToVariants();

// addSizeToVariants();
