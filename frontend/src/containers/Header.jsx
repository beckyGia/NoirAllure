import React from "react";
import ShippingBanner from "../components/nav/ShippingBanner";
import NavBar from "../components/nav/NavBar";
import { Box } from "@mui/material";

const Header = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        zIndex: 1000,
      }}
    >
      <ShippingBanner />
      <NavBar />
    </Box>
  );
};
export default Header;
