import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  linkName: { type: String, required: true, unique: true },
  image: {
    type: String,
    validate: {
      validator: function () {
        return this.level === "primary" || !this.image;
      },
      message: "Only primary categories can have an image",
    },
  },
  level: {
    type: String,
    required: true,
    enum: ["primary", "secondary", "tertiary", "quaternary"], // Category levels
  },
  parentCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }, // Reference to parent category
  subCategories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }], // Reference to child categories
  productCount: { type: Number, default: 0 },
});

// Unique index for primary categories
CategorySchema.index({ title: 1, level: "primary" }, { unique: true });
CategorySchema.index({ title: 1, parentCategoryId: 1 }, { unique: true });
CategorySchema.index(
  { title: 1, level: { $ne: "primary" } },
  { unique: false }
);

const Category = mongoose.model("Category", CategorySchema);

export { Category };
