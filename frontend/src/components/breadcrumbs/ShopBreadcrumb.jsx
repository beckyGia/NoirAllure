import React, { useEffect, useState } from "react";
import {
  Breadcrumbs,
  Typography,
  useTheme,
  alpha,
  Skeleton,
} from "@mui/material";
import { Link, BrowserRouter, useParams, useNavigate } from "react-router-dom";
import Message from "../reusable/Message";
import { useGetCategoryHierarchyAndSubcategoriesQuery } from "../../slices/categoryApiSlice";

const ShopScreenBreadcrumb = () => {
  const { linkName } = useParams(); // Get category from URL
  const navigate = useNavigate();
  const theme = useTheme();

  // Fetch breadcrumb data
  const {
    data: breadcrumbData,
    isLoading,
    error,
  } = useGetCategoryHierarchyAndSubcategoriesQuery(linkName);

  if (isLoading)
    return (
      <Skeleton variant="text" sx={{ fontSize: "1rem", width: "10rem" }} />
    );

  if (error) {
    return (
      <Message
        severity={"error"}
        children={error?.data?.message || error.error}
      />
    );
  }

  // Ensure breadcrumbs start with Home
  const breadcrumbs = [
    { title: "Home", linkName: "/" }, // Home always first
    ...(breadcrumbData?.breadcrumbs || []),
  ];
  //console.log(breadcrumbs);

  return (
    <Breadcrumbs aria-label="breadcrumb" separator=">">
      {breadcrumbs.map((breadcrumb, index) => {
        const isLast = index === breadcrumbs.length - 1;

        return isLast ? (
          <Typography
            key={breadcrumb.linkName}
            sx={{
              color: theme.palette.text.primary,
              fontWeight: 500,
            }}
          >
            {breadcrumb.title}
          </Typography>
        ) : (
          <Link
            key={breadcrumb.linkName}
            aria-label={`Navigate to ${breadcrumb.linkName}`}
            underline="none"
            to={breadcrumb.linkName}
            //onClick={() => navigate(breadcrumb.linkName)}
            sx={{
              fontWeight: 500,
              cursor: "pointer",
              color: alpha(theme.palette.text.primary, 0.5),
              "&:hover": {
                color: theme.palette.primary.main,
              },
            }}
          >
            {breadcrumb.title}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default ShopScreenBreadcrumb;
