import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Box,
  useTheme,
  Toolbar,
  Collapse,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { styled, alpha } from "@mui/material/styles";
import ShopIcon from "@mui/icons-material/Shop";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MenuIcon from "@mui/icons-material/Menu";
import Badge from "@mui/material/Badge";
import CustomBadge from "../reusable/CustomBadge";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Slide from "@mui/material/Slide";
import CartPopUp from "./CartPopUp";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ShopPopper from "../home/ShopPopper";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import FaceIcon from "@mui/icons-material/Face2";
import CloseIcon from "@mui/icons-material/Close";
import { darken } from "@mui/material/styles";
import { Link } from "react-router-dom";
import debounce from "lodash.debounce";
import { useGetPrimaryCategoriesQuery } from "../../slices/categoryApiSlice";
import { purple } from "@mui/material/colors";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AuthPopUp from "./AuthPopUp";
import FavoritePopUp from "./FavoritePopUp";
import { useSpring, animated } from "@react-spring/web";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import NavSearchInput from "./NavSearchInput";

const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    //in: smallSearchModalOpen,
    in: inProp,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: inProp ? 1 : 0 }, // Use inProp here
    onStart: () => {
      if (inProp && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!inProp && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    // @ts-expect-error https://github.com/pmndrs/react-spring/issues/2341
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const NavSmallScreenDrawer = ({
  drawerNavMenuOpen,
  drawerWidth,
  handleNavDrawerClose,
  smallSearchModalOpen,
  handleSmallSearchModalOpen,
  handleSmallSearchModalClose,
  shopMenuDropdown,
  toggleShopMenuDropdown,
  // cartItems,
  // setCartItems,
  // toggleCartDrawer,
  // updateQuantity,
  // removeItem,
  // totalItems,
  // totalPrice,
  // open,
  // setOpen,
  // shoppingBasketCount,
  favoriteCount,
  closeNavMenuOpenAndDrawer,
  categories,
  imageSrc,
  searchTerm,
  setSearchTerm,
  handleSearch,
  searchResults,
  searchLoading,
  searchError,
}) => {
  const theme = useTheme();
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (searchResults && searchResults.products) {
      setOptions(searchResults.products.map((product) => product.name)); // Adjust according to API response
    }
  }, [searchResults]);

  // **🔹 Debounced input handler to prevent excessive API calls**
  const handleInputChange = debounce((_, newInputValue) => {
    setSearchTerm(newInputValue);
  }, 300);

  return (
    <Drawer
      anchor="right"
      open={drawerNavMenuOpen}
      disableEnforceFocus
      //variant="temporary"
      sx={{
        display: { xs: "flex", md: "none" },
        position: "relative",
        width: drawerWidth,
        height: "100%",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
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
      //inert={!openNavMenu ? "true" : undefined}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "400%",
          backgroundColor: theme.palette.background.default,
          display: "flex",
          flexDirection: "column",
          //gap: 2,
        }}
      >
        <IconButton
          onClick={handleNavDrawerClose}
          aria-label="Close Menu Drawer"
          sx={{
            position: "absolute",
            right: "0",
            backgroundColor: "inherit",
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              // backgroundColor: alpha(theme.palette.text.primary, 0.2),
              color: theme.palette.secondary.primary,
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 3,
            width: "100%",
          }}
        >
          <Link
            to="/"
            onClick={handleNavDrawerClose}
            style={{
              textDecoration: "none",
              display: "inline-block",
              alignItems: "center",
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
            onClick={handleNavDrawerClose}
            sx={{
              display: "flex",
              //flexGrow: 1,
              fontWeight: 400,
              letterSpacing: ".1rem",
              color: theme.palette.text.primary,
              textDecoration: "none",
            }}
          >
            NOIR ALLURE
          </Typography>
        </Box>
        <Divider
          sx={{
            display: "flex",
            width: "80%",
            alignSelf: "center",
            color: theme.palette.text.primary,
            mt: 1,
          }}
        />
        <Box
          sx={{
            display: { xs: "flex", sm: "none" },
            justifyContent: "space-evenly",
            mt: 3,
          }}
        >
          {/* <IconButton
            aria-label="Search"
            onClick={handleSmallSearchModalOpen}
            sx={{
              backgroundColor: "inherit",
              "&:hover": {
                backgroundColor: alpha(theme.palette.text.primary, 0.2),
              },
              color: theme.palette.text.primary,
            }}
          >
            <SearchIcon sx={{ fontWeight: 800, fontSize: "1.7rem" }} />
          </IconButton>
          <Box sx={{ display: "none" }}>
            <Modal
              aria-labelledby="spring-modal-title"
              aria-describedby="spring-modal-description"
              //disableEnforceFocus
              open={smallSearchModalOpen}
              onClose={handleSmallSearchModalClose}
              closeAfterTransition
              slots={{ backdrop: Backdrop }}
              slotProps={{
                backdrop: {
                  TransitionComponent: Fade,
                },
              }}
            >
              <Fade in={smallSearchModalOpen}>
                <Box
                  sx={{
                    position: "absolute",
                    top: "30%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "90vw",
                    borderRadius: "1rem",
                    bgcolor: theme.palette.background.default,
                    boxShadow: 24,
                    p: 4,
                  }}
                >
                  <NavSearchInput
                    options={options}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    isLoading={searchLoading}
                    handleSearch={handleSearch}
                    handleInputChange={handleInputChange}
                    handleSearchClose={handleSmallSearchModalClose}
                    smallModal={true}
                  />
                </Box>
              </Fade>
            </Modal>
          </Box> */}

          {/* <IconButton
            //ref={anchorNavFavoriteEl}
            aria-label="Favorite"
            component={Link}
            to="/loves"
            onClick={handleNavDrawerClose}
            //onMouseEnter={handleNavFavoriteMenuClickOpen}
            //onMouseLeave={handleNavFavoriteMenuClickClose}
            sx={{
              backgroundColor: "inherit",
              "&:hover": {
                backgroundColor: alpha(theme.palette.text.primary, 0.2),
              },
              color: theme.palette.text.primary,
            }}
          >
            <FavoriteIcon sx={{ fontWeight: 800, fontSize: "1.7rem" }} />
            <FavoriteBorderIcon sx={{ fontWeight: 800, fontSize: "1.7rem" }} />
            <CustomBadge count={favoriteCount} />
          </IconButton> */}
          {/* <FavoritePopUp
                open={navMenuFavoriteOpen}
                anchorRef={anchorNavFavoriteEl}
                handleOpen={handleNavFavoriteMenuClickOpen}
                handleClose={handleNavFavoriteMenuClickClose}
              /> */}

          {/* <IconButton
            aria-label="Shopping Cart"
            onClick={() => toggleCartDrawer(true)}
            sx={{
              backgroundColor: "inherit",
              "&:hover": {
                backgroundColor: alpha(theme.palette.text.primary, 0.2),
              },
              color: theme.palette.text.primary,
            }}
          >
            <ShoppingBasketOutlinedIcon
              sx={{ fontWeight: 800, fontSize: "1.7rem" }}
            />
            <CustomBadge count={shoppingBasketCount} />
          </IconButton>
          <CartPopUp
            cartItems={cartItems}
            setCartItems={setCartItems}
            toggleCartDrawer={toggleCartDrawer}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
            totalItems={totalItems}
            totalPrice={totalPrice}
            open={open}
            setOpen={setOpen}
          /> */}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            mt: 2,
            gap: 2,
            justifySelf: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center", // Ensure proper alignment
              position: "relative",
              flexDirection: "column",
              justifyContent: "center",
              transition:
                "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
              "&:hover": {
                backgroundColor: alpha(theme.palette.text.primary, 0.2),
                color: theme.palette.secondary.main,
              },
            }}
          >
            {/* Shop Button */}
            <Button
              variant="text"
              disableRipple // Removes default hover ripple
              disableElevation // Removes elevation (shadow)
              sx={{
                cursor: "pointer",
                fontSize: "1.1rem",
                fontWeight: "700",
                padding: "1rem",
                color: theme.palette.text.primary,
                backgroundColor: "transparent",
                transition: "color 0.3s ease-in-out",
                "&:hover": {
                  color: theme.palette.secondary.main,
                },
              }}
            >
              Shop
            </Button>

            {/* IconButton with Smooth Arrow Transition */}
            <IconButton
              onClick={toggleShopMenuDropdown}
              disableRipple
              sx={{
                position: "absolute",
                right: "5rem",
                cursor: "pointer",
                fontSize: "1.1rem",
                fontWeight: "700",
                padding: "1rem",
                backgroundColor: "transparent",
                color: theme.palette.text.primary,
                transition: "color 0.3s ease-in-out",
                "&:hover": {
                  color: theme.palette.secondary.main,
                },
              }}
            >
              <KeyboardArrowRightIcon
                sx={{
                  transform: shopMenuDropdown
                    ? "rotate(90deg)"
                    : "rotate(0deg)",
                  transition: "transform 0.3s ease-in-out",
                }}
              />
            </IconButton>
          </Box>
          <motion.div
            initial={{ height: 0, opacity: 0, display: "none" }}
            animate={{
              height: shopMenuDropdown ? "auto" : 0,
              opacity: shopMenuDropdown ? 1 : 0,
              display: shopMenuDropdown ? "block" : "none",
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{
              overflow: "hidden",
              display: shopMenuDropdown ? "block" : "none",
              //backgroundColor: "inherit",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "inherit",
                zIndex: 10,
                transition: "transform 0.8s ease-in-out",
              }}
            >
              {categories?.map((category) => (
                <Button key={category._id} sx={{ padding: "1rem 2rem" }}>
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      fontWeight: 500,
                      color: theme.palette.text.primary,
                      "&:hover": {
                        textDecoration: "underline",
                        color: theme.palette.primary.main,
                      },
                    }}
                    component={Link}
                    to={`/shop/${category.linkName}`}
                    onClick={closeNavMenuOpenAndDrawer}
                  >
                    {category.title}
                  </Typography>
                </Button>
              ))}
            </Box>
          </motion.div>
          <Button
            variant="text"
            color={theme.palette.text.primary}
            component={Link}
            to="/new"
            onClick={handleNavDrawerClose}
            sx={{
              padding: "1rem",
              fontSize: "1.1rem",
              fontWeight: "700",
              backgroundColor: "inherit",
              "&:hover": {
                backgroundColor: alpha(theme.palette.text.primary, 0.2),
                color: theme.palette.secondary.main,
              },
            }}
          >
            New
          </Button>
          <Button
            variant="text"
            component={Link}
            to="/brands"
            color={theme.palette.text.primary}
            onClick={handleNavDrawerClose}
            sx={{
              fontSize: "1.1rem",
              padding: "1rem",
              fontWeight: "700",
              backgroundColor: "inherit",
              "&:hover": {
                backgroundColor: alpha(theme.palette.text.primary, 0.2),
                color: theme.palette.secondary.main,
              },
            }}
          >
            Brands
          </Button>
          <Button
            variant="text"
            component={Link}
            to="/sale"
            color={theme.palette.text.primary}
            onClick={handleNavDrawerClose}
            sx={{
              fontSize: "1.1rem",
              padding: "1rem",
              fontWeight: "700",
              backgroundColor: "inherit",
              "&:hover": {
                backgroundColor: alpha(theme.palette.text.primary, 0.2),
                color: theme.palette.secondary.main,
              },
            }}
          >
            Sale
          </Button>
          {/* <Button
            variant="text"
            component={Link}
            to="/sale"
            color={theme.palette.text.primary}
            onClick={handleNavDrawerClose}
            sx={{
              display: { xs: "flex", sm: "none" },
              fontSize: "1.1rem",
              padding: "1rem",
              fontWeight: "700",
              backgroundColor: "inherit",
              "&:hover": {
                backgroundColor: alpha(theme.palette.text.primary, 0.2),
                color: theme.palette.secondary.main,
              },
            }}
          >
            Account
          </Button> */}
        </Box>
        <Box
          sx={{
            position: "absolute",
            display: { xs: "flex", sm: "none" },
            width: "100%",
            justifyContent: "space-between",
            padding: "1rem 2rem",
            bottom: 0,
          }}
        >
          <Button
            component={Link}
            to="/login"
            onClick={handleNavDrawerClose}
            sx={{
              color: darken(theme.palette.primary.main, 0.3),
              fontSize: "1rem",
              "&:hover": { color: theme.palette.primary.main },
            }}
          >
            Sign In
          </Button>
          <Button
            component={Link}
            to="/register"
            onClick={handleNavDrawerClose}
            sx={{
              color: darken(theme.palette.primary.main, 0.3),
              fontSize: "1rem",
              "&:hover": { color: theme.palette.primary.main },
            }}
          >
            Create Account
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default NavSmallScreenDrawer;
