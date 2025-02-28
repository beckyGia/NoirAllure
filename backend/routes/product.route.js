import express from "express";
const router = express.Router();
import {
  getProductById,
  getAllProducts,
  //getProductsByCategory,
  getFeaturedProducts,
  getBestSellingProducts,
  getNewlyArrivedProducts,
  getForYouProducts,
  getProductRatingCountsByCategory,
  getDeliveryTypeCountsByCategory,
  getShippingPreferenceCountsByCategory,
  getNewlyArrivedCountsByCategory,
  getIsTrendingProducts,
  getBrandCountByCategory,
  getFilteredProductsByCategory,
  getSaleCountByCategory,
  getSimilarProductsOfASingleProduct,
} from "../controllers/product.controller.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";

router.route("/:linkName/rating-count").get(getProductRatingCountsByCategory);
router.route("/:linkName/delivery").get(getDeliveryTypeCountsByCategory);
router.route("/:linkName/shipping").get(getShippingPreferenceCountsByCategory);
router.route("/:linkName/new").get(getNewlyArrivedCountsByCategory);
router.route("/:linkName/sale").get(getSaleCountByCategory);
router.route("/:linkName/brands").get(getBrandCountByCategory);
router.route("/filters/:linkName").get(getFilteredProductsByCategory);
//router.route("/:level/:categoryId").get(getProductsByCategory);
router.route("/").get(protect, admin, getAllProducts);
router.route("/featured").get(getFeaturedProducts);
router.route("/bestselling").get(getBestSellingProducts);
router.route("/new").get(getNewlyArrivedProducts);
router.route("/for-you").get(getForYouProducts);
router.route("/trending").get(getIsTrendingProducts);
router
  .route("/:id/similar")
  .get(checkObjectId, getSimilarProductsOfASingleProduct);
router.route("/:id").get(checkObjectId, getProductById);

// Declare productRoutes and then export it
const productRoutes = router;

export default productRoutes;
