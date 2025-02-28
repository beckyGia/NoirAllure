import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { styled, useTheme, lighten } from "@mui/material/styles";
import { darken } from "@mui/material/styles";
import CustomTooltip from "../reusable/CustomTooltip";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import AddToBasket from "./AddToBasketBtn";

const ProductDetailsSize = ({
  selectedVariant,
  isNew,
  variantTypeValues,
  selectedVariantIndex,
  setSelectedVariantIndex,
  variants,
}) => {
  const theme = useTheme();
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [addWishlist, setAddWishlist] = useState(false);
  const onSale = selectedVariant?.onSale;
  const name = selectedVariant?.name;
  const newArrival = isNew;
  const variantSize = selectedVariant?.size;

  function formatSize(name) {
    if (!name) return "";

    // Check if the name ends with 'g' or contains any invalid size (e.g., 'g')
    if (name.endsWith("g") || /[^ozmL]/.test(name)) {
      return name;
    }

    const parts = name.split("/").map((part) => part.trim()); // Split and trim spaces
    let ozValue = null;
    let mLValue = null;

    for (const part of parts) {
      if (part.includes("oz") && !ozValue) {
        ozValue = part; // Take the first oz value
      }
      if (part.includes("mL")) {
        mLValue = part; // Take any mL value (assuming only one)
      }
    }

    // Construct the formatted string with available values
    return [ozValue, mLValue].filter(Boolean).join("/ ");
  }

  const formattedName = formatSize(name);

  return (
    <Box>
      <Typography sx={{ mb: 2 }}>
        <span style={{ fontWeight: 600 }}>Size: </span> {formattedName}
      </Typography>
      <Box>
        {variants.map((variant, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography sx={{ mb: 0.75 }}>{variant.sizeName}</Typography>
            <Button
              variant="outlined"
              sx={{
                padding: "0.75rem 3rem",
                color: theme.palette.secondary.main,
                borderColor: theme.palette.secondary.main,
                backgroundColor:
                  selectedVariantIndex === index
                    ? theme.palette.secondary.light
                    : "",
              }}
              onMouseEnter={() => setSelectedVariantIndex(index)}
              onClick={() => setSelectedVariantIndex(index)}
            >
              {formatSize(variant.name)}
            </Button>
          </Box>
        ))}
      </Box>
      <Box sx={{ display: "flex", mb: 1.5, justifyContent: "center", gap: 2 }}>
        <AddToBasket />
        <IconButton
          sx={{
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "transparent",
              boxShadow: "none",
            },
          }}
          onClick={() => setAddWishlist((prev) => !prev)}
        >
          {addWishlist ? (
            <FavoriteIcon
              sx={{
                fontSize: "2.5rem",
                color: darken(theme.palette.secondary.light, 0.1),
              }}
            />
          ) : (
            <FavoriteIcon
              sx={{
                fontSize: "2.5rem",
                color: theme.palette.background.default,
                stroke: theme.palette.text.primary,
                strokeWidth: "0.3",
                "&:hover": {
                  color: darken(theme.palette.secondary.light, 0.1),
                  stroke: "none",
                },
              }}
            />
          )}
        </IconButton>
      </Box>
      <Box sx={{ display: "flex", gap: 0.5, mb: 1 }}>
        <TaskAltIcon />
        <Typography>30 days easy returns</Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 0.5 }}>
        <TaskAltIcon />
        <Typography>Order yours before 2:30pm for same day dispatch</Typography>
      </Box>
    </Box>
  );
};

export default ProductDetailsSize;
