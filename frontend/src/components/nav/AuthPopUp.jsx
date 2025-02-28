import React from "react";
import PropTypes from "prop-types";
import { Divider, useTheme } from "@mui/material";
import { useSpring, animated } from "@react-spring/web";
import Popper from "@mui/material/Popper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FaceIcon from "@mui/icons-material/Face2";
import { Link } from "react-router-dom";
import ScrollbarWrapper from "../reusable/ScrollBarWrapper";

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

const AuthPopUp = ({ open, anchorRef, handleOpen, handleClose }) => {
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
            offset: [80, 8], // First value = horizontal shift, Second = vertical shift
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
              }}
            >
              <FaceIcon sx={{ fontSize: "2.5rem" }} />
              <Typography>Good afternoon, Beautiful. 👋</Typography>
            </Box>
            <Divider
              sx={{
                mt: 1,
              }}
            />
            <ScrollbarWrapper>
              <Box sx={{ height: "15rem", overflow: "auto" }}>
                <Box sx={{ padding: "2rem" }}>
                  <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
                    Sign In
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    Sign in for FREE standard shipping on all orders, access
                    your Noir Allure Rewards, Favorites and more.
                  </Typography>
                  <Button
                    variant="contained"
                    component={Link}
                    to="/login"
                    onClick={handleClose}
                    sx={{
                      boxShadow: "none",
                      display: "flex",
                      justifySelf: "center",
                      padding: "0.8rem 7rem",
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
                </Box>
                <Box sx={{ padding: "2rem", mt: -3 }}>
                  <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                    New here?
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    Great! Create an account and enjoy these special benefits:
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      mb: 1,
                      alignContent: "center",
                      justifyContent: "center",
                      gap: 1,
                      //padding: "0.5rem",
                    }}
                  >
                    <Box
                      sx={{
                        width: "30%",
                        display: "flex",
                        alignItems: "center",
                        justifyItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <svg
                        className="pal-c-Icon pal-c-Icon--size-xxl"
                        aria-hidden="true"
                        focusable="false"
                        role="img"
                        height="40"
                        width="40"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_972_2071)">
                          <path
                            d="M21.5 18.75C21.8797 18.75 22.1935 19.0322 22.2432 19.3982L22.25 19.5V20.75H23.5C23.9142 20.75 24.25 21.0858 24.25 21.5C24.25 21.8797 23.9678 22.1935 23.6018 22.2432L23.5 22.25H22.25V23.5C22.25 23.9142 21.9142 24.25 21.5 24.25C21.1203 24.25 20.8065 23.9678 20.7568 23.6018L20.75 23.5V22.25H19.5C19.0858 22.25 18.75 21.9142 18.75 21.5C18.75 21.1203 19.0322 20.8065 19.3982 20.7568L19.5 20.75H20.75V19.5C20.75 19.0858 21.0858 18.75 21.5 18.75ZM12.2925 -0.00365517L12.5 -0.016L12.5332 -0.0156527C12.8231 -0.0101664 13.112 0.0672243 13.3717 0.216519L13.5238 0.314725L21.5238 6.09272C21.7039 6.22268 21.8551 6.38373 21.9721 6.56573L22.0684 6.73578C22.1624 6.92592 22.2221 7.13331 22.2423 7.34839L22.25 7.511V15.4898C22.2498 15.706 22.2096 15.9171 22.1343 16.1138L22.0608 16.2804C21.9586 16.4793 21.8221 16.6559 21.6551 16.8027L21.5241 16.907L13.5238 22.6853C13.2773 22.863 12.9962 22.9691 12.7083 23.0035L12.5 23.016L12.4678 23.0156C12.1775 23.0103 11.8882 22.9329 11.6282 22.7834L11.4759 22.685L3.47625 16.9073C3.29404 16.7758 3.14149 16.6126 3.02399 16.4281L2.93163 16.2642C2.83755 16.0741 2.77794 15.8667 2.75771 15.6516L2.75 15.489V7.51022C2.75022 7.294 2.7904 7.08288 2.86569 6.88624L2.93918 6.71959C3.04182 6.52027 3.17827 6.34375 3.3451 6.19719L3.47587 6.093L11.4762 0.314725C11.7229 0.136802 12.0044 0.0306751 12.2925 -0.00365517ZM7.435 14.87L4.943 16.116L11.75 21.032V17.891L7.435 14.87ZM17.564 14.87L13.25 17.89V21.031L20.056 16.116L17.564 14.87ZM12.5 6.415L8.25 9.39V13.609L12.5 16.584L16.75 13.608V9.391L12.5 6.415ZM4.249 8.213V14.787L6.75 13.536V9.463L4.249 8.213ZM20.749 8.213L18.25 9.463V13.537L20.749 14.786V8.213ZM11.75 1.967L4.943 6.883L7.435 8.129L11.75 5.108V1.967ZM13.25 1.967V5.109L17.564 8.129L20.056 6.883L13.25 1.967ZM2.5 -0.25C2.8797 -0.25 3.19349 0.0321539 3.24315 0.398229L3.25 0.5V1.75H4.5C4.91421 1.75 5.25 2.08579 5.25 2.5C5.25 2.8797 4.96785 3.19349 4.60177 3.24315L4.5 3.25H3.25V4.5C3.25 4.91421 2.91421 5.25 2.5 5.25C2.1203 5.25 1.80651 4.96785 1.75685 4.60177L1.75 4.5V3.25H0.5C0.0857864 3.25 -0.25 2.91421 -0.25 2.5C-0.25 2.1203 0.0321539 1.80651 0.398229 1.75685L0.5 1.75H1.75V0.5C1.75 0.0857864 2.08579 -0.25 2.5 -0.25Z"
                            fill="inherit"
                          ></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_972_2071">
                            <rect width="24" height="24" fill="white"></rect>
                          </clipPath>
                        </defs>
                      </svg>
                      <Typography sx={{ textAlign: "center" }}>
                        Earn points on every purchase
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: "30%",
                        display: "flex",
                        alignItems: "center",
                        //justifyItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <svg
                        className="pal-c-Icon pal-c-Icon--size-xxl"
                        aria-hidden="true"
                        focusable="false"
                        role="img"
                        height="40"
                        width="40"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_972_2002)">
                          <path
                            d="M13.1277 21.439C13.5613 21.4432 13.91 21.7976 13.9069 22.2305C13.9037 22.6246 13.6094 22.9477 13.2304 23H3.69957C3.32047 22.9477 3.02725 22.6246 3.02407 22.2305C3.01992 21.7976 3.36865 21.4432 3.8022 21.439H13.1277ZM13.5278 1C15.9071 1 17.836 2.928 17.836 5.30559C17.836 5.58057 17.8099 5.85241 17.7585 6.11798L23.2345 6.11694L23.3413 6.12425C23.69 6.1734 23.9675 6.45674 24 6.81746L22.4627 22.1223L22.4658 22.2247C22.448 22.6283 22.114 22.9566 21.6982 22.9566L16.6317 22.9995L16.5155 22.9922C16.1353 22.9399 15.8421 22.6168 15.839 22.2226C15.8348 21.7898 16.1835 21.4353 16.6171 21.4311L20.8594 21.4228L22.403 7.65181H4.65254L5.03792 10.9955L5.04106 11.1115C5.02535 11.4942 4.73108 11.8162 4.33942 11.8581C3.90797 11.9041 3.52154 11.5915 3.47546 11.1607L3.23879 8.64404L3.05553 6.81746L3.07228 6.71185C3.15082 6.36787 3.45871 6.11694 3.82105 6.11694L9.29593 6.11798C9.24462 5.85241 9.21949 5.58057 9.21949 5.30559C9.21949 2.928 11.1485 1 13.5278 1ZM11.1519 17.5534C11.5855 17.5576 11.9342 17.912 11.9311 18.3449C11.9269 18.738 11.6336 19.0621 11.2546 19.1144H0.675501C0.297453 19.0621 0.00423086 18.738 2.08425e-05 18.3449C-0.0030997 17.912 0.344579 17.5576 0.779176 17.5534H11.1519ZM13.1277 13.6678C13.5613 13.672 13.91 14.0264 13.9069 14.4593C13.9037 14.8524 13.6094 15.1765 13.2304 15.2288H3.69957C3.32047 15.1765 3.02725 14.8524 3.02407 14.4593C3.01992 14.0264 3.36865 13.672 3.8022 13.6678H13.1277ZM13.5278 2.53592C11.9967 2.53592 10.7558 3.77594 10.7558 5.30559C10.7558 5.58475 10.7966 5.85764 10.8762 6.11798H16.1783C16.2589 5.85764 16.2998 5.58475 16.2998 5.30559C16.2998 3.77594 15.0588 2.53592 13.5278 2.53592Z"
                            fill="inherit"
                          ></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_972_2002">
                            <rect width="24" height="24" fill="white"></rect>
                          </clipPath>
                        </defs>
                      </svg>
                      <Typography sx={{ textAlign: "center" }}>
                        Faster checkout
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: "30%",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        mb: 1,
                      }}
                    >
                      <svg
                        className="pal-c-Icon pal-c-Icon--size-xxl"
                        aria-hidden="true"
                        focusable="false"
                        role="img"
                        height="40"
                        width="40"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.8733 3.7911L11.9988 4.6913L11.1249 3.79095C9.77752 2.40188 7.86001 1.76369 5.97361 2.07925C4.08981 2.39436 2.47097 3.62139 1.62115 5.37325L1.51261 5.60972C0.552104 7.83644 0.966056 10.416 2.54762 12.1951L11.4378 21.7552C11.7412 22.0816 12.2572 22.0816 12.5607 21.7552L21.2825 12.3746C23.0674 10.5341 23.5114 7.71171 22.3772 5.37331L22.2529 5.13113C21.3634 3.49797 19.811 2.37804 18.0248 2.07925C16.1384 1.76369 14.2208 2.40188 12.8733 3.7911ZM17.7721 3.59672C19.0901 3.81719 20.2406 4.64719 20.8971 5.85233L21.0049 6.06217L21.1005 6.27287C21.7907 7.90127 21.4892 9.81613 20.3271 11.1442L11.9988 20.1015L3.83968 11.3285C2.53405 9.98319 2.17122 7.95958 2.91459 6.23589L3.00886 6.03056C3.63552 4.73917 4.83594 3.82929 6.2263 3.59672C7.61407 3.36457 9.0265 3.83467 10.0245 4.86353L11.449 6.3313C11.7504 6.64179 12.248 6.64179 12.5493 6.3313L13.9737 4.86367C14.9719 3.83467 16.3843 3.36457 17.7721 3.59672Z"
                          fill="inherit"
                        ></path>
                      </svg>
                      <Typography sx={{ textAlign: "center" }}>
                        Save to your favorites
                      </Typography>
                    </Box>
                  </Box>
                  <Button
                    variant="outlined"
                    component={Link}
                    to="/register"
                    onClick={handleClose}
                    sx={{
                      boxShadow: "none",
                      display: "flex",
                      justifySelf: "center",
                      padding: "0.8rem 5rem",
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
            </ScrollbarWrapper>
          </Box>
        </Fade>
      )}
    </Popper>
  );
};

AuthPopUp.propTypes = {
  open: PropTypes.bool.isRequired,
  anchorEl: PropTypes.object,
};

export default AuthPopUp;
