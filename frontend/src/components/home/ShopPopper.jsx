import React, { useState, useRef } from "react";
import { Box, useTheme, Button, useMediaQuery } from "@mui/material";
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
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { alpha } from "@mui/material/styles";
import { useGetPrimaryCategoriesQuery } from "../../slices/categoryApiSlice";

const ShopPopper = ({
  anchorRef,
  setOpen,
  open,
  handleOpen,
  handleClose,
  isDrawer,
  handleDrawerClose,
}) => {
  const theme = useTheme();
  const { data: categories, isLoading, error } = useGetPrimaryCategoriesQuery();
  const isExtraSmall = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <Popper
      open={open}
      anchorEl={anchorRef.current}
      role={isDrawer ? "" : undefined}
      placement={isDrawer ? "left" : "bottom"}
      transition
      disablePortal={isDrawer ? false : true}
      modifiers={
        isDrawer && isExtraSmall
          ? [
              {
                name: "preventOverflow",
                options: {
                  boundary: "window",
                },
              },
              {
                name: "offset",
                options: {
                  offset: [-10, -80], // Moves popper left of button
                },
              },
            ]
          : isDrawer
          ? [
              {
                name: "preventOverflow",
                options: {
                  boundary: "window",
                },
              },
              {
                name: "offset",
                options: {
                  offset: [-10, 8], // Moves popper left of button
                },
              },
            ]
          : [
              {
                name: "offset",
                options: {
                  offset: [0, 8], // Space between button and menu
                },
              },
            ]
      }
      sx={{
        zIndex: isDrawer ? 2000 : "",
      }}
    >
      {({ TransitionProps }) => (
        <Grow {...TransitionProps}>
          <Paper
            onMouseEnter={isDrawer ? undefined : handleOpen}
            onMouseLeave={isDrawer ? undefined : handleClose}
            sx={{
              position: "relative",
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1,
              backgroundColor: theme.palette.background.default,
              padding: "10px",
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: isDrawer ? "50%" : 0,
                right: isDrawer ? "-5px" : "50%",
                width: 10,
                height: 10,
                bgcolor: theme.palette.background.default,
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            }}
          >
            <MenuList autoFocusItem={open} id="composition-menu">
              {categories?.map((category) => (
                <MenuItem
                  key={category._id}
                  sx={{ padding: "1rem 2rem" }}
                  onClick={() => setOpen(false)}
                >
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      fontWeight: 500,
                      "&:hover": {
                        textDecoration: "underline",
                        color: theme.palette.secondary.main,
                      },
                    }}
                    component={Link}
                    to={`/shop/${category.linkName}`}
                    onClick={isDrawer ? handleDrawerClose : ""}
                  >
                    {category.title}
                  </Typography>
                </MenuItem>
              ))}
            </MenuList>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};

export default ShopPopper;
