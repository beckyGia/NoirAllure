import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { styled, useTheme, lighten } from "@mui/material/styles";
import { darken } from "@mui/material/styles";
import CustomTooltip from "../reusable/CustomTooltip";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import AddToBasket from "../products/AddToBasketBtn";

const ProductDetailsSizeQuick = ({
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
    </Box>
  );
};

export default ProductDetailsSizeQuick;
