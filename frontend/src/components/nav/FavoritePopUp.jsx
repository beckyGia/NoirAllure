import React from "react";
import PropTypes from "prop-types";
import { Divider, useTheme } from "@mui/material";
import { useSpring, animated } from "@react-spring/web";
import Popper from "@mui/material/Popper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import FaceIcon from "@mui/icons-material/Face2";

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;

  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.node,
  in: PropTypes.bool,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

const FavoritePopUp = ({ open, anchorRef, handleOpen, handleClose }) => {
  const theme = useTheme();
  return (
    <Popper
      open={open}
      anchorEl={anchorRef.current}
      transition
      placement="bottom-end"
      modifiers={[
        {
          name: "offset",
          options: {
            offset: [60, 8], // First value = horizontal shift, Second = vertical shift
          },
        },
        {
          name: "preventOverflow",
          options: {
            boundary: "window", // Ensures it stays within the window
          },
        },
      ]}
      sx={{ zIndex: 1000, boxShadow: "black" }}
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps}>
          <Box
            onMouseEnter={handleOpen}
            onMouseLeave={handleClose}
            sx={{
              backgroundColor: theme.palette.background.default,
              boxShadow: 3,
              borderRadius: 2,
              padding: 2,
              width: "25rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                padding: "0.8rem",
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                Recently Loved
              </Typography>
            </Box>
            <Divider
              sx={{
                mt: 1,
              }}
            />
            <Box sx={{ padding: "1rem" }}>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Use your Loves list to keep track of your favorite products.
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="contained"
                component={Link}
                to="/login"
                onClick={handleClose}
                sx={{
                  boxShadow: "none",
                  display: "flex",
                  justifySelf: "center",
                  padding: "0.8rem 2.5rem",
                  borderRadius: "10rem",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  "&:hover": {
                    boxShadow: "none",
                    backgroundColor: theme.palette.secondary.medium,
                    fontWeight: 700,
                  },
                }}
              >
                Sign In
              </Button>
              <Button
                variant="outlined"
                component={Link}
                to="/register"
                onClick={handleClose}
                sx={{
                  boxShadow: "none",
                  display: "flex",
                  justifySelf: "center",
                  padding: "0.8rem 3rem",
                  borderColor: theme.palette.secondary.main,
                  color: theme.palette.secondary.main,
                  borderRadius: "8rem",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  "&:hover": {
                    boxShadow: "none",
                    backgroundColor: theme.palette.secondary.medium,
                    fontWeight: 700,
                  },
                }}
              >
                Create Account
              </Button>
            </Box>
          </Box>
        </Fade>
      )}
    </Popper>
  );
};

FavoritePopUp.propTypes = {
  open: PropTypes.bool.isRequired,
  anchorEl: PropTypes.object,
};

export default FavoritePopUp;
