import React from "react";
import { useTheme, darken, lighten } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const CustomPagination = ({ productData, currentPage, handlePageChange }) => {
  const theme = useTheme();

  return (
    <Pagination
      count={productData?.pages || 1}
      page={currentPage}
      onChange={handlePageChange}
      sx={{
        "& .MuiPaginationItem-root": {
          fontSize: "0.9rem",
          borderRadius: "12px",
          fontWeight: 500,
          color: `${theme.palette.text.primary} !important`,
          "&:hover": {
            backgroundColor: `${lighten(
              theme.palette.secondary.primary,
              0.4
            )} !important`,
            color: `${theme.palette.text.contrast} !important`,
          },
        },
        "& .Mui-selected": {
          backgroundColor: `${darken(
            theme.palette.secondary.primary,
            0.3
          )} !important`,
          color: `${theme.palette.text.contrast} !important`,
          fontWeight: "700",
          "&:hover": {
            backgroundColor: `${lighten(
              theme.palette.secondary.primary,
              0.4
            )} !important`,
            color: `${theme.palette.text.contrast} !important`,
          },
        },
      }}
      renderItem={(item) => (
        <PaginationItem
          slots={{
            previous: ArrowBackIosIcon,
            next: ArrowForwardIosIcon,
          }}
          {...item}
          sx={{
            ...(item.type === "previous" || item.type === "next"
              ? {
                  backgroundColor: "transparent",
                  color: theme.palette.text.primary,
                  fontWeight: "900",
                  "&:hover": {
                    backgroundColor: lighten(
                      theme.palette.secondary.primary,
                      0.4
                    ),
                    color: theme.palette.text.contrast,
                  },
                }
              : {}),
          }}
        />
      )}
    />
  );
};

export default CustomPagination;
