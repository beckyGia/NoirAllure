import { useEffect, useState } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function BackToTopCom({ cls }) {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box
      className={`back-to-top-btn ${cls || ""}`}
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
        zIndex: 1000,
        display: visible ? "flex" : "none",
        transition: "opacity 0.3s ease-in-out",
      }}
    >
      <IconButton
        onClick={scrollToTop}
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.text.primary,
          "&:hover": {
            backgroundColor: theme.palette.primary.dark,
          },
          boxShadow: 3,
          width: 40,
          height: 40,
        }}
      >
        <KeyboardArrowUpIcon sx={{ fontSize: "2rem" }} />
      </IconButton>
    </Box>
  );
}

export default BackToTopCom;
