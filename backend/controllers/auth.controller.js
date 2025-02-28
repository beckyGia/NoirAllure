import asyncHandler from "../middleware/asyncHandler.js";
import { redis } from "../config/redis.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";
import { setAccessCookie, setRefreshCookie } from "../utils/setCookies.js";
import storeRefreshToken from "../utils/storeRefreshToken.js";

// @desc    Register User
// @route   POST /api/auth/signup
// @access  Public
export const signup = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    res.status(400); //Bad Request
    throw new Error("All Fields Are Required");
  }

  // Check if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400); //Bad Request
    throw new Error("User Already Exists");
  }

  // Password validation (at least 6 characters, upper and lower case, special character)
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/;

  if (!passwordRegex.test(password)) {
    res.status(400); // Bad Request
    throw new Error(
      "Password must be at least 6 characters long, contain upper and lower case letters, and include at least one special character"
    );
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  const newUserCoupon = await Coupon.create({
    title: "Welcome To Noir Allure",
    couponCode:
      "WELCOME" + Math.random().toString(36).substring(2, 8).toUpperCase(),
    user: user._id,
    discountPercentage: 15,
    expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    minimumAmount: 1,
    isActive: true,
  });

  if (user) {
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    await storeRefreshToken(user._id, refreshToken);

    setAccessCookie(res, accessToken);
    setRefreshCookie(res, refreshToken);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

// @desc    Login user & get token
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req, res) => {
  const { email, password, rememberMe } = req.body;

  //Find the user
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const refreshToken = generateRefreshToken(user._id);
    const accessToken = generateAccessToken(user._id);

    await storeRefreshToken(user._id, refreshToken);

    setAccessCookie(res, accessToken);
    setRefreshCookie(res, refreshToken, rememberMe);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email Or Password");
  }
});

// @desc    Logout User / clear cookie
// @route   POST /api/auth/logout
// @access  Private
export const logout = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (refreshToken) {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    await redis.del(`refresh_token:${decoded.userId}`);
  }

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out successfully" });
});

// @desc    Refresh Access Token Endpoint
// @route   POST /api/auth/refresh-token
// @access  Private
export const refreshAccessToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    res.status(403); // Forbidden: Client is authenticated but lacks permission
    throw new Error("Refresh Token Not Found, Please Login Again");
  }

  let decoded;
  try {
    decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const storedToken = await redis.get(`refresh_token:${decoded.userId}`);

    if (storedToken !== refreshToken) {
      res.status(401);
      throw new Error("Invalid refresh token");
    }

    // Generate new tokens
    const accessToken = generateAccessToken(decoded.userId);

    // Set the new refresh token in the cookie
    setAccessCookie(res, accessToken);

    res.json({ message: "Token refreshed successfully" });
  } catch (error) {
    // Handle token expiration errors
    if (error.name === "TokenExpiredError") {
      res.status(401);
      throw new Error("Refresh Token Expired, Please Login Again");
    } else {
      res.status(401);
      throw new Error("Invalid Refresh Token");
    }
  }
});
