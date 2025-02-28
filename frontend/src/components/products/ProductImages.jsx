import React, { useRef, useState } from "react";
import { Box, Container, useMediaQuery } from "@mui/material";
import { useTheme, lighten } from "@mui/material/styles";
import ThumbnailSection from "./ThumbnailSection";
import MainProductImageSection from "./MainProductImageSection";

const ProductImages = ({ selectedVariant }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Small screens
  const isMedium = useMediaQuery(theme.breakpoints.up("md")); // Medium screens and up
  const [selectedImage, setSelectedImage] = useState(0);
  const imageIcons = selectedVariant?.imageUrls || [];
  const thumbnailContainerRef = useRef(null);

  // Scroll the selected thumbnail into view
  const scrollThumbnailIntoView = (index) => {
    if (thumbnailContainerRef.current) {
      const thumbnails = thumbnailContainerRef.current.children;
      if (thumbnails[index]) {
        thumbnails[index].scrollIntoView({
          behavior: "smooth",
          block: isMedium ? "start" : "nearest",
          inline: isMobile ? "start" : "nearest",
        });
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignContent: { xs: "center", md: "stretch" },
        flexDirection: { xs: "column-reverse", md: "row" },
        //height: { xs: "auto", md: "60vh" },
        height: { xs: "auto" },
        gap: { xs: 2, md: 2 },
        //flexWrap: "wrap",
      }}
    >
      {/* Thumbnail Section */}
      <ThumbnailSection
        imageIcons={imageIcons}
        thumbnailContainerRef={thumbnailContainerRef}
        selectedImage={selectedImage}
        selectedVariant={selectedVariant}
        setSelectedImage={setSelectedImage}
      />

      {/* Main Product Image Section */}
      <MainProductImageSection
        imageIcons={imageIcons}
        selectedVariant={selectedVariant}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        scrollThumbnailIntoView={scrollThumbnailIntoView}
      />
    </Box>
  );
};

export default ProductImages;
