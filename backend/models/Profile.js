import mongoose from "mongoose";
import User from "./User.js";

// Define the Profile schema
const ProfileSchema = mongoose.Schema(
  {
    skinType: {
      type: String,
      enum: ["Combination", "Dry", "Normal", "Oily"],
    },
    skinConcerns: {
      type: [String],
      enum: [
        "Acne/Blemishes",
        "Anti-aging",
        "Dark Circles",
        "Dark Spots",
        "Dryness",
        "Uneven Texture",
        "Fine Lines / Wrinkles",
        "Loss of Firmness / Elasticity",
        "Pores",
        "Puffiness",
        "Redness",
        "Uneven Skin Tone",
        "Not sure",
      ],
      default: [],
      validate: {
        validator: function (value) {
          // Check if the value is an array and if each value is part of the enum
          if (!Array.isArray(value)) return false;
          return value.every((v) =>
            [
              "Acne/Blemishes",
              "Anti-aging",
              "Dark Circles",
              "Dark Spots",
              "Dryness",
              "Uneven Texture",
              "Fine Lines / Wrinkles",
              "Loss of Firmness / Elasticity",
              "Pores",
              "Puffiness",
              "Redness",
              "Uneven Skin Tone",
              "Not sure",
            ].includes(v)
          );
        },
        message: "Invalid skin concern(s) selected.",
      },
    },
    skinTone: {
      type: String,
      enum: [
        "Rich",
        "Deep",
        "Tan",
        "Medium Tan",
        "Medium",
        "Light Medium",
        "Light",
        "Fair",
        "Fair Light",
        "Not Sure",
      ],
    },
    hairType: {
      type: String,
      enum: ["Fine", "Medium", "Thick"],
    },
    hairTexture: {
      type: String,
      enum: ["Straight", "Wavy", "Curly", "Coily"],
    },
    hairConcerns: {
      type: [String],
      enum: [
        "Brassiness",
        "Color Fading",
        "Color Safe",
        "Curl Enhancing",
        "Damage / Split Ends",
        "Dandruff",
        "Dryness",
        "Flaky / Dry Scalp",
        "Frizz",
        "Heat Protection",
        "Hold & Style Extending",
        "Oily Scalp",
        "Scalp Build Up",
        "Shine",
        "Straightening / Smoothing",
        "Thinning",
        "UV Protection",
        "Volumizing",
        "Not Sure",
      ],
      default: [],
      validate: {
        validator: function (value) {
          // Check if the value is an array and if each value is part of the enum
          if (!Array.isArray(value)) return false;
          return value.every((v) =>
            [
              "Brassiness",
              "Color Fading",
              "Color Safe",
              "Curl Enhancing",
              "Damage / Split Ends",
              "Dandruff",
              "Dryness",
              "Flaky / Dry Scalp",
              "Frizz",
              "Heat Protection",
              "Hold & Style Extending",
              "Oily Scalp",
              "Scalp Build Up",
              "Shine",
              "Straightening / Smoothing",
              "Thinning",
              "UV Protection",
              "Volumizing",
              "Not Sure",
            ].includes(v)
          );
        },
        message: "Invalid hair concern(s) selected.",
      },
    },
    hairColor: {
      type: String,
      enum: ["Black", "Brown", "Blonde", "Auburn", "Red", "Gray"],
    },
    eyeColor: {
      type: String,
      enum: ["Blue", "Brown", "Green", "Gray", "Hazel"],
    },
    ageRange: {
      type: String,
      enum: ["16+", "20s", "30s", "40s", "50+"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// Create the Profile model
const Profile = mongoose.model("Profile", ProfileSchema);

export default Profile;
