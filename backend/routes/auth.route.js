import express from "express";
import {
  signup,
  login,
  logout,
  refreshAccessToken,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/refresh-token").post(refreshAccessToken);

const authRoutes = router;
export default authRoutes;
