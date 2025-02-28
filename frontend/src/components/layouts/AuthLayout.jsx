import React from "react";
import Box from "@mui/material/Box";
import NavModeSwitcher from "../nav/NavModeSwitcher";
import { useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthLayout = () => {
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          height: "100vh", // Ensure it covers the full viewport
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: "url('/images/authBackgroundPic.jpeg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <NavModeSwitcher
          right="2%"
          top="0%"
          color={theme.palette.secondary.main}
          fontSize="2.2rem"
          stroke={theme.palette.secondary.dark}
        />
        <Outlet />
      </Box>
      <ToastContainer />
    </>
  );
};

export default AuthLayout;
