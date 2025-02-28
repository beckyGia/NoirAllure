import { redis } from "../config/redis.js";
import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/Product.js";
import generateQueriesAndSort from "../helpers/generateQueriesAndSort.js";
import { Category } from "../models/Category.js";
import Review from "../models/Review.js";

// @desc    Fetch Sale Shipping Preference of Products By Category
// @route   GET /api/sale/:linkName/shipping
// @access  Public
export const getSaleShippingPreferenceByCategory = asyncHandler(
  async (req, res) => {
    const { linkName } = req.params;
    const {
      brands,
      rating,
      shipping,
      delivery,
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
        "variants.onSale": true,
        shippingPreference: preference,
      });
      shippingCounts[preference] = count;
    }

    res.json(shippingCounts);
  }
);

// @desc    Fetch Sale Delivery Type of Products By Category
// @route   GET /api/sale/:linkName/delivery
// @access  Public
export const getSaleDeliveryTypeByCategory = asyncHandler(async (req, res) => {
  const { linkName } = req.params;
  const {
    brands,
    rating,
    shipping,
    delivery,
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
      "variants.onSale": true,
      deliveryType: type, // Filter by rating
    });
    deliveryCounts[type] = count;
  }

  res.json(deliveryCounts);
});

// @desc    Fetch Sale Newest Products By Category
// @route   GET /api/sale/:linkName/new
// @access  Public
export const getSaleNewlyArrivedByCategory = asyncHandler(async (req, res) => {
  const { linkName } = req.params;
  const {
    brands,
    rating,
    shipping,
    delivery,
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
    const count = await Product.countDocuments({
      ...query,
      "variants.onSale": true,
    });
    res.json([count]);
  } catch (error) {
    console.error("Error fetching newly arrived products:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Fetch Sale Brands of Products By Category
// @route   GET /api/sale/:linkName/brands
// @access  Public
export const getSaleBrandsByCategory = asyncHandler(async (req, res) => {
  const { linkName } = req.params;
  const {
    brands: startingBrands, // Fixed: Do not default to `brands` here
    rating,
    shipping,
    delivery,
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
    delivery,
    newlyArrived,
    minPrice,
    maxPrice,
  });

  // Find products in the category and getSale unique brands
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
        "variants.onSale": true,
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

// @desc    Fetch Sale Rating Counts of Product By Category
// @route   GET /api/sale/:linkName/rating-count
// @access  Public
export const getSaleProductRatingCountsByCategory = asyncHandler(
  async (req, res) => {
    const { linkName } = req.params;
    const {
      brands,
      rating,
      shipping,
      delivery,
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
        "variants.onSale": true,
      });
      ratingCounts[threshold] = count;
    }

    res.json(ratingCounts);
  }
);

// @desc    Fetch Sale Products by Category Based on Filters
// @route   GET /api/sale/filters/:linkName
// @access  Public
export const getSaleFilteredProductsByCategory = asyncHandler(
  async (req, res) => {
    const { linkName } = req.params;
    const {
      pageNumber,
      brands,
      rating,
      shipping,
      delivery,
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
      newlyArrived,
      sortBy,
      minPrice,
      maxPrice,
    });

    // Pagination
    // Get total count of products
    const totalProductsData = await Product.aggregate([
      {
        $match: {
          ...filter,
          ...query,
          variants: { $elemMatch: { onSale: true } },
        },
      }, // Combine category filter and query conditions
      ...pipeline, // Spread the pipeline to apply computed min/max prices
      { $count: "total" },
    ]);
    const totalProducts =
      totalProductsData.length > 0 ? totalProductsData[0].total : 0;

    const skip = pageSize * (page - 1);

    // Fetch paginated products
    const products = await Product.aggregate([
      {
        $match: {
          ...filter,
          ...query,
          variants: { $elemMatch: { onSale: true } }, // Ensure at least one variant is on sale
        },
      },
      ...pipeline,
      { $sort: sort },
      { $skip: skip },
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
  }
);
