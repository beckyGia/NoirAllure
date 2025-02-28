import React, { useState } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import ProductInfo from "../reusable/ProductInfo";
import ProductImage from "../reusable/ProductImage";
import ProductInfoLine from "../reusable/ProductInfoLine";

//import { add_cart_product, add_to_wishlist } from "../redux/actions"; // Adjust imports based on your folder structure

const ProductItem = ({
  product,
  productInfoColor,
  height,
  bgcolor,
  isShop,
  isShopLine,
}) => {
  const theme = useTheme();
  // const { _id, image, name, discount, price, tags, status } = product || {};
  // const { cart_products } = useSelector((state) => state.cart);
  // const { wishlist } = useSelector((state) => state.wishlist);
  // const isAddedToCart = cart_products.some((prd) => prd._id === _id);
  const isMedium = useMediaQuery(theme.breakpoints.up("md"));
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  //const dispatch = useDispatch();

  // // handle add product
  // const handleAddProduct = (prd) => {
  //   dispatch(add_cart_product(prd));
  // };
  //console.log("isShopLine:", isShopLine);

  // // handle wishlist product
  // const handleWishlistProduct = (prd) => {
  //   dispatch(add_to_wishlist(prd));
  // };

  return (
    <Card
      sx={{
        width: isShopLine ? "95%" : "100%", // Takes the width of the parent container
        height: "auto", // Maintains aspect ratio based on content
        backgroundImage: "none",
        boxShadow: "none",
        marginBottom: "3rem",
        display: isShopLine && isMedium ? "flex" : "",
        //borderRadius: "2rem",
        //padding: "1rem",
        //padding: "1rem",
        backgroundColor: isShopLine
          ? theme.palette.background.main
          : theme.palette.background.default,
        //border: "1px solid black",
      }}
    >
      <ProductImage
        product={product}
        height={height}
        bgcolor={bgcolor}
        isShop={isShop}
        isShopLine={isShopLine}
      />
      {isShopLine ? (
        <ProductInfoLine
          product={product}
          productInfoColor={productInfoColor}
          height={height}
        />
      ) : (
        <ProductInfo
          product={product}
          productInfoColor={productInfoColor}
          isShop={isShop}
        />
      )}
    </Card>
  );
};

export default ProductItem;
