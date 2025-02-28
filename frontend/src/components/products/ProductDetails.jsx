import React from "react";
import ProductDetailsShade from "./ProductDetailsShade";
import ProductDetailsSize from "./ProductDetailsSize";
import ProductDetailsNone from "./ProductDetailsNone";

const ProductDetails = ({
  selectedVariant,
  isNew,
  variantTypeCategory,
  variantTypeValues,
  selectedVariantIndex,
  setSelectedVariantIndex,
  variants,
}) => {
  //console.log(variantTypeCategory[0]);
  return variantTypeCategory[0] === "shade" ? (
    <ProductDetailsShade
      selectedVariant={selectedVariant}
      isNew={isNew}
      variantTypeValues={variantTypeValues}
      selectedVariantIndex={selectedVariantIndex}
      setSelectedVariantIndex={setSelectedVariantIndex}
      variants={variants}
    />
  ) : variantTypeCategory[0] === "size" ? (
    <ProductDetailsSize
      selectedVariant={selectedVariant}
      isNew={isNew}
      variantTypeValues={variantTypeValues}
      selectedVariantIndex={selectedVariantIndex}
      setSelectedVariantIndex={setSelectedVariantIndex}
      variants={variants}
    />
  ) : (
    <ProductDetailsNone
      selectedVariant={selectedVariant}
      isNew={isNew}
      variantTypeValues={variantTypeValues}
      selectedVariantIndex={selectedVariantIndex}
      setSelectedVariantIndex={setSelectedVariantIndex}
      variants={variants}
    />
  );
};

export default ProductDetails;
