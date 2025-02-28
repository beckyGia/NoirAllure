import React, { useState, useRef } from "react";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Collapse, Box, IconButton } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { lighten, alpha } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import NavLogo from "./NavLogo";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import NavSearch from "./NavSearch";
import NavProducts from "./NavProducts";
import NavMenu from "./NavMenu";
import { useMediaQuery } from "@mui/material";
import NavSearchDropdown from "./NavSearchDropdown";
import { useSearchProductsQuery } from "../../slices/searchApiSlice";

export default function Navbar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const anchorRefOutside = useRef(null); // For button outside the drawer
  const [popperOpenOutside, setPopperOpenOutside] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [smallSearchOpen, setSmallSearchOpen] = useState(false);
  const [drawerNavMenuOpen, setDrawerNavMenuOpen] = useState(false);
  const [shopMenuDropdown, setShopMenuDropdown] = useState(false);

  let timeout;
  const [searchTerm, setSearchTerm] = useState("");

  // **🔹 Fetch products based on searchTerm**
  const {
    data: searchResults,
    isLoading: searchLoading,
    isError: searchError,
  } = useSearchProductsQuery(
    { keyword: searchTerm, pageNumber: 1 },
    { skip: searchTerm.length < 2 } // Avoid unnecessary API calls for very short input
  );

  // Nav Drawer & Shop Menu Dropdown
  const toggleShopMenuDropdown = () => {
    setShopMenuDropdown((prev) => !prev);
  };

  const closeNavMenuOpenAndDrawer = () => {
    setShopMenuDropdown(false);
    setDrawerNavMenuOpen(false);
  };

  const handleNavDrawerOpen = () => {
    setDrawerNavMenuOpen(true);
  };

  const handleNavDrawerClose = () => {
    setDrawerNavMenuOpen(false);
    setShopMenuDropdown(false);
    document.activeElement?.blur(); // Remove focus
  };

  // Shop Menu Popper In Medium plus Screens
  const handlePopperOpen = () => {
    clearTimeout(timeout);
    setPopperOpenOutside(true);
  };

  const handlePopperClose = () => {
    timeout = setTimeout(() => {
      setPopperOpenOutside(false);
    }, 200);
  };

  // Handle Search In Menu And Drawer
  const toggleSearchOpen = () => {
    setSearchOpen((prev) => !prev);
  };
  const handleSearchClose = () => {
    setSearchOpen(false);
  };
  const handleSmallSearchOpen = () => {
    setSmallSearchOpen(true);
  };
  const handleSmallSearchClose = () => {
    setSmallSearchOpen(false);
  };
  const handleSearch = () => {
    if (searchError) {
      alert("An error occurred while searching. Please try again.");
      return;
    }

    if (searchTerm.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
      setSearchOpen(false);
      setSmallSearchOpen(false);
      setDrawerNavMenuOpen(false);
    }
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: theme.palette.primary.main,
          height: "5rem",
          width: "100%",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: "5rem",
          }}
        >
          {/* Logo Section */}
          <NavLogo />

          {/* Search Section */}
          {/* <NavSearch /> */}
          <NavProducts
            anchorRefOutside={anchorRefOutside}
            popperOpenOutside={popperOpenOutside}
            setPopperOpenOutside={setPopperOpenOutside}
            handleOpen={handlePopperOpen}
            handleClose={handlePopperClose}
            isDrawer={false}
          />

          {/* Menu Section */}
          <NavMenu
            searchOpen={searchOpen}
            setSearchOpen={setSearchOpen}
            toggleSearchOpen={toggleSearchOpen}
            drawerNavMenuOpen={drawerNavMenuOpen}
            shopMenuDropdown={shopMenuDropdown}
            handleNavDrawerClose={handleNavDrawerClose}
            toggleShopMenuDropdown={toggleShopMenuDropdown}
            handleNavDrawerOpen={handleNavDrawerOpen}
            closeNavMenuOpenAndDrawer={closeNavMenuOpenAndDrawer}
            handleSmallSearchModalOpen={handleSmallSearchOpen}
            handleSmallSearchModalClose={handleSmallSearchClose}
            smallSearchModalOpen={smallSearchOpen}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearch={handleSearch}
            searchResults={searchResults}
            searchLoading={searchLoading}
            searchError={searchError}
          />
        </Toolbar>
      </AppBar>
      {/* Slide down effect */}
      <NavSearchDropdown
        searchOpen={searchOpen}
        searchTerm={searchTerm}
        handleSearchClose={handleSearchClose}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
        searchResults={searchResults}
        isLoading={searchLoading}
        isError={searchError}
      />
      {/* <Collapse
        in={searchOpen}
        timeout={300}
        sx={{ backgroundColor: theme.palette.primary.main, padding: "1.2rem" }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            width: "100%",
          }}
        >
          <Autocomplete
            freeSolo
            value={searchTerm}
            disableClearable
            options={options}
            clearIcon={<CloseIcon sx={{ color: "red", fontSize: "1.5rem" }} />}
            getOptionLabel={(option) => String(option)}
            onChange={(event, newValue) => setSearchTerm(newValue)}
            onInputChange={(event, newInputValue) =>
              setSearchTerm(newInputValue)
            }
            sx={{
              width: "30rem",
              "& .MuiAutocomplete-clearIndicator": {
                display: "none",
                visibility: "hidden",
              },
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
              <TextField
                {...params}
                //label="Search"
                placeholder="Search...."
                variant="outlined"
                slotProps={{
                  input: {
                    ...params.InputProps,
                    type: "search",
                  },
                }}
                sx={{
                  color: theme.palette.text.primary,
                  width: "30rem",
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
            )}
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
      </Collapse> */}
    </>
  );
}
