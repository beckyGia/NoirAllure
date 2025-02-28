import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import ShopBreadcrumb from "../components/breadcrumbs/ShopBreadcrumb";
import ShopArea from "../components/shop/ShopArea";

const ShopScreen = () => {
  const theme = useTheme();
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ margin: "1.2rem" }}>
        <ShopBreadcrumb />
      </Box>
      <ShopArea />
    </Box>
  );
};

export default ShopScreen;
