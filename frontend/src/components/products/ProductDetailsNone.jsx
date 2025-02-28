import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { styled, useTheme, lighten } from "@mui/material/styles";
import { darken } from "@mui/material/styles";
import CustomTooltip from "../reusable/CustomTooltip";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import AddToBasket from "./AddToBasketBtn";

const ProductDetailsNone = ({
  selectedVariant,
  isNew,
  variantTypeValues,
  selectedVariantIndex,
  setSelectedVariantIndex,
  variants,
}) => {
  const theme = useTheme();
  const [addWishlist, setAddWishlist] = useState(false);
  const onSale = selectedVariant?.onSale;
  const name = selectedVariant?.name;
  const newArrival = isNew;
  const variantSize = selectedVariant?.size;

  return (
    <Box sx={{ mt: 10 }}>
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

export default ProductDetailsNone;
