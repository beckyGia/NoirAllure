import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Slider,
  Rating,
  TextField,
  Button,
  Chip,
  Select,
  MenuItem,
  Skeleton,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  InputLabel,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  RadioGroup,
  Radio,
  FormGroup,
  Drawer,
  Pagination,
  PaginationItem,
  CircularProgress,
  useMediaQuery,
  styled,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import CustomMenuItem from "./ResultsControl";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { lighten, useTheme, darken } from "@mui/material/styles";
import FilterSection from "./FilterSection";
import ProductItem from "../home/ProductItem";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";

const StyledMenuItem = styled(MenuItem)(({ theme, isSelected }) => ({
  fontWeight: 500,
  color: isSelected ? "white" : "inherit",
  "&.Mui-selected": {
    backgroundColor: `${theme.palette.secondary.medium} !important`, // Selected color
    color: "white", // Ensures visibility
    fontWeight: 700,
  },
  "&:hover": {
    backgroundColor: `${theme.palette.accent.main} !important`, // Hover color
    color: theme.palette.text.default,
  },
}));

const ResultsControl = ({
  viewMode,
  setViewMode,
  filters,
  handleSortChange,
  productData,
  itemsPerPage,
  currentPage,
  loadingProducts,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        alignItems: "start",
        justifyContent: "space-between",
      }}
    >
      {loadingProducts || !itemsPerPage ? (
        <Skeleton variant="text" sx={{ fontSize: "1rem", width: "10rem" }} />
      ) : (
        <Typography>
          Showing{" "}
          {Math.min(
            (currentPage - 1) * itemsPerPage + 1,
            productData?.totalProducts
          )}
          -{Math.min(currentPage * itemsPerPage, productData?.totalProducts)} of{" "}
          {productData?.totalProducts}{" "}
          {productData?.totalProducts > 1 ? "Products" : "Product"}
        </Typography>
      )}

      <Box sx={{ display: "flex", gap: 2 }}>
        <FormControl size="small">
          <InputLabel
            sx={{
              color: theme.palette.text.primary,
              fontWeight: 700,
              fontSize: "0.9rem",
              "&:hover": {
                color: theme.palette.primary.main, // Hover border color
              },
              "&.Mui-focused": {
                color: theme.palette.secondary.main, // Focus border color
              },
            }}
          >
            Sort By
          </InputLabel>
          <Select
            value={filters.sortBy}
            onChange={(e) => {
              console.log(e.target.value);
              //setSortBy(e.target.value);
              handleSortChange("sortBy", e.target.value);
            }}
            label="Sort By"
            displayEmpty
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: theme.palette.background.default, // Change dropdown menu color
                  color: theme.palette.text.primary, // Text color inside dropdown
                },
              },
              MenuListProps: {
                sx: {
                  backgroundColor: theme.palette.background.default,
                  "& :hover": {
                    backgroundColor: theme.palette.primary.main,
                  },
                },
              },
            }}
            sx={{
              backgroundColor: theme.palette.background.default,
              borderRadius: "8px", // Rounded corners
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.text.primary, // Border color
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.primary.main, // Hover border color
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.secondary.primary, // Focus border color
              },
            }}
          >
            <StyledMenuItem value={"relevance"}>
              Relevance (default)
            </StyledMenuItem>
            <StyledMenuItem value={"bestselling"}>Bestselling</StyledMenuItem>
            <StyledMenuItem value={"top-rated"}>Top Rated</StyledMenuItem>
            <StyledMenuItem value={"price_high"}>
              Price High to Low
            </StyledMenuItem>
            <StyledMenuItem value={"price_low"}>
              Price Low to High
            </StyledMenuItem>
            <StyledMenuItem value={"newest"}>New</StyledMenuItem>
          </Select>
        </FormControl>

        <IconButton
          onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
        >
          {viewMode === "grid" ? <ViewListIcon /> : <GridViewIcon />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default ResultsControl;
