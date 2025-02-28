import React, { useState } from "react";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import {
  IconButton,
  Container,
  Divider,
  Rating,
  useMediaQuery,
} from "@mui/material";
import { useTheme, styled, lighten, darken } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import ScrollbarWrapper from "./ScrollBarWrapper";
import Grid from "@mui/material/Grid2";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ProductDetailsQuick from "./ProductDetailsQuick";
import { useSpring, animated } from "@react-spring/web";
import AddToBasket from "../products/AddToBasketBtn";

const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    //in: open,
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

const getStyle = (theme) => ({
  position: "absolute",
  top: "10%",
  left: "50%",
  borderRadius: "1rem",
  transform: "translate(-50%, -10%)",
  width: "95%",
  bgcolor: theme.palette.background.default, // Now works!
  boxShadow: 24,
  p: 1,
  maxHeight: "70%",
  overflow: "auto",
  //paddingRight: "1rem",
});

const ProductImage = styled("img")(({ theme }) => ({
  width: "25rem",
  //height: "14rem",
  aspectRatio: "4 / 4",
  objectFit: "cover",
  cursor: "zoom-in",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const ThumbnailImage = styled("img")(({ theme, isSelected }) => ({
  width: "6rem",
  height: "6rem",
  objectFit: "cover",
  cursor: "pointer",
  border: isSelected ? `3px solid ${theme.palette.primary.main}` : "none",
  transition: "all 0.2s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    border: `3px solid ${theme.palette.primary.light}`,
  },
}));

const ProductModal = ({ open, handleClose, product }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [addWishlist, setAddWishlist] = useState(false);

  const name = product?.name || "";
  const rating = product?.rating || "";
  const brandName = product?.brandName || "";
  const isNew = product?.newArrival || "";
  const benefits = product?.benefits || "";
  const status = product?.status || 0;
  const numReviews = product?.numReviews || "";
  const description = product?.description || "";
  const howToUse = product?.howToUse || [];
  const variants = product?.variants || [];
  const variantTypeValues = product?.variantTypeValues || "";
  const variantTypeCategory = product?.variantTypeCategory || "";
  let favorites = 89;
  const selectedVariant = variants[selectedVariantIndex] || {};
  const imageIcons = selectedVariant?.imageUrls || [];
  //const thumbnailContainerRef = useRef(null);

  // console.log("selectedVariant:", selectedVariant);
  // console.log("selectedVariantIndex:", selectedVariantIndex);
  // console.log("variants:", variants);

  const cleanedDescription = removeBuySentences(description);

  function removeBuySentences(text) {
    return text
      .split(". ") // Split text into sentences
      .filter((sentence) => !sentence.trim().toLowerCase().startsWith("buy")) // Remove sentences starting with "Buy"
      .join(". "); // Rejoin sentences
  }

  const handleQuantityChange = (event) => {
    setQuantity(Math.max(1, parseInt(event.target.value) || 1));
  };

  return (
    <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      disableEnforceFocus
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          TransitionComponent: Fade,
        },
      }}
    >
      <Fade in={open}>
        <ScrollbarWrapper>
          <Box sx={(theme) => getStyle(theme)}>
            <IconButton
              onClick={handleClose}
              aria-label="Close Menu Drawer"
              sx={{
                position: "absolute",
                right: "0",
                top: "0",
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
            <Container
              maxWidth="lg"
              sx={{
                padding: "1rem 1rem 2rem",
                display: "flex",
                flexDirection: { xs: "column" },
                alignItems: { xs: "center", sm: "flex-start" },
                overflowX: "hidden",
              }}
            >
              {isSmallScreen ? (
                <>
                  <Box
                    sx={{
                      ml: { md: 4 },
                      mb: 1,
                      display: "flex",
                      alignSelf: "flex-start",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <Box>
                      <Link
                        style={{
                          fontWeight: 700,
                          fontSize: "1rem",
                          letterSpacing: 1,
                        }}
                      >
                        {brandName}
                      </Link>
                      <Typography variant="h4" sx={{ letterSpacing: 1 }}>
                        {name}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        letterSpacing: 1,
                      }}
                    >
                      <Link
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <Rating
                          value={Number(rating)}
                          precision={0.1}
                          readOnly
                          sx={{
                            "& .MuiRating-iconFilled": {
                              fontSize: "0.9rem",
                              color: theme.palette.secondary.main,
                            },
                            "& .MuiRating-iconEmpty": {
                              fontSize: "0.9rem",
                              //color: "transparent",
                              borderColor: theme.palette.text.primary,
                            },
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: "0.8rem",
                            fontWeight: 600,
                            "&:hover": {
                              textDecoration: "underline",
                            },
                          }}
                        >
                          {numReviews} reviews
                        </Typography>
                      </Link>
                      <Divider
                        orientation="vertical"
                        flexItem
                        variant="middle"
                        sx={{
                          borderColor: lighten(theme.palette.text.primary, 0.7), // Custom color
                          height: "1.2rem", // Adjust height
                          borderWidth: "0.01px", // Thickness
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: "0.8rem",
                        }}
                      >
                        <FavoriteIcon sx={{ fontSize: "0.8rem" }} /> {favorites}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      {selectedVariant.onSale ? (
                        <Box
                          sx={{
                            mt: 0.5,
                            display: "flex",
                          }}
                        >
                          <Typography>
                            <span
                              style={{ fontWeight: 600, fontSize: "1.1rem" }}
                            >
                              ${selectedVariant.salePrice}
                            </span>{" "}
                            <span
                              style={{
                                fontWeight: 500,
                                fontSize: "1.1rem",
                                textDecoration: "line-through",
                                color: theme.palette.gray.primary,
                              }}
                            >
                              ${selectedVariant.price}
                            </span>
                          </Typography>
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            mt: 0.5,
                            display: "flex",
                          }}
                        >
                          <Typography
                            sx={{
                              color: theme.palette.text.primary,
                              fontSize: "0.75rem",
                            }}
                          >
                            <span
                              style={{ fontWeight: 600, fontSize: "1.1rem" }}
                            >
                              ${selectedVariant.price}
                            </span>
                          </Typography>
                        </Box>
                      )}
                      <Box
                        sx={{
                          display: "flex",
                          alignContent: "center",
                          position: "absolute",
                          right: "5%",
                          top: "18%",
                        }}
                      >
                        <IconButton
                          sx={{
                            boxShadow: "none",
                            "&:hover": {
                              backgroundColor: "transparent",
                              boxShadow: "none",
                            },
                          }}
                          onClick={() => setAddWishlist((prev) => !prev)}
                        >
                          {addWishlist ? (
                            <FavoriteIcon
                              sx={{
                                fontSize: "2.5rem",
                                color: darken(
                                  theme.palette.secondary.light,
                                  0.1
                                ),
                              }}
                            />
                          ) : (
                            <FavoriteIcon
                              sx={{
                                fontSize: "2.5rem",
                                color: theme.palette.background.default,
                                stroke: theme.palette.text.primary,
                                strokeWidth: "0.3",
                                "&:hover": {
                                  color: darken(
                                    theme.palette.secondary.light,
                                    0.1
                                  ),
                                  stroke: "none",
                                },
                              }}
                            />
                          )}
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column-reverse", md: "row" },
                      alignSelf: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignSelf: { xs: "center", md: "stretch" },
                        flexDirection: { xs: "row", md: "column" },
                        gap: 1,
                        overflowX: { xs: "auto", md: "hidden" },
                        overflowY: { xs: "hidden", md: "auto" },
                        height: { xs: "auto", md: "20rem" },
                        //height: {"20rem"},
                        maxWidth: {
                          xs: "20rem",
                          sm: "30rem",
                          md: "max-content",
                        },
                        //paddingRight: "2rem",
                        "&::-webkit-scrollbar": {
                          width: "6px",
                          backgroundColor: "inherit",
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
                        borderRadius: "6px",
                      }}
                    >
                      {imageIcons.map((image, index) => (
                        <Box key={index} sx={{ flexShrink: 0 }}>
                          <ThumbnailImage
                            src={image}
                            alt={`${image.name} view ${index + 1}`}
                            isSelected={selectedImage === index}
                            onClick={() => setSelectedImage(index)}
                            loading="lazy"
                          />
                        </Box>
                      ))}
                    </Box>
                    <Box
                      sx={{
                        mb: 2,
                        ml: 1,
                        display: "flex",
                        alignSelf: "center",
                      }}
                    >
                      <ProductImage
                        loading="lazy"
                        alt={`${imageIcons[selectedImage]}`}
                        src={imageIcons[selectedImage]}
                      />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      ml: { md: 4 },
                      mb: 3,
                      mt: { xs: 2, md: 0 },
                      display: "flex",
                      alignSelf: "flex-start",
                      flexDirection: "column",
                    }}
                  >
                    <Box sx={{ mb: 2, mt: 1 }}>{cleanedDescription}</Box>
                    <ProductDetailsQuick
                      selectedVariant={selectedVariant}
                      isNew={isNew}
                      variantTypeCategory={variantTypeCategory}
                      variantTypeValues={variantTypeValues}
                      selectedVariantIndex={selectedVariantIndex}
                      variants={variants}
                      setSelectedVariantIndex={setSelectedVariantIndex}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      mb: 1.5,
                      justifyContent: "center",
                      alignSelf: "center",
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.25 }}
                    >
                      <Button
                        variant="outlined"
                        component={Link}
                        onClick={handleClose}
                        to={`/product/${product._id}`}
                        sx={{
                          height: "3rem",
                          width: "12rem",
                          borderRadius: "2rem",
                          borderColor: theme.palette.secondary.main,
                          color: theme.palette.secondary.main,
                          fontWeight: 600,
                          padding: "0.5rem 1rem",
                          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Same box shadow
                          transition:
                            "background-color 0.2s ease, box-shadow 0.2s ease",
                          "&:hover": {
                            backgroundColor: lighten(
                              theme.palette.secondary.main,
                              0.4
                            ),
                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
                          },
                        }}
                      >
                        View Details
                      </Button>
                    </Box>
                    <AddToBasket />
                  </Box>
                </>
              ) : (
                <>
                  <Box
                    sx={{
                      width: "100%",
                      mt: 2,
                      display: "flex",
                      position: "relative",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: { md: "row" },
                        //alignSelf: "center",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignSelf: { xs: "center", md: "stretch" },
                          flexDirection: { xs: "row", md: "column" },
                          gap: 1,
                          overflowX: { xs: "auto", md: "hidden" },
                          overflowY: { xs: "hidden", md: "auto" },
                          height: { xs: "auto", md: "20rem" },
                          //height: {"20rem"},
                          maxWidth: {
                            xs: "20rem",
                            sm: "30rem",
                            md: "max-content",
                          },
                          //paddingRight: "2rem",
                          "&::-webkit-scrollbar": {
                            width: "6px",
                            backgroundColor: "inherit",
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
                          borderRadius: "6px",
                        }}
                      >
                        {imageIcons.map((image, index) => (
                          <Box key={index} sx={{ flexShrink: 0 }}>
                            <ThumbnailImage
                              src={image}
                              alt={`${image.name} view ${index + 1}`}
                              isSelected={selectedImage === index}
                              onClick={() => setSelectedImage(index)}
                              loading="lazy"
                            />
                          </Box>
                        ))}
                      </Box>
                      <Box
                        sx={{
                          mb: 2,
                          ml: 1,
                          display: "flex",
                        }}
                      >
                        <ProductImage
                          loading="lazy"
                          alt={`${imageIcons[selectedImage]}`}
                          src={imageIcons[selectedImage]}
                        />
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        ml: { md: 4 },
                        mb: 1,
                        display: "flex",
                        alignSelf: "flex-start",
                        flexDirection: "column",
                        width: "100%",
                      }}
                    >
                      <Box>
                        <Link
                          style={{
                            fontWeight: 700,
                            fontSize: "1rem",
                            letterSpacing: 1,
                          }}
                        >
                          {brandName}
                        </Link>
                        <Typography variant="h4" sx={{ letterSpacing: 1 }}>
                          {name}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          letterSpacing: 1,
                        }}
                      >
                        <Link
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <Rating
                            value={Number(rating)}
                            precision={0.1}
                            readOnly
                            sx={{
                              "& .MuiRating-iconFilled": {
                                fontSize: "0.9rem",
                                color: theme.palette.secondary.main,
                              },
                              "& .MuiRating-iconEmpty": {
                                fontSize: "0.9rem",
                                //color: "transparent",
                                borderColor: theme.palette.text.primary,
                              },
                            }}
                          />
                          <Typography
                            sx={{
                              fontSize: "0.8rem",
                              fontWeight: 600,
                              "&:hover": {
                                textDecoration: "underline",
                              },
                            }}
                          >
                            {numReviews} reviews
                          </Typography>
                        </Link>
                        <Divider
                          orientation="vertical"
                          flexItem
                          variant="middle"
                          sx={{
                            borderColor: lighten(
                              theme.palette.text.primary,
                              0.7
                            ), // Custom color
                            height: "1.2rem", // Adjust height
                            borderWidth: "0.01px", // Thickness
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: "0.8rem",
                          }}
                        >
                          <FavoriteIcon sx={{ fontSize: "0.8rem" }} />{" "}
                          {favorites}
                        </Typography>
                      </Box>
                      <Box>
                        {selectedVariant?.onSale ? (
                          <Box
                            sx={{
                              mt: 0.5,
                              display: "flex",
                            }}
                          >
                            <Typography>
                              <span
                                style={{ fontWeight: 600, fontSize: "1.1rem" }}
                              >
                                ${selectedVariant.salePrice}
                              </span>{" "}
                              <span
                                style={{
                                  fontWeight: 500,
                                  fontSize: "1.1rem",
                                  textDecoration: "line-through",
                                  color: theme.palette.gray.primary,
                                }}
                              >
                                ${selectedVariant.price}
                              </span>
                            </Typography>
                          </Box>
                        ) : (
                          <Box
                            sx={{
                              mt: 0.5,
                              display: "flex",
                            }}
                          >
                            <Typography
                              sx={{
                                color: theme.palette.text.primary,
                                fontSize: "0.75rem",
                              }}
                            >
                              <span
                                style={{ fontWeight: 600, fontSize: "1.1rem" }}
                              >
                                ${selectedVariant?.price}
                              </span>
                            </Typography>
                          </Box>
                        )}
                      </Box>
                      <Box sx={{ mb: 2, mt: 1 }}>{cleanedDescription}</Box>
                      <ProductDetailsQuick
                        selectedVariant={selectedVariant}
                        isNew={isNew}
                        variantTypeCategory={variantTypeCategory}
                        variantTypeValues={variantTypeValues}
                        selectedVariantIndex={selectedVariantIndex}
                        variants={variants}
                        setSelectedVariantIndex={setSelectedVariantIndex}
                      />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      mb: 1.5,
                      justifyContent: "center",
                      alignSelf: "space-evenly",
                      width: "100%",
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.25 }}
                    >
                      <Button
                        variant="outlined"
                        component={Link}
                        onClick={handleClose}
                        to={`/product/${product._id}`}
                        sx={{
                          height: "3rem",
                          width: "12rem",
                          borderRadius: "2rem",
                          borderColor: theme.palette.secondary.main,
                          color: theme.palette.secondary.main,
                          fontWeight: 600,
                          padding: "0.5rem 1rem",
                          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Same box shadow
                          transition:
                            "background-color 0.2s ease, box-shadow 0.2s ease",
                          "&:hover": {
                            backgroundColor: lighten(
                              theme.palette.secondary.main,
                              0.4
                            ),
                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
                          },
                        }}
                      >
                        View Details
                      </Button>
                    </Box>
                    <AddToBasket />
                    <IconButton
                      sx={{
                        boxShadow: "none",
                        "&:hover": {
                          backgroundColor: "transparent",
                          boxShadow: "none",
                        },
                      }}
                      onClick={() => setAddWishlist((prev) => !prev)}
                    >
                      {addWishlist ? (
                        <FavoriteIcon
                          sx={{
                            fontSize: "2.5rem",
                            color: darken(theme.palette.secondary.light, 0.1),
                          }}
                        />
                      ) : (
                        <FavoriteIcon
                          sx={{
                            fontSize: "2.5rem",
                            color: theme.palette.background.default,
                            stroke: theme.palette.text.primary,
                            strokeWidth: "0.3",
                            "&:hover": {
                              color: darken(theme.palette.secondary.light, 0.1),
                              stroke: "none",
                            },
                          }}
                        />
                      )}
                    </IconButton>
                  </Box>
                </>
              )}
            </Container>
          </Box>
        </ScrollbarWrapper>
      </Fade>
    </Modal>
  );
};

export default ProductModal;
