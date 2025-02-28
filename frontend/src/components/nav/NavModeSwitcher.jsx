import React, { useContext } from "react";
import { IconButton, useTheme } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { ColorModeContext, useMode } from "../../theme"; // Import the context
import { TopicOutlined } from "@mui/icons-material";

const NavModeSwitcher = ({
  top,
  right = "0",
  color,
  fontSize = "1.8rem",
  backgroundColor,
  stroke,
}) => {
  const theme = useTheme();
  const { toggleColorMode } = useContext(ColorModeContext); // Access toggle function

  return (
    <IconButton
      onClick={toggleColorMode}
      sx={{ position: "absolute", right: right, top: top }}
    >
      {theme.palette.mode === "light" ? (
        <DarkModeIcon
          sx={{
            fontSize: fontSize,
            color: color || theme.palette.text.primary,
            backgroundColor: backgroundColor,
            stroke: stroke,
          }}
        />
      ) : (
        <LightModeIcon
          sx={{
            fontSize: fontSize,
            color: color || theme.palette.text.primary,
            backgroundColor: backgroundColor,
            stroke: stroke,
          }}
        />
      )}
    </IconButton>
  );
};

export default NavModeSwitcher;
