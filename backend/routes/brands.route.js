import express from "express";
const router = express.Router();
import {
  getBrands,
  getFilteredProductsByBrand,
} from "../controllers/brand.controller.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";

router.route("/").get(getBrands);
router.route("/filters/:brandName/:linkName").get(getFilteredProductsByBrand);

// Declare brandRoutes and then export it
const brandRoutes = router;

export default brandRoutes;
