import React from "react";
import { Link } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import { Height } from "@mui/icons-material";
import { height } from "@mui/system";

const HomeProductImage = ({ name, image, isShopLine }) => {
  return (
    <Link>
      <CardMedia
        component="img"
        alt={name}
        src={image}
        loading="lazy"
        sx={{
          objectFit: "cover",
          //aspectRatio: "7/9",
          ...(isShopLine && { height: "100%", width: "100%" }),
          //height: isShopLine ? "70%" : "",
          //width: isShopLine ? "100%" : "",
          transition: "transform 0.3s",
        }}
      />
    </Link>
  );
};

export default HomeProductImage;
