import express from "express";
const router = express.Router();
import {
  getNewBrandsByCategory,
  getNewFilteredProductsByCategory,
  getNewDeliveryTypeByCategory,
  getNewShippingPreferenceByCategory,
  getNewProductRatingCountsByCategory,
  getNewSaleByCategory,
} from "../controllers/new.controller.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";

router
  .route("/:linkName/rating-count")
  .get(getNewProductRatingCountsByCategory);
router.route("/:linkName/delivery").get(getNewDeliveryTypeByCategory);
router.route("/:linkName/sale").get(getNewSaleByCategory);
router.route("/:linkName/shipping").get(getNewShippingPreferenceByCategory);
router.route("/:linkName/brands").get(getNewBrandsByCategory);
router.route("/filters/:linkName").get(getNewFilteredProductsByCategory);

// Declare newRoutes and then export it
const newRoutes = router;

export default newRoutes;
