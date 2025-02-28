import React from "react";
import { Button, useTheme } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

const ProductCustomBtn = ({ children, disabled }) => {
  const theme = useTheme();

  return (
    <Button
      className="hover-content-btn"
      variant="contained"
      fullWidth
      sx={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0, // Initially placed below
        zIndex: 2,
        color: "white",
        borderRadius: 0,
        fontWeight: 700,
        backgroundColor: alpha("#000000", 0.8),
        "&:hover": {
          backgroundColor: theme.palette.accent.main,
          color: theme.palette.text.primary,
        },
        fontSize: "0.8rem",
        opacity: 1, // Hidden by default
        transform: "translateY(40px)", // Slide in from below
        transition: "opacity 0.3s ease, transform 0.3s ease",
        "&.Mui-disabled": {
          backgroundColor: alpha(theme.palette.text.contrast, 0.3), // Lighter background when disabled
          color: theme.palette.text.primary, // Lighter text color for disabled state
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
    </Button>
  );
};

export default ProductCustomBtn;
