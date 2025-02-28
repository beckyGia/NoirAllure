import React from "react";
import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const CustomInput = ({
  label,
  placeholder,
  variant = "outlined",
  fullWidth,
  width,
  startIcon = null,
  endIcon = null,
  name,
  type,
  value,
  onChange,
  margin,
  marginB,
  marginT,
  required,
  error = false, // New error prop
  errorText = "", // New errorText prop
  onFocus,
  onBlur,
}) => {
  const theme = useTheme();

  // Define adornments conditionally
  const slotProps = {
    input: {
      startAdornment: startIcon ? (
        <InputAdornment position="start">{startIcon}</InputAdornment>
      ) : null,
      endAdornment: endIcon ? (
        <InputAdornment position="end">{endIcon}</InputAdornment>
      ) : null,
      style: { fontWeight: 500 },
    },
  };

  //   input:-internal-autofill-selected {
  //     appearance: menulist-button;
  //     background-image: none !important;
  //     background-color: light-dark(rgb(232, 240, 254), rgba(70, 90, 126, 0.4)) !important;
  //     color: fieldtext !important;
  // }

  return (
    <TextField
      label={label}
      placeholder={placeholder}
      variant={variant}
      slotProps={slotProps}
      fullWidth={fullWidth}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      onFocus={onFocus}
      onBlur={onBlur}
      error={error}
      helperText={error ? errorText : ""}
      sx={{
        m: margin,
        mb: marginB,
        mt: marginT,
        width: width,
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: theme.palette.text.primary,
          },
          "&:hover fieldset": {
            borderColor: theme.palette.primary.main,
          },
          "&.Mui-focused fieldset": {
            borderColor: theme.palette.primary.main,
          },
        },
        "& .MuiInputLabel-root": {
          color: theme.palette.text.primary,
          fontWeight: 900,
        },
        "&:hover .MuiInputLabel-root": {
          color: theme.palette.primary.main,
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: theme.palette.primary.main,
        },
        "& .css-1ljffdk-MuiFormLabel-asterisk, & .css-mzcsug-MuiFormLabel-asterisk":
          {
            color: "red",
            fontWeight: 900,
            display: required ? "inline" : "none",
          },
        "& input:-webkit-autofill": {
          WebkitBoxShadow: `0 0 0px 1000px ${theme.palette.background.default} inset !important`,
          backgroundColor: `${theme.palette.background.default} !important`,
        },
        "& input:-webkit-autofill:hover": {
          backgroundColor: `${theme.palette.background.default} !important`,
        },
        "& input:-webkit-autofill:focus": {
          backgroundColor: `${theme.palette.background.default} !important`,
        },
      }}
    />
  );
};

export default CustomInput;
