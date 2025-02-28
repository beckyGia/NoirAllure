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
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardMedia from "@mui/material/CardMedia";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useGetPrimaryCategoriesQuery } from "../../slices/categoryApiSlice";
import CategorySkeleton from "../skeleton/CategorySkeleton";
import Message from "../reusable/Message";

const CategoryCard = styled(Card)(({ theme }) => ({
  position: "relative",
  height: "15rem",
  //height: "18rem",
  cursor: "pointer",
  borderRadius: "2rem",
  overflow: "hidden",
  "&:hover img": {
    transform: "scale(1.1)",
  },
}));

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
      }}
    />
  );
};

const ShopByCategory = () => {
  const theme = useTheme();
  const { data: categories, isLoading, error } = useGetPrimaryCategoriesQuery();

  // Handle loading state
  if (isLoading) {
    return <CategorySkeleton />;
  }

  // Handle error state
  if (error) {
    return (
      <Message severity={"error"}>
        {error?.data?.message || error.error}
      </Message>
    );
  }

  // Handle case when categories data is empty or undefined
  if (!categories || categories.length === 0) {
    return <Message severity={"warning"} children={"No categories found."} />;
  }

  //console.log(categories);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 3000,
    //centerMode: true, // Optional: Makes slides centered
    centerPadding: "2rem", // Adds spacing between slides
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
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

  return (
    <Box
      sx={{
        paddingTop: "1.5rem",
        paddingBottom: "1.5rem",
        marginBottom: "2.5rem",
      }}
    >
      <Container>
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 500 }}>
          Shop by Category
        </Typography>

        {/* </Carousel> */}
        <Slider {...settings}>
          {categories?.map((category) => (
            <Box
              sx={{ position: "relative", padding: "0 1rem" }}
              key={category._id}
            >
              <CategoryCard>
                <CardMedia
                  component="img"
                  image={category.image}
                  alt={category.title}
                  sx={{
                    transition: "transform 0.3s",
                    aspectRatio: "4 / 4",
                    objectFit: "cover",
                  }}
                />
                <Box
                  sx={{
                    height: "12rem",
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    bgcolor: "rgba(0,0,0,0.7)",
                    p: 2,
                    paddingTop: 4,
                    zIndex: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                    transition: "transform 0.3s ease",
                    transform: "translateY(50%)", // Button hidden by default
                    "&:hover": {
                      transform: "translateY(0)", // Slide up on hover
                    },
                  }}
                >
                  <Link to={`/shop/${category.linkName}`}>
                    <Typography
                      variant="h4"
                      sx={{
                        color: "white",
                        fontWeight: 600,
                        position: "relative", // Ensure the pseudo-element is positioned relative to this text
                        "&:hover::after": {
                          transform: "scaleX(1)", // Reveal the underline
                        },
                        "&::after": {
                          content: '""', // Pseudo-element
                          position: "absolute",
                          bottom: -2, // Position the underline slightly below the text
                          left: 0,
                          width: "100%",
                          height: "2px", // Thickness of the underline
                          backgroundColor: theme.palette.text.primary, // Underline color
                          transform: "scaleX(0)", // Initially hidden
                          transformOrigin: "left", // Start animation from the left
                          transition: "transform 0.8s ease", // Speed and easing for the animation
                        },
                      }}
                    >
                      {category.title}
                    </Typography>
                  </Link>
                  <Box>
                    <Button
                      component={Link}
                      to={`/shop/${category.linkName}`}
                      sx={{
                        color: "white",
                        fontSize: "0.8rem",
                        "&:hover .endIcon": {
                          transform: "translateX(5px)", // Move the icon to the right
                          transition: "transform 0.3s ease",
                        },
                      }}
                      endIcon={
                        <ArrowForwardIosIcon
                          className="endIcon"
                          sx={{
                            transition: "transform 0.3s ease",
                          }}
                        />
                      }
                    >
                      View More
                    </Button>
                  </Box>
                </Box>
              </CategoryCard>
            </Box>
          ))}
        </Slider>
      </Container>
    </Box>
  );
};

export default ShopByCategory;
