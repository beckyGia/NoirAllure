import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchArea from "../components/search/SearchArea";
import { Box, Typography } from "@mui/material";
import ProductItem from "../components/home/ProductItem";
import CustomPagination from "../components/reusable/CustomPagination";

const SearchScreen = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("query") || "";
  const [currentPage, setCurrentPage] = useState(1);

  // Handle Pagination Change
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  // const {
  //   data: searchResults,
  //   isLoading,
  //   isError,
  // } = useSearchProductsQuery(
  //   { keyword: searchTerm, pageNumber: 1 },
  //   { skip: !searchTerm }
  // );

  // console.log(searchResults);

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        variant="h2"
        sx={{
          fontWeight: "500",
        }}
      >
        Search Results
      </Typography>

      <SearchArea />
    </Box>
  );
};

export default SearchScreen;
