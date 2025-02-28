import React from "react";
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import { useTheme, lighten } from "@mui/material/styles";
import { darken } from "@mui/material/styles";

const CustomCheckbox = ({
  productDataCounts,
  filterName,
  filters,
  toggleFilter,
}) => {
  const theme = useTheme();

  return (
    <FormGroup>
      {(productDataCounts ?? []).map((count) => (
        <FormControlLabel
          key={count}
          control={
            <Checkbox
              checked={filters === true}
              onChange={toggleFilter}
              disabled={count === 0}
              sx={{
                color: "inherit",
                "&.Mui-checked": {
                  color: theme.palette.text.primary,
                },
                "&.Mui-disabled": {
                  color: lighten(theme.palette.gray.primary, 0.4),
                },
              }}
            />
          }
          label={
            <Typography
              sx={{
                fontSize: "0.85rem",
                fontWeight: filters === true ? "bold" : 400,
                color:
                  count === 0
                    ? lighten(theme.palette.gray.primary, 0.1)
                    : "inherit",
              }}
            >
              {filterName} ({count})
            </Typography>
          }
        />
      ))}
    </FormGroup>
  );
};

export default CustomCheckbox;
