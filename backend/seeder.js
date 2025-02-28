import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import address from "./data/address.js";
import profile from "./data/profile.js";
import User from "./models/User.js";
import Product from "./models/Product.js";
import Profile from "./models/Profile.js";
import Address from "./models/Address.js";
import { Category } from "./models/Category.js";
import Variant from "./models/Variant.js";
//import Order from "./models/Order.js";
import cloudinary from "./config/cloudinary.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Category.deleteMany();
    await SubCategory.deleteMany();
    await Profile.deleteMany();
    await Address.deleteMany();

    console.log("finished");

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    // Filter customers
    const customers = createdUsers.filter((user) => user.role === "customer");

    // Create addresses and profiles for customers using your imported data
    const promises = customers.map(async (customer, index) => {
      // Ensure there's a corresponding address and profile for each customer
      if (address[index] && profile[index]) {
        // Create an address
        const customerAddress = await Address.create({
          user: customer._id,
          street: address[index].street,
          city: address[index].city,
          state: address[index].state,
          zip: address[index].zip,
          country: address[index].country,
          phone: address[index].phone,
          notes: address[index].notes,
        });

        // Create a profile
        const customerProfile = await Profile.create({
          user: customer._id,
          skinType: profile[index].skinType,
          skinConcerns: profile[index].skinConcerns,
          skinTone: profile[index].skinTone,
          hairType: profile[index].hairType,
          hairTexture: profile[index].hairTexture,
          hairConcerns: profile[index].hairConcerns,
          hairColor: profile[index].hairColor,
          eyeColor: profile[index].eyeColor,
          ageRange: profile[index].ageRange,
        });

        return { customer, address: customerAddress, profile: customerProfile };
      } else {
        console.error(
          `No address or profile data found for customer: ${customer.name}`
        );
        return null;
      }
    });

    // Wait for all addresses and profiles to be created
    const createdData = await Promise.all(promises);

    console.log("Addresses and profiles created for customers:", createdData);

    const sampleProducts = await Promise.all(
      products.map(async (product, index) => {
        console.log(
          `problem return ${index} ${typeof product.name} ${typeof product.howToUse}`
        );
        // console.log(`problem return ${product.ingredients}`);

        const cleanString = (str) =>
          str
            ?.replace(/<b>/g, "")
            .replace(/<\/b>/g, "")
            .replace(/<br\s*\/?>/g, "")
            .replace(/\n/g, "")
            .trim();
        const cleanedBenefits = cleanString(product.benefits);
        const cleanedDescription = cleanString(product.description);
        const cleanedHowToUse = product.howToUse.map((str) => cleanString(str));
        //console.log(`problem return ${cleanedIngredients}`);
        //console.log(typeof cleanedIngredients);

        const cleanedTypeValues = [
          ...new Set(
            product.optionTypes.flatMap((optionType) => {
              if (optionType.name === "size") {
                return optionType.values.map((value) => {
                  // Convert size values
                  if (value.includes("oz/")) return value; // Skip already formatted values

                  const match = value.match(/(\d+(\.\d+)?)\s*(mL)/); // Extract numeric mL
                  if (match) {
                    const mLValue = parseFloat(match[1]);
                    const ozValue = (mLValue / 29.5735).toFixed(1); // Convert to oz
                    return `${ozValue} oz/ ${value}`;
                  }
                  return value; // If not size format, return as is
                });
              }

              // Return other optionType values as is
              return optionType.values || [];
            })
          ),
        ].sort((a, b) => parseInt(a, 10) - parseInt(b, 10)); // Sort numerically
        console.log("optionVariants.size:", typeof product.optionVariants.size);

        const variants = await Promise.all(
          Object.entries(product.optionVariants.size || {}).map(
            async ([key, variant]) => {
              console.log(`successful ${key}`);
              let uploadedIconUrl = null;

              // Upload the icon image if it exists
              if (variant.iconUrl) {
                try {
                  const iconResponse = await cloudinary.uploader.upload(
                    variant.iconUrl,
                    {
                      folder: "noirAllure/products/iconUrl",
                    }
                  );
                  uploadedIconUrl = iconResponse.secure_url;
                } catch (error) {
                  console.error(
                    `Failed to upload icon for variant ${variant.name}: ${variant.iconUrl}`,
                    error.message
                  );
                  uploadedIconUrl = null; // You can choose to skip or set to null
                }
              }

              // Upload other images if they exist
              const uploadedImageUrls = [];
              if (Array.isArray(variant.imageUrls)) {
                for (const imageUrl of variant.imageUrls) {
                  try {
                    const imageResponse = await cloudinary.uploader.upload(
                      imageUrl,
                      {
                        folder: "noirAllure/products/imageUrls",
                      }
                    );
                    uploadedImageUrls.push(imageResponse.secure_url);
                  } catch (error) {
                    console.error(
                      `Failed to upload image for variant ${variant.name}:`,
                      error.message
                    );
                    continue;
                    // You can skip the image or continue, depending on your preference
                  }
                }
              }
              const isSale = variant.originalPrice !== variant.price;
              // const cleanedIngredients = variant.ingredients.map((str) =>
              //   cleanString(str)
              // );

              // Find the matching size value in cleanedTypeValues
              const updatedName = cleanedTypeValues.find(
                (size) => size.includes(variant.name) // Match variant.name with cleanedTypeValues
              );

              // Determine the sizeName based on the size comparison
              let sizeName = variant.sizeName; // Use existing sizeName if present
              // if (
              //   !sizeName &&
              //   product.optionTypes.some((opt) => opt.name === "size")
              // ) {
              //   // Extract the size in mL from the name
              //   const sizeInML = parseFloat(
              //     (updatedName || variant.name).match(
              //       /(\d+(\.\d+)?)\s*mL/
              //     )?.[1] || 0
              //   );

              //   // Get all size values in mL for comparison
              //   const sizesInML = cleanedTypeValues.map((size) =>
              //     parseFloat(size.match(/(\d+(\.\d+)?)\s*mL/)?.[1] || 0)
              //   );

              //   if (sizesInML.length === 1) {
              //     // If there's only one size, it's the standard size
              //     sizeName = "Standard size";
              //   } else {
              //     // Otherwise, determine based on size comparison
              //     const maxSize = Math.max(...sizesInML);
              //     sizeName =
              //       sizeInML === maxSize ? "Standard size" : "Mini size";
              //   }
              // }
              console.log(`finished successful ${key}`);
              console.log(typeof variant.ingredients);
              // Return the processed variant data
              return {
                name: updatedName || variant.name,
                sizeName,
                iconUrl: uploadedIconUrl,
                imageUrls: uploadedImageUrls,
                countInStock: Math.floor(Math.random() * 101),
                ingredients: variant.ingredients,
                price: variant.originalPrice,
                onSale: isSale,
                salePrice: isSale ? variant.price : null,
              };
            }
          )
        );

        console.log("Processed Variants:", variants);

        console.log("Processed Variants:", JSON.stringify(variants, null, 2));

        const numOfReviews = Math.floor(Math.random() * 1000) + 1;
        const countInStock = variants.reduce(
          (acc, variant) => acc + variant.countInStock,
          0
        );
        const status = countInStock > 0 ? "in-stock" : "out-of-stock";
        const isFeatured = Math.random() >= 0.8;
        const isBestSelling = Math.random() >= 0.9;
        const newArrival = Math.random() >= 0.85;
        const forYou = Math.random() >= 0.85;
        const isTrending = Math.random() >= 0.9;

        // Add deliveryType field using the random function
        const deliveryType = getRandomDeliveryType();
        const shippingPreference = getRandomShippingPreference();

        // Generate or get slug for the product
        const slugify = (text) =>
          text
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, ""); // Clean the product name for slugs
        const productSlug = `${slugify(product.name)}-${(Math.random() + 1)
          .toString(36)
          .substring(7)}`; // Combine the cleaned name with the ObjectId

        let primaryCategory;
        // Create or find categories for primary, secondary, tertiary, and quaternary
        try {
          primaryCategory = await Category.findOneAndUpdate(
            { title: product.categories[0], level: "primary" },
            {
              $set: {
                title: product.categories[0],
                level: "primary",
                linkName: product.categories[0]
                  .replaceAll(/& /gi, "")
                  .split(" ")
                  .join("-")
                  .toLowerCase(),
              },
            },
            { upsert: true, new: true }
          );
        } catch (err) {
          if (err.code === 11000) {
            console.error("Duplicate category detected:", err.keyValue.title);
            // Optionally retrieve the existing category
            const primaryCategory = await Category.findOne({
              title: product.categories[0],
              level: "primary",
            });
          } else {
            throw err; // Rethrow other errors
          }
        }

        const generateUniqueLinkName = async (baseName, primaryCategory) => {
          let linkName = baseName
            .replaceAll(/& /gi, "")
            .split(" ")
            .join("-")
            .toLowerCase();
          let existingCategory = await Category.findOne({ linkName });

          if (existingCategory) {
            linkName += `-${primaryCategory.linkName}`;
          }

          return linkName;
        };

        const secondaryCategory = await Category.findOneAndUpdate(
          {
            title: product.categories[1],
            level: "secondary",
            parentCategoryId: primaryCategory._id,
          },
          {
            $set: {
              title: product.categories[1],
              level: "secondary",
              parentCategoryId: primaryCategory._id,
              linkName:
                product.secondaryLinkName ||
                (await generateUniqueLinkName(
                  product.categories[1],
                  primaryCategory
                )),
            },
          },
          { upsert: true, new: true }
        );

        const tertiaryCategory = product.categories[2]
          ? await Category.findOneAndUpdate(
              {
                title: product.categories[2],
                level: "tertiary",
                parentCategoryId: secondaryCategory._id,
              },
              {
                $set: {
                  title: product.categories[2],
                  level: "tertiary",
                  parentCategoryId: secondaryCategory._id,
                  linkName:
                    product.teritaryLinkName ||
                    (await generateUniqueLinkName(
                      product.categories[2],
                      primaryCategory
                    )),
                },
              },
              { upsert: true, new: true }
            )
          : null;

        const quaternaryCategory = product.categories[3]
          ? await Category.findOneAndUpdate(
              {
                title: product.categories[3],
                level: "quaternary",
                parentCategoryId: tertiaryCategory?._id,
              },
              {
                $set: {
                  title: product.categories[3],
                  level: "quaternary",
                  parentCategoryId: tertiaryCategory?._id,
                  linkName:
                    product.quaternaryLinkName ||
                    (await generateUniqueLinkName(
                      product.categories[3],
                      primaryCategory
                    )),
                },
              },
              { upsert: true, new: true }
            )
          : null;

        return {
          name: product.name,
          slug: productSlug,
          brandName: product.brandName,
          benefits: cleanedBenefits,
          description: cleanedDescription,
          howToUse: cleanedHowToUse,
          variantTypeCategory: product.optionTypeCategories,
          variantTypeValues: cleanedTypeValues || "none",
          variants: variants,
          primaryCategory: primaryCategory._id,
          secondaryCategory: secondaryCategory._id,
          tertiaryCategory: tertiaryCategory?._id || null,
          quaternaryCategory: quaternaryCategory?._id || null,
          rating: product.rating,
          numReviews: numOfReviews,
          countInStock,
          status,
          isFeatured,
          isBestSelling,
          newArrival,
          deliveryType,
          shippingPreference,
          forYou,
          isTrending,
          user: adminUser,
        };
      })
    );

    await Product.insertMany(sampleProducts);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error Name: ${error.name}`.red.inverse);
      console.error(`Error Message: ${error.message}`.red.inverse);
      console.error(`Stack Trace: ${error.stack}`.red.inverse);
    } else {
      console.error(
        `Unexpected error: ${JSON.stringify(error, null, 2)}`.red.inverse
      );
    }
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    //await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Category.deleteMany();
    await SubCategory.deleteMany();
    await Profile.deleteMany();
    await Address.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}

function getRandomDeliveryType() {
  const deliveryOptions = [
    { type: "None", weight: 55 }, // Higher weight for "None"
    { type: "Pickup", weight: 20 },
    { type: "Same-Day Delivery", weight: 15 },
    { type: "Exclusive", weight: 10 },
  ];

  const totalWeight = deliveryOptions.reduce(
    (sum, option) => sum + option.weight,
    0
  );
  const randomWeight = Math.random() * totalWeight;

  let cumulativeWeight = 0;
  for (const option of deliveryOptions) {
    cumulativeWeight += option.weight;
    if (randomWeight <= cumulativeWeight) {
      return option.type;
    }
  }
}

function getRandomShippingPreference() {
  const shippingOptions = [
    { type: "None", weight: 30 }, // Higher weight for "None"
    { type: "Exclusive", weight: 30 },
    { type: "Online-Only", weight: 20 },
    { type: "Limited Time", weight: 10 },
  ];

  const totalWeight = shippingOptions.reduce(
    (sum, option) => sum + option.weight,
    0
  );
  const randomWeight = Math.random() * totalWeight;

  let cumulativeWeight = 0;
  for (const option of shippingOptions) {
    cumulativeWeight += option.weight;
    if (randomWeight <= cumulativeWeight) {
      return option.type;
    }
  }
}
