import { Category } from "../models/Category.js";

async function getSearchQuery(keyword) {
  let searchQuery = { $or: [] };

  // Ensure keyword exists and is valid
  if (keyword && keyword.trim().length >= 3) {
    const trimmedKeyword = keyword.trim();

    // Escape special characters for safe regex usage
    const escapeRegex = (str) =>
      str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");

    // Generate regex pattern for searching full and partial matches
    const regexPattern = trimmedKeyword
      .split(/\s+/) // Split by spaces (handles multiple words)
      .map((word) => `\\b${escapeRegex(word)}`) // Word-boundary match
      .join("|"); // OR condition

    const regexQuery = new RegExp(regexPattern, "i"); // Case-insensitive regex

    // Search in product name, brandName, and description
    searchQuery.$or.push(
      { name: regexQuery },
      { brandName: regexQuery },
      { description: regexQuery }
    );

    // Handle "sale" search separately
    if (trimmedKeyword.toLowerCase() === "sale") {
      searchQuery.$or.push({ "variants.onSale": true });
    }

    // Handle "new" search separately
    if (trimmedKeyword.toLowerCase() === "new") {
      searchQuery.$or.push({ newArrival: true });
    }

    // Check if the keyword matches a category's linkName
    const category = await Category.findOne({
      linkName: trimmedKeyword.toLowerCase(),
    }).lean();

    if (category) {
      // Add category-based search
      searchQuery.$or.push(
        { primaryCategory: category._id },
        { secondaryCategory: category._id },
        { tertiaryCategory: category._id },
        { quaternaryCategory: category._id }
      );
    }
  }

  // Ensure `$or` is valid (MongoDB throws an error if `$or` is empty)
  if (searchQuery.$or.length === 0) {
    searchQuery = {}; // Empty query if nothing valid was added
  }

  return searchQuery;
}

export default getSearchQuery;
