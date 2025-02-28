import mongoose from "mongoose";
import Review from "./Review.js";
import VariantSchema from "./Variant.js";
import User from "./User.js";
import { Category } from "./Category.js";

const CartSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cartItems: [
    {
      quantity: {
        type: Number,
        default: 1,
        min: 1,
        required: true,
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
  totalAmount: {
    type: Number,
    default: 0,
  },
  totalQuantity: {
    type: Number,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0,
  },
});

// Middleware to update totals before saving
CartSchema.pre("save", async function (next) {
  let totalAmount = 0;
  let totalQuantity = 0;
  let discount = 0;

  // Iterate over cart items to calculate totals
  for (const item of this.cartItems) {
    const product = await mongoose.model("Product").findById(item.product);

    // Calculate the total quantity and amount
    totalQuantity += item.quantity;
    totalAmount += product.price * item.quantity;

    // You can apply your discount logic here if necessary
    // For example, applying a 10% discount on the total amount:
    discount = totalAmount * 0.1; // Example discount of 10%
  }

  this.totalAmount = totalAmount - discount;
  this.totalQuantity = totalQuantity;
  this.discount = discount;

  next();
});

const Cart = mongoose.model("Cart", CartSchema);

export default Cart;
