import React from "react";
import { Typography, Box, Rating } from "@mui/material";
import { useTheme, lighten } from "@mui/material/styles";
import { Link } from "react-router-dom";
import Divider, { dividerClasses } from "@mui/material/Divider";
import FavoriteIcon from "@mui/icons-material/Favorite";

const ProductDisplayName = ({
  selectedVariant,
  brandName,
  name,
  rating,
  favorites,
  numReviews,
}) => {
  const theme = useTheme();
  //console.log(brandName);
  return (
    <Box>
      <Box>
        <Link style={{ fontWeight: 700, fontSize: "1rem" }}>{brandName}</Link>
        <Typography variant="h4">{name}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center", // Align items in a row
          gap: 1, // Add some spacing between items
        }}
      >
        <Link
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Rating
            value={Number(rating)}
            precision={0.1}
            readOnly
            sx={{
              "& .MuiRating-iconFilled": {
                fontSize: "0.9rem",
                color: theme.palette.secondary.main,
              },
              "& .MuiRating-iconEmpty": {
                fontSize: "0.9rem",
                //color: "transparent",
                borderColor: theme.palette.text.primary,
              },
            }}
          />
          <Typography
            sx={{
              fontSize: "0.8rem",
              fontWeight: 600,
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            {numReviews}
          </Typography>
        </Link>
        <Divider
          orientation="vertical"
          flexItem
          variant="middle"
          sx={{
            borderColor: lighten(theme.palette.text.primary, 0.7), // Custom color
            height: "1.2rem", // Adjust height
            borderWidth: "0.01px", // Thickness
          }}
        />
        <Link>
          <Typography
            sx={{
              fontSize: "0.8rem",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Ask a question
          </Typography>
        </Link>
        <Divider
          orientation="vertical"
          flexItem
          variant="middle"
          sx={{
            borderColor: lighten(theme.palette.text.primary, 0.7), // Custom color
            height: "1.2rem", // Adjust height
            borderWidth: "0.01px", // Thickness
          }}
        />
        <Typography
          sx={{
            fontSize: "0.8rem",
          }}
        >
          <FavoriteIcon sx={{ fontSize: "0.8rem" }} /> {favorites}
        </Typography>
      </Box>
      <Box>
        {selectedVariant.onSale ? (
          <Box
            sx={{
              mt: 0.5,
              display: "flex",
            }}
          >
            <Typography>
              <span style={{ fontWeight: 600, fontSize: "1.1rem" }}>
                ${selectedVariant.salePrice}
              </span>{" "}
              <span
                style={{
                  fontWeight: 500,
                  fontSize: "1.1rem",
                  textDecoration: "line-through",
                  color: theme.palette.gray.primary,
                }}
              >
                ${selectedVariant.price}
              </span>{" "}
              get it for $26.60 (5% off) with Auto-Replenish or 4 payments of
              $7.00 with Klarna or afterpay{" "}
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              mt: 0.5,
              display: "flex",
            }}
          >
            <Typography
              sx={{
                color: theme.palette.text.primary,
                fontSize: "0.75rem",
              }}
            >
              <span style={{ fontWeight: 600, fontSize: "1.1rem" }}>
                ${selectedVariant.price}
              </span>{" "}
              get it for{" "}
              <span
                style={{ fontWeight: 600, color: theme.palette.secondary.main }}
              >
                ${(selectedVariant.price * 0.95).toFixed(2)} (5% off)
              </span>{" "}
              with Auto-Replenish <br /> or 4 payments of $
              {(selectedVariant.price / 4).toFixed(2)} with{" "}
              <span style={{ fontWeight: 600 }}>Klarna</span> or{" "}
              <span style={{ fontWeight: 600 }}>Afterpay</span>
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProductDisplayName;
