import React from "react";
import Tooltip from "@mui/material/Tooltip";
import { useTheme } from "@mui/material";

const CustomTooltip = ({ title, children, disabled, placement = "left" }) => {
  const theme = useTheme();

  return (
    <Tooltip
      title={disabled ? "" : title} // Disable tooltip if 'disabled' is true
      placement={placement}
      arrow
      slotProps={{
        tooltip: {
          sx: {
            backgroundColor: "#000000",
            color: "#ffffff",
            fontSize: "12px",
            borderRadius: "4px",
            padding: "8px",
          },
        },
        arrow: {
          sx: {
            color: "#000000",
          },
        },
      }}
    >
      {disabled ? (
        <span
          style={{
            display: "inline-block",
            cursor: "not-allowed", // Show 'not-allowed' cursor when disabled
            pointerEvents: "none", // Prevent any interactions
          }}
        >
          {children}
        </span>
      ) : (
        <span
          style={{
            display: "inline-block",
          }}
        >
          {children}
        </span>
      )}
    </Tooltip>
  );
};

export default CustomTooltip;
