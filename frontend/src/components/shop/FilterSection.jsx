import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  styled,
  Skeleton,
  IconButton,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Message from "../reusable/Message";
import { darken } from "@mui/material/styles";
import DetailedAccordion from "./DetailedAccordion";
import { useTheme } from "@mui/material/styles";
import { useNavigate, useParams, Link } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";

const FilterSection = ({
  data,
  isLoading,
  error,
  handleFilterReset,
  filters,
  setFilters,
  minValue,
  maxValue,
  setMinValue,
  setMaxValue,
  setDrawerOpen,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [loading, setLoading] = useState(false);
  //const [drawerOpen, setDrawerOpen] = useState(false);
  //const [viewMode, setViewMode] = useState("grid");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("newest");

  const pageName = data?.breadcrumbs[data.breadcrumbs.length - 1].title;
  const subcategories = data?.subcategories?.length
    ? [...data.subcategories].sort((a, b) => a.title.localeCompare(b.title))
    : [];
  // console.log(subcategories);

  if (isLoading)
    return (
      <Box sx={{ marginLeft: "1rem" }}>
        <Skeleton variant="text" sx={{ fontSize: "4rem", width: "10rem" }} />
        <Skeleton variant="text" sx={{ fontSize: "1rem", width: "10rem" }} />
        <Skeleton variant="text" sx={{ fontSize: "1rem", width: "10rem" }} />
        <Skeleton variant="text" sx={{ fontSize: "1rem", width: "10rem" }} />
      </Box>
    );

  if (error) {
    return (
      <Message
        severity={"error"}
        children={error?.data?.message || error.error}
      />
    );
  }

  return (
    <Box
      sx={{
        p: 2,
        ...(isMobile && { p: "2rem" }),
        backgroundColor: theme.palette.background.default,
        maxHeight: !isMobile ? "28rem" : "100vh",
        overflowY: "overlay",
        position: "relative",
        //paddingRight: "8px", // Prevents content from hiding behind scrollbar
        "&::-webkit-scrollbar": {
          width: "6px", // Thin scrollbar
          backgroundColor: "#aaa",
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
        width: isMobile ? "100%" : "300px",
      }}
    >
      {isMobile && (
        <IconButton
          sx={{ position: "absolute", right: "5%", top: "2%" }}
          onClick={() => setDrawerOpen(false)}
        >
          <ClearIcon
            sx={{
              stroke: theme.palette.text.primary,
              strokeWidth: 1,
              color: theme.palette.text.primary,
              fontSize: "1.5rem",
              "&:hover": { color: theme.palette.secondary.main },
            }}
          />
        </IconButton>
      )}
      <Box
        sx={{
          width: "100%",
          marginBottom: "1.75rem",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: "500",
            //textAlign: "center",
            //wordBreak: "keep-all",
          }}
        >
          {pageName}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          marginBottom: "1.75rem",
          gap: 1.25,
        }}
      >
        {subcategories.map((category, index) => (
          <Link
            to={`/shop/${category.linkName}`}
            key={category.linkName}
            underline="none"
          >
            <Typography
              sx={{
                fontWeight: 400,
                color: theme.palette.text.primary,
                "&:hover": { color: theme.palette.secondary.medium },
              }}
            >
              {category.title} ({category.productCount})
            </Typography>
          </Link>
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "end",
          mb: 1.2,
        }}
      >
        <Typography variant="h6">Filters</Typography>
        <Button
          variant="outlined"
          onClick={handleFilterReset}
          sx={{
            color: theme.palette.secondary.main,
            borderColor: theme.palette.secondary.main,
            "&:hover": {
              backgroundColor: darken(theme.palette.background.default, 0.1),
            },
          }}
        >
          Reset
        </Button>
      </Box>

      <DetailedAccordion
        filters={filters}
        setFilters={setFilters}
        handleFilterReset={handleFilterReset}
        minValue={minValue}
        maxValue={maxValue}
        setMinValue={setMinValue}
        setMaxValue={setMaxValue}
      />
    </Box>
  );
};

export default FilterSection;
