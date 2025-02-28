import React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const CategorySkeleton = () => {
  return (
    <Box sx={{ display: "flex", padding: "0 3rem", gap: "1.8rem" }}>
      <Skeleton
        animation="wave"
        height={"25rem"}
        width={"18rem"}
        style={{ borderRadius: "2rem" }}
      />
      <Skeleton
        animation="wave"
        height={"25rem"}
        width={"18rem"}
        style={{ borderRadius: "2rem" }}
      />
      <Skeleton
        animation="wave"
        height={"25rem"}
        width={"18rem"}
        style={{ borderRadius: "2rem" }}
      />
    </Box>
  );
};

export default CategorySkeleton;
