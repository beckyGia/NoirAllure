import asyncHandler from "../middleware/asyncHandler.js";
import { redis } from "../config/redis.js";
import Product from "../models/Product.js";
import { Category } from "../models/Category.js";
import getSearchQuery from "../utils/getSearchQuery.js";
import { recalculateCategoryCounts } from "../helpers/categoryHelpers.js";
import Review from "../models/Review.js";

// @desc    Get Primary Categories
// @route   GET /api/categories
// @access  Public
export const getPrimaryCategories = asyncHandler(async (req, res) => {
  let primaryCategories = await redis.get("primary_categories");

  // console.log("Redis data:", primaryCategories); // Debugging log

  if (primaryCategories) {
    return res.json(JSON.parse(primaryCategories));
  }
  primaryCategories = await Category.find({ level: "primary" });

  if (!primaryCategories) {
    res.status(404);
    throw new Error("No Primary Categories found");
  }

  //Store in redis for future quick access
  await redis.set("primary_categories", JSON.stringify(primaryCategories));

  res.status(200).json({ primaryCategories });
});

// @desc    Get Category Hierarchy For Breadcrumbs & SubCategories
// @route   GET /api/categories/:linkName
// @access  Public
export const getCategoryHierarchyAndSubcategories = asyncHandler(
  async (req, res) => {
    try {
      const { linkName } = req.params;

      // Fetch initial category
      const initialCategory = await Category.findOne({ linkName }).lean();

      if (!initialCategory) {
        return res.status(404).json({ error: "Initial category not found" });
      }

      // Fetch direct subcategories (same as `getSubsequentCategories`)
      const subcategories = await Category.find({
        parentCategoryId: initialCategory._id,
      }).lean();

      // Fetch full category hierarchy in one query using aggregation
      const categoryHierarchy = await Category.aggregate([
        {
          $match: { _id: initialCategory._id },
        },
        {
          $graphLookup: {
            from: "categories",
            startWith: "$parentCategoryId", // Start from parent instead
            connectFromField: "parentCategoryId", // Go upwards
            connectToField: "_id",
            as: "parentHierarchy",
          },
        },
        {
          $graphLookup: {
            from: "categories",
            startWith: "$_id",
            connectFromField: "_id",
            connectToField: "parentCategoryId",
            as: "fullHierarchy",
          },
        },
      ]);

      // Build breadcrumbs efficiently
      let breadcrumbs = []; // Ensure "Home" is the first item
      let currentCategory = initialCategory;

      // Combine parentHierarchy and fullHierarchy
      const fullHierarchy = [
        ...categoryHierarchy[0].parentHierarchy,
        initialCategory,
      ];

      while (currentCategory) {
        //console.log("Current Category:", currentCategory);

        breadcrumbs.push({
          title: currentCategory.title,
          linkName: `/shop/${currentCategory.linkName}`,
          level: currentCategory.level,
        });

        // Find parent in fullHierarchy
        currentCategory =
          fullHierarchy.find(
            (cat) =>
              cat._id.toString() ===
              currentCategory.parentCategoryId?.toString()
          ) || null;
      }

      // Reverse breadcrumbs to get correct order (from primary to current category)
      breadcrumbs.reverse();

      //console.log("Final Breadcrumbs:", breadcrumbs);

      res.json({
        breadcrumbs,
        categoryHierarchy: fullHierarchy,
        subcategories,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// @desc    Get Category Hierarchy For Breadcrumbs & SubCategories For Sale
// @route   GET /api/categories/:linkName/sale
// @access  Public
export const getCategoryHierarchyAndSubcategoriesForSale = asyncHandler(
  async (req, res) => {
    try {
      const { linkName } = req.params;

      // Fetch initial category
      const initialCategory = await Category.findOne({ linkName }).lean();
      if (!initialCategory) {
        return res.status(404).json({ error: "Initial category not found" });
      }

      // Fetch products on sale that belong to the category
      const productsOfLinkName = await Product.find({
        variants: { $elemMatch: { onSale: true } }, // At least one variant is on sale
        $or: [
          { primaryCategory: initialCategory._id },
          { secondaryCategory: initialCategory._id },
          { tertiaryCategory: initialCategory._id },
          { quaternaryCategory: initialCategory._id },
        ],
      }).lean();

      // Extract unique category IDs from the products on sale
      const categoryIds = [
        ...new Set(
          productsOfLinkName.flatMap((product) => [
            product.primaryCategory?.toString(),
            product.secondaryCategory?.toString(),
            product.tertiaryCategory?.toString(),
            product.quaternaryCategory?.toString(),
          ])
        ),
      ].filter(Boolean); // Remove null/undefined values

      // Fetch only relevant categories
      const relevantCategories = await Category.find({
        _id: { $in: categoryIds },
      }).lean();

      // Build category hierarchy dynamically from relevant categories
      const categoryHierarchy = relevantCategories.map((category) => ({
        _id: category._id,
        title: category.title,
        linkName: category.linkName,
        level: category.level,
        parentCategoryId: category.parentCategoryId?.toString() || null,
      }));

      // **Fetching Subcategories (Only from Sale Products)**
      let subcategories = [];
      if (
        ["primary", "secondary", "tertiary"].includes(initialCategory.level)
      ) {
        const categoryField =
          initialCategory.level === "primary"
            ? "secondaryCategory"
            : initialCategory.level === "secondary"
            ? "tertiaryCategory"
            : "quaternaryCategory";

        const subcategoryIds = [
          ...new Set(
            productsOfLinkName
              .map((product) => product[categoryField]?.toString())
              .filter(Boolean) // Remove null values
          ),
        ];

        subcategories = await Category.find({
          _id: { $in: subcategoryIds },
        }).lean();
      }

      // **Building Breadcrumbs**
      let breadcrumbs = [];
      let currentCategory = initialCategory;

      // Ensure you're comparing ObjectIds correctly
      while (currentCategory) {
        breadcrumbs.unshift({
          // Prepend to maintain order
          title: currentCategory.title,
          linkName: `/shop/${currentCategory.linkName}`,
          level: currentCategory.level,
        });

        // Ensure ObjectId comparison for parentCategoryId
        currentCategory =
          categoryHierarchy.find(
            (cat) =>
              cat._id.toString() ===
              currentCategory.parentCategoryId?.toString()
          ) || null;

        console.log("currentCategory:", currentCategory); // Debugging to check if parent lookup is working
      }

      res.json({
        breadcrumbs,
        categoryHierarchy,
        subcategories,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// @desc    Get Category Hierarchy For Breadcrumbs & SubCategories For New
// @route   GET /api/categories/:linkName/new
// @access  Public
export const getCategoryHierarchyAndSubcategoriesForNew = asyncHandler(
  async (req, res) => {
    try {
      const { linkName } = req.params;

      // Fetch initial category
      const initialCategory = await Category.findOne({ linkName }).lean();
      if (!initialCategory) {
        return res.status(404).json({ error: "Initial category not found" });
      }

      // Fetch products on sale that belong to the category
      const productsOfLinkName = await Product.find({
        newArrival: true,
        $or: [
          { primaryCategory: initialCategory._id },
          { secondaryCategory: initialCategory._id },
          { tertiaryCategory: initialCategory._id },
          { quaternaryCategory: initialCategory._id },
        ],
      }).lean();

      // Extract unique category IDs from the products on sale
      const categoryIds = [
        ...new Set(
          productsOfLinkName.flatMap((product) => [
            product.primaryCategory?.toString(),
            product.secondaryCategory?.toString(),
            product.tertiaryCategory?.toString(),
            product.quaternaryCategory?.toString(),
          ])
        ),
      ].filter(Boolean); // Remove null/undefined values

      // Fetch only relevant categories
      const relevantCategories = await Category.find({
        _id: { $in: categoryIds },
      }).lean();

      // Build category hierarchy dynamically from relevant categories
      const categoryHierarchy = relevantCategories.map((category) => ({
        _id: category._id,
        title: category.title,
        linkName: category.linkName,
        level: category.level,
        parentCategoryId: category.parentCategoryId?.toString() || null,
      }));

      // **Fetching Subcategories (Only from Sale Products)**
      let subcategories = [];
      if (
        ["primary", "secondary", "tertiary"].includes(initialCategory.level)
      ) {
        const categoryField =
          initialCategory.level === "primary"
            ? "secondaryCategory"
            : initialCategory.level === "secondary"
            ? "tertiaryCategory"
            : "quaternaryCategory";

        const subcategoryIds = [
          ...new Set(
            productsOfLinkName
              .map((product) => product[categoryField]?.toString())
              .filter(Boolean) // Remove null values
          ),
        ];

        subcategories = await Category.find({
          _id: { $in: subcategoryIds },
        }).lean();
      }

      // **Building Breadcrumbs**
      let breadcrumbs = [];
      let currentCategory = initialCategory;

      // Ensure you're comparing ObjectIds correctly
      while (currentCategory) {
        breadcrumbs.unshift({
          // Prepend to maintain order
          title: currentCategory.title,
          linkName: `/shop/${currentCategory.linkName}`,
          level: currentCategory.level,
        });

        // Ensure ObjectId comparison for parentCategoryId
        currentCategory =
          categoryHierarchy.find(
            (cat) =>
              cat._id.toString() ===
              currentCategory.parentCategoryId?.toString()
          ) || null;
      }

      res.json({
        breadcrumbs,
        categoryHierarchy,
        subcategories,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// @desc    Get Category Hierarchy For Single Product
// @route   GET /api/categories/product/:productId
// @access  Public
export const getCategoryHierarchyForSingleProduct = asyncHandler(
  async (req, res) => {
    const { productId } = req.params;

    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Fetch categories only if they exist
    const primaryCategory = product.primaryCategory
      ? await Category.findById(product.primaryCategory).lean()
      : null;

    const secondaryCategory = product.secondaryCategory
      ? await Category.findById(product.secondaryCategory).lean()
      : null;
    const tertiaryCategory = product.tertiaryCategory
      ? await Category.findById(product.tertiaryCategory).lean()
      : null;
    const quaternaryCategory = product.quaternaryCategory
      ? await Category.findById(product.quaternaryCategory).lean()
      : null;

    // Check if the primary category exists
    if (!primaryCategory) {
      return res.status(404).json({ error: "Primary category not found" });
    }

    // Build breadcrumbs
    let breadcrumbs = [];
    let categoryHierarchy = [primaryCategory];

    if (secondaryCategory) categoryHierarchy.push(secondaryCategory);
    if (tertiaryCategory) categoryHierarchy.push(tertiaryCategory);
    if (quaternaryCategory) categoryHierarchy.push(quaternaryCategory);

    // Construct breadcrumbs from category hierarchy
    for (const category of categoryHierarchy) {
      breadcrumbs.push({
        title: category.title,
        linkName: `/shop/${category.linkName}`,
        level: category.level,
      });
    }

    // Add the product as the last breadcrumb
    breadcrumbs.push({
      title: product.name, // Assuming the product has a `name` field
      linkName: `/product/${product._id}`,
      level: "product", // You can set a unique level identifier for the product
    });

    res.json({
      breadcrumbs,
      categoryHierarchy,
    });
  }
);

// @desc    Get Category Hierarchy Of Search Results
// @route   GET /api/categories/search
// @access  Public
export const getCategoryHierarchyForSearchResults = asyncHandler(
  async (req, res) => {
    const { keyword, level } = req.query || {};
    console.log("keyword:", keyword);

    const searchQuery = await getSearchQuery(keyword);

    const primaryCategoriesInitial = await Product.distinct(
      "primaryCategory",
      searchQuery
    );

    if (!primaryCategoriesInitial || primaryCategoriesInitial.length === 0) {
      res.status(404);
      throw new Error("No Primary Categories apart of the Search Query found");
    }

    const primaryCategories = await Category.find({
      _id: { $in: primaryCategoriesInitial },
    });

    // Check if search param is a category link name
    let selectedCategory;
    let categoryIds = [];
    let secondaryCategories = [];
    let tertiaryCategories = [];
    let quaternaryCategories = [];

    // Check if the keyword matches a linkName category
    const category = await Category.findOne({
      linkName: keyword.toLowerCase(),
    });

    if (category) {
      // If the keyword is a linkName, fetch its subcategories
      selectedCategory = category;
      categoryIds = [category._id]; // The ID of the category that matches the linkName

      // Fetch subcategories for the `linkName` category
      secondaryCategories = await Category.find({
        primaryCategory: { $in: categoryIds },
      });
      tertiaryCategories = await Category.find({
        secondaryCategory: { $in: categoryIds },
      });
      quaternaryCategories = await Category.find({
        tertiaryCategory: { $in: categoryIds },
      });
    } else {
      // Fetch secondary, tertiary, and quaternary categories from products
      const secondaryCategoriesInitial = await Product.distinct(
        "secondaryCategory",
        searchQuery
      );
      secondaryCategories = await Category.find({
        _id: { $in: secondaryCategoriesInitial },
      });

      const tertiaryCategoriesInitial = await Product.distinct(
        "tertiaryCategory",
        searchQuery
      );
      tertiaryCategories = await Category.find({
        _id: { $in: tertiaryCategoriesInitial },
      });

      const quaternaryCategoriesInitial = await Product.distinct(
        "quaternaryCategory",
        searchQuery
      );
      quaternaryCategories = await Category.find({
        _id: { $in: quaternaryCategoriesInitial },
      });
    }

    const categoriesForBreadcrumbs = [
      ...primaryCategories,
      ...secondaryCategories,
      ...tertiaryCategories,
      ...quaternaryCategories,
    ];

    const { breadcrumbs, subcategories } = await buildBreadcrumbs(
      categoriesForBreadcrumbs,
      selectedCategory,
      level,
      searchQuery
    );

    res.status(200).json({
      success: true,
      primaryCategories: primaryCategories,
      breadcrumbs: breadcrumbs,
      subcategories: subcategories,
    });
  }
);

/**
 * Helper function to build breadcrumbs dynamically
 */
async function buildBreadcrumbs(
  categories,
  selectedCategory,
  level,
  searchQuery = null,
  linkName = null
) {
  let breadcrumbs = [];
  let subcategories = [];
  const categoryId = selectedCategory?.[0]?._id?.toString() || null;

  // Filter out invalid categories
  let categoryHierarchy = categories.filter(
    (category) =>
      category && category.title && category.linkName && category._id
  );

  // Get all primary categories (returns an array)
  let primaryCategories = categoryHierarchy.filter(
    (category) => category.level === "primary"
  );

  if (primaryCategories.length > 0) {
    primaryCategories.forEach((primaryCategory) => {
      breadcrumbs.push({
        title: primaryCategory.title,
        linkName: `/shop/${primaryCategory.linkName}`,
        level: primaryCategory.level,
      });
    });

    // Fetch subcategories dynamically
    subcategories = await fetchSubcategories(
      categoryId,
      primaryCategories,
      searchQuery,
      linkName
    );
  }

  // Handle secondary level
  if (level === "secondary") {
    let secondaryCategory = categoryHierarchy.find(
      (category) => category._id.toString() === categoryId
    );

    if (secondaryCategory) {
      breadcrumbs.push({
        title: secondaryCategory.title,
        linkName: `/shop/${secondaryCategory.linkName}`,
        level: secondaryCategory.level,
      });

      subcategories = await fetchSubcategories(
        categoryId,
        primaryCategories,
        searchQuery,
        linkName
      );
    }
  }

  // Handle tertiary level
  else if (level === "tertiary") {
    let tertiaryCategory = categoryHierarchy.find(
      (category) => category._id.toString() === categoryId
    );

    if (tertiaryCategory) {
      let secondaryCategory = categoryHierarchy.find(
        (category) =>
          category._id.toString() ===
          tertiaryCategory.parentCategoryId?.toString()
      );

      if (secondaryCategory) {
        breadcrumbs.push({
          title: secondaryCategory.title,
          linkName: `/shop/${secondaryCategory.linkName}`,
          level: secondaryCategory.level,
        });
      }

      breadcrumbs.push({
        title: tertiaryCategory.title,
        linkName: `/shop/${tertiaryCategory.linkName}`,
        level: tertiaryCategory.level,
      });

      subcategories = await fetchSubcategories(
        categoryId,
        primaryCategories,
        searchQuery,
        linkName
      );
    }
  }

  // Handle quaternary level
  else if (level === "quaternary") {
    let quaternaryCategory = categoryHierarchy.find(
      (category) => category._id.toString() === categoryId
    );

    if (quaternaryCategory) {
      let tertiaryCategory = categoryHierarchy.find(
        (category) =>
          category._id.toString() ===
          quaternaryCategory.parentCategoryId?.toString()
      );

      if (tertiaryCategory) {
        let secondaryCategory = categoryHierarchy.find(
          (category) =>
            category._id.toString() ===
            tertiaryCategory.parentCategoryId?.toString()
        );

        if (secondaryCategory) {
          breadcrumbs.push({
            title: secondaryCategory.title,
            linkName: `/shop/${secondaryCategory.linkName}`,
            level: secondaryCategory.level,
          });
        }

        breadcrumbs.push({
          title: tertiaryCategory.title,
          linkName: `/shop/${tertiaryCategory.linkName}`,
          level: tertiaryCategory.level,
        });
      }

      breadcrumbs.push({
        title: quaternaryCategory.title,
        linkName: `/shop/${quaternaryCategory.linkName}`,
        level: quaternaryCategory.level,
      });
    }
  }

  return { breadcrumbs, subcategories };
}

/**
 * Helper function to fetch subcategories dynamically
 */
async function fetchSubcategories(
  categoryId,
  primaryCategories,
  searchQuery,
  linkName
) {
  if (searchQuery) {
    const secondaryCategoriesInitial = await Product.distinct(
      "secondaryCategory",
      searchQuery
    );

    return await Category.find({
      parentCategoryId: categoryId || {
        $in: primaryCategories.map((cat) => cat._id),
      },
      _id: { $in: secondaryCategoriesInitial },
    }).lean();
  } else if (linkName) {
    return await Category.find({
      parentCategoryId: categoryId || {
        $in: primaryCategories.map((cat) => cat._id),
      },
      linkName: linkName,
    }).lean();
  } else {
    return await Category.find({
      parentCategoryId: categoryId || {
        $in: primaryCategories.map((cat) => cat._id),
      },
    }).lean();
  }
}

/**
 * Helper function to get distinct category values
 */
async function getDistinctCategories(field, filter = {}) {
  const initialCategories = await Product.find(filter).distinct(field);

  if (initialCategories.length === 0) {
    console.log("No categories found in products for field:", field);
  }

  return Category.find({ _id: { $in: initialCategories } });
}

// // @desc    Get Category Hierarchy For Search Results
// // @route   GET /api/categories/:keyword
// // @access  Public
// export const getCategoryHierarchyForSearchResults = async (req, res) => {
//   try {
//     const { productId } = req.params;
//     console.log(req.params);
//     const product = await Product.findById(req.params.productId);
//     if (!product) {
//       return res.status(404).json({ error: "Product not found" });
//     }
//     //console.log(product.primaryCategory);

//     // Fetch categories only if they exist
//     const primaryCategory = product.primaryCategory
//       ? await Category.findById(product.primaryCategory).lean()
//       : null;

//     const secondaryCategory = product.secondaryCategory
//       ? await Category.findById(product.secondaryCategory).lean()
//       : null;
//     const tertiaryCategory = product.tertiaryCategory
//       ? await Category.findById(product.tertiaryCategory).lean()
//       : null;
//     const quaternaryCategory = product.quaternaryCategory
//       ? await Category.findById(product.quaternaryCategory).lean()
//       : null;

//     // Check if the primary category exists
//     if (!primaryCategory) {
//       return res.status(404).json({ error: "Primary category not found" });
//     }

//     // Build breadcrumbs
//     let breadcrumbs = [];
//     let categoryHierarchy = [primaryCategory];

//     if (secondaryCategory) categoryHierarchy.push(secondaryCategory);
//     if (tertiaryCategory) categoryHierarchy.push(tertiaryCategory);
//     if (quaternaryCategory) categoryHierarchy.push(quaternaryCategory);

//     // Construct breadcrumbs from category hierarchy
//     for (const category of categoryHierarchy) {
//       breadcrumbs.push({
//         title: category.title,
//         linkName: `/shop/${category.linkName}`,
//         level: category.level,
//       });
//     }

//     // Add the product as the last breadcrumb
//     breadcrumbs.push({
//       title: product.name, // Assuming the product has a `name` field
//       linkName: `/product/${product._id}`,
//       level: "product", // You can set a unique level identifier for the product
//     });

//     res.json({
//       breadcrumbs,
//       categoryHierarchy,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error" });
//   }
// };
