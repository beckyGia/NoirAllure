import mongoose from "mongoose";
import User from "./User.js";
import Product from "./Product.js";

const ReviewSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
    isRecommended: { type: Boolean, default: false },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", ReviewSchema);

export default Review;
