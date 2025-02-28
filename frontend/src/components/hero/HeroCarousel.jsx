import { useState, useRef } from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import Slider from "react-slick";
import { useTheme, alpha, darken } from "@mui/material/styles";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

// Custom Navigation Arrows
const CustomArrow = ({ onClick, direction, show }) => (
  <Box
    onClick={onClick}
    sx={{
      position: "absolute",
      top: "42%",
      transform: "translateY(-50%)",
      zIndex: 10,
      cursor: "pointer",
      backgroundColor: alpha("#000", 0.5),
      color: "white",
      width: 40,
      height: 40,
      display: show ? "flex" : "none", // Hide when showArrows is false
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
      transition: "opacity 0.3s",
      "&:hover": { backgroundColor: alpha("#000", 0.8) },
      left: direction === "prev" ? 10 : "auto",
      right: direction === "next" ? 10 : "auto",
    }}
  >
    {direction === "prev" ? <ArrowBackIosNewIcon /> : <ArrowForwardIosIcon />}
  </Box>
);

const HeroCarousel = () => {
  const theme = useTheme();
  const heroSliderRef = useRef(null);
  const [showArrows, setShowArrows] = useState(false); // Control arrow visibility

  const settings = {
    infinite: true,
    lazyLoad: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const images = [
    {
      src: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "In With the New",
      description: "The latest beauty from the hottest brands",
      buttonText: "SHOP NOW",
      url: "shop/makeup",
    },
    {
      src: "https://img.freepik.com/free-photo/natural-treatment-with-cucumber_23-2148574955.jpg?t=st=1740544552~exp=1740548152~hmac=5a1a54a5eaae753a0d83a3a6efd6e151dcd836513c030754f01f34d0e3c5f333&w=2000",
      title: "Skincare Benefits, Makeup Energy",
      description: "Double-duty beauty for that extra oomph",
      buttonText: "SHOP NOW",
      url: "shop/skincare",
    },
    {
      src: "https://img.freepik.com/free-photo/high-angle-bright-red-lip-gloss-with-sky-background_23-2149681520.jpg?t=st=1740545219~exp=1740548819~hmac=a0af2890f415a8839ea200a7a625627a77c9c6b3ace75abfd8bec6a20498ddc4&w=2000",
      title: "Summer Fridays Dream Lip Oil",
      description:
        "This hydrating, high-shine formula now comes in four NEW shades",
      buttonText: "SHOP NOW",
      url: "shop/lip-makeup",
    },
    {
      src: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Big in Beauty",
      description: "Stock up on bestselling value sizes",
      buttonText: "SHOP NOW",
      url: "shop/makeup-kits-makeup-sets",
    },
  ];

  const handlePrevClick = () => heroSliderRef.current?.slickPrev();
  const handleNextClick = () => heroSliderRef.current?.slickNext();

  return (
    <Box
      sx={{ position: "relative" }}
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      {/* Custom Arrows (Appear on Hover) */}
      <CustomArrow
        onClick={handlePrevClick}
        direction="prev"
        show={showArrows}
      />
      <CustomArrow
        onClick={handleNextClick}
        direction="next"
        show={showArrows}
      />

      <Slider ref={heroSliderRef} {...settings}>
        {images.map((item, index) => (
          <Card
            key={index}
            sx={{
              position: "relative",
              width: "100%",
              height: "90vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <CardMedia
              component="img"
              image={item.src}
              alt={item.title}
              sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <CardContent
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
                color: "white",
                backgroundColor: alpha("#000000", 0.2),
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <Box
                sx={{
                  width: "90%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h1"
                  gutterBottom
                  sx={{
                    fontWeight: 800,
                    backgroundColor: "black",
                    padding: "0.5rem",
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="h3"
                  gutterBottom
                  sx={{
                    marginBottom: "3rem",
                    backgroundColor: "black",
                    padding: "0.5rem",
                  }}
                >
                  {item.description}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 600,
                    backgroundColor: theme.palette.primary.main,
                    "&:hover": {
                      backgroundColor: darken(theme.palette.primary.main, 0.2),
                    },
                  }}
                >
                  {item.buttonText}
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Slider>
    </Box>
  );
};

export default HeroCarousel;
