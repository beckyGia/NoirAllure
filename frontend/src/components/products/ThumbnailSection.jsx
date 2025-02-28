import React, { useState } from "react";
import { Box } from "@mui/material";
import { useTheme, lighten } from "@mui/material/styles";
import { styled } from "@mui/material";

const ThumbnailImage = styled("img")(({ theme, isSelected }) => ({
  width: "6rem",
  height: "6rem",
  objectFit: "cover",
  borderRadius: "10%",
  cursor: "pointer",
  border: isSelected ? `3px solid ${theme.palette.primary.main}` : "none",
  transition: "all 0.2s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    border: `3px solid ${theme.palette.primary.light}`,
  },
}));

const ThumbnailSection = ({
  imageIcons,
  thumbnailContainerRef,
  selectedImage,
  selectedVariant,
  setSelectedImage,
}) => {
  const theme = useTheme();
  return (
    <Box
      ref={thumbnailContainerRef}
      sx={{
        display: "flex",
        alignContent: { xs: "center", md: "stretch" },
        flexDirection: { xs: "row", md: "column" },
        gap: 1,
        overflowX: { xs: "auto", md: "hidden" },
        overflowY: { xs: "hidden", md: "auto" },
        maxHeight: { xs: "auto", md: "60vh" },
        maxWidth: { xs: "100%", md: "max-content" },
        paddingRight: "1.2rem",
        "&::-webkit-scrollbar": {
          width: "6px",
          backgroundColor: "inherit",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: theme.palette.secondary.medium, // Scrollbar color
          color: theme.palette.secondary.medium, // Scrollbar color
          borderRadius: "6px",
          marginBlock: "4px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: theme.palette.secondary.medium,
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "transparent", // Makes scrollbar track invisible
        },
        scrollbarWidth: "thin",
        scrollbarColor: `${theme.palette.secondary.medium} transparent`,
        borderRadius: "6px",
      }}
    >
      {imageIcons.map((image, index) => (
        <Box key={index} sx={{ flexShrink: 0 }}>
          <ThumbnailImage
            src={image}
            isSelected={selectedImage === index}
            alt={`${selectedVariant.name} view ${index + 1}`}
            onClick={() => setSelectedImage(index)}
            loading="lazy"
          />
        </Box>
      ))}
    </Box>
  );
};

export default ThumbnailSection;
