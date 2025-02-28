import React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../containers/Header";
import ScrollToTop from "../ScrollToTop";
import BackToTopCom from "../reusable/BackToTopCom";
import Footer from "../../containers/Footer";

const MainLayout = () => {
  const theme = useTheme();

  return (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: theme.palette.background.default,
          color: theme.palette.text.primary,
          marginTop: "7rem",
        }}
      >
        <ScrollToTop />
        <Outlet />
      </Box>
      <Footer />
      <BackToTopCom />
      <ToastContainer />
    </>
  );
};

export default MainLayout;
