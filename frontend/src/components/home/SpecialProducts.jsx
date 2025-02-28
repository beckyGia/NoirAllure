import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  IconButton,
  Button,
  useTheme,
  styled,
  alpha,
} from "@mui/material";
import { Link } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import Grid from "@mui/material/Grid2";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import ProductItem from "./ProductItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { keyframes, textAlign } from "@mui/system";

const CustomNextArrow = ({ onClick }) => {
  const theme = useTheme();
  //const { className, onClick } = props;
  return (
    <ArrowForwardIosIcon
      //className={className}
      onClick={onClick}
      sx={{
        position: "absolute",
        //transform: "translateY(-50%)",
        fontSize: "2rem",
        fontWeight: 900,
        backgroundColor: alpha(theme.palette.background.default, 0.9),
        cursor: "pointer",
        color: theme.palette.text.primary,
        zIndex: 10,
        //borderRadius: "50%",
        right: 5,
        top: "30%",
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
        position: "absolute",
        //transform: "translateY(-50%)",
        fontSize: "2rem",
        fontWeight: 900,
        backgroundColor: alpha(theme.palette.background.default, 0.9),
        color: theme.palette.text.primary,
        //borderRadius: "50%",
        zIndex: 10,
        cursor: "pointer",
        top: "30%",
        left: 5,
        "&:hover": { color: theme.palette.primary.main },
      }}
    />
  );
};

const SpecialProducts = ({ products, isLoading, error }) => {
  const theme = useTheme();
  const [index, setIndex] = useState(0);

  const content = [
    {
      title: "Skincare Product",
      description: "Lorem ipsum dolor sit amet consectetur.",
    },
    {
      title: "Skincare Product",
      description: "Lorem ipsum dolor sit amet consectetur.",
    },
  ];

  const pulseAnimation = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(0.4);
    opacity: 1;
    box-shadow: 0 0 0 0px rgba(255, 255, 255, 0.5);
  }
  10% {
    opacity: 1;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2);
  }
  40% {
    opacity: 1;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2);
  }
  60% {
    opacity: 1;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2);
  }
  100% {
    transform: translate(-50%, -50%) scale(2.2);
    opacity: 0;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0);
  }
`;

  const totalProducts = products?.length;

  // Next handler
  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % totalProducts);
    console.log();
  };

  // Previous handler
  const handlePrev = () => {
    setIndex((prevIndex) =>
      prevIndex - 1 < 0 ? totalProducts - 1 : prevIndex - 1
    );
  };

  const settings = {
    //dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    //autoplaySpeed: 3000,
    //centerMode: true, // Optional: Makes slides centered
    centerPadding: "1rem", // Adds spacing between slides
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    //arrows: false,
  };

  return (
    <Box component="section" sx={{ paddingBottom: 8 }}>
      <Container>
        <Grid container spacing={2}>
          <Grid size={{ xl: 5, md: 6 }} sx={{ position: "relative" }}>
            <Card sx={{ borderRadius: "1rem", height: { md: 700 } }}>
              <CardMedia
                component="img"
                //height="194"
                image="/images/SpecialProductsImage.jpg"
                alt="Beauty Picture"
                sx={{
                  width: "100%",
                  height: "100%",
                  //aspectRatio: "4/3",
                  objectFit: "cover",
                }}
              />
            </Card>
            <Box sx={{ position: "absolute", top: "15%", left: "10%" }}>
              <Tooltip
                title={
                  <Link to={`/shop/hair`}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 600,
                        "&:hover": {
                          color: theme.palette.secondary.main,
                        },
                      }}
                    >
                      Haircare Product
                    </Typography>
                    <Typography variant="body1" sx={{ wordBreak: "break-all" }}>
                      Discover the secrets of haircare
                    </Typography>
                  </Link>
                }
                arrow
                slotProps={{
                  tooltip: {
                    sx: {
                      backgroundColor: theme.palette.background.default,
                      color: theme.palette.text.primary,
                      fontSize: "12px",
                      borderRadius: "4px",
                      padding: "15px 20px",
                      textAlign: "center",
                    },
                  },
                  arrow: {
                    sx: {
                      color: theme.palette.background.default,
                    },
                  },
                }}
              >
                <IconButton
                  sx={{
                    position: "relative",
                    borderRadius: "50%",
                    backgroundColor: theme.palette.background.default,
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      transform: "translate(-50%, -50%)",
                      boxShadow: "0 0 0 0px rgba(255, 255, 255, 0.5)",
                      animation: `${pulseAnimation} 2s linear infinite`,
                      transition: "opacity 0.3s ease-in-out",
                    },
                    "&:before": {
                      animationDelay: "0.6s",
                    },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      transform: "translate(-50%, -50%)",
                      boxShadow: "0 0 0 0px rgba(255, 255, 255, 0.5)",
                      animation: `${pulseAnimation} 2s linear infinite`,
                      transition: "opacity 0.3s ease-in-out",
                    },
                  }}
                >
                  <AddIcon
                    sx={{
                      fontSize: "2.5rem",
                      fontWeight: 900,
                      //backgroundColor: "none",
                      borderRadius: "50%",
                      padding: "0.6rem",
                      //color: "black",
                      //backgroundColor: "white",
                      backgroundColor: theme.palette.background.default,
                      color: theme.palette.text.primary,
                    }}
                  />
                </IconButton>
              </Tooltip>
            </Box>
            <Box sx={{ position: "absolute", top: "60%", left: "60%" }}>
              <Tooltip
                title={
                  <Link to={`/shop/skincare`}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 600,
                        "&:hover": {
                          color: theme.palette.secondary.main,
                        },
                      }}
                    >
                      Skincare Product
                    </Typography>
                    <Typography variant="body1" sx={{ wordBreak: "break-all" }}>
                      Discover the secrets of skincare
                    </Typography>
                  </Link>
                }
                arrow
                slotProps={{
                  tooltip: {
                    sx: {
                      backgroundColor: theme.palette.background.default,
                      color: theme.palette.text.primary,
                      fontSize: "12px",
                      borderRadius: "4px",
                      padding: "15px 20px",
                      textAlign: "center",
                    },
                  },
                  arrow: {
                    sx: {
                      color: theme.palette.background.default,
                    },
                  },
                }}
              >
                <IconButton
                  sx={{
                    position: "relative",
                    borderRadius: "50%",
                    backgroundColor: theme.palette.background.default,
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      transform: "translate(-50%, -50%)",
                      boxShadow: "0 0 0 0px rgba(255, 255, 255, 0.5)",
                      animation: `${pulseAnimation} 2s linear infinite`,
                      transition: "opacity 0.3s ease-in-out",
                    },
                    "&:before": {
                      animationDelay: "0.6s",
                    },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      transform: "translate(-50%, -50%)",
                      boxShadow: "0 0 0 0px rgba(255, 255, 255, 0.5)",
                      animation: `${pulseAnimation} 2s linear infinite`,
                      transition: "opacity 0.3s ease-in-out",
                    },
                  }}
                >
                  <AddIcon
                    sx={{
                      fontSize: "2.5rem",
                      fontWeight: 900,
                      borderRadius: "50%",
                      padding: "0.6rem",
                      color: theme.palette.text.primary,
                      backgroundColor: theme.palette.background.default,
                    }}
                  />
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>
          <Grid
            size={{ xl: 7, md: 6 }}
            sx={{
              width: "100%",
              height: "700", // Allow the height to adjust based on content
              maxWidth: "100%", // Ensure it doesn't exceed the grid's allocated width
            }}
          >
            <Box
              sx={{
                height: 700,
                //backgroundColor: alpha(theme.palette.background.main, 0.04),
                backgroundColor: theme.palette.secondary.light,
                borderRadius: "1rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "30%",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 400, mb: 1, letterSpacing: 2 }}
                >
                  Snag Trending Picks Now
                </Typography>
                <Typography
                  variant="h1"
                  sx={{ fontWeight: 700, letterSpacing: 3 }}
                >
                  Hot on Social
                </Typography>
              </Box>
              <Box
                sx={{
                  height: "70%",
                  marginTop: "-2rem",
                  width: "100%",
                }}
              >
                {/* <Carousel
                  index={index}
                  animation="fade"
                  interval={4000}
                  navButtonsAlwaysVisible={true}
                  autoPlay={true}
                  indicators={false}
                  stopAutoPlayOnHover
                  swipe={true}
                  fullHeightHover={false}
                  next={handleNext}
                  prev={handlePrev}
                  navButtonsProps={{
                    style: {
                      backgroundColor: alpha(
                        theme.palette.background.default,
                        0.9
                      ),
                      color: theme.palette.text.primary,
                      borderRadius: 0,
                    },
                  }}
                  NextIcon={
                    <ArrowForwardIosIcon
                      sx={{ fontSize: "1.5rem", fontWeight: 900 }}
                    />
                  }
                  PrevIcon={
                    <ArrowBackIosNewIcon
                      sx={{ fontSize: "1.5rem", fontWeight: 900 }}
                    />
                  }
                  sx={{
                    height: "auto",
                    padding: "0rem 4rem",
                    width: "100%",
                  }}
                > */}
                <Slider {...settings}>
                  {products?.map((product, id) => (
                    <Grid
                      container
                      key={product._id}
                      //spacing={2}
                      //direction="column"
                      sx={{
                        height: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "inherit",
                        position: "relative",
                      }}
                    >
                      <Grid
                        //size="70%"
                        sx={{
                          //width: "fit-content",
                          display: "flex",
                          justifySelf: "center",
                          //width: "80%",
                          backgroundColor: "inherit",
                          //   display: "flex", // Centers the item if necessary
                          //   justifyContent: "center", // Align horizontally
                          //   alignItems: "center", // Align vertically
                        }}
                      >
                        <ProductItem
                          product={product}
                          productInfoColor={theme.palette.secondary.light}
                          height="22rem"
                          bgcolor={theme.palette.secondary.light}
                        />
                      </Grid>
                    </Grid>
                  ))}
                </Slider>
                {/* </Carousel> */}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SpecialProducts;
