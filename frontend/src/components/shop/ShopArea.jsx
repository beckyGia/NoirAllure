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
import { lighten, useTheme, darken } from "@mui/material/styles";
import FilterSection from "./FilterSection";
import ProductItem from "../home/ProductItem";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import CustomPagination from "../reusable/CustomPagination";
import ResultsControl from "./ResultsControl";
import { useGetCategoryHierarchyAndSubcategoriesQuery } from "../../slices/categoryApiSlice";
import {
  //useGetProductsByCategoryQuery,
  useGetFilteredProductsByCategoryQuery,
} from "../../slices/productsApiSlice";
import { useNavigate, useParams, Link } from "react-router-dom";

const ShopArea = () => {
  const theme = useTheme();
  const { linkName } = useParams();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [filters, setFilters] = useState({
    price: null,
    rating: null,
    sale: null,
    shipping: null,
    delivery: null,
    sortBy: "relevance",
    new: null,
    brands: [], // Reset brands array
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const { data, isLoading, error } =
    useGetCategoryHierarchyAndSubcategoriesQuery(linkName);

  // console.log("filters:", filters);
  const {
    data: productData,
    isLoading: loadingProducts,
    error: errorProducts,
  } = useGetFilteredProductsByCategoryQuery({
    linkName: linkName,
    filters: filters,
    pageNumber: currentPage,
  });

  console.log(productData);

  const itemsPerPage = productData?.itemsPerPage;

  // Handle Pagination Change
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleFilterReset = () => {
    console.log("Filters reset!");
    setFilters({
      price: null,
      rating: null,
      sale: null,
      shipping: null,
      delivery: null,
      sortBy: "relevance",
      new: null,
      brands: [], // Reset brands array
    });

    setMinValue("");
    setMaxValue("");
  };

  const handleSortChange = (filterKey, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: value,
    }));
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        marginTop: "2.5rem",
      }}
    >
      {isMobile ? (
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          sx={{
            "& .MuiPaper-root": {
              backgroundColor: theme.palette.background.default,
            },
          }}
        >
          <FilterSection
            data={data}
            isLoading={isLoading}
            error={error}
            setDrawerOpen={setDrawerOpen}
            handleFilterReset={handleFilterReset}
            filters={filters}
            setFilters={setFilters}
            minValue={minValue}
            maxValue={maxValue}
            setMinValue={setMinValue}
            setMaxValue={setMaxValue}
          />
        </Drawer>
      ) : (
        <Box
          sx={{
            width: "300px",
            borderColor: "divider",
          }}
        >
          <FilterSection
            data={data}
            isLoading={isLoading}
            error={error}
            handleFilterReset={handleFilterReset}
            filters={filters}
            setFilters={setFilters}
            minValue={minValue}
            maxValue={maxValue}
            setMinValue={setMinValue}
            setMaxValue={setMaxValue}
          />
        </Box>
      )}

      <Box sx={{ flexGrow: 1 }}>
        {isMobile && (
          <IconButton
            sx={{
              position: "fixed",
              bottom: 16,
              right: 16,
              zIndex: 1000,
            }}
            onClick={() => setDrawerOpen(true)}
          >
            <FilterAltIcon
              sx={{
                fontSize: "2rem",
                color: "black",
              }}
            />
          </IconButton>
        )}

        <ResultsControl
          viewMode={viewMode}
          setViewMode={setViewMode}
          filters={filters}
          handleSortChange={handleSortChange}
          productData={productData}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          loadingProducts={loadingProducts}
        />
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ p: 2 }}>
            {viewMode === "grid" ? (
              <Grid container spacing={4}>
                {productData?.products.map((product, id) => (
                  <Grid
                    key={product._id}
                    size={{ xs: 12, sm: 12, md: 6, lg: 4 }}
                  >
                    <ProductItem
                      product={product}
                      bgcolor={"inherit"}
                      isShop={true}
                      isShopLine={false}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box
                sx={{
                  marginBottom: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {productData?.products.map((product, id) => (
                  <ProductItem
                    product={product}
                    bgcolor={"inherit"}
                    isShopLine={true}
                    isShop={true}
                    key={product._id}
                  />
                ))}
              </Box>
            )}
            <Box
              sx={{
                mt: 2,
                mb: 4,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CustomPagination
                productData={productData}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
              />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ShopArea;
