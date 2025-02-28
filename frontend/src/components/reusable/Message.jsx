import React from "react";
import Alert from "@mui/material/Alert";
import { Box } from "@mui/material";
import AlertTitle from "@mui/material/AlertTitle";

const Message = ({ severity, children }) => {
  const title =
    severity === "error"
      ? "Error"
      : severity === "warning"
      ? "Warning"
      : "Success";

  return (
    <Box
      sx={{
        width: "80%",
        display: "flex",
        justifySelf: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Alert severity={severity} sx={{ width: "100%" }}>
        <AlertTitle>{title}</AlertTitle>
        {children}
      </Alert>
    </Box>
  );
};

export default Message;
