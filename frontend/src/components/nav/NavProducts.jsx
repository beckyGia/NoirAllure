import React, { useState, useRef } from "react";
import { Box, useTheme, Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShopPopper from "../home/ShopPopper";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link } from "react-router-dom";
import { alpha } from "@mui/material/styles";
import { useGetPrimaryCategoriesQuery } from "../../slices/categoryApiSlice";

const NavProducts = ({
  anchorRefOutside,
  setPopperOpenOutside,
  popperOpenOutside,
  handleOpen,
  handleClose,
  isDrawer,
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
      <Button
        ref={anchorRefOutside}
        variant="text"
        color={theme.palette.text.primary}
        onClick={() => setPopperOpenOutside(!popperOpenOutside)}
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        sx={{
          cursor: "pointer",
          fontSize: "0.9rem",
          fontWeight: "700",
          backgroundColor: "inherit",
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        }}
      >
        Shop <KeyboardArrowDownIcon />
      </Button>
      {!isDrawer && (
        <ShopPopper
          anchorRef={anchorRefOutside}
          setOpen={setPopperOpenOutside}
          open={popperOpenOutside}
          handleOpen={handleOpen}
          handleClose={handleClose}
          isDrawer={isDrawer}
        />
      )}
      <Button
        variant="text"
        color={theme.palette.text.primary}
        component={Link}
        to="/new"
        sx={{
          fontSize: "0.9rem",
          fontWeight: "700",
          backgroundColor: "inherit",
          "&:hover": {
            backgroundColor: alpha(theme.palette.text.primary, 0.2),
          },
        }}
      >
        New
      </Button>
      <Button
        variant="text"
        component={Link}
        to="/brands"
        color={theme.palette.text.primary}
        sx={{
          fontSize: "0.9rem",
          fontWeight: "700",
          backgroundColor: "inherit",
          "&:hover": {
            backgroundColor: alpha(theme.palette.text.primary, 0.2),
          },
        }}
      >
        Brands
      </Button>
      <Button
        variant="text"
        component={Link}
        to="/sale"
        color={theme.palette.text.primary}
        sx={{
          fontSize: "0.9rem",
          fontWeight: "700",
          backgroundColor: "inherit",
          "&:hover": {
            backgroundColor: alpha(theme.palette.text.primary, 0.2),
          },
        }}
      >
        Sale
      </Button>
    </Box>
  );
};

export default NavProducts;
