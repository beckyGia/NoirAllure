import React, { useState } from "react";
import { Button, Select, MenuItem, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { darken } from "@mui/material/styles";

const AddToBasket = () => {
  const theme = useTheme();
  const [quantity, setQuantity] = useState(1);

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.25 }}>
      {/* Select Dropdown for Quantity */}
      <Select
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        disableUnderline
        sx={{
          minWidth: 50,
          height: "3rem",
          textAlign: "center",
          backgroundColor: theme.palette.primary.main,
          borderTopLeftRadius: "2rem",
          borderBottomLeftRadius: "2rem",
          fontWeight: 600,
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Added box shadow
          transition: "background-color 0.2s ease, box-shadow 0.2s ease",
          "& .MuiSelect-select": {
            padding: "0.5rem 1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: theme.palette.text.primary,
          },
          "&:hover": {
            backgroundColor: darken(theme.palette.primary.main, 0.2),
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
          },
          "& .MuiSvgIcon-root": {
            color: theme.palette.text.primary,
          },
        }}
        variant="standard"
      >
        {/* Generate quantity options from 1 to 10 */}
        {[...Array(10).keys()].map((i) => (
          <MenuItem key={i} value={i + 1}>
            {i + 1}
          </MenuItem>
        ))}
      </Select>

      {/* Add to Basket Button */}
      <Button
        variant="contained"
        sx={{
          height: "3rem",
          width: "10rem",
          borderTopRightRadius: "2rem",
          borderBottomRightRadius: "2rem",
          color: theme.palette.text.primary,
          fontWeight: 600,
          padding: "0.5rem 1rem",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Same box shadow
          transition: "background-color 0.2s ease, box-shadow 0.2s ease",
          "&:hover": {
            backgroundColor: darken(theme.palette.primary.main, 0.2),
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
          },
        }}
      >
        Add to Basket
      </Button>
    </Box>
  );
};

export default AddToBasket;
