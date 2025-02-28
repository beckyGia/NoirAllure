import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { skipToken } from "@reduxjs/toolkit/query";
import { Collapse, Box, IconButton, InputAdornment } from "@mui/material";
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

const StyledListbox = styled("ul")(({ theme }) => ({
  backgroundColor: lighten(theme.palette.primary.main, 0.4),
  padding: "0.1rem 0.7rem",
  cursor: "pointer",
  "& .MuiAutocomplete-option": {
    padding: "0.5rem",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      fontWeight: 600,
    },
  },
}));

const CustomInput = React.forwardRef(({ isLoading, theme, ...props }, ref) => (
  <TextField
    {...props}
    inputRef={ref}
    placeholder="Search..."
    variant="outlined"
    slotProps={{
      input: {
        ...props.InputProps,
        endAdornment: (
          <>
            {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
            {props.InputProps?.endAdornment}
          </>
        ),
      },
    }}
    sx={{
      color: theme.palette.text.primary,
      //width: "30rem",
      width: "100%",
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: theme.palette.primary.main,
          color: "black",
        },
        "&:hover fieldset": {
          borderColor: theme.palette.primary.main,
        },
      },
    }}
  />
));

const NavSearchInput = ({
  options,
  searchTerm,
  setSearchTerm,
  isLoading,
  handleSearch,
  handleSearchClose,
  handleInputChange,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        width: "100%",
        position: "relative",
      }}
    >
      <CloseIcon
        onClick={handleSearchClose}
        sx={{
          position: "absolute",
          top: -15,
          right: { xs: -15, sm: 15 },
          cursor: "pointer",
          "&:hover": {
            color: theme.palette.secondary.main,
          },
        }}
      />
      <Autocomplete
        //freeSolo
        value={searchTerm}
        disableClearable
        autoComplete
        includeInputInList
        clearIcon={<CloseIcon size={20} />}
        options={options}
        getOptionLabel={(option) => String(option)}
        onChange={(event, newValue) => setSearchTerm(newValue)}
        onInputChange={handleInputChange}
        loading={isLoading}
        sx={{
          width: "30rem",
          // "& .MuiAutocomplete-clearIndicator": {
          //   display: "none",
          //   visibility: "hidden",
          // },
          "& .MuiAutocomplete-hasPopupIcon": {
            display: "none",
            visibility: "hidden",
          },
          "& .MuiIconButton-root": {
            display: "none",
            visibility: "hidden",
          },
          "& .MuiAutocomplete-endAdornment": {
            display: "none",
            visibility: "hidden",
          },
          backgroundColor: lighten(theme.palette.primary.main, 0.6),
          borderColor: theme.palette.primary.main,
          borderRadius: "0.6rem",
        }}
        renderInput={(params) => (
          <CustomInput {...params} isLoading={isLoading} theme={theme} />
        )}
        slots={{
          paper: (props) => (
            <Paper
              {...props}
              sx={{
                backgroundColor: lighten(theme.palette.primary.main, 0.4),
                //padding: 2,
              }}
            />
          ),
          listbox: StyledListbox,
          // popper: (props) => <Popper {...props} sx={{ zIndex: 1300 }} />,
        }}
        noOptionsText="No results found"
        filterOptions={(x) => x}
        aria-label="Search autocomplete"
      />
      <IconButton onClick={handleSearch}>
        <SearchIcon
          sx={{
            color: theme.palette.text.primary,
            fontSize: "2rem",
            "&:hover": {
              color: theme.palette.secondary.main,
            },
          }}
        />
      </IconButton>
    </Box>
  );
};

export default NavSearchInput;
