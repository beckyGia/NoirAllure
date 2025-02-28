import express from "express";
const router = express.Router();
import { searchProducts } from "../controllers/search.controller.js";
import checkObjectId from "../middleware/checkObjectId.js";

router.route("/").get(searchProducts);

const searchRoutes = router;

export default searchRoutes;
