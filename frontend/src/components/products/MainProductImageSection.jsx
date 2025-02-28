import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { useTheme, lighten } from "@mui/material/styles";
import Carousel from "react-material-ui-carousel";
import Slider from "react-slick";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { styled } from "@mui/material";
import { alpha } from "@mui/material/styles";

const CustomNextArrow = (props) => {
  const theme = useTheme();
  const { onClick } = props;
  return (
    <ArrowForwardIosIcon
      onClick={onClick}
      sx={{
        fontSize: "2.5rem",
        position: "absolute",
        fontWeight: 900,
        backgroundColor: "black",
        opacity: 0.8,
        color: "white",
        borderRadius: "50%",
        right: "20px",
        top: "50%",
        padding: "0.25rem",
        zIndex: "1",
        transform: "translateY(-50%)",
        cursor: "pointer",
      }}
    />
  );
};

const CustomPrevArrow = (props) => {
  const theme = useTheme();
  const { onClick } = props;
  return (
    <ArrowBackIosNewIcon
      onClick={onClick}
      sx={{
        fontSize: "2.5rem",
        position: "absolute",
        fontWeight: 900,
        backgroundColor: "black",
        opacity: 0.8,
        color: "white",
        borderRadius: "50%",
        left: "20px",
        top: "50%",
        padding: "0.25rem",
        zIndex: "1",
        transform: "translateY(-50%)",
        cursor: "pointer",
      }}
    />
  );
};

const ProductImageCard = styled(Card)(({ theme }) => ({
  maxWidth: "100%",
  width: "100%",
  height: "100%",
  aspectRatio: 4 / 4,
  objectFit: "cover",
  borderRadius: "10%",
  cursor: "zoom-in",
  transition: "transform 0.3s ease",
  display: "flex", // Allow children to take full height
  justifyContent: "center",
  alignItems: "center",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const MainProductImageSection = ({
  imageIcons,
  selectedVariant,
  selectedImage,
  setSelectedImage,
  scrollThumbnailIntoView,
}) => {
  const sliderRef = useRef(null); // Create a ref for the slider

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(selectedImage); // Update the carousel when selectedImage changes
    }
  }, [selectedImage]); // Runs every time selectedImage updates

  const settings = {
    speed: 1000,
    slidesToShow: 1, // Show one slide at a time
    slidesToScroll: 1,
    infinite: imageIcons.length > 1,
    arrows: imageIcons.length > 1,
    centerPadding: "0px",
    initialSlide: selectedImage,
    afterChange: (current) => {
      setSelectedImage(current);
      if (scrollThumbnailIntoView) {
        scrollThumbnailIntoView(current);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        //maxWidth: { md: "72.5%" },
        //width: { md: "10%" },
        width: { xs: "100%" },
        //height: { xs: "auto", md: "30rem" },
        position: "relative",
        overflow: "scroll",
        //mx: "auto", // Centers the slider
      }}
    >
      <Slider {...settings} ref={sliderRef}>
        {imageIcons.map((image, index) => (
          <Box key={index} sx={{ padding: "0 1rem" }}>
            <ProductImageCard>
              <CardMedia
                component="img"
                image={image}
                loading="lazy"
                alt={`${selectedVariant.name} - ${index + 1}`}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </ProductImageCard>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default MainProductImageSection;

{
  /* <Carousel
        NextIcon={
          <ArrowForwardIosIcon
            sx={{
              color: "white",
              fontSize: "2.5rem",
              position: "absolute",
              right: "5%",
            }}
          />
        }
        PrevIcon={
          <ArrowBackIosNewIcon
            sx={{
              color: "white",
              fontSize: "2.5rem",
              position: "absolute",
              left: "5%",
            }}
          />
        }
        animation="fade"
        autoPlay={false}
        indicators={false}
        index={selectedImage}
        onChange={(now) => {
          setSelectedImage(now);
          scrollThumbnailIntoView(now);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        navButtonsProps={{
          style: {
            backgroundColor: "black",
            position: "relative",
            color: "white",
            fontSize: "3rem",
            width: "50px",
            height: "50px",
            opacity: 0.8, // Reduce visibility slightly
          },
        }}
        navButtonsWrapperProps={{
          style: {
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
          },
        }}
      >
        {imageIcons.map((image, index) => (
          <Box key={index} sx={{ width: "100%", height: "100%" }}>
            <ProductImage
              src={image}
              alt={`${selectedVariant.name} - ${index + 1}`}
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </Box>
        ))}
      </Carousel> */
}
