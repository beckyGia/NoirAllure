import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  alpha,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid2";
import { darken } from "@mui/material/styles";
import { useTheme, lighten } from "@mui/material/styles";
import CircleIcon from "@mui/icons-material/Circle";

const ProductIngredientsAndHow = ({ howToUse, selectedVariant }) => {
  const theme = useTheme();
  const cleanHowTo = (step, index) => {
    step = step.replace(/[^a-zA-Z0-9\s:.-]/gi, ""); // Remove unwanted characters but keep punctuation

    if (step.endsWith(":") && index !== 0) {
      return (
        <Typography sx={{ mb: 1, mt: 3 }}>
          <b>{step}</b>
        </Typography>
      );
    } else if (step.endsWith(":")) {
      return (
        <Typography sx={{ mb: 1 }}>
          <b>{step}</b>
        </Typography>
      );
    } else if (
      step.endsWith(".") ||
      step.endsWith(".  ") ||
      step.endsWith(". ")
    ) {
      return (
        <Typography sx={{}}>
          <CircleIcon
            sx={{
              fontSize: "0.5rem",
              verticalAlign: "middle",
              marginRight: "5px",
            }}
          />
          {step}
        </Typography>
      );
    }

    return step;
  };

  const filterOptions = [
    {
      title: "Ingredients",
      content: <>{selectedVariant.ingredients}</>,
    },
    {
      title: "How to Use",
      content: (
        <>
          {howToUse.map((step, index) => (
            <Box key={index}>{cleanHowTo(step, index)}</Box>
          ))}
        </>
      ),
    },
  ];

  return (
    <Box
      sx={{
        mb: 4,
        width: "90%",
        display: "flex",
        flexDirection: "column",
        justifySelf: "center",
      }}
    >
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
              backgroundColor: theme.palette.background.default,
              textTransform: "uppercase",
              letterSpacing: "0.1rem",
              minHeight: "6.5rem",
              padding: "1rem 4rem",
              "& .MuiAccordionSummary-content": {
                margin: 0,
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
              padding: "0 5rem 1.2rem 5rem",
              backgroundColor: theme.palette.background.default,
            }}
          >
            {section.content}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default ProductIngredientsAndHow;
