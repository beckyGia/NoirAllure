import { redis } from "../config/redis.js";
import mongoose from "mongoose";
import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/Product.js";
import generateQueriesAndSort from "../helpers/generateQueriesAndSort.js";
import { Category } from "../models/Category.js";
import Review from "../models/Review.js";
import getSearchQuery from "../utils/getSearchQuery.js";

// @desc    Search For Products
// @route   GET /api/search/
// @access  Public
export const searchProducts = asyncHandler(async (req, res) => {
  const {
    keyword,
    pageNumber,
    brands,
    rating,
    shipping,
    delivery,
    sale,
    newlyArrived,
    minPrice,
    maxPrice,
    linkName,
    level,
  } = req.query || {};

  const sortBy = req.query.sortBy || "relevance";

  if (!keyword || keyword.length < 3) {
    return res.json([]);
  }

  const pageSize = 9;
  const page = Number(pageNumber) || 1;

  const { query, sort, pipeline } = generateQueriesAndSort({
    brands,
    rating,
    shipping,
    delivery,
    sale,
    newlyArrived,
    sortBy: sortBy || "relevance",
    minPrice,
    maxPrice,
  });

  const searchQuery = await getSearchQuery(keyword);
  //console.log("searchQuery:", searchQuery);

  // Pagination
  // Get total count of products
  const totalProductsData = await Product.aggregate([
    { $match: { ...searchQuery, ...query } },
    ...pipeline,
    { $count: "total" },
  ]);

  const totalProducts =
    totalProductsData.length > 0 ? totalProductsData[0].total : 0;

  const skip = pageSize * (page - 1);

  // Fetch paginated products
  const products = await Product.aggregate([
    { $match: { ...searchQuery, ...query } }, // Apply filters
    ...pipeline, // Compute min/max prices
    { $sort: sort }, // Apply sorting
    { $skip: skip }, // Apply pagination
    { $limit: Number(pageSize) },
  ]);

  // Ensure products is an array
  if (!products || !Array.isArray(products)) {
    return res.status(500).json({ message: "Error retrieving products" });
  }

  res.status(200).json({
    success: true,
    products: products,
    totalProducts: totalProducts,
    page: page,
    itemsPerPage: pageSize,
    pages: Math.ceil(totalProducts / pageSize),
  });
});
