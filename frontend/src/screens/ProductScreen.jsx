import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Rating,
  IconButton,
  Tooltip,
  Card,
  CardContent,
  Divider,
  Select,
  MenuItem,
  TextField,
  Chip,
} from "@mui/material";
import { useTheme, lighten } from "@mui/material/styles";
import Grid from "@mui/material/Grid2";
import { useParams } from "react-router-dom";
import { styled } from "@mui/system";
import { FaHeart, FaShare, FaLeaf, FaPaw } from "react-icons/fa";
import ProductDisplayName from "../components/products/ProductDisplayName";
import ProductImages from "../components/products/ProductImages";
import ProductDetails from "../components/products/ProductDetails";
import SimilarProducts from "../components/products/similarProducts";
import RatingAndReviews from "../components/ratings/RatingAndReviews";
import ProductScreenBreadcrumb from "../components/breadcrumbs/ProductBreadcrumb";
import { useGetProductByIdQuery } from "../slices/productsApiSlice";
import { useGetCategoryHierarchyForSingleProductQuery } from "../slices/categoryApiSlice";
import ProductBenefitsAndDescription from "../components/products/ProductBenefitsAndDescription";
import ProductIngredientsAndHow from "../components/products/ProductIngredientsAndHow";

const ProductScreen = () => {
  const theme = useTheme();
  const { id: productId } = useParams();
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  const { data: product, isLoading, error } = useGetProductByIdQuery(productId);

  // Fetch breadcrumb data
  const {
    data: breadcrumbData,
    isLoading: breadcrumbLoading,
    error: breadcrumbError,
  } = useGetCategoryHierarchyForSingleProductQuery(productId);

  const name = product?.name || "";
  const rating = product?.rating || "";
  const brandName = product?.brandName || "";
  const isNew = product?.newArrival || "";
  const benefits = product?.benefits || "";
  const status = product?.status || 0;
  const numReviews = product?.numReviews || "";
  const description = product?.description || "";
  const howToUse = product?.howToUse || [];
  const variants = product?.variants || [];
  const variantTypeValues = product?.variantTypeValues || "";
  const variantTypeCategory = product?.variantTypeCategory || "";
  let favorites = 89;

  const cleanedDescription = removeBuySentences(description);

  function removeBuySentences(text) {
    return text
      .split(". ") // Split text into sentences
      .filter((sentence) => !sentence.trim().toLowerCase().startsWith("buy")) // Remove sentences starting with "Buy"
      .join(". "); // Rejoin sentences
  }

  // Get the currently selected variant
  const selectedVariant = variants[selectedVariantIndex] || {};
  // console.log(rating);

  return (
    <Box sx={{ width: "100%", overflowX: "hidden" }}>
      <Box sx={{ margin: "1.2rem" }}>
        <ProductScreenBreadcrumb
          breadcrumbData={breadcrumbData}
          breadcrumbLoading={breadcrumbLoading}
          breadcrumbError={breadcrumbError}
        />
      </Box>
      <Container maxWidth="lg" sx={{ py: 4, mx: 0.5 }}>
        <Grid container spacing={2} alignItems="flex-start">
          {/* SMALL SCREENS (stacked order: DisplayName → Images → Details) */}
          <Grid size={{ xs: 12 }} sx={{ display: { xs: "block", md: "none" } }}>
            <ProductDisplayName
              selectedVariant={selectedVariant}
              brandName={brandName}
              name={name}
              rating={rating}
              favorites={favorites}
              numReviews={numReviews}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6.75 }}>
            <ProductImages selectedVariant={selectedVariant} />
          </Grid>

          {/* MEDIUM+ Screens: DisplayName + Details in right column */}
          <Grid size={{ xs: 12, md: 5.25 }}>
            <Box
              sx={{
                display: { xs: "none", md: "block" },
                padding: "0.25rem",
              }}
            >
              <ProductDisplayName
                selectedVariant={selectedVariant}
                brandName={brandName}
                name={name}
                rating={rating}
                favorites={favorites}
                numReviews={numReviews}
              />
            </Box>
            <Box
              mt={2}
              sx={{ display: { xs: "none", md: "block" }, padding: "0.25rem" }}
            >
              <ProductDetails
                selectedVariant={selectedVariant}
                isNew={isNew}
                variantTypeCategory={variantTypeCategory}
                variantTypeValues={variantTypeValues}
                breadcrumbData={breadcrumbData}
                selectedVariantIndex={selectedVariantIndex}
                variants={variants}
                setSelectedVariantIndex={setSelectedVariantIndex}
              />
            </Box>
          </Grid>

          {/* SMALL SCREENS: ProductDetails at the bottom */}
          <Grid size={{ xs: 12 }} sx={{ display: { xs: "block", md: "none" } }}>
            <ProductDetails
              selectedVariant={selectedVariant}
              isNew={isNew}
              variantTypeCategory={variantTypeCategory}
              variantTypeValues={variantTypeValues}
              breadcrumbData={breadcrumbData}
              selectedVariantIndex={selectedVariantIndex}
              variants={variants}
              setSelectedVariantIndex={setSelectedVariantIndex}
            />
          </Grid>
        </Grid>
      </Container>
      <Container>
        <Box sx={{ mt: "6rem" }}>
          <ProductBenefitsAndDescription
            description={cleanedDescription}
            benefits={benefits}
          />
        </Box>
        <Divider
          sx={{
            color: theme.palette.text.primary,
            width: "90%",
            display: "flex",
            justifySelf: "center",
          }}
        />
        <Box>
          <ProductIngredientsAndHow
            howToUse={howToUse}
            selectedVariant={selectedVariant}
          />
        </Box>
        <Box>
          <SimilarProducts />
        </Box>
        <Divider
          sx={{
            color: theme.palette.text.primary,
            width: "90%",
            display: "flex",
            justifySelf: "center",
          }}
        />
        <Box>
          <RatingAndReviews />
        </Box>
      </Container>
    </Box>
  );
};

export default ProductScreen;
