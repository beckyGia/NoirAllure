import React, { useEffect, useRef } from "react";
import { Container, Box, Typography, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { display, useTheme } from "@mui/system";
import { lighten } from "@mui/system";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import DiscountOutlinedIcon from "@mui/icons-material/DiscountOutlined";
import HeadphonesOutlinedIcon from "@mui/icons-material/HeadphonesOutlined";

export const feature_data = [
  {
    icon: (
      <LocalShippingOutlinedIcon
        sx={{
          fontSize: "3rem",
          //rotate: "90deg",
          transform: "scaleX(-1)",
        }}
      />
    ),
    title: "Free Delivery",
    subtitle: "On all orders over $75",
  },
  {
    icon: (
      <AttachMoneyOutlinedIcon
        sx={{
          fontSize: "3rem",
        }}
      />
    ),
    title: "Return & Refund",
    subtitle: "Money back guarantee",
  },
  {
    icon: (
      <DiscountOutlinedIcon
        sx={{
          fontSize: "3rem",
        }}
      />
    ),
    title: "Member Discount",
    subtitle: "On every order over $140.00",
  },
  {
    icon: (
      <HeadphonesOutlinedIcon
        sx={{
          fontSize: "3rem",
        }}
      />
    ),
    title: "Support 24/7",
    subtitle: "Contact us 24 hours a day",
  },
];

const FeatureArea = () => {
  const theme = useTheme();
  const elementHtmlRef = useRef(null);

  useEffect(() => {
    if (elementHtmlRef.current) {
      const childElements = Array.from(elementHtmlRef.current.children);
      if (childElements.length) {
        childElements[0]?.classList.add("first-child");
        childElements[1]?.classList.add("second-child");
        childElements[childElements.length - 1]?.classList.add("last-child");
      }
    }
  }, []);

  return (
    <Box component="section" sx={{ pb: 4 }}>
      <Container
        disableGutters
        sx={{
          border: `1px solid ${lighten(theme.palette.text.primary, 0.75)}`,
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 1,
          width: "100%",
          height: "100%",
        }}
      >
        <Grid
          container
          sx={{
            width: "100%",
            height: "100%",
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {feature_data.map((item, i) => (
            <Grid
              ref={elementHtmlRef}
              key={i}
              size={{ xl: 3, lg: 3, md: 3, sm: 6, xs: 12 }}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                width: "100%",
                "& >*::after": {
                  [theme.breakpoints.up("md")]: {
                    content: '""',
                    position: "absolute",
                    right: "-10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "1px",
                    height: "50px",
                    backgroundColor: lighten(theme.palette.text.primary, 0.75),
                  },
                },
                "& .last-child::after": {
                  display: "none",
                },
                "&:nth-of-type(1), &:nth-of-type(2)": {
                  "&::after": {
                    [theme.breakpoints.only("sm")]: {
                      content: '""',
                      position: "absolute",
                      left: "10%",
                      bottom: "0",
                      width: "80%",
                      height: "1px",
                      backgroundColor: lighten(
                        theme.palette.text.primary,
                        0.75
                      ),
                      display: "block",
                    },
                  },
                },
                "& >:nth-of-type(3), & >:nth-of-type(4)": {
                  "&::after": {
                    display: "none",
                  },
                },
                "& > *::after": {
                  [theme.breakpoints.only("xs")]: {
                    content: '""',
                    position: "absolute",
                    left: "0",
                    bottom: "0",
                    width: "80%",
                    height: "1px",
                    transform: "translateX(12.5%)",
                    backgroundColor: lighten(theme.palette.text.primary, 0.75),
                    display: "block",
                  },
                },
              }}
            >
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  display: "flex",
                  width: "100%",
                  padding: "1rem",
                  //position: "relative",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyItems: "center",
                  }}
                >
                  {item.icon}
                </Box>
                <Box>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{
                      textWrap: "none",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography variant="body2">{item.subtitle}</Typography>
                </Box>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeatureArea;
