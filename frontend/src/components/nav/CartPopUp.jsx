import React, { useState } from "react";
import {
  Drawer,
  Slide,
  IconButton,
  Typography,
  List,
  Box,
  Button,
  Divider,
  useTheme,
} from "@mui/material";
import { alpha, lighten, styled } from "@mui/material/styles";
import { darken } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import CloseIcon from "@mui/icons-material/Close";
import CartPopUpItem from "./CartPopUpItem";

const BorderLinearProgress = styled(LinearProgress)(({ theme, value }) => ({
  height: 11,
  borderRadius: "0.1rem",
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme == "dark" ? darken("#e9ecef", 0.15) : darken("#e9ecef", 0.1),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: "0.1rem",
    backgroundImage:
      value > 0
        ? `repeating-linear-gradient(45deg, 
            ${theme.palette.primary.main}, 
            ${theme.palette.primary.light} 10px, 
            ${theme.palette.secondary.main} 10px, 
            ${theme.palette.secondary.light} 20px)`
        : "none", // Apply stripes only when value > 0
    backgroundSize: "200% 100%",
    animation: value > 0 ? "moveStripe 1.5s linear infinite" : "none",
  },
  "@keyframes moveStripe": {
    "0%": { backgroundPosition: "0 0" },
    "100%": { backgroundPosition: "40px 0" }, // Adjust speed and distance
  },
}));

const CartPopUp = ({
  cartItems,
  setCartItems,
  toggleCartDrawer,
  updateQuantity,
  removeItem,
  totalItems,
  //totalPrice,
  open,
  setOpen,
}) => {
  //const value = 100;
  const theme = useTheme();
  const totalPrice = 18;
  const freeShippingThreshold = 75;
  const progress = (totalPrice / freeShippingThreshold) * 100;
  const remainingAmount = freeShippingThreshold - totalPrice;

  return (
    <Drawer
      anchor="right"
      open={open}
      disableEnforceFocus
      onClose={() => toggleCartDrawer(false)}
      transitionDuration={400}
      keepMounted
      sx={{
        width: "400px",
        height: "100%",
        flexShrink: 0,
        transition: "transform 0.4s ease-in-out",
        "& .MuiDrawer-paper": {
          width: "400px",
          boxSizing: "border-box",
          transform: open ? "translateX(0)" : "translateX(100%)", // Smooth slide effect
          transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        },
      }}
    >
      <Box
        sx={{
          p: 2,
          height: "100%",
          display: "flex",
          position: "relative",
          flexDirection: "column",
          backgroundColor: theme.palette.background.default,
          opacity: open ? 1 : 0,
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            //height: "5%",
            mb: 1,
            mt: 1,
            //justifyContent: "center",
          }}
        >
          <Typography variant="h5" fontWeight={700} sx={{ letterSpacing: 1.2 }}>
            Shopping Cart
          </Typography>
          <IconButton
            onClick={() => toggleCartDrawer(false)}
            aria-label="Close Menu Drawer"
            sx={{
              position: "absolute",
              top: "0",
              right: "0",
              backgroundColor: "inherit",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "rotate(90deg)",
              },
              color: theme.palette.text.primary,
            }}
          >
            <CloseIcon
              sx={{
                color: theme.palette.text.primary,
                fontSize: "2rem",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  color: theme.palette.secondary.main,
                },
              }}
            />
          </IconButton>
        </Box>
        <Divider
          sx={{
            display: "flex",
            width: "100%",
            alignSelf: "center",
            color: theme.palette.text.primary,
            mt: 1,
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            // alignItems: "flex-end",
            mt: 2.5,
            mb: 2,
            // width: "100%",
            // position: "relative",
            //justifyContent: "center",
          }}
        >
          <Typography sx={{ letterSpacing: 0.1 }}>
            Add <span style={{ fontWeight: 600 }}>${remainingAmount}</span> more
            to qualify for free shipping
          </Typography>
          <BorderLinearProgress variant="determinate" value={progress} />
        </Box>
        <Divider
          sx={{
            display: "flex",
            width: "100%",
            alignSelf: "center",
            color: theme.palette.text.primary,
            mt: 1,
          }}
        />
        {/* <Box
            sx={{
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <img
              alt="Empty Cart Picture"
              src={"/images/empty-cart.png"}
              style={{
                cursor: "pointer",
                width: "90%",
                //maxWidth: "100px",
                height: "auto",
              }}
            />
            <Typography
              variant="h5"
              sx={{
                mt: 4,
                mb: 2,
                letterSpacing: 1,
              }}
            >
              Your Cart is empty
            </Typography>
            <Button
              variant="outlined"
              sx={{
                display: "flex",
                alignSelf: "center",
                textTransform: "capitalize",
                fontSize: "0.9rem",
                width: "40%",
                borderColor: theme.palette.secondary.main,
                color: theme.palette.secondary.main,
                padding: "0.6rem 0",
                "&:hover": {
                  backgroundColor: darken(
                    theme.palette.background.default,
                    0.1
                  ),
                  fontWeight: 700,
                },
              }}
            >
              Go To Shop
            </Button>
          </Box> */}
        <Box
          sx={{
            height: "100%",
            maxHeight: "400px",
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "6px", // Thin scrollbar
              backgroundColor: "#aaa",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: theme.palette.secondary.medium, // Scrollbar color
              color: theme.palette.secondary.medium, // Scrollbar color
              borderRadius: "6px",
              marginBlock: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: theme.palette.secondary.medium,
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "transparent", // Makes scrollbar track invisible
            },
            scrollbarWidth: "thin",
            scrollbarColor: `${theme.palette.secondary.medium} transparent`,
          }}
        >
          <Box>
            <List>
              {cartItems.map((item) => (
                <CartPopUpItem
                  item={item}
                  key={item.id}
                  updateQuantity={updateQuantity}
                  removeItem={removeItem}
                />
              ))}
            </List>
          </Box>
        </Box>
        <Divider
          sx={{
            display: "flex",
            width: "100%",
            alignSelf: "center",
            borderBottomWidth: "2px",
            borderBottomStyle: "solid",
            borderBottomColor: lighten(theme.palette.text.primary, 0.7),
          }}
        />

        <Box
          sx={{
            position: "sticky",
            bottom: 0,
            bgcolor: theme.palette.background.default,
            p: 2,
            //borderTop: 1,
            //borderColor: "divider",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 900 }}>
              Subtotal:
            </Typography>
            <Typography variant="h6" gutterBottom>
              ${totalPrice.toFixed(2)}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: theme.palette.secondary.main,
                fontWeight: 600,
                color: theme.palette.text.contrast,
                height: "2.75rem",
                textTransform: "capitalize",
                fontSize: "0.9rem",
                letterSpacing: 1,
                boxShadow: "none",
                "&:hover": {
                  boxShadow: "none",
                  backgroundColor: darken(theme.palette.secondary.main, 0.2),
                  fontWeight: 800,
                },
              }}
              fullWidth
              //disabled={cartItems.length === 0}
            >
              View Cart
            </Button>
            <Button
              variant="outlined"
              sx={{
                //backgroundColor: theme.palette.accent.main,
                fontWeight: 600,
                color: theme.palette.secondary.main,
                borderColor: theme.palette.secondary.main,
                height: "2.75rem",
                textTransform: "capitalize",
                fontSize: "0.9rem",
                letterSpacing: 1,
                "&:hover": {
                  boxShadow: "none",
                  backgroundColor: darken(
                    theme.palette.background.default,
                    0.1
                  ),
                  fontWeight: 800,
                },
              }}
              fullWidth
              disabled={cartItems.length === 0}
            >
              Checkout
            </Button>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CartPopUp;
