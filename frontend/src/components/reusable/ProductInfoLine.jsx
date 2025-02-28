import React, { useState } from "react";
import { Link } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import {
  Box,
  Typography,
  useTheme,
  Rating,
  useMediaQuery,
  Button,
} from "@mui/material";
import getPriceRange from "../../utilis/getPriceRange";

const ProductInfoLine = ({ product, productInfoColor = "inherit", height }) => {
  const theme = useTheme();
  const { _id, benefits, description, name, rating, status, brandName } =
    product || {};

  const onSale = product?.variants?.[0]?.onSale;
  const priceInfo = getPriceRange(product?.variants);

  const isMedium = useMediaQuery(theme.breakpoints.up("md"));

  const getRelevantSentence = (description) => {
    if (!description) return ""; // Handle empty or undefined description

    const sentences = description.split(/(?<=[.!?])\s+/); // Correct sentence splitting

    return sentences[0].startsWith("Buy") && sentences.length > 1
      ? sentences[1]
      : sentences[0];
  };

  return (
    <CardContent
      sx={{
        textAlign: "left",
        marginLeft: 0,
        width: "100%",
        padding: "2rem 0",
        paddingLeft: "2rem",
        paddingRight: "1rem",
        backgroundColor: theme.palette.secondary.light,
        display: "flex",
        height: height || "auto",
        ...(!isMedium && { height: "100%" }),
        flexDirection: "column",
        justifyContent: isMedium ? "center" : "start",
        //borderRadius: "0 2rem 2rem 0",
        //backgroundColor: "red",
        //border: `1px solid ${theme.palette.secondary.main}`,
      }}
    >
      <Typography
        variant="body2"
        sx={{
          mb: 0.5,
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
      <Box
        sx={{
          mt: 0.5,
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        <Rating
          name="read-only"
          value={rating}
          precision={0.1}
          readOnly
          sx={{ transform: "scale(0.8)", transformOrigin: "top left" }}
        />
      </Box>
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
      <Typography variant="body2" sx={{ mt: 0.5, mb: "1.5rem" }}>
        {getRelevantSentence(description)}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="outlined"
          sx={{
            color: theme.palette.secondary.main,
            borderColor: theme.palette.secondary.main,
            width: "50%",
          }}
        >
          Add To Cart
        </Button>
      </Box>
    </CardContent>
  );
};

export default ProductInfoLine;
