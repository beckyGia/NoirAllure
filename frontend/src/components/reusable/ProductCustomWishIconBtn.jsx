import React from "react";
import { useTheme } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { IconButton } from "@mui/material";

const ProductCustomWishIconBtn = ({ children, status, isShop }) => {
  const theme = useTheme();
  const disabled = status === "out-of-stock";

  return (
    <IconButton
      sx={{
        color: "#ffffff",
        borderRadius: isShop ? "50%" : 0,
        height: "40px",
        width: "40px",
        backgroundColor: alpha("#000000", 0.8),
        "&:hover": {
          backgroundColor: alpha("#ffffff", 0.8),
          color: "#000000",
        },
        // Disabled state styles
        "&.Mui-disabled": {
          backgroundColor: alpha("#ffffff", 0.3), // Lighter background when disabled
          color: "#000000", // Lighter text color for disabled state
          //cursor: "not-allowed",
        },
        "&.MuiButtonBase-root:disabled": {
          cursor: "not-allowed",
          pointerEvents: "auto",
        },
      }}
      disabled={disabled}
    >
      {children}
    </IconButton>
  );
};

export default ProductCustomWishIconBtn;
