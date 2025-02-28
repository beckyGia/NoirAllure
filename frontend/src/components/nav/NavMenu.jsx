import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Button,
  useTheme,
  Toolbar,
  Collapse,
  Typography,
  useMediaQuery,
} from "@mui/material";
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
import LocalMallRoundedIcon from "@mui/icons-material/LocalMallRounded";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import CloseIcon from "@mui/icons-material/Close";
import { darken } from "@mui/material/styles";
import { Link } from "react-router-dom";
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
import NavSmallScreenDrawer from "./NavSmallScreenDrawer";
import NavSearchInput from "./NavSearchInput";

const drawerWidth = "22rem";

// const Fade = React.forwardRef(function Fade(props, ref) {
//   const {
//     children,
//     in: smallSearchModalOpen,
//     onClick,
//     onEnter,
//     onExited,
//     ownerState,
//     ...other
//   } = props;
//   const style = useSpring({
//     from: { opacity: 0 },
//     to: { opacity: smallSearchModalOpen ? 1 : 0 },
//     onStart: () => {
//       if (smallSearchModalOpen && onEnter) {
//         onEnter(null, true);
//       }
//     },
//     onRest: () => {
//       if (!smallSearchModalOpen && onExited) {
//         onExited(null, true);
//       }
//     },
//   });

//   return (
//     // @ts-expect-error https://github.com/pmndrs/react-spring/issues/2341
//     <animated.div ref={ref} style={style} {...other}>
//       {React.cloneElement(children, { onClick })}
//     </animated.div>
//   );
// });

// Fade.propTypes = {
//   children: PropTypes.element.isRequired,
//   in: PropTypes.bool,
//   onClick: PropTypes.any,
//   onEnter: PropTypes.func,
//   onExited: PropTypes.func,
//   ownerState: PropTypes.any,
// };

const NavMenu = ({
  searchOpen,
  setSearchOpen,
  toggleSearchOpen,
  toggleSmallSearchOpen,
  drawerNavMenuOpen,
  shopMenuDropdown,
  handleNavDrawerClose,
  toggleShopMenuDropdown,
  handleNavDrawerOpen,
  closeNavMenuOpenAndDrawer,
  handleSmallSearchModalOpen,
  handleSmallSearchModalClose,
  smallSearchModalOpen,
  searchTerm,
  setSearchTerm,
  handleSearch,
  searchResults,
  searchLoading,
  searchError,
}) => {
  const theme = useTheme();
  const anchorNavProfileEl = useRef(null);
  const anchorNavFavoriteEl = useRef(null);
  const imageSrc =
    theme.palette.mode === "light"
      ? "/icons/lightMode.png"
      : "/icons/darkMode.png";
  const [shoppingBasketCount, setShoppingBasketCount] = useState(0);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [drawerNavProfileMenuOpen, setDrawerNavProfileMenuOpen] =
    useState(false);
  const [navMenuFavoriteOpen, setNavMenuFavoriteOpen] = useState(false);
  let timeout;

  const toggleNavProfileMenuClick = (event) => {
    setDrawerNavProfileMenuOpen((previousOpen) => !previousOpen);
    setNavMenuFavoriteOpen(false);
  };

  const handleNavProfileMenuClickOpen = (event) => {
    clearTimeout(timeout);
    setDrawerNavProfileMenuOpen(true);
    setNavMenuFavoriteOpen(false);
  };

  const handleNavProfileMenuClickClose = () => {
    timeout = setTimeout(() => {
      setDrawerNavProfileMenuOpen(false);
    }, 200);
  };

  const handleNavFavoriteMenuClickOpen = (event) => {
    clearTimeout(timeout);
    setNavMenuFavoriteOpen(true);
    setDrawerNavProfileMenuOpen(false);
  };

  const handleNavFavoriteMenuClickClose = () => {
    timeout = setTimeout(() => {
      setNavMenuFavoriteOpen(false);
    }, 200);
  };

  const { data: categories, isLoading, error } = useGetPrimaryCategoriesQuery();

  const toggleCartDrawer = () => {
    setCartOpen((prev) => !prev);
  };

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Premium Sports Shoes",
      price: 129.99,
      size: "42",
      rating: 4.5,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    },
    {
      id: 2,
      name: "Designer Leather Bag",
      price: 89.99,
      size: "M",
      rating: 4,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa",
    },
    {
      id: 3,
      name: "Casual Denim Jacket",
      price: 149.99,
      size: "L",
      rating: 5,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0",
    },
  ]);

  const updateQuantity = (id, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          display: { xs: "flex" },
          //width: { xs: "50%", sm: "50%", md: "40%" },
          color: theme.palette.text.primary,
          //"& button": { m: 2 },
          gap: { xs: 0, sm: 0.5 },
        }}
      >
        <IconButton
          aria-label="Search"
          onClick={toggleSearchOpen}
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
        <IconButton
          ref={anchorNavProfileEl}
          aria-label="Account"
          onClick={toggleNavProfileMenuClick}
          //onMouseEnter={handleNavProfileMenuClickOpen}
          //onMouseLeave={handleNavProfileMenuClickClose}
          sx={{
            backgroundColor: "inherit",
            "&:hover": {
              backgroundColor: alpha(theme.palette.text.primary, 0.2),
            },
            color: theme.palette.text.primary,
          }}
        >
          <AccountCircleRoundedIcon
            sx={{ fontWeight: 800, fontSize: "1.9rem" }}
          />
          {/* <FaceIcon sx={{ fontWeight: 800, fontSize: "1.7rem" }} /> */}
        </IconButton>
        <AuthPopUp
          open={drawerNavProfileMenuOpen}
          anchorRef={anchorNavProfileEl}
          handleOpen={handleNavProfileMenuClickOpen}
          handleClose={handleNavProfileMenuClickClose}
        />

        <IconButton
          ref={anchorNavFavoriteEl}
          aria-label="Favorite"
          component={Link}
          to="/loves"
          onClick={handleNavFavoriteMenuClickClose}
          onMouseEnter={handleNavFavoriteMenuClickOpen}
          onMouseLeave={handleNavFavoriteMenuClickClose}
          sx={{
            backgroundColor: "inherit",
            "&:hover": {
              backgroundColor: alpha(theme.palette.text.primary, 0.2),
            },
            color: theme.palette.text.primary,
          }}
        >
          {/* <FavoriteIcon sx={{ fontWeight: 800, fontSize: "1.7rem" }} /> */}
          <FavoriteBorderIcon sx={{ fontWeight: 800, fontSize: "1.7rem" }} />
          <CustomBadge count={favoriteCount} />
        </IconButton>
        <FavoritePopUp
          open={navMenuFavoriteOpen}
          anchorRef={anchorNavFavoriteEl}
          handleOpen={handleNavFavoriteMenuClickOpen}
          handleClose={handleNavFavoriteMenuClickClose}
        />
        <IconButton
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
          {/* <ShoppingBasketIcon
            sx={{
              fontWeight: 800,
              fontSize: "1.7rem",
            }}
          /> */}
          {/* <ShoppingBasketOutlinedIcon
            sx={{ fontWeight: 800, fontSize: "1.7rem" }}
          /> */}
          <LocalMallRoundedIcon sx={{ fontWeight: 800, fontSize: "1.7rem" }} />
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
          open={cartOpen}
          setOpen={setCartOpen}
        />
      </Box>
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          marginLeft: 1,
          height: "100%",
        }}
      >
        <IconButton
          aria-label="Menu"
          onClick={handleNavDrawerOpen}
          sx={{
            backgroundColor: "inherit",
            "&:hover": {
              backgroundColor: alpha(theme.palette.text.primary, 0.2),
            },
            color: theme.palette.text.primary,
          }}
        >
          <MenuIcon sx={{ fontWeight: 800, fontSize: "1.7rem" }} />
        </IconButton>
        <NavSmallScreenDrawer
          drawerNavMenuOpen={drawerNavMenuOpen}
          drawerWidth={drawerWidth}
          handleNavDrawerClose={handleNavDrawerClose}
          smallSearchModalOpen={smallSearchModalOpen}
          handleSmallSearchModalOpen={handleSmallSearchModalOpen}
          handleSmallSearchModalClose={handleSmallSearchModalClose}
          shopMenuDropdown={shopMenuDropdown}
          toggleShopMenuDropdown={toggleShopMenuDropdown}
          // cartItems={cartItems}
          // setCartItems={setCartItems}
          // toggleCartDrawer={toggleCartDrawer}
          // updateQuantity={updateQuantity}
          // removeItem={removeItem}
          // totalItems={totalItems}
          // totalPrice={totalPrice}
          // shoppingBasketCount={shoppingBasketCount}
          // open={cartOpen}
          // setOpen={setCartOpen}
          favoriteCount={favoriteCount}
          closeNavMenuOpenAndDrawer={closeNavMenuOpenAndDrawer}
          categories={categories}
          imageSrc={imageSrc}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
          searchResults={searchResults}
          searchLoading={searchLoading}
          searchError={searchError}
        />
      </Box>
    </Box>
  );
};

export default NavMenu;

//     {smallScreen ? (
//       <IconButton onClick={handleMenuToggle} color="inherit">
//         <MenuIcon />
//       </IconButton>
//     ) : (
//       <>
//         <Button color="inherit">Home</Button>
//         <Button color="inherit">About</Button>
//         <Button color="inherit">Contact</Button>
//       </>
//     )}
//   </Toolbar>

//   {/* Fullscreen Menu Drawer */}
//   <Drawer
//     anchor="right"
//     open={menuOpen}
//     onClose={handleMenuToggle}
//     PaperProps={{
//       sx: { width: "100%", textAlign: "center" },
//     }}
//   >
//     <List>
//       <ListItem button onClick={handleMenuToggle}>
//         <CloseIcon />
//       </ListItem>
//       <ListItem button>
//         <ListItemText primary="Home" />
//       </ListItem>
//       <ListItem button>
//         <ListItemText primary="About" />
//       </ListItem>
//       <ListItem button>
//         <ListItemText primary="Contact" />
//       </ListItem>
//     </List>
//   </Drawer>
