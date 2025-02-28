import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Rating,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  FormGroup,
  alpha,
} from "@mui/material";
import CustomRating from "./accordion/CustomRating";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid2";
import { darken } from "@mui/material/styles";
import { useTheme, lighten } from "@mui/material/styles";
import PriceRange from "./accordion/PriceRange";
import CustomCheckbox from "./accordion/CustomCheckbox";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useGetCategoryHierarchyAndSubcategoriesQuery } from "../../slices/categoryApiSlice";
import {
  useGetProductRatingCountsByCategoryQuery,
  useGetDeliveryTypeByCategoryQuery,
  useGetShippingPreferenceByCategoryQuery,
  useGetNewlyArrivedProductsByCategoryQuery,
  useGetBrandsByCategoryQuery,
  useGetSaleByCategoryQuery,
} from "../../slices/productsApiSlice";

export default function DetailedAccordion({
  filters,
  setFilters,
  minValue,
  maxValue,
  setMinValue,
  setMaxValue,
}) {
  const { linkName } = useParams();
  const theme = useTheme();
  // const [selectedRating, setSelectedRating] = useState(null);
  // const [selectedShipping, setSelectedShipping] = useState(null);
  // const [selectedDelivery, setSelectedDelivery] = useState(null);
  // const [selectedNewly, setSelectedNewly] = useState(null);
  // const [selectedBrands, setSelectedBrands] = useState([]);
  const [ratingCounts, setRatingCounts] = useState({});
  const [shippingPreferenceCounts, setShippingPreferenceCounts] = useState({});
  const [deliveryTypeCounts, setDeliveryTypeCounts] = useState({});
  const [newlyArrivedCounts, setNewlyArrivedCounts] = useState([]);
  const [saleCounts, setSaleCounts] = useState([]);
  const [brandCounts, setBrandCounts] = useState([]);

  const {
    data: rating,
    isLoading: ratingIsLoading,
    error: ratingError,
  } = useGetProductRatingCountsByCategoryQuery({
    linkName: linkName,
    filters: filters,
  });

  const {
    data: deliveryType,
    isLoading: deliveryTypeIsLoading,
    error: deliveryTypeError,
  } = useGetDeliveryTypeByCategoryQuery({
    linkName: linkName,
    filters: filters,
  });

  const {
    data: shippingPreference,
    isLoading: shippingPreferenceIsLoading,
    error: shippingPreferenceError,
  } = useGetShippingPreferenceByCategoryQuery({
    linkName: linkName,
    filters: filters,
  });

  const {
    data: newlyArrived,
    isLoading: newlyArrivedIsLoading,
    error: newlyArrivedError,
  } = useGetNewlyArrivedProductsByCategoryQuery({
    linkName: linkName,
    filters: filters,
  });

  const {
    data: sale,
    isLoading: saleLoading,
    error: saleError,
  } = useGetSaleByCategoryQuery({ linkName: linkName, filters: filters });

  const {
    data: brands,
    isLoading: brandsIsLoading,
    error: brandsError,
  } = useGetBrandsByCategoryQuery({ linkName: linkName, filters: filters });

  useEffect(() => {
    setRatingCounts(rating);
    setDeliveryTypeCounts(deliveryType);
    setShippingPreferenceCounts(shippingPreference);
    setNewlyArrivedCounts(newlyArrived);
    setSaleCounts(sale);

    // Convert array into an object for easier mapping
    const brandCounts = (brands ?? []).reduce((acc, brand) => {
      acc[brand.brandName] = brand.productCount;
      return acc;
    }, {});

    setBrandCounts(brandCounts);
  }, [rating, deliveryType, shippingPreference, newlyArrived, brands, sale]);

  const updateFilter = (filterKey, value) => {
    console.log(filterKey);
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: value,
    }));
  };

  const toggleNewFilter = () => {
    setFilters((prev) => ({
      ...prev,
      new: prev.new ? null : true, // Toggle between true and null
    }));
  };

  const toggleSaleFilter = () => {
    setFilters((prev) => ({
      ...prev,
      sale: prev.sale ? null : true, // Toggle between true and null
    }));
  };

  const toggleFilterArray = (filterKey, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: prevFilters[filterKey].includes(value)
        ? prevFilters[filterKey].filter((v) => v !== value) // Remove if it exists
        : [...prevFilters[filterKey], value], // Add if it doesn't exist
    }));
  };

  const filterOptions = [
    {
      title: "Price Range",
      content: (
        <PriceRange
          filters={filters}
          setFilters={setFilters}
          minValue={minValue}
          maxValue={maxValue}
          setMinValue={setMinValue}
          setMaxValue={setMaxValue}
        />
      ),
    },
    {
      title: "Rating",
      content: (
        <CustomRating
          filters={filters}
          updateFilter={updateFilter}
          ratingCounts={ratingCounts}
        />
      ),
    },
    {
      title: "Sale",
      content: (
        <CustomCheckbox
          productDataCounts={saleCounts}
          filterName={"Sale"}
          filters={filters.sale}
          toggleFilter={toggleSaleFilter}
        />
      ),
    },
    {
      title: "Pickup & Delivery",
      content: (
        <RadioGroup>
          {Object.entries(deliveryTypeCounts ?? {}).map(
            ([deliveryType, count]) => (
              <FormControlLabel
                key={deliveryType}
                value={deliveryType}
                disabled={count === 0}
                control={
                  <Radio
                    checked={filters.delivery === deliveryType}
                    onChange={() => updateFilter("delivery", deliveryType)}
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
                      color:
                        count === 0
                          ? lighten(theme.palette.gray.primary, 0.1)
                          : "inherit",
                      fontWeight:
                        filters.delivery === deliveryType ? "bold" : 400,
                    }}
                  >
                    {deliveryType} ({count})
                  </Typography>
                }
              />
            )
          )}
        </RadioGroup>
      ),
    },
    {
      title: "Brands",
      content: (
        <FormGroup>
          {Object.entries(brandCounts).map(([brandName, count]) => (
            <FormControlLabel
              key={brandName}
              control={
                <Checkbox
                  checked={(filters.brands ?? []).includes(brandName)}
                  onChange={() => toggleFilterArray("brands", brandName)}
                  sx={{
                    color: "inherit",
                    "&.Mui-checked": {
                      color: theme.palette.text.primary,
                    },
                  }}
                />
              }
              label={
                <Typography
                  sx={{
                    fontSize: "0.85rem",
                    fontWeight: (filters.brands ?? []).includes(brandName)
                      ? "bold"
                      : 400,
                  }}
                >
                  {brandName} ({count})
                </Typography>
              }
            />
          ))}
        </FormGroup>
      ),
    },
    {
      title: "New",
      content: (
        <CustomCheckbox
          productDataCounts={newlyArrived}
          filterName={"New"}
          filters={filters.new}
          toggleFilter={toggleNewFilter}
        />
      ),
    },
    {
      title: "Shipping Preference",
      content: (
        <RadioGroup>
          {Object.entries(shippingPreferenceCounts ?? {}).map(
            ([shippingType, count]) => (
              <FormControlLabel
                key={shippingType}
                value={shippingType}
                disabled={count === 0}
                control={
                  <Radio
                    checked={filters.shipping === shippingType}
                    onChange={() => updateFilter("shipping", shippingType)}
                    value={!!count && "disabled"}
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
                      fontWeight:
                        filters.shipping === shippingType ? "bold" : 400,
                    }}
                  >
                    {shippingType} ({count})
                  </Typography>
                }
              />
            )
          )}
        </RadioGroup>
      ),
    },
  ];

  return (
    <>
      {filterOptions.map((section, index) => (
        <Accordion
          key={index}
          //defaultExpanded={index == 0 ? true : false}
          disableGutters
          square
          sx={{
            boxShadow: "none", // Remove box shadow
            borderBottom:
              index !== filterOptions.length - 1
                ? `0.01rem solid ${alpha(theme.palette.text.light, 0.4)}`
                : "none", // Border bottom except last one
            "&::before": {
              display: "none", // Remove default MUI divider
            },
          }}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon
                sx={{
                  fontWeight: 900,
                  color: theme.palette.text.primary,
                }}
              />
            }
            sx={{
              backgroundColor: theme.palette.background.default, // Light background
              minHeight: "40px", // Reduce height
              padding: "16px 24px", // Adjust padding
              "& .MuiAccordionSummary-content": {
                margin: 0, // Remove extra spacing
              },
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                position: "relative",
                "&:hover::after": {
                  transform: "scaleX(1)", // Reveal the underline
                },
                "&::after": {
                  content: '""', // Pseudo-element
                  position: "absolute",
                  bottom: 0, // Position the underline slightly below the text
                  left: 0,
                  width: "100%",
                  height: "1px", // Thickness of the underline
                  backgroundColor: theme.palette.text.primary, // Underline color
                  transform: "scaleX(0)", // Initially hidden
                  transformOrigin: "left", // Start animation from the left
                  transition: "transform 0.8s ease", // Speed and easing for the animation
                },
              }}
            >
              {section.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              padding: "0 16px 1.2rem 10px",
              backgroundColor: theme.palette.background.default,
            }}
          >
            {section.content}
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
