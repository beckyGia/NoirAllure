import React from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import NavModeSwitcher from "./NavModeSwitcher";

const ShippingBanner = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.accent.main,
        color: theme.palette.text.primary,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0.3rem",
        position: "relative",
        height: "2rem",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          fontWeight: 500,
          textTransform: "capitalize",
        }}
      >
        FREE STANDARD SHIPPING ON ORDERS OVER $75
      </Typography>
      <NavModeSwitcher />
    </Box>
  );
};

export default ShippingBanner;
