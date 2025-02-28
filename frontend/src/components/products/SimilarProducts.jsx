import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  styled,
  alpha,
  useTheme,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Link, useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardMedia from "@mui/material/CardMedia";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ProductItem from "../home/ProductItem";
import Message from "../reusable/Message";
import { useGetSimilarProductsOfASingleProductQuery } from "../../slices/productsApiSlice";

const CustomNextArrow = (props) => {
  const theme = useTheme();
  const { className, onClick } = props;
  return (
    <ArrowForwardIosIcon
      className={className}
      onClick={onClick}
      style={{
        fontSize: "1.5rem",
        fontWeight: 900,
        backgroundColor: alpha(theme.palette.background.default, 0.9),
        color: theme.palette.text.primary,
        borderRadius: "50%",
        right: "-30px",
        top: "40%",
      }}
    />
  );
};

const CustomPrevArrow = (props) => {
  const theme = useTheme();
  const { className, onClick } = props;
  return (
    <ArrowBackIosNewIcon
      className={className}
      onClick={onClick}
      style={{
        fontSize: "1.5rem",
        fontWeight: 900,
        backgroundColor: alpha(theme.palette.background.default, 0.9),
        color: theme.palette.text.primary,
        borderRadius: "50%",
        left: "-30px",
        top: "40%",
      }}
    />
  );
};

const SimilarProducts = () => {
  const theme = useTheme();
  const { id: productId } = useParams();
  const {
    data: similarProducts,
    isLoading,
    error,
  } = useGetSimilarProductsOfASingleProductQuery(productId);

  const settings = {
    speed: 1000,
    slidesToShow: similarProducts?.length < 3 ? similarProducts?.length : 3,
    //slidesToShow: Math.min(similarProducts?.length || 0, 3),
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    infinite: similarProducts?.length > 3,
    arrows: similarProducts?.length > 3,
    autoplaySpeed: 3000,
    centerMode: false,
    variableWidth: false,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  //console.log(similarProducts);

  return (
    <Box
      sx={{
        mt: 10,
        width: "90%",
        display: "flex",
        justifySelf: "center",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          textTransform: "uppercase",
          fontWeight: 600,
          letterSpacing: "0.15rem",
          mb: 4,
        }}
      >
        Similar Products
      </Typography>
      {/* </Carousel> */}
      {similarProducts?.length > 0 ? (
        <Box
          sx={{
            //width: "100%",
            "& div.slick-track": {
              display: "flex",
              width: similarProducts?.length < 3 ? "100% !important" : "auto",
              justifyContent: "flex-start",
            },
            "& .slick-track": {
              //width: "100%",
            },
          }}
        >
          <Slider {...settings}>
            {similarProducts?.map((product) => (
              <Box
                key={product._id}
                sx={{ px: 2, maxWidth: "25rem", flex: "1 1 auto" }}
              >
                <ProductItem
                  product={product}
                  bgcolor={"inherit"}
                  isShop={true}
                  isShopLine={false}
                />
              </Box>
            ))}
          </Slider>
        </Box>
      ) : (
        <Box sx={{ width: "100%" }}>
          <Typography variant="h5" sx={{ px: "1rem", mb: "4rem" }}>
            {" "}
            No Similar Products!
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default SimilarProducts;
