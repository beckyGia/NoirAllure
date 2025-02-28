import React from "react";
import { Badge, useTheme } from "@mui/material";

const CustomBadge = ({ count }) => {
  const theme = useTheme();

  return (
    <Badge
      badgeContent={count}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      sx={{
        "& .MuiBadge-badge": {
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.text.contrast,
          top: "-0.55rem",
          right: "0.1rem",
          fontWeight: 800,
        },
      }}
    />
  );
};

export default CustomBadge;
