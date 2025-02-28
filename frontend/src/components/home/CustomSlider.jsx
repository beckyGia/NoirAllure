import React, { useRef } from "react";
import {
  Box,
  Button,
  useTheme,
  Typography,
  styled,
  Divider,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Container from "@mui/material/Container";
import ProductItem from "../home/ProductItem";
import ProductHomeSkeleton from "../skeleton/ProductHomeSkeleton";

const CustomNextArrow = ({ onClick }) => {
  const theme = useTheme();
  //const { className, onClick } = props;
  return (
    <ArrowForwardIosIcon
      //className={className}
      onClick={onClick}
      sx={{
        // position: "absolute",
        //transform: "translateY(-50%)",
        fontSize: "2rem",
        fontWeight: 900,
        backgroundColor: alpha(theme.palette.background.default, 0.9),
        cursor: "pointer",
        color: theme.palette.text.primary,
        borderRadius: "50%",
        // right: "0%",
        // top: "-6.5%",
        "&:hover": { color: theme.palette.primary.main },
      }}
    />
  );
};

const CustomPrevArrow = ({ onClick }) => {
  const theme = useTheme();
  //const { className, onClick } = props;
  return (
    <ArrowBackIosNewIcon
      //className={className}
      onClick={onClick}
      sx={{
        // position: "absolute",
        //transform: "translateY(-50%)",
        fontSize: "2rem",
        fontWeight: 900,
        backgroundColor: alpha(theme.palette.background.default, 0.9),
        color: theme.palette.text.primary,
        borderRadius: "50%",
        cursor: "pointer",
        // top: "-6.5%",
        // right: "5%",
        "&:hover": { color: theme.palette.primary.main },
      }}
    />
  );
};

const CustomSlider = ({
  title,
  products,
  isLoading,
  error,
  paddingTop = "1rem",
  paddingBottom = "1rem",
}) => {
  const theme = useTheme();
  const sliderRef = useRef(null); // Slider reference

  // Handle loading state
  if (isLoading) {
    return <ProductHomeSkeleton />;
  }

  // Handle error state
  if (error) {
    return <p>Error: {error.message || "Something went wrong"}</p>;
  }

  // Handle case when products data is empty or undefined
  if (!products || products.length === 0) {
    return <p>No products found.</p>;
  }

  const settings = {
    //dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 3000,
    //centerMode: true, // Optional: Makes slides centered
    centerPadding: "2rem", // Adds spacing between slides
    //nextArrow: <CustomNextArrow />,
    //prevArrow: <CustomPrevArrow />,
    arrows: false,
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
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  const handlePrevClick = () => {
    sliderRef.current?.slickPrev(); // ✅ Use ref correctly
  };

  const handleNextClick = () => {
    sliderRef.current?.slickNext(); // ✅ Use ref correctly
  };

  return (
    <Box
      sx={{
        paddingTop: paddingTop,
        paddingBottom: paddingBottom,
      }}
    >
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignSelf: "center",
            justifyContent: "space-between",
            gap: 2,
            position: "relative",
          }}
        >
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              fontWeight: 500,
              mb: 2,
            }}
          >
            {title}
          </Typography>
          {/* Arrows beside title (manually control slider) */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <CustomPrevArrow onClick={handlePrevClick} />
            <CustomNextArrow onClick={handleNextClick} />
          </Box>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Slider ref={sliderRef} {...settings}>
            {products?.map((product) => (
              <Box key={product._id} sx={{ px: 2 }}>
                <ProductItem product={product} bgcolor={"inherit"} />
              </Box>
            ))}
          </Slider>
        </Box>
      </Container>
    </Box>
  );
};

export default CustomSlider;
