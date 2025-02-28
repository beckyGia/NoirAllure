import express from "express";
const router = express.Router();
import {
  getPrimaryCategories,
  getCategoryHierarchyAndSubcategories,
  getCategoryHierarchyForSingleProduct,
  getCategoryHierarchyForSearchResults,
  getCategoryHierarchyAndSubcategoriesForSale,
  getCategoryHierarchyAndSubcategoriesForNew,
} from "../controllers/category.controller.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";

router.route("/:linkName").get(getCategoryHierarchyAndSubcategories);
router
  .route("/:linkName/sale")
  .get(getCategoryHierarchyAndSubcategoriesForSale);
router.route("/:linkName/new").get(getCategoryHierarchyAndSubcategoriesForNew);
router.route("/product/search").get(getCategoryHierarchyForSearchResults);
router.route("/product/:productId").get(getCategoryHierarchyForSingleProduct);
router.route("/").get(getPrimaryCategories);

// Declare categoryRoutes and then export it
const categoryRoutes = router;

export default categoryRoutes;
