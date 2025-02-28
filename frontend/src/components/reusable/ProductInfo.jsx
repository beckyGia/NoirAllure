import React, { useState } from "react";
import { Link } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import { Box, Typography, useTheme, Rating } from "@mui/material";
import getPriceRange from "../../utilis/getPriceRange";

const ProductInfo = ({ product, productInfoColor = "inherit", isShop }) => {
  const theme = useTheme();
  const { _id, image, name, rating, tags, status, brandName } = product || {};
  const onSale = product?.variants?.[0]?.onSale;

  const priceInfo = getPriceRange(product?.variants);
  // console.log(priceInfo);

  return (
    <CardContent
      sx={{
        textAlign: "left",
        marginLeft: 0,
        padding: "16px 0",
        backgroundColor: productInfoColor,
      }}
    >
      <Typography
        variant="body2"
        sx={{
          mb: 0.25,
          textTransform: "uppercase",
          color: theme.palette.text.light,
        }}
      >
        {brandName}
      </Typography>

      <Typography
        variant="h4"
        sx={{
          fontWeight: 600,
          textDecoration: "none",
          color: theme.palette.text.primary,
          "&:hover": {
            color: theme.palette.primary.main, // Change this to the color you want on hover
          },
        }}
      >
        <Link to={`/product/${product._id}`}>{name}</Link>
      </Typography>
      {isShop && (
        <Box
          sx={{
            mt: 0.5,
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <Rating
            value={rating}
            precision={0.1}
            readOnly
            sx={{
              fontSize: "1.15rem",
              "& .MuiRating-iconFilled": {
                color: theme.palette.secondary.main, // Custom star color
              },
            }}
          />
        </Box>
      )}

      {onSale ? (
        <Box
          sx={{
            mt: 0.5,
            display: "flex",
            alignItems: "center", // Ensures proper vertical alignment
            gap: 0.5,
          }}
        >
          <Typography
            variant="h5"
            color={theme.palette.text.primary}
            sx={{ fontWeight: 600 }}
          >
            ${priceInfo.salePriceRange}
          </Typography>
          <Typography
            variant="body1"
            color={theme.palette.gray.primary}
            sx={{ fontWeight: 500, textDecoration: "line-through" }}
          >
            ${priceInfo.priceRange}
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            mt: 0.5,
          }}
        >
          <Typography
            variant="h5"
            color={theme.palette.text.primary}
            sx={{ fontWeight: 600 }}
          >
            ${priceInfo.priceRange}
          </Typography>
        </Box>
      )}
    </CardContent>
  );
};

export default ProductInfo;
