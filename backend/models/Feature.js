const mongoose = require("mongoose");

const FeatureSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    title: { type: String, required: true },
    slogan: { type: String, required: true },
    btnName: { type: String, required: true },
  },
  { timestamps: true }
);

const Feature = mongoose.model("Feature", FeatureSchema);

export default Feature;
