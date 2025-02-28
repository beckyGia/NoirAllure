import express from "express";
const router = express.Router();
import {
  getSaleShippingPreferenceByCategory,
  getSaleDeliveryTypeByCategory,
  getSaleBrandsByCategory,
  getSaleNewlyArrivedByCategory,
  getSaleProductRatingCountsByCategory,
  getSaleFilteredProductsByCategory,
} from "../controllers/sale.controller.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";

router
  .route("/:linkName/rating-count")
  .get(getSaleProductRatingCountsByCategory);
router.route("/:linkName/delivery").get(getSaleDeliveryTypeByCategory);
router.route("/:linkName/shipping").get(getSaleShippingPreferenceByCategory);
router.route("/:linkName/new").get(getSaleNewlyArrivedByCategory);
router.route("/:linkName/brands").get(getSaleBrandsByCategory);
router.route("/filters/:linkName").get(getSaleFilteredProductsByCategory);

// Declare saleRoutes and then export it
const saleRoutes = router;

export default saleRoutes;
