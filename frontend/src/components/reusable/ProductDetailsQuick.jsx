import React from "react";
import ProductDetailsShadeQuick from "./ProductDetailsShadeQuick";
import ProductDetailsSizeQuick from "./ProductDetailsSizeQuick";
import ProductDetailsNoneQuick from "./ProductDetailsNoneQuick";

const ProductDetailsQuick = ({
  selectedVariant,
  isNew,
  variantTypeCategory,
  variantTypeValues,
  selectedVariantIndex,
  setSelectedVariantIndex,
  variants,
}) => {
  return variantTypeCategory[0] === "shade" ? (
    <ProductDetailsShadeQuick
      selectedVariant={selectedVariant}
      isNew={isNew}
      variantTypeValues={variantTypeValues}
      selectedVariantIndex={selectedVariantIndex}
      setSelectedVariantIndex={setSelectedVariantIndex}
      variants={variants}
    />
  ) : variantTypeCategory[0] === "size" ? (
    <ProductDetailsSizeQuick
      selectedVariant={selectedVariant}
      isNew={isNew}
      variantTypeValues={variantTypeValues}
      selectedVariantIndex={selectedVariantIndex}
      setSelectedVariantIndex={setSelectedVariantIndex}
      variants={variants}
    />
  ) : (
    <ProductDetailsNoneQuick
      selectedVariant={selectedVariant}
      isNew={isNew}
      variantTypeValues={variantTypeValues}
      selectedVariantIndex={selectedVariantIndex}
      setSelectedVariantIndex={setSelectedVariantIndex}
      variants={variants}
    />
  );
};

export default ProductDetailsQuick;
