import React from "react";
import { Box } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const ProductHomeSkeleton = () => {
  return (
    <Stack spacing={100} sx={{ mb: "2rem" }}>
      <Box sx={{ display: "flex", gap: 3 }}>
        <Box>
          <Skeleton
            animation="wave"
            variant="rounded"
            sx={{ borderRadius: "10%", mb: 1.5 }}
            width={300}
            height={300}
          />
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "19rem" }} />
        </Box>
        <Box>
          <Skeleton
            animation="wave"
            variant="rounded"
            sx={{ borderRadius: "10%", mb: 1.5 }}
            width={300}
            height={300}
          />
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "19rem" }} />
        </Box>
        <Box>
          <Skeleton
            animation="wave"
            variant="rounded"
            sx={{ borderRadius: "10%", mb: 1.5 }}
            width={300}
            height={300}
          />
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "19rem" }} />
        </Box>
      </Box>
    </Stack>
  );
};

export default ProductHomeSkeleton;
