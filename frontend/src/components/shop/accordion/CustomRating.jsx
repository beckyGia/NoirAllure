import React from "react";
import {
  FormGroup,
  FormControlLabel,
  Radio,
  Box,
  Rating,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const CustomRating = ({ filters, updateFilter, ratingCounts }) => {
  const theme = useTheme();

  return (
    <FormGroup>
      {[4, 3, 2, 1].map((rating) => (
        <FormControlLabel
          key={rating}
          control={
            <Radio
              checked={filters.rating === rating}
              onChange={() => updateFilter("rating", rating)}
              sx={{
                color: "inherit",
                "&.Mui-checked": {
                  color: theme.palette.text.primary,
                },
              }}
            />
          }
          label={
            <Box display="flex" alignItems="center" gap={1}>
              <Rating
                value={rating}
                readOnly
                sx={{
                  fontSize: "1.2rem",
                  "& .MuiRating-iconFilled": {
                    color: theme.palette.secondary.main, // Custom star color
                  },
                }}
              />
              <Typography
                sx={{
                  fontSize: "0.85rem",
                  fontWeight: filters.rating === rating ? "bold" : 400,
                }}
              >
                {rating} & up ({ratingCounts?.[rating] ?? 0})
              </Typography>
            </Box>
          }
        />
      ))}
    </FormGroup>
  );
};

export default CustomRating;
