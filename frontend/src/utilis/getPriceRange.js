const getPriceRange = (variants) => {
  if (!variants || variants.length === 0) return null;

  let minPrice = Infinity;
  let maxPrice = -Infinity;
  let minSalePrice = Infinity;
  let maxSalePrice = -Infinity;
  let hasSalePrice = false;

  variants.forEach(({ price, salePrice, onSale }) => {
    if (price !== null) {
      minPrice = Math.min(minPrice, price);
      maxPrice = Math.max(maxPrice, price);
    }

    if (onSale && salePrice !== null) {
      hasSalePrice = true;
      minSalePrice = Math.min(minSalePrice, salePrice);
      maxSalePrice = Math.max(maxSalePrice, salePrice);
    }
  });

  // Format price range
  const priceRange =
    minPrice === maxPrice ? `${minPrice}` : `${minPrice} - $${maxPrice}`;

  // Format sale price range if applicable
  let salePriceRange = null;
  if (hasSalePrice) {
    salePriceRange =
      minSalePrice === maxSalePrice
        ? `${minSalePrice}`
        : `${minSalePrice} - $${maxSalePrice}`;
  }

  return { priceRange, salePriceRange };
};

export default getPriceRange;
