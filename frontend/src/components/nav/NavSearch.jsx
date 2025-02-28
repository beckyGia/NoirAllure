import React from "react";
import { Box, useTheme } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Typography from "@mui/material/Typography";

const SearchContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0.5, 1),
  backgroundColor: theme.palette.gray.main,
  "&:hover": {
    backgroundColor: alpha(theme.palette.gray.main, 0.85),
  },
  borderRadius: "1rem",
  width: "100%",
  position: "relative",
  boxShadow: theme.shadows[1],
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  color: theme.palette.text.primary,
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.primary,
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create(["width"], {
      duration: theme.transitions.duration.short,
    }),
    [theme.breakpoints.up("xs")]: {
      width: "8ch", // Default for extra small screens
      "&:focus": {
        width: "12ch",
      },
    },
    [theme.breakpoints.up("sm")]: {
      width: "14ch", // Default for small screens and above
      "&:focus": {
        width: "20ch",
      },
    },
    [theme.breakpoints.up("md")]: {
      width: "18ch", // Wider default for medium screens
      "&:focus": {
        width: "24ch",
      },
    },
    [theme.breakpoints.up("lg")]: {
      width: "22ch", // Wider default for medium screens
      "&:focus": {
        width: "30ch",
      },
    },
  },
}));

const NavSearch = () => {
  const theme = useTheme();
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        width: { xs: "30%", sm: "30%", md: "40%" },
        color: theme.palette.text.contrast,
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="flex-end">
        <SearchContainer>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </SearchContainer>
      </Box>
    </Box>
  );
};

export default NavSearch;
