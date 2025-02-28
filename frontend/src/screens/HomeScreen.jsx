import React from "react";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Button,
  Container,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import HeroCarousel from "../components/hero/HeroCarousel";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid2";
import {
  FiShoppingCart,
  FiFacebook,
  FiInstagram,
  FiTwitter,
} from "react-icons/fi";
import MainSection from "../components/home/MainSection";
import ScrollbarWrapper from "../components/reusable/ScrollBarWrapper";

const HomeScreen = () => {
  return (
    <>
      <Helmet>
        <title>Noir Allure Home Page</title>
        <meta name="Noir Allure Homepage" content="Noir Allure Homepage" />
      </Helmet>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            height: "100vh",
            width: "100%",
            //marginTop: "7rem",
            zIndex: 1,
            position: "relative",
          }}
        >
          <HeroCarousel />
        </Box>
        <Container
          maxWidth={false}
          sx={{
            // maxWidth: {
            //   sm: "540px",
            //   md: "720px",
            //   lg: "960px",
            //   xl: "1140px",
            // },
            maxWidth: "90%",
          }}
        >
          <MainSection />
        </Container>
      </Box>
    </>
  );
};

export default HomeScreen;
