const generateQueriesAndSort = ({
  brands = "",
  rating = "",
  shipping = "",
  delivery = "",
  newlyArrived = "",
  sortBy = "",
  sale = "",
  minPrice = null,
  maxPrice = null,
} = {}) => {
  let query = {};
  let conditions = [];

  // Convert minPrice & maxPrice to numbers
  minPrice = minPrice ? Number(minPrice) : null;
  maxPrice = maxPrice ? Number(maxPrice) : null;

  if (minPrice !== null || maxPrice !== null) {
    let priceCondition = {};

    if (minPrice !== null) {
      priceCondition["$gte"] = minPrice;
    }

    if (maxPrice !== null) {
      priceCondition["$lte"] = maxPrice;
    }

    conditions.push({
      variants: {
        $elemMatch: {
          $or: [
            { onSale: true, salePrice: priceCondition },
            { onSale: false, price: priceCondition },
          ],
        },
      },
    });
  }

  if (conditions.length > 0) {
    query["$and"] = conditions;
  }

  // Brand filter (supports multiple brands)
  if (brands) {
    const brandArray = Array.isArray(brands)
      ? brands
      : brands.split(",").map((b) => b.trim());
    query.brandName = { $in: brandArray };
  }

  // Rating filter
  if (rating) {
    query.rating = { $gte: Number(rating) };
  }

  // Shipping filter
  if (shipping) {
    query.shippingPreference = shipping;
  }

  // Delivery filter
  if (delivery) {
    query.deliveryType = delivery;
  }

  // Newly arrived filter (ensure boolean conversion)
  if (newlyArrived) {
    query.newArrival = newlyArrived === "true";
  }

  // Newly arrived filter (ensure boolean conversion)
  if (sale) {
    query["variants.onSale"] = sale === "true";
  }

  // Sorting (Aggregation-based approach)
  let sort = {};

  if (sortBy === "relevance") {
    sort = { bestselling: -1, newest: -1, rating: -1 };
  } else if (sortBy === "bestselling") {
    sort = { bestselling: -1 };
  } else if (sortBy === "top-rated") {
    sort = { rating: -1 };
  } else if (sortBy === "price_high") {
    sort = { maxVariantPrice: -1 };
  } else if (sortBy === "price_low") {
    sort = { minVariantPrice: 1 };
  } else if (sortBy === "newest") {
    sort = { newest: -1, createdAt: -1 };
  }

  // Aggregation pipeline to compute min/max price
  const pipeline = [
    { $match: query }, // Apply filters
    {
      $addFields: {
        minVariantPrice: {
          $min: {
            $map: {
              input: "$variants",
              as: "variant",
              in: {
                $cond: {
                  if: "$$variant.onSale",
                  then: "$$variant.salePrice",
                  else: "$$variant.price",
                },
              },
            },
          },
        },
        maxVariantPrice: {
          $max: {
            $map: {
              input: "$variants",
              as: "variant",
              in: {
                $cond: {
                  if: "$$variant.onSale",
                  then: "$$variant.salePrice",
                  else: "$$variant.price",
                },
              },
            },
          },
        },
      },
    },
    { $sort: sort }, // Apply sorting
  ];

  return { query, sort, pipeline };
};

export default generateQueriesAndSort;
