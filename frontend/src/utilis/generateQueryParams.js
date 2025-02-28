// Helper function to generate query parameters from filters
const generateQueryParams = (filters) => {
  const params = new URLSearchParams();

  // Append filters only if they exist
  if (filters.brands) {
    const brandsArray = Array.isArray(filters.brands)
      ? filters.brands
      : [filters.brands]; // Convert single string to an array

    brandsArray.forEach((brand) => params.append("brands", brand));
  }
  if (filters.delivery) params.append("delivery", filters.delivery);
  if (filters.new) params.append("newArrival", filters.new);
  if (filters.sale) params.append("sale", filters.sale);
  if (filters.rating) params.append("rating", filters.rating);
  if (filters.shipping) params.append("shipping", filters.shipping);
  if (filters.sortBy) params.append("sortBy", filters.sortBy);

  // Append price filters only if they exist
  if (filters.price?.min) params.append("minPrice", filters.price.min);
  if (filters.price?.max) params.append("maxPrice", filters.price.max);

  return params.toString();
};

export default generateQueryParams;
