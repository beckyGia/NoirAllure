import { Container, Box, Typography, Button, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Link } from "react-router-dom";
import { useTimer } from "react-timer-hook";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { lighten, useTheme, alpha } from "@mui/material/styles";
import { darken } from "@mui/material/styles";

const BeautyOfferBanner = () => {
  const theme = useTheme();
  const expiryTimestamp = new Date("2025-09-30T20:20:22");
  const { seconds, minutes, hours, days } = useTimer({ expiryTimestamp });

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        pt: 4,
        mb: "8rem",
      }}
    >
      <Container>
        <Grid container spacing={1}>
          {/* Left Banner */}
          <Grid size={{ md: 6, xl: 7 }} sx={{ position: "relative" }}>
            <Card
              sx={{
                borderRadius: "1rem",
                height: { md: 700 },
                overflow: "hidden",
                position: "relative",
              }}
            >
              <CardMedia
                component="img"
                image="/images/BeautyOfferBannerLeft.jpg"
                alt="Beauty Offer Banner Left Picture"
                sx={{
                  width: "100%",
                  height: { md: "100%" },
                  transform: `rotate(180deg) scale(1)`,
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "rotate(180deg) scale(1.1)",
                  },
                }}
              />
            </Card>

            {/* Overlay */}
            <Box
              sx={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                backgroundColor: alpha("#000000", 0.3),
                padding: "1rem",
                borderRadius: "1rem",
                pointerEvents: "none",
              }}
            >
              <Typography
                variant="h5"
                color="white"
                sx={{
                  fontWeight: 700,
                  position: "absolute",
                  top: "8%",
                  left: "5%",
                  backgroundColor: alpha("#000000", 0.3),
                  padding: "0.5rem",
                  borderRadius: "1rem",
                  letterSpacing: 1,
                }}
              >
                Cosmetics Collection
              </Typography>

              <Box sx={{ position: "absolute", top: "14%", left: "5%" }}>
                <Link
                  to={`/shop/makeup`}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "inline-block",
                    cursor: "pointer",
                    pointerEvents: "auto",
                  }}
                >
                  <Typography
                    variant="h1"
                    sx={{
                      fontWeight: 900,
                      color: "white",
                      fontSize: "3rem",
                      backgroundColor: alpha("#000000", 0.3),
                      padding: "0.5rem",
                      borderRadius: "1rem",
                      display: "inline-block",
                      position: "relative",
                      textAlign: "left",
                      letterSpacing: 2,
                      "& span": {
                        position: "relative",
                        display: "inline-block",
                        //marginRight: "4px", // Small spacing
                      },
                      "& span::after": {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        height: "3px",
                        backgroundColor: "white",
                        transform: "scaleX(0)",
                        transformOrigin: "left",
                        transition: "transform 0.5s ease-in-out",
                      },
                      "&:hover span::after": {
                        transform: "scaleX(1)",
                      },
                    }}
                  >
                    <span>Foundation</span>
                    <br />
                    <span> and Powder</span>
                    <br />
                    <span>Brush</span>
                  </Typography>
                </Link>
              </Box>

              <Button
                component={Link}
                to="/shop/makeup"
                endIcon={
                  <ArrowRightIcon
                    className="endIcon"
                    sx={{
                      transition: "transform 0.3s ease",
                    }}
                  />
                }
                sx={{
                  fontSize: "0.8rem",
                  cursor: "pointer",
                  position: "absolute",
                  pointerEvents: "auto",
                  fontWeight: 600,
                  top: "50%",
                  right: "10%",
                  backgroundColor: "white",
                  color: "#000",
                  "&:hover .endIcon": {
                    transform: "translateX(5px)", // Move the icon to the right
                    transition: "transform 0.3s ease",
                  },
                  "&:hover": { backgroundColor: "#ddd" },
                }}
              >
                Discover Now
              </Button>
            </Box>
          </Grid>

          {/* Right Banner */}
          <Grid size={{ md: 6, xl: 5 }} sx={{ position: "relative" }}>
            <Card
              sx={{
                borderRadius: "1rem",
                height: { md: 700 },
                overflow: "hidden",
                position: "relative",
              }}
            >
              <CardMedia
                component="img"
                image="/images/BeautyOfferBannerRight.jpg"
                alt="Beauty Picture"
                sx={{
                  width: "100%",
                  height: "100%",
                  //aspectRatio: "4/3",
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
              />
            </Card>
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                //backgroundColor: alpha("#000000", 0.3),
                padding: "1rem",
                borderRadius: "1rem",
                pointerEvents: "none",
              }}
            >
              <Link
                href="/shop"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  pointerEvents: "auto",
                }}
              >
                <Typography
                  variant="h2"
                  color="white"
                  sx={{
                    fontSize: "2.1rem",
                    fontWeight: 900,
                    letterSpacing: 2,
                    position: "absolute",
                    top: "60%",
                    left: "1%",
                    textTransform: "uppercase",
                    backgroundColor: alpha("#000000", 0.3),
                    padding: "0.5rem",
                    borderRadius: "1rem",
                    "& span": {
                      position: "relative",
                      display: "inline-block",
                      //marginRight: "4px", // Small spacing
                    },
                    "& span::after": {
                      content: '""',
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      height: "3px",
                      backgroundColor: "white",
                      transform: "scaleX(0)",
                      transformOrigin: "left",
                      transition: "transform 0.5s ease-in-out",
                    },
                    "&:hover span::after": {
                      transform: "scaleX(1)",
                    },
                  }}
                >
                  <span>Skincare</span>
                  <br />
                  <span>Benefits,</span>
                  <br />
                  <span>Makeup Energy</span>
                </Typography>
              </Link>
              <Button
                component={Link}
                to="/shop/skincare"
                sx={{
                  fontSize: "1rem",
                  cursor: "pointer",
                  pointerEvents: "auto",
                  fontWeight: 700,
                  top: "82%",
                  left: "1%",
                  color: "#fff",
                  backgroundColor: alpha("#000000", 0.5),
                  position: "relative",

                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "3px",
                    backgroundColor: "white",
                    transform: "scaleX(0)",
                    transformOrigin: "left",
                    transition: "transform 0.5s ease-in-out",
                  },
                  "&:hover::after": {
                    transform: "scaleX(1)",
                  },
                }}
              >
                Shop Now
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Offer & Countdown */}
      <Grid container spacing={2} justifyContent="center" sx={{ mt: 3 }}>
        {/* Offer Section */}
        <Grid size={{ xs: 12, md: 5, lg: 4, xl: 3 }}>
          <Box sx={{ mr: 2 }}>
            <Typography variant="h5" textAlign="end">
              Discover our Beauty Selection <br />
              <span
                style={{
                  fontWeight: "700",
                  color: lighten(theme.palette.secondary.main, 0.3),
                }}
              >
                75% Extra Discount
              </span>{" "}
              for your...
            </Typography>
          </Box>
        </Grid>

        {/* Countdown Timer */}
        <Grid size={{ xs: 12, md: 5, lg: 4, xl: 3 }}>
          <Stack direction="row" spacing={1} justifyContent="center">
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2,
                backgroundColor:
                  theme.palette.mode === "light"
                    ? lighten(theme.palette.background.default, 0.2)
                    : lighten(theme.palette.background.default, 0.1),
                boxShadow:
                  theme.palette.mode === "light"
                    ? "0 1px 1px 2px rgba(0, 0, 0, .4)"
                    : "0 1px 1px 2px rgba(1, 1, 1, .35)",
                padding: "0.4rem 1rem",
                height: "3.5rem",
                borderRadius: "0.3rem",
              }}
            >
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h3" sx={{ fontWeight: 600 }}>
                  {days}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ textTransform: "uppercase", fontWeight: 500 }}
                >
                  Days
                </Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 600 }}>
                :
              </Typography>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h3" sx={{ fontWeight: 600 }}>
                  {hours}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ textTransform: "uppercase", fontWeight: 500 }}
                >
                  Hrs
                </Typography>
              </Box>
              <Box>
                <Typography variant="h3" sx={{ fontWeight: 600 }}>
                  :
                </Typography>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h3" sx={{ fontWeight: 600 }}>
                  {minutes}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ textTransform: "uppercase", fontWeight: 500 }}
                >
                  Min
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2,
                backgroundColor:
                  theme.palette.mode === "light"
                    ? lighten(theme.palette.background.default, 0.2)
                    : lighten(theme.palette.background.default, 0.1),
                boxShadow:
                  theme.palette.mode === "light"
                    ? "0 1px 1px 2px rgba(0, 0, 0, .4)"
                    : "0 1px 1px 2px rgba(1, 1, 1, .35)",
                padding: "0.4rem 1rem",
                height: "3.5rem",
                borderRadius: "0.3rem",
              }}
            >
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h3" sx={{ fontWeight: 600 }}>
                  {seconds}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ textTransform: "uppercase", fontWeight: 500 }}
                >
                  Sec
                </Typography>
              </Box>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BeautyOfferBanner;
