import React from "react";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material";
import { darken, lighten } from "@mui/material/styles";
import { border, borderRadius } from "@mui/system";

const CustomButton = ({
  label,
  icon,
  onClick,
  padding,
  fontSize,
  textColor,
  backgroundColor,
  backgroundColorHover,
  width,
  borderRadius,
  height,
  margin,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  variant = "contained",
  type,
  borderColor,
  borderWidth,
}) => {
  const theme = useTheme();

  return (
    <Button
      onClick={onClick}
      startIcon={icon}
      sx={{
        padding: padding || "0.5rem 5rem",
        fontSize: fontSize || "1rem",
        fontWeight: "900",
        color: textColor,
        width: width,
        borderRadius: borderRadius,
        height: height,
        margin: margin || "0",
        marginTop: marginTop || "0",
        marginLeft: marginLeft || "0",
        marginBottom: marginBottom || "0",
        marginRight: marginRight || "0",
        borderColor: borderColor,
        borderWidth: borderWidth,
        backgroundColor: backgroundColor || theme.palette.primary.main,
        "&:hover": {
          backgroundColor:
            backgroundColorHover || lighten(theme.palette.primary.main, 0.5),
        },
      }}
      variant={variant}
      type={type}
    >
      {label}
    </Button>
  );
};

export default CustomButton;
