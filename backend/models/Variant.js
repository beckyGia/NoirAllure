import mongoose from "mongoose";

const VariantSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Variant name is required"],
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    ingredients: {
      type: [String],
      required: [true, "Ingredients are required"],
    },
    price: {
      type: Number,
      min: 0,
      required: [true, "Price is required"],
    },
    onSale: {
      type: Boolean,
      default: false,
      required: [true, "onSale status is required"],
    },
    salePrice: {
      type: Number,
      min: 0,
      validate: {
        validator: function (value) {
          return (
            !this.onSale ||
            (value !== null && value !== undefined && value < this.price)
          );
        },
        message: "Sale price must be less than the regular price when on sale",
      },
    },
    sizeName: {
      type: String,
      validate: {
        validator: function (value) {
          // You would pass variantTypeCategory here dynamically
          const variantTypeCategory = this.variantTypeCategory || []; // Get from the parent or passed directly
          return (
            !variantTypeCategory?.includes("size") ||
            (value && value.trim().length > 0)
          );
        },
        message:
          "sizeName is required when variantTypeCategory includes 'size'",
      },
    },
    size: {
      type: String,
      validate: {
        validator: function (value) {
          const hasShade =
            Array.isArray(this.variantTypeCategory) &&
            this.variantTypeCategory?.includes("shade");
          return !hasShade || (value && value.trim().length > 0);
        },
        message: "size is required when variantTypeCategory includes 'shade'",
      },
    },
    iconUrl: {
      type: String,
      validate: {
        validator: function (value) {
          const hasShade =
            Array.isArray(this.variantTypeCategory) &&
            this.variantTypeCategory?.includes("shade");
          return !hasShade || (value && value.trim().length > 0);
        },
        message:
          "iconUrl is required when variantTypeCategory includes 'shade'",
      },
    },
    imageUrls: {
      type: [String],
      required: [true, "At least one image is required"],
      validate: {
        validator: function (value) {
          return Array.isArray(value) && value.length > 0;
        },
        message: "At least one image must be provided",
      },
    },
  },
  {
    timestamps: true,
  }
);

export default VariantSchema;
