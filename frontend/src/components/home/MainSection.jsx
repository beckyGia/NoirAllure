import React from "react";
import { Box, Button, useTheme, Typography, styled } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Container from "@mui/material/Container";
import ProductItem from "../home/ProductItem";
import Carousel from "react-material-ui-carousel";
import Skeleton from "@mui/material/Skeleton";
import CustomSlider from "./CustomSlider";
import ShopByCategory from "./ShopByCategory";
import SpecialProducts from "./SpecialProducts";
import FeatureArea from "../../containers/FeatureArea";
import BeautyOfferBanner from "../home/BeautyOfferBanner";
import Stack from "@mui/material/Stack";
import {
  useGetNewlyArrivedProductsQuery,
  useGetBestSellingProductsQuery,
  useGetFeaturedProductsQuery,
  useGetIsTrendingProductsQuery,
  useGetForYouProductsQuery,
} from "../../slices/productsApiSlice";

const ProductCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.3s",
  "&:hover": {
    transform: "translateY(-8px)",
  },
}));

const CategoryCard = styled(Card)(({ theme }) => ({
  position: "relative",
  height: "32.6rem",
  cursor: "pointer",
  overflow: "hidden",
  "&:hover img": {
    transform: "scale(1.1)",
  },
}));

const MainSection = () => {
  const {
    data: bestSellingProducts,
    isLoading: bestSellingLoading,
    error: bestSellingError,
  } = useGetBestSellingProductsQuery();

  const {
    data: featuredProducts,
    isLoading: featuredLoading,
    error: featuredError,
  } = useGetFeaturedProductsQuery();

  const {
    data: forYouProducts,
    isLoading: forYouLoading,
    error: forYouError,
  } = useGetForYouProductsQuery();

  const {
    data: trendingProducts,
    isLoading: trendingLoading,
    error: trendingError,
  } = useGetIsTrendingProductsQuery();

  const {
    data: newlyArrivedProducts,
    isLoading: newlyArrivedLoading,
    error: newlyArrivedError,
  } = useGetNewlyArrivedProductsQuery();

  return (
    <>
      {/* Category section */}
      <ShopByCategory />

      {/* NEWLY ARRIVED PRODUCTS */}
      <CustomSlider
        title={"New Arrivals"}
        products={newlyArrivedProducts}
        isLoading={newlyArrivedLoading}
        error={newlyArrivedError}
        paddingTop="2rem"
        paddingBottom="2rem"
      />

      {/* SPECIAL TRENDING PRODUCTS  */}
      <SpecialProducts
        products={trendingProducts}
        isLoading={trendingLoading}
        error={trendingError}
      />

      {/* FEATURED PRODUCTS */}
      <CustomSlider
        title={"Featured Products"}
        products={featuredProducts}
        isLoading={featuredLoading}
        error={featuredError}
      />

      {/* BESTSELLING PRODUCTS */}
      <CustomSlider
        title={"Bestselling Products"}
        products={bestSellingProducts}
        isLoading={bestSellingLoading}
        error={bestSellingError}
      />

      {/* BEAUTY OFFER PRODUCTS */}
      <BeautyOfferBanner />

      {/* FOR YOU PRODUCTS */}
      <CustomSlider
        title={"Chosen For You"}
        products={forYouProducts}
        isLoading={forYouLoading}
        error={forYouError}
      />

      <FeatureArea />
    </>
  );
};

export default MainSection;
