import React from "react";
import { Box, useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const NavLogo = () => {
  const theme = useTheme();
  const imageSrc =
    theme.palette.mode === "light"
      ? "/icons/lightMode.png"
      : "/icons/darkMode.png";

  return (
    <Box
      display={"flex"}
      sx={{
        //width: { xs: "20%", sm: "20%", md: "30%" },
        alignItems: "center",
        justifyContent: { xs: "center", md: "flex-start" },
      }}
    >
      <Link
        to="/"
        style={{
          textDecoration: "none",
          display: "inline-block",
        }}
      >
        <img
          alt="Noir Allure Full Logo"
          src={imageSrc}
          style={{
            cursor: "pointer",
            width: "80%",
            maxWidth: "100px",
            height: "auto",
          }}
        />
      </Link>
      <Typography
        variant="h3"
        component={Link}
        to="/"
        sx={{
          mr: { xs: 0, md: 1 },
          ml: { xs: 0, md: -1 },
          display: "flex",
          flexGrow: 1,
          flexWrap: { sm: "wrap", md: "nowrap" },
          // fontFamily: "monospace",
          fontWeight: 400,
          letterSpacing: ".1rem",
          color: theme.palette.text.primary,
          textDecoration: "none",
          textAlign: { sm: "center" },
        }}
      >
        NOIR ALLURE
      </Typography>
    </Box>
  );
};

export default NavLogo;
