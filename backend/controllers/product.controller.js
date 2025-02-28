import { redis } from "../config/redis.js";
import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/Product.js";
import generateQueriesAndSort from "../helpers/generateQueriesAndSort.js";
import { Category } from "../models/Category.js";
import Review from "../models/Review.js";

// @desc    Fetch all products
// @route   GET /api/products/
// @access  Private/Admin
export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({ products });
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = asyncHandler(async (req, res) => {
  // console.log("Request Params:", req.params);
  // console.log("Product ID from Params:", req.params.id);

  const product = await Product.findById(req.params.id);
  if (product) {
    return res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error("Resource Not Found");
  }
});

// @desc    Fetch similar products of a single product
// @route   GET /api/products/:id/similar
// @access  Public
export const getSimilarProductsOfASingleProduct = asyncHandler(
  async (req, res) => {
    //console.log("Request Params:", req.params);

    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error("Resource Not Found");
    }

    // Find the last available category
    const categoryId =
      product.quaternaryCategory ||
      product.tertiaryCategory ||
      product.secondaryCategory ||
      product.primaryCategory;

    if (!categoryId) {
      res.status(400);
      throw new Error("Product does not belong to any category");
    }

    // Find similar products (excluding the current product)
    const similarProducts = await Product.find({
      $or: [
        { primaryCategory: categoryId },
        { secondaryCategory: categoryId },
        { tertiaryCategory: categoryId },
        { quaternaryCategory: categoryId },
      ],
      _id: { $ne: product._id }, // Exclude current product
    }).limit(10); // Optional: Limit results

    res.status(200).json(similarProducts);
  }
);

// // @desc    Fetch Products Based On Category
// // @route   GET /api/products/:level/:categoryId
// // @access  Public
// export const getProductsByCategory = asyncHandler(async (req, res) => {
//   const { level, categoryId } = req.params;
//   const pageSize = 9;
//   const page = Number(req.query.pageNumber) || 1;
//   let filter = {};

//   // Determine which field to filter by based on the level
//   if (level === "primary") {
//     filter = { primaryCategory: categoryId };
//   } else if (level === "secondary") {
//     filter = { secondaryCategory: categoryId };
//   } else if (level === "tertiary") {
//     filter = { tertiaryCategory: categoryId };
//   } else if (level === "quaternary") {
//     filter = { quaternaryCategory: categoryId };
//   } else {
//     res.status(400);
//     throw new Error("Invalid Category Level");
//   }

//   const count = await Product.countDocuments(filter);

//   // Fetch products matching the filter
//   const products = await Product.find(filter)
//     .limit(pageSize)
//     .skip(pageSize * (page - 1));

//   res.status(200).json({
//     level: level,
//     categoryId: categoryId,
//     products: products,
//     page: page,
//     pages: Math.ceil(count / pageSize), // Use count now
//     itemsPerPage: pageSize,
//     totalProducts: count, // Optional: return total product count
//   });
// });

// @desc    Fetch Featured Products
// @route   GET /api/products/featured
// @access  Public
export const getFeaturedProducts = asyncHandler(async (req, res) => {
  let featuredProducts = await redis.get("featured_products");

  //console.log("Redis data:", featuredProducts); // Debugging log

  if (featuredProducts) {
    return res.json(JSON.parse(featuredProducts));
  }

  //if not in redis, fetch it from mongodb
  // .lean() is gonna return a plain javascript object instead of a mongodb document
  // which is good for performance
  featuredProducts = await Product.find({ isFeatured: true })
    .sort({ rating: -1 })
    .limit(8)
    .lean();

  if (!featuredProducts) {
    res.status(404);
    throw new Error("No Featured Products found");
  }

  //Store in redis for future quick access
  await redis.set("featured_products", JSON.stringify(featuredProducts));

  res.status(200).json(featuredProducts);
});

// @desc    Fetch Best Selling Products
// @route   GET /api/products/bestselling
// @access  Public
export const getBestSellingProducts = asyncHandler(async (req, res) => {
  let bestsellingProducts = await redis.get("bestselling_products");

  //console.log("Redis data:", bestsellingProducts); // Debugging log

  if (bestsellingProducts) {
    return res.json(JSON.parse(bestsellingProducts));
  }

  bestsellingProducts = await Product.find({ isBestSelling: true })
    .sort({ rating: -1 })
    .limit(8)
    .lean();

  if (!bestsellingProducts) {
    res.status(404);
    throw new Error("No Best Selling Products found");
  }

  //Store in redis for future quick access
  await redis.set("bestselling_products", JSON.stringify(bestsellingProducts));

  res.status(200).json(bestsellingProducts);
});

// @desc    Fetch Newly Arrived Products
// @route   GET /api/products/new
// @access  Public
export const getNewlyArrivedProducts = asyncHandler(async (req, res) => {
  let newProducts = await redis.get("new_products");

  //console.log("Redis data:", newProducts); // Debugging log

  if (newProducts) {
    return res.json(JSON.parse(newProducts));
  }

  //if not in redis, fetch it from mongodb
  // .lean() is gonna return a plain javascript object instead of a mongodb document
  // which is good for performance
  newProducts = await Product.find({ newArrival: true })
    .sort({ rating: -1 })
    .limit(8)
    .lean();

  if (!newProducts) {
    res.status(404);
    throw new Error("No New Products found");
  }

  //Store in redis for future quick access
  await redis.set("new_products", JSON.stringify(newProducts));

  res.status(200).json(newProducts);
});

// @desc    Fetch For You Products
// @route   GET /api/products/for-you
// @access  Public
export const getForYouProducts = asyncHandler(async (req, res) => {
  let forYouProducts = await redis.get("for-you_products");

  //console.log("Redis data:", forYouProducts); // Debugging log

  if (forYouProducts) {
    return res.json(JSON.parse(forYouProducts));
  }

  //if not in redis, fetch it from mongodb
  // .lean() is gonna return a plain javascript object instead of a mongodb document
  // which is good for performance
  forYouProducts = await Product.find({ forYou: true })
    .sort({ rating: -1 })
    .limit(8)
    .lean();

  if (!forYouProducts) {
    res.status(404);
    throw new Error("No For You Products found");
  }

  //Store in redis for future quick access
  await redis.set("for-you_products", JSON.stringify(forYouProducts));

  res.status(200).json(forYouProducts);
});

// @desc    Fetch Is Trending Products
// @route   GET /api/products/trending
// @access  Public
export const getIsTrendingProducts = asyncHandler(async (req, res) => {
  let trendingProducts = await redis.get("trending_products");

  //console.log("Redis data:", trendingProducts); // Debugging log

  if (trendingProducts) {
    return res.json(JSON.parse(trendingProducts));
  }

  //if not in redis, fetch it from mongodb
  // .lean() is gonna return a plain javascript object instead of a mongodb document
  // which is good for performance
  trendingProducts = await Product.find({ isTrending: true })
    .sort({ rating: -1 })
    .limit(8)
    .lean();

  if (!trendingProducts) {
    res.status(404);
    throw new Error("No Trending Products found");
  }

  //Store in redis for future quick access
  await redis.set("trending_products", JSON.stringify(trendingProducts));

  res.status(200).json(trendingProducts);
});

// @desc    Fetch Shipping Preference of Products Counts By Category
// @route   GET /api/products/:linkName/shipping
// @access  Public
export const getShippingPreferenceCountsByCategory = asyncHandler(
  async (req, res) => {
    const { linkName } = req.params;
    const {
      brands,
      rating,
      shipping,
      delivery,
      sale,
      newlyArrived,
      minPrice,
      maxPrice,
      sortBy,
    } = req.query || {};

    const category = await Category.findOne({ linkName });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const categoryId = category._id;

    const { query } = generateQueriesAndSort({
      brands,
      rating,
      shipping,
      delivery,
      sale,
      newlyArrived,
      minPrice,
      maxPrice,
    });

    const shippingPreference = [
      "None",
      "Exclusive",
      "Limited Time",
      "Online-Only",
    ];
    const shippingCounts = {};

    for (const preference of shippingPreference) {
      const count = await Product.countDocuments({
        ...query,
        $or: [
          { primaryCategory: categoryId },
          { secondaryCategory: categoryId },
          { tertiaryCategory: categoryId },
          { quaternaryCategory: categoryId },
        ],
        shippingPreference: preference,
      });
      shippingCounts[preference] = count;
    }

    res.json(shippingCounts);
    // console.log(shippingCounts);
  }
);

// @desc    Fetch Delivery Type of Products Counts By Category
// @route   GET /api/products/:linkName/delivery
// @access  Public
export const getDeliveryTypeCountsByCategory = asyncHandler(
  async (req, res) => {
    const { linkName } = req.params;
    const {
      brands,
      rating,
      shipping,
      delivery,
      sale,
      newlyArrived,
      minPrice,
      maxPrice,
    } = req.query || {};

    const category = await Category.findOne({ linkName });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const categoryId = category._id;

    const { query } = generateQueriesAndSort({
      brands,
      rating,
      shipping,
      delivery,
      sale,
      newlyArrived,
      minPrice,
      maxPrice,
    });

    const deliveryType = ["None", "Pickup", "Same-Day Delivery", "Exclusive"];
    const deliveryCounts = {};

    for (const type of deliveryType) {
      const count = await Product.countDocuments({
        ...query,
        $or: [
          { primaryCategory: categoryId },
          { secondaryCategory: categoryId },
          { tertiaryCategory: categoryId },
          { quaternaryCategory: categoryId },
        ],
        deliveryType: type, // Filter by rating
      });
      deliveryCounts[type] = count;
    }

    res.json(deliveryCounts);
  }
);

// @desc    Fetch Newest Products Count By Category
// @route   GET /api/products/:linkName/new
// @access  Public
export const getNewlyArrivedCountsByCategory = asyncHandler(
  async (req, res) => {
    const { linkName } = req.params;
    const {
      brands,
      rating,
      shipping,
      delivery,
      sale,
      newlyArrived,
      minPrice,
      maxPrice,
    } = req.query || {};

    const category = await Category.findOne({ linkName });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const categoryId = category._id;
    //console.log("Category ID:", categoryId);

    const { query } = generateQueriesAndSort({
      brands,
      rating,
      shipping,
      delivery,
      newlyArrived,
      sale,
      minPrice,
      maxPrice,
    });

    // Ensure category filtering is correct
    query.$or = [
      { primaryCategory: categoryId },
      { secondaryCategory: categoryId },
      { tertiaryCategory: categoryId },
      { quaternaryCategory: categoryId },
    ];

    // If newArrival is a Boolean field, filter using a direct match
    query.newArrival = true;

    try {
      const count = await Product.countDocuments(query);
      res.json([count]);
    } catch (error) {
      console.error("Error fetching newly arrived products:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// @desc    Fetch Products on Sale Counts By Category
// @route   GET /api/products/:linkName/sale
// @access  Public
export const getSaleCountByCategory = asyncHandler(async (req, res) => {
  const { linkName } = req.params;
  const {
    brands,
    rating,
    shipping,
    delivery,
    sale,
    newlyArrived,
    minPrice,
    maxPrice,
  } = req.query || {};

  const category = await Category.findOne({ linkName });

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  const categoryId = category._id;

  // Generate query filters
  const { query } = generateQueriesAndSort({
    brands,
    rating,
    shipping,
    delivery,
    sale,
    newlyArrived,
    minPrice,
    maxPrice,
  });

  // Ensure category filtering is correct
  query.$or = [
    { primaryCategory: categoryId },
    { secondaryCategory: categoryId },
    { tertiaryCategory: categoryId },
    { quaternaryCategory: categoryId },
  ];

  // If newArrival is a Boolean field, filter using a direct match
  query["variants.onSale"] = true;

  try {
    const count = await Product.countDocuments(query);
    res.json([count]);
  } catch (error) {
    console.error("Error fetching newly arrived products:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Fetch Brand Counts of Products By Category
// @route   GET /api/products/:linkName/brands
// @access  Public
export const getBrandCountByCategory = asyncHandler(async (req, res) => {
  const { linkName } = req.params;
  const {
    brands: startingBrands, // Fixed: Do not default to `brands` here
    rating,
    shipping,
    delivery,
    sale,
    newlyArrived,
    minPrice,
    maxPrice,
  } = req.query || {};

  const category = await Category.findOne({ linkName });
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  const categoryId = category._id;

  const { query } = generateQueriesAndSort({
    brands: startingBrands, // Ensure brands is properly passed
    rating,
    shipping,
    sale,
    delivery,
    newlyArrived,
    minPrice,
    maxPrice,
  });

  // Find products in the category and get unique brands
  const productsInCategory = await Product.aggregate([
    {
      $match: {
        ...query, // Correctly include existing filters
        $or: [
          { primaryCategory: categoryId },
          { secondaryCategory: categoryId },
          { tertiaryCategory: categoryId },
          { quaternaryCategory: categoryId },
        ],
      },
    },
    {
      $group: {
        _id: "$brandName", // Group by brand name
        count: { $sum: 1 }, // Count products for each brand
      },
    },
    {
      $project: {
        brand: "$_id", // Alias _id to brand
        count: 1, // Include the count of products
        _id: 0, // Exclude the default _id field
      },
    },
  ]);

  // Format the result for easier consumption on the frontend
  const brands = productsInCategory.map((item) => ({
    brandName: item.brand,
    productCount: item.count,
  }));

  res.json(brands); // Return the brands and counts
});

// @desc    Fetch Rating Counts of Product By Category
// @route   GET /api/products/:linkName/rating-count
// @access  Public
export const getProductRatingCountsByCategory = asyncHandler(
  async (req, res) => {
    const { linkName } = req.params;
    const {
      brands,
      rating,
      shipping,
      delivery,
      newlyArrived,
      sale,
      minPrice,
      maxPrice,
      sortBy,
    } = req.query || {};

    const category = await Category.findOne({ linkName });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    const categoryId = category._id;

    const { query } = generateQueriesAndSort({
      brands,
      rating,
      shipping,
      delivery,
      sale,
      newlyArrived,
      minPrice,
      maxPrice,
    });

    // Ensure rating is removed from the main query, as we’ll filter it separately
    delete query.rating;

    const ratingThresholds = [4, 3, 2, 1];
    const ratingCounts = {};

    for (const threshold of ratingThresholds) {
      const count = await Product.countDocuments({
        ...query,
        rating: { $gte: threshold }, // Filter by rating
        $or: [
          { primaryCategory: categoryId },
          { secondaryCategory: categoryId },
          { tertiaryCategory: categoryId },
          { quaternaryCategory: categoryId },
        ],
      });
      ratingCounts[threshold] = count;
    }

    res.json(ratingCounts);
  }
);

// @desc    Fetch Products by Category Based on Filters
// @route   GET /api/products/filters/:linkName
// @access  Public
export const getFilteredProductsByCategory = asyncHandler(async (req, res) => {
  const { linkName } = req.params;
  const {
    pageNumber,
    brands,
    rating,
    shipping,
    delivery,
    sale,
    newlyArrived,
    sortBy,
    minPrice,
    maxPrice,
  } = req.query || {};

  const pageSize = 9;
  const page = Number(pageNumber) || 1;

  const category = await Category.findOne({ linkName });

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  const categoryId = category._id;
  //console.log("categoryId:", categoryId);
  const level = category.level;
  //console.log("level:", level);
  let filter;

  // Determine which field to filter by based on the level
  if (level === "primary") {
    filter = { primaryCategory: categoryId };
  } else if (level === "secondary") {
    filter = { secondaryCategory: categoryId };
  } else if (level === "tertiary") {
    filter = { tertiaryCategory: categoryId };
  } else if (level === "quaternary") {
    filter = { quaternaryCategory: categoryId };
  } else {
    res.status(400);
    throw new Error("Invalid Category Level");
  }

  //console.log("filter:", filter);
  const { query, sort, pipeline } = generateQueriesAndSort({
    brands,
    rating,
    shipping,
    delivery,
    sale,
    newlyArrived,
    sortBy,
    minPrice,
    maxPrice,
  });

  // Pagination
  // Get total count of products
  const totalProductsData = await Product.aggregate([
    { $match: { ...filter, ...query } }, // Combine category filter and query conditions
    ...pipeline, // Spread the pipeline to apply computed min/max prices
    { $count: "total" },
  ]);
  const totalProducts =
    totalProductsData.length > 0 ? totalProductsData[0].total : 0;

  const skip = pageSize * (page - 1);

  // Fetch paginated products
  const products = await Product.aggregate([
    { $match: { ...filter, ...query } }, // Apply filters
    ...pipeline, // Compute min/max prices
    { $sort: sort }, // Apply sorting
    { $skip: skip }, // Apply pagination
    { $limit: Number(pageSize) },
  ]);

  res.status(200).json({
    success: true,
    level: level,
    categoryId: categoryId,
    products: products,
    totalProducts: totalProducts,
    page: page,
    itemsPerPage: pageSize,
    pages: Math.ceil(totalProducts / pageSize),
  });
});

// router.post("/add-product", async (req, res) => {
//   try {
//     const {
//       primaryCategory,
//       secondaryCategory,
//       tertiaryCategory,
//       quaternaryCategory,
//       ...rest
//     } = req.body;

//     const newProduct = new Product({
//       primaryCategory,
//       secondaryCategory,
//       tertiaryCategory,
//       quaternaryCategory,
//       ...rest,
//     });
//     await newProduct.save();

//     // Update count only for affected categories
//     await updateCategoryCount(primaryCategory, "primary");
//     await updateCategoryCount(secondaryCategory, "secondary");
//     await updateCategoryCount(tertiaryCategory, "tertiary");
//     await updateCategoryCount(quaternaryCategory, "quaternary");

//     res
//       .status(201)
//       .json({ message: "Product added successfully", product: newProduct });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

//Running the Function in the Controller
// const addProductToCategory = async (productData) => {
//   const product = new Product(productData);

//   // Save the product
//   await product.save();

//   // Recalculate category counts
//   await recalculateCategoryCounts();
// };

// const removeProductFromCategory = async (productId) => {
//   const product = await Product.findById(productId);

//   // Delete the product
//   await Product.findByIdAndDelete(productId);

//   // Recalculate category counts
//   await recalculateCategoryCounts();
// };

//Efficient Execution with Bulk Update (Optimization)
// const addProductToCategory = async (productData) => {
//   const product = new Product(productData);

//   // Save the product
//   await product.save();

//   // Update the product count for the category directly
//   await Category.findByIdAndUpdate(
//     product.categoryId,
//     { $inc: { productCount: 1 } },
//     { true }
//   );
// };
