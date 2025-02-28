import React, { useState, useEffect } from "react";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Slider,
  Rating,
  Button,
  Chip,
  Select,
  MenuItem,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  InputLabel,
  Checkbox,
  FormGroup,
  Drawer,
  Pagination,
  CircularProgress,
  useMediaQuery,
  alpha,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid2";
import { darken } from "@mui/material/styles";
import {
  FiGrid,
  FiList,
  FiFilter,
  FiX,
  FiChevronDown,
  FiSearch,
} from "react-icons/fi";
import { useTheme } from "@mui/material/styles";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useGetCategoryHierarchyAndSubcategoriesQuery } from "../../../slices/categoryApiSlice";
import PropTypes from "prop-types";
import { styled, lighten } from "@mui/material/styles";
import RadioGroup, { useRadioGroup } from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Box from "@mui/material/Box";
import { filledInputClasses } from "@mui/material/FilledInput";
import { inputBaseClasses } from "@mui/material/InputBase";
import TextField from "@mui/material/TextField";
import { NumericFormat } from "react-number-format";

const StyledFormControlLabel = styled(FormControlLabel)(
  ({ theme, checked }) => ({
    width: "auto",
    "& .MuiTypography-root": {
      //color: checked ? theme.palette.primary.main : "inherit", // Change typography color when checked
      fontWeight: checked ? 650 : 400,
    },
    "& .MuiRadio-root": {
      color: checked
        ? theme.palette.primary.main
        : theme.palette.text.secondary, // Change radio button color
    },
    "& .Mui-checked": {
      color: theme.palette.text.primary, // Change radio button color when checked
    },
    "&.MuiFormControlLabel-root": {
      width: "fit-content",
    },
  })
);

const CssTextField = styled(TextField)(({ theme, checked }) => ({
  "& label.Mui-focused": {
    color: lighten(theme.palette.text.primary, 0.2),
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: lighten(theme.palette.text.primary, 0.2),
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
    // "&.css-16wblaj-MuiInputBase-input-MuiOutlinedInput-input:-webkit-autofill":
    //   {
    //     backgroundColor: "red",
    //   },
    // "&.MuiOutlinedInput-notchedOutline": {
    //   backgroundColor: "red",
    // },
    // ".MuiOutlinedInput-root": {
    //   "&:-webkit-autofill": {
    //     backgroundColor: "red",
    //   },
    // },
  },
}));

function MyFormControlLabel(props) {
  const radioGroup = useRadioGroup();
  const checked = radioGroup ? radioGroup.value === props.value : false;

  return <StyledFormControlLabel checked={checked} {...props} />;
}

MyFormControlLabel.propTypes = {
  value: PropTypes.any,
};

const CustomNumberField = ({
  minValue,
  maxValue,
  setMinValue,
  setMaxValue,
  setSelectedPrice,
  handleApplyCustomPrice,
}) => {
  const theme = useTheme();
  const isApplyDisabled = minValue === "" && maxValue === "";

  const handleApply = () => {
    if (
      minValue !== "" &&
      maxValue !== "" &&
      Number(minValue) > Number(maxValue)
    ) {
      alert("Minimum value cannot be greater than maximum value.");
      return;
    }

    handleApplyCustomPrice(minValue, maxValue);
  };

  const handleInputClick = () => {
    setSelectedPrice("custom"); // Ensure selection when clicking input
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Box sx={{ display: "flex", gap: 2 }}>
        <NumericFormat
          value={minValue}
          onValueChange={(values) => setMinValue(values.value)}
          prefix="$"
          allowNegative={false}
          placeholder="$ Min"
          customInput={CssTextField}
          onClick={handleInputClick}
          slotProps={{ input: { sx: { backgroundColor: "inherit" } } }}
        />
        <NumericFormat
          value={maxValue}
          onValueChange={(values) => setMaxValue(values.value)}
          prefix="$"
          allowNegative={false}
          placeholder="$ Max"
          customInput={CssTextField}
          onClick={handleInputClick}
        />
      </Box>
      <Button
        variant="outlined"
        sx={{
          width: "50%",
          color: theme.palette.secondary.main,
          borderColor: theme.palette.secondary.main,
          backgroundColor: isApplyDisabled ? "rgba(0, 0, 0, 0.12)" : "inherit",
          "&:hover": {
            backgroundColor: isApplyDisabled
              ? "rgba(0, 0, 0, 0.12)"
              : darken(theme.palette.background.default, 0.1),
          },
        }}
        disabled={isApplyDisabled}
        onClick={handleApply}
      >
        Apply
      </Button>
    </Box>
  );
};

const PriceRange = ({
  filters,
  setFilters,
  minValue,
  maxValue,
  setMinValue,
  setMaxValue,
}) => {
  const [selectedPrice, setSelectedPrice] = useState("");

  useEffect(() => {
    // Sync selected price with filter changes
    if (!filters.price) setSelectedPrice("");
    else if (filters.price.min === 0 && filters.price.max === 25)
      setSelectedPrice("under25");
    else if (filters.price.min === 25 && filters.price.max === 50)
      setSelectedPrice("20to50");
    else if (filters.price.min === 50 && filters.price.max === 100)
      setSelectedPrice("50to100");
    else if (filters.price.min === 100) setSelectedPrice("above100");
    else setSelectedPrice("custom");
  }, [filters.price]);

  const handlePriceChange = (event) => {
    const value = event.target.value;
    let newRange = null;

    switch (value) {
      case "under25":
        newRange = { min: 0, max: 25 };
        break;
      case "20to50":
        newRange = { min: 25, max: 50 };
        break;
      case "50to100":
        newRange = { min: 50, max: 100 };
        break;
      case "above100":
        newRange = { min: 100 };
        break;
      case "custom":
        newRange = filters.price || {}; // Keep current custom price
        break;
      default:
        newRange = null;
    }

    setFilters((prev) => ({ ...prev, price: newRange }));
    setSelectedPrice(value);
  };

  const handleApplyCustomPrice = (minPrice, maxPrice) => {
    setFilters((prev) => ({
      ...prev,
      price: {
        ...(minPrice !== undefined ? { min: minPrice } : {}),
        ...(maxPrice !== undefined ? { max: maxPrice } : {}),
      },
    }));
    setSelectedPrice("custom"); // Ensure selection stays
  };

  return (
    <RadioGroup
      name="price-range"
      value={selectedPrice}
      onChange={handlePriceChange}
    >
      <MyFormControlLabel
        value="under25"
        label={<Typography sx={{ fontWeight: 400 }}>Under $25</Typography>}
        control={<Radio />}
        sx={{
          width: "auto", // Ensures the label container is only as wide as needed
          ".MuiFormControlLabel-label": {
            width: "auto", // Ensures the text doesn't take extra space
            backgroundColor: "red",
          },
        }}
      />
      <MyFormControlLabel
        value="20to50"
        label={<Typography sx={{ fontWeight: 400 }}>$25 to $50</Typography>}
        control={<Radio />}
      />
      <MyFormControlLabel
        value="50to100"
        label={<Typography sx={{ fontWeight: 400 }}>$50 to $100</Typography>}
        control={<Radio />}
      />
      <MyFormControlLabel
        value="above100"
        label={<Typography sx={{ fontWeight: 400 }}>$100 and above</Typography>}
        control={<Radio />}
      />
      <MyFormControlLabel
        value="custom"
        label={
          <CustomNumberField
            // onApply={handleApplyCustomPrice}
            handleApplyCustomPrice={handleApplyCustomPrice}
            minValue={minValue}
            maxValue={maxValue}
            setMinValue={setMinValue}
            setMaxValue={setMaxValue}
            setSelectedPrice={setSelectedPrice}
          />
        }
        control={<Radio checked={selectedPrice === "custom"} />}
      />
    </RadioGroup>
  );
};

export default PriceRange;
