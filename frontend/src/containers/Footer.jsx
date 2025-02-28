import React, { useState } from "react";
import { Box, Button, Container, Typography, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary, {
  accordionSummaryClasses,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import IconButton from "@mui/material/IconButton";
import HeroCarousel from "../components/hero/HeroCarousel";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid2";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PinterestIcon from "@mui/icons-material/Pinterest";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { fontSize } from "@mui/system";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  backgroundColor: theme.palette.background.main,
  //border: `1px solid ${theme.palette.divider}`,
  boxShadow: "none",
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  padding: "1rem",
  flexDirection: "row-reverse",
  "& .MuiTypography-root": {
    color: theme.palette.text.primary,
    fontSize: "1.1rem",
  },
  "& .MuiAccordionSummary-expandIconWrapper": {
    color: theme.palette.text.primary,
  },
  borderBottom: `0.01rem solid ${theme.palette.divider}`,
  borderTop: `0.01rem solid ${theme.palette.divider}`,
  //backgroundColor: theme.palette.background.main,
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
    {
      transform: "rotate(90deg)",
    },
  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  "& .MuiTypography-root": {
    fontSize: "0.9rem",
  },
}));

const Footer = () => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.background.main,
        color: theme.palette.text.primary,
        py: { md: 6 },
        paddingBottom: { xs: 3 },
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: { xs: "flex", md: "none" },
          flexDirection: "column",
          justifySelf: "center",
          alignSelf: "center",
        }}
      >
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography component="span">About Noir Allure</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" sx={{ mb: 2 }}>
              We provide premium beauty products that enhance your natural
              beauty.
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link>
                <Typography
                  variant="body2"
                  sx={{ "&:hover": { color: theme.palette.secondary.main } }}
                >
                  About Noir Allure
                </Typography>
              </Link>
              <Link>
                <Typography
                  variant="body2"
                  sx={{ "&:hover": { color: theme.palette.secondary.main } }}
                >
                  Careers
                </Typography>
              </Link>
              <Link>
                <Typography
                  variant="body2"
                  sx={{ "&:hover": { color: theme.palette.secondary.main } }}
                >
                  Privacy Policy
                </Typography>
              </Link>
              <Link>
                <Typography
                  variant="body2"
                  sx={{ "&:hover": { color: theme.palette.secondary.main } }}
                >
                  Terms & Conditions
                </Typography>
              </Link>
              <Link>
                <Typography
                  variant="body2"
                  sx={{ "&:hover": { color: theme.palette.secondary.main } }}
                >
                  Latest News
                </Typography>
              </Link>
              <Link>
                <Typography
                  variant="body2"
                  sx={{ "&:hover": { color: theme.palette.secondary.main } }}
                >
                  Contact Us
                </Typography>
              </Link>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography component="span">My Noir Allure</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link>
                <Typography
                  variant="body2"
                  sx={{ "&:hover": { color: theme.palette.secondary.main } }}
                >
                  Track Orders
                </Typography>
              </Link>
              <Link>
                <Typography
                  variant="body2"
                  sx={{ "&:hover": { color: theme.palette.secondary.main } }}
                >
                  Shipping
                </Typography>
              </Link>
              <Link>
                <Typography
                  variant="body2"
                  sx={{ "&:hover": { color: theme.palette.secondary.main } }}
                >
                  Wishlist
                </Typography>
              </Link>
              <Link>
                <Typography
                  variant="body2"
                  sx={{ "&:hover": { color: theme.palette.secondary.main } }}
                >
                  My Account
                </Typography>
              </Link>
              <Link>
                <Typography
                  variant="body2"
                  sx={{ "&:hover": { color: theme.palette.secondary.main } }}
                >
                  Order Status
                </Typography>
              </Link>
              <Link>
                <Typography
                  variant="body2"
                  sx={{ "&:hover": { color: theme.palette.secondary.main } }}
                >
                  Loves
                </Typography>
              </Link>
              <Link>
                <Typography
                  variant="body2"
                  sx={{ "&:hover": { color: theme.palette.secondary.main } }}
                >
                  Purchase History
                </Typography>
              </Link>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
            <Typography component="span">Help</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link>
                <Typography
                  variant="body2"
                  sx={{ "&:hover": { color: theme.palette.secondary.main } }}
                >
                  Customer Service
                </Typography>
              </Link>
              <Link>
                <Typography
                  variant="body2"
                  sx={{ "&:hover": { color: theme.palette.secondary.main } }}
                >
                  Returns & Exchanges
                </Typography>
              </Link>
              <Link>
                <Typography
                  variant="body2"
                  sx={{ "&:hover": { color: theme.palette.secondary.main } }}
                >
                  Delivery and Pickup Options
                </Typography>
              </Link>
              <Link>
                <Typography
                  variant="body2"
                  sx={{ "&:hover": { color: theme.palette.secondary.main } }}
                >
                  Shipping
                </Typography>
              </Link>
              <Link>
                <Typography
                  variant="body2"
                  sx={{ "&:hover": { color: theme.palette.secondary.main } }}
                >
                  Billing
                </Typography>
              </Link>
              <Link>
                <Typography
                  variant="body2"
                  sx={{ "&:hover": { color: theme.palette.secondary.main } }}
                >
                  Accessibility
                </Typography>
              </Link>
            </Box>
          </AccordionDetails>
        </Accordion>

        <Box sx={{ padding: "1.5rem 1rem" }}>
          <Typography variant="h4" sx={{ mt: 2, mb: 2, fontWeight: 500 }}>
            We Belong to Something Beautiful
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: 700, letterSpacing: 1 }}
          >
            Noir Allure Beauty Rewards®
          </Typography>
          <Typography variant="body2" sx={{ mb: 4 }}>
            Credit Card Earn 2 Points per $1² + 20% off the first purchase¹ on
            your new card at Noir Allure Beauty.{" "}
            <Link>Learn More & Apply.</Link>
          </Typography>
        </Box>
      </Box>
      <Container sx={{ mb: 2, display: { xs: "none", md: "flex" } }}>
        <Grid container spacing={4}>
          <Grid size={{ md: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              About Noir Allure
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              We provide premium beauty products that enhance your natural
              beauty.
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link>
                <Typography
                  variant="body2"
                  sx={{ "&:hover": { color: theme.palette.secondary.main } }}
                >
                  About Noir Allure
                </Typography>
              </Link>
              <Link>
                <Typography
                  variant="body2"
                  sx={{ "&:hover": { color: theme.palette.secondary.main } }}
                >
                  Careers
                </Typography>
              </Link>
              <Link>
                <Typography
                  variant="body2"
                  sx={{ "&:hover": { color: theme.palette.secondary.main } }}
                >
                  Privacy Policy
                </Typography>
              </Link>
              <Link>
                <Typography
                  variant="body2"
                  sx={{ "&:hover": { color: theme.palette.secondary.main } }}
                >
                  Terms & Conditions
                </Typography>
              </Link>
              <Link>
                <Typography
                  variant="body2"
                  sx={{ "&:hover": { color: theme.palette.secondary.main } }}
                >
                  Latest News
                </Typography>
              </Link>
              <Link>
                <Typography
                  variant="body2"
                  sx={{ "&:hover": { color: theme.palette.secondary.main } }}
                >
                  Contact Us
                </Typography>
              </Link>
            </Box>
          </Grid>
          <Grid size={{ md: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              My Noir Allure
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link>
                <Typography
                  variant="body2"
                  sx={{ "&:hover": { color: theme.palette.secondary.main } }}
                >
                  Track Orders
                </Typography>
              </Link>
              <Link>
                <Typography
                  variant="body2"
                  sx={{ "&:hover": { color: theme.palette.secondary.main } }}
                >
                  Shipping
                </Typography>
              </Link>
              <Link>
                <Typography
                  variant="body2"
                  sx={{ "&:hover": { color: theme.palette.secondary.main } }}
                >
                  Wishlist
                </Typography>
              </Link>
              <Link>
                <Typography
                  variant="body2"
                  sx={{ "&:hover": { color: theme.palette.secondary.main } }}
                >
                  My Account
                </Typography>
              </Link>
              <Link>
                <Typography
                  variant="body2"
                  sx={{ "&:hover": { color: theme.palette.secondary.main } }}
                >
                  Order Status
                </Typography>
              </Link>
              <Link>
                <Typography
                  variant="body2"
                  sx={{ "&:hover": { color: theme.palette.secondary.main } }}
                >
                  Loves
                </Typography>
              </Link>
              <Link>
                <Typography
                  variant="body2"
                  sx={{ "&:hover": { color: theme.palette.secondary.main } }}
                >
                  Purchase History
                </Typography>
              </Link>
            </Box>
          </Grid>
          <Grid size={{ md: 3 }} sx={{ fontWeight: 700 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Help
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link>
                <Typography
                  variant="body2"
                  sx={{ "&:hover": { color: theme.palette.secondary.main } }}
                >
                  Customer Service
                </Typography>
              </Link>
              <Link>
                <Typography
                  variant="body2"
                  sx={{ "&:hover": { color: theme.palette.secondary.main } }}
                >
                  Returns & Exchanges
                </Typography>
              </Link>
              <Link>
                <Typography
                  variant="body2"
                  sx={{ "&:hover": { color: theme.palette.secondary.main } }}
                >
                  Delivery and Pickup Options
                </Typography>
              </Link>
              <Link>
                <Typography
                  variant="body2"
                  sx={{ "&:hover": { color: theme.palette.secondary.main } }}
                >
                  Shipping
                </Typography>
              </Link>
              <Link>
                <Typography
                  variant="body2"
                  sx={{ "&:hover": { color: theme.palette.secondary.main } }}
                >
                  Billing
                </Typography>
              </Link>
              <Link>
                <Typography
                  variant="body2"
                  sx={{ "&:hover": { color: theme.palette.secondary.main } }}
                >
                  Accessibility
                </Typography>
              </Link>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }} sx={{ fontWeight: 700 }}>
            <Typography variant="h6" sx={{ mb: 4 }}>
              We Belong to Something Beautiful
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
              Noir Allure Beauty Rewards®
            </Typography>
            <Typography variant="body2">
              Credit Card Earn 2 Points per $1² + 20% off the first purchase¹ on
              your new card at Noir Allure Beauty.{" "}
              <Link>Learn More & Apply.</Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Divider
        sx={{
          backgroundColor: theme.palette.text.primary,
          width: "95%",
          display: "flex",
          justifySelf: "center",
        }}
      />
      <Container
        sx={{
          mt: 3,
          mb: 4,
          display: "flex",
          justifyContent: { md: "space-between" },
          alignItems: { xs: "center", md: "none" },
          flexDirection: { xs: "column", md: "row" },
          gap: 1,
        }}
      >
        <Box>
          <Typography>
            © {new Date().getFullYear()} Noir Allure, Inc. All Rights Reserved.
            <Link href="/"> ❤</Link>.
          </Typography>
        </Box>
        <Box display="flex" gap={2}>
          <IconButton>
            <FacebookIcon
              sx={{ color: theme.palette.text.primary, fontSize: "1.8rem" }}
            />
          </IconButton>
          <IconButton>
            <InstagramIcon
              sx={{ color: theme.palette.text.primary, fontSize: "1.8rem" }}
            />
          </IconButton>
          <IconButton>
            <LinkedInIcon
              sx={{ color: theme.palette.text.primary, fontSize: "1.8rem" }}
            />
          </IconButton>
          <IconButton>
            <PinterestIcon
              sx={{ color: theme.palette.text.primary, fontSize: "1.8rem" }}
            />
          </IconButton>
          <IconButton>
            <XIcon
              sx={{ color: theme.palette.text.primary, fontSize: "1.8rem" }}
            />
          </IconButton>
          <IconButton>
            <YouTubeIcon
              sx={{ color: theme.palette.text.primary, fontSize: "1.8rem" }}
            />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
