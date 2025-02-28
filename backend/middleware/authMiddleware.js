import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/User.js";

export const protect = asyncHandler(async (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    console.log(error);
    res.status(401);
    throw new Error("Not Authorized, Invalid Access Token");
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      res.status(401);
      throw new Error("User Not Found");
    }

    req.user = user;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.status(401);
      throw new Error("Not Authorized, Access Token Expired");
    } else {
      console.log(error);
      res.status(401);
      throw new Error("Not Authorized, Access Token Failed");
    }
  }
});

export const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403);
    throw new Error("Not Authorized! Admin Only");
  }
};
