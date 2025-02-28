import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { skipToken } from "@reduxjs/toolkit/query";
import {
  Collapse,
  Box,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import Popper from "@mui/material/Popper";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import { lighten } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useSearchProductsQuery } from "../../slices/searchApiSlice";
import debounce from "lodash.debounce";
import NavSearchInput from "./NavSearchInput";

const NavSearchDropdown = ({
  searchOpen,
  searchTerm,
  setSearchTerm,
  handleSearchClose,
  handleSearch,
  searchResults,
  isLoading,
  isError,
}) => {
  const theme = useTheme();
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (searchResults && searchResults.products) {
      setOptions(searchResults.products.map((product) => product.name)); // Adjust according to API response
    }
  }, [searchResults]);

  // **🔹 Debounced input handler to prevent excessive API calls**
  const handleInputChange = debounce((_, newInputValue) => {
    setSearchTerm(newInputValue);
  }, 300);

  return (
    <Collapse
      in={searchOpen}
      timeout={100}
      sx={{ backgroundColor: theme.palette.primary.main, padding: "1.2rem" }}
    >
      {isError && (
        <Typography color="error" sx={{ textAlign: "center", marginBottom: 2 }}>
          Something went wrong. Please try again.
        </Typography>
      )}
      <NavSearchInput
        options={options}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isLoading={isLoading}
        handleSearch={handleSearch}
        handleSearchClose={handleSearchClose}
        handleInputChange={handleInputChange}
      />
    </Collapse>
  );
};

export default NavSearchDropdown;
