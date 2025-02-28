import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { styled, useTheme, lighten } from "@mui/material/styles";
import { darken } from "@mui/material/styles";
import CustomTooltip from "../reusable/CustomTooltip";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import AddToBasket from "./AddToBasketBtn";

const ThumbnailImage = styled("img")(({ theme, isSelected }) => ({
  width: "3rem",
  height: "3rem",
  objectFit: "cover",
  borderRadius: "50%",
  cursor: "pointer",
  border: isSelected ? `4px solid ${theme.palette.accent.main}` : "none",
  transition: "all 0.2s ease",
  "&:hover": {
    //transform: "translateY(-2px)",
    transform: "scale(1.1)",
    border: `3px solid ${theme.palette.accent.main}`,
  },
}));

const ProductDetailsShade = ({
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
    <Box>
      <Typography sx={{ mb: 1 }}>
        <span style={{ fontWeight: 600 }}>Color: </span> {name}
      </Typography>
      <Typography sx={{ mb: 1 }}>
        <span style={{ fontWeight: 600 }}>Size: </span> {variantSize}
      </Typography>
      <Typography sx={{ mb: 0.5, fontWeight: 600 }}>Standard size</Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(3rem, auto))",
          gap: 2,
          mb: 3,
          justifyContent: "start",
          alignItems: "start",
          backgroundColor: theme.palette.secondary.primary,
          padding: "1rem",
          borderRadius: "2rem",
        }}
      >
        {variants.map((variant, index) => (
          <CustomTooltip key={index} title={variant.name} placement="bottom">
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "center",
                cursor: "pointer",
              }}
              onMouseEnter={() => setSelectedVariantIndex(index)}
              onClick={() => setSelectedVariantIndex(index)}
            >
              <ThumbnailImage
                src={variant.iconUrl}
                isSelected={selectedVariantIndex === index}
                alt={`${selectedVariant.name} view ${index + 1}`}
                loading="lazy"
              />
            </Box>
          </CustomTooltip>
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

export default ProductDetailsShade;
