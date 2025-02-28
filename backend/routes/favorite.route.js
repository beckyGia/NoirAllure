import express from "express";
const router = express.Router();
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/create").post();
router.route("/get").get();

const favoriteRoutes = router;

export default favoriteRoutes;
