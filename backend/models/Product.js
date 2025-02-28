import mongoose from "mongoose";
import Review from "./Review.js";
import VariantSchema from "./Variant.js";
import User from "./User.js";
import { Category } from "./Category.js";

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    brandName: {
      type: String,
      required: true,
      index: true,
    },
    benefits: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    howToUse: {
      type: [String],
      required: true,
    },
    variantTypeCategory: {
      type: [String],
      required: [true, "Need a variant option"],
    },
    variantTypeValues: {
      type: [String],
      required: [true, "Need the variant values"],
    },
    variants: {
      type: [VariantSchema], // Array of variant objects
      required: true, // Ensures variants are provided
    },
    primaryCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      index: true,
    },
    secondaryCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      index: true,
    },
    tertiaryCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      index: true,
    },
    quaternaryCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      index: true,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    favoriteCount: { type: Number, default: 0 },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-of-stock"],
        message: "status can't be {VALUE} ",
      },
      default: "in-stock",
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isBestSelling: {
      type: Boolean,
      default: false,
    },
    forYou: {
      type: Boolean,
      default: false,
    },
    isTrending: {
      type: Boolean,
      default: false,
    },
    newArrival: {
      type: Boolean,
      default: false,
    },
    deliveryType: {
      type: String,
      enum: ["None", "Pickup", "Same-Day Delivery", "Exclusive"],
      default: "None",
      index: true,
    },
    shippingPreference: {
      type: String,
      enum: ["None", "Exclusive", "Limited Time", "Online-Only"],
      default: "None",
      index: true,
    },
    slug: { type: String, unique: true }, // Unique index
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    sellCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
ProductSchema.index({
  primaryCategory: 1,
  secondaryCategory: 1,
  tertiaryCategory: 1,
  quaternaryCategory: 1,
  "variants.onSale": 1, // Filters onSale
  "variants.salePrice": 1, // Sorts sale price
  "variants.price": 1, // Sorts normal price
});
ProductSchema.index({
  primaryCategory: 1,
  secondaryCategory: 1,
  tertiaryCategory: 1,
  quaternaryCategory: 1,
  rating: -1,
});
ProductSchema.index({
  primaryCategory: 1,
  secondaryCategory: 1,
  tertiaryCategory: 1,
  quaternaryCategory: 1,
  deliveryType: 1,
});
ProductSchema.index({
  primaryCategory: 1,
  secondaryCategory: 1,
  tertiaryCategory: 1,
  quaternaryCategory: 1,
  shippingPreference: 1,
});
ProductSchema.index({
  primaryCategory: 1,
  secondaryCategory: 1,
  tertiaryCategory: 1,
  quaternaryCategory: 1,
  brandName: 1,
});
ProductSchema.index({ name: "text", description: "text", brandName: "text" });

// Helper function to generate slugs
const slugify = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

// Pre-save hook to generate slug
ProductSchema.pre("save", async function (next) {
  if (!this.slug) {
    // Use the ObjectId to create a unique base slug
    const baseSlug = `${slugify(this.name || "default-product-name")}-${
      this._id
    }`;

    // Check for unique slugs (though using ObjectId ensures uniqueness)
    let uniqueSlug = baseSlug;
    let counter = 1;

    while (await mongoose.models.Product.findOne({ slug: uniqueSlug })) {
      uniqueSlug = `${baseSlug}-${counter}`;
      counter++;
    }

    this.slug = uniqueSlug; // Assign the unique slug
  }
  next();
});

// Virtual for calculating sale type (discount percentage)
ProductSchema.virtual("saleType").get(function () {
  if (this.onSale && this.salePrice) {
    const discountPercentage =
      ((this.price - this.salePrice) / this.price) * 100;
    return `${discountPercentage.toFixed(2)}%`; // Rounded to 2 decimal places
  }
  return null; // No sale type if `onSale` is false
});

ProductSchema.virtual("minVariantPrice").get(function () {
  if (
    !this.variants ||
    !Array.isArray(this.variants) ||
    this.variants.length === 0
  ) {
    return null; // Return null if variants are missing
  }

  return Math.min(
    ...this.variants.map((variant) =>
      variant.onSale ? variant.salePrice : variant.price
    )
  );
});

ProductSchema.virtual("maxVariantPrice").get(function () {
  if (
    !this.variants ||
    !Array.isArray(this.variants) ||
    this.variants.length === 0
  ) {
    return null; // Return null if variants are missing
  }

  return Math.max(
    ...this.variants.map((variant) =>
      variant.onSale ? variant.salePrice : variant.price
    )
  );
});

// To include virtuals when converting the document to JSON or Object
ProductSchema.set("toJSON", { virtuals: true });
ProductSchema.set("toObject", { virtuals: true });

const Product = mongoose.model("Product", ProductSchema);

export default Product;
