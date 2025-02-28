import React, { useEffect, useState } from "react";
import {
  Breadcrumbs,
  Link,
  Typography,
  useTheme,
  alpha,
  Skeleton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import Message from "../reusable/Message";

const ProductScreenBreadcrumb = ({
  breadcrumbData,
  breadcrumbLoading,
  breadcrumbError,
}) => {
  const navigate = useNavigate();
  const theme = useTheme();

  if (breadcrumbLoading)
    return (
      <Skeleton variant="text" sx={{ fontSize: "1rem", width: "10rem" }} />
    );

  if (breadcrumbError) {
    return (
      <Message severity={"error"}>
        {error?.data?.message || error.error}
      </Message>
    );
  }

  // Ensure breadcrumbs start with Home
  const breadcrumbs = [
    { title: "Home", linkName: "/" }, // Home always first
    ...(breadcrumbData?.breadcrumbs || []),
  ];

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
            underline="none"
            component={RouterLink} // Ensures correct behavior
            to={breadcrumb.linkName}
            onClick={() => navigate(breadcrumb.linkName)}
            sx={{
              fontWeight: 500,
              cursor: "pointer",
              color: alpha(theme.palette.text.primary, 0.5),
              "&:hover": {
                color: theme.palette.primary.main,
                //textDecoration: "underline",
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

export default ProductScreenBreadcrumb;
