import asyncHandler from "../middleware/asyncHandler.js";
import { redis } from "../config/redis.js";
import Product from "../models/Product.js";
import generateQueriesAndSort from "../helpers/generateQueriesAndSort.js";
import { Category } from "../models/Category.js";
import getSearchQuery from "../utils/getSearchQuery.js";
import { recalculateCategoryCounts } from "../helpers/categoryHelpers.js";
import Review from "../models/Review.js";

// @desc    Get All Brands
// @route   GET /api/brands
// @access  Public
export const getBrands = asyncHandler(async (req, res) => {
  let brands;

  // Find unique brandNames from the Product collection
  brands = await Product.distinct("brandName");

  if (!brands || brands.length === 0) {
    res.status(404);
    throw new Error("No Brands found");
  }

  res.status(200).json({ brands });
  //   primaryCategories = await Category.find({ level: "primary" });

  //   if (!primaryCategories) {
  //     res.status(404);
  //     throw new Error("No Primary Categories found");
  //   }

  //   //Store in redis for future quick access
  //   await redis.set("primary_categories", JSON.stringify(primaryCategories));

  res.status(200).json({ brands });
});

// @desc    Fetch BRAND Shipping Preference of Products Counts By Category
// @route   GET /api/products/:linkName/shipping
// @access  Public
export const getBrandShippingPreferenceCountsByCategory = asyncHandler(
  async (req, res) => {
    const { brandName } = req.params;
    const {
      rating,
      shipping,
      delivery,
      sale,
      newlyArrived,
      minPrice,
      maxPrice,
      sortBy,
      linkName,
    } = req.query || {};

    let category;

    if (linkName) {
      category = await Category.findOne({ linkName });

      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
    }

    const categoryId = category._id;

    const { query } = generateQueriesAndSort({
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
        brandName: brandName,
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

// @desc    Get All Products based on BrandName
// @route   GET /api/brands/filters/:brandName/:linkName
// @access  Public
export const getFilteredProductsByBrand = asyncHandler(async (req, res) => {
  const { brandName } = req.params;
  console.log(brandName);
  const {
    pageNumber,
    rating,
    shipping,
    delivery,
    sale,
    newlyArrived,
    sortBy,
    minPrice,
    maxPrice,
    linkName,
  } = req.query || {};

  const pageSize = 9;
  const page = Number(pageNumber) || 1;

  let category;
  let filter;
  let level;
  let categoryId;

  if (linkName) {
    category = await Category.findOne({ linkName });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    categoryId = category._id;
    level = category.level;

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
  }

  //console.log("filter:", filter);
  const { query, sort, pipeline } = generateQueriesAndSort({
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
    { $match: { ...filter, ...query, brandName: brandName } }, // Combine category filter and query conditions
    ...pipeline, // Spread the pipeline to apply computed min/max prices
    { $count: "total" },
  ]);
  const totalProducts =
    totalProductsData.length > 0 ? totalProductsData[0].total : 0;

  const skip = pageSize * (page - 1);

  // Fetch paginated products
  const products = await Product.aggregate([
    { $match: { ...filter, ...query, brandName: brandName } }, // Apply filters
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
