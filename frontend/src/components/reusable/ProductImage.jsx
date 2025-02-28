import React, { useState } from "react";
import { Button, Box, Typography, IconButton, useTheme } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { FavoriteBorder, Visibility } from "@mui/icons-material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import ProductModal from "./ProductModal";
import HomeProductImage from "../home/HomeProductImage";
import CustomTooltip from "./CustomTooltip";
import ProductCustomIconBtn from "./ProductCustomIconBtn";
import ProductCustomWishIconBtn from "./ProductCustomWishIconBtn";
import ProductCustomBtn from "./ProductCustomBtn";

const CategoryCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== "isShopLine",
})(({ theme, height, bgcolor, isShopLine }) => ({
  position: "relative",
  width: "100%", // Flexible width
  aspectRatio: "4 / 4", // Maintains aspect ratio (adjust as needed)
  //maxWidth: 216, // Optional: Set a maximum width for larger screens
  boxShadow: "none",
  //width: 282,
  height: height || "auto",
  cursor: "pointer",
  overflow: "hidden",
  background: isShopLine ? "none" : bgcolor || "none",
  //borderRadius: "2rem 0 0 2rem",
  // [theme.breakpoints.up("sm")]: {
  //   height: "auto", // Allow height to adapt to aspect ratio
  // },
  // [theme.breakpoints.up("md")]: {
  //   height: "auto", // Allow height to adapt to aspect ratio
  // },
  "&:hover img": {
    transform: "scale(1.1)",
  },
}));

const ProductImage = ({ product, height, bgcolor, isShop, isShopLine }) => {
  const theme = useTheme();
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [openProductModal, setOpenProductModal] = useState(false);

  const { _id, name, discount, price, tags, status } = product || {};
  const image = product?.variants?.[0]?.imageUrls?.[0];

  const handleProductModalOpen = () => {
    console.log("hello");
    setOpenProductModal(true);
  };
  const handleProductModalClose = () => {
    setOpenProductModal(false);
  };

  return (
    <CategoryCard height={height} bgcolor={bgcolor} isShopLine={isShopLine}>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          position: "relative",
          overflow: "hidden", // Ensures no content goes outside bounds
          "&:hover .hover-content": {
            opacity: 1,
            transform: "translateY(0) translateX(0)",
          },
          "&:hover .hover-content-btn": {
            opacity: 1,
            transform: "translateY(0)",
          },
          zIndex: 1,
          borderRadius: isShopLine ? "" : "2rem",
        }}
      >
        <HomeProductImage name={name} image={image} isShopLine={isShopLine} />
        {/* IconButtons Column */}
        <Box
          className="hover-content"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            position: "absolute",
            top: isShop ? "25%" : "10%",
            left: isShop ? 0 : "auto",
            right: isShop ? "auto" : 0,
            bottom: "auto",
            zIndex: 1,
            //visibility: "hidden",
            opacity: 0,
            transform: isShop ? "translateX(-20px)" : "translateX(20px)", // Offset for animation
            transition: "opacity 0.3s ease, transform 0.3s ease",
            padding: 2,
          }}
        >
          {!isShopLine && (
            <CustomTooltip
              title={"Add to Cart"}
              disabled={status === "out-of-stock"}
              placement={isShop ? "right" : "left"}
            >
              <ProductCustomIconBtn status={status} isShop={isShop}>
                <ShoppingCartOutlinedIcon />
              </ProductCustomIconBtn>
            </CustomTooltip>
          )}

          <CustomTooltip
            title="Quick Look"
            disabled={status === "out-of-stock"}
            placement={isShop ? "right" : "left"}
          >
            <ProductCustomIconBtn
              status={status}
              isShop={isShop}
              onClick={handleProductModalOpen}
            >
              <Visibility />
            </ProductCustomIconBtn>
          </CustomTooltip>

          <ProductModal
            open={openProductModal}
            handleClose={handleProductModalClose}
            product={product}
          />

          <CustomTooltip
            title="Add To WishList"
            disabled={status === "out-of-stock"}
            placement={isShop ? "right" : "left"}
          >
            <ProductCustomWishIconBtn status={status} isShop={isShop}>
              <FavoriteBorder />
            </ProductCustomWishIconBtn>
          </CustomTooltip>
        </Box>

        {/* STATUS */}
        {status === "out-of-stock" && (
          <Box
            sx={{
              position: "absolute",
              top: 14,
              left: 16,
              bgcolor: theme.palette.accent.main,
              padding: 1,
              borderRadius: "2rem",
            }}
          >
            <Typography
              variant="body2"
              color={theme.palette.text.primary}
              fontWeight={700}
            >
              Out of Stock
            </Typography>
          </Box>
        )}

        {/* Button at the Bottom */}
        <Box
          sx={{
            textAlign: "center",
            width: "100%",
            display: "flex", // Ensures proper flex layout
            flexDirection: "column",
            gap: 1,
            position: "relative", // Ensures the absolute button is positioned within this container
            zIndex: 2,
          }}
        >
          {!isShop &&
            !isShopLine &&
            (isAddedToCart ? (
              <Link>
                <ProductCustomBtn>View Cart</ProductCustomBtn>
              </Link>
            ) : (
              <ProductCustomBtn disabled={status === "out-of-stock"}>
                Add to Cart
              </ProductCustomBtn>
            ))}
        </Box>
      </Box>
    </CategoryCard>
  );
};

export default ProductImage;
