import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    couponCode: { type: String, required: true },
    discountPercentage: { type: Number, required: true, min: 0, max: 100 },
    minimumAmount: { type: Number, required: true },
    expirationDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Ensure a user can only have one coupon with the same couponCode
CouponSchema.index({ user: 1, couponCode: 1 }, { unique: true });

// Middleware: Set `isActive` to `false` if expired before saving
CouponSchema.pre("save", function (next) {
  if (this.expirationDate < new Date()) {
    this.isActive = false;
  }
  next();
});

const Coupon = mongoose.model("Coupon", CouponSchema);
export default Coupon;
