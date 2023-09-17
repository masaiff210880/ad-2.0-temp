const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const CategorySchema = mongoose.Schema(
  {
    categoryLogo: {
      type: String,
      trim: true,
      required: false
    },
    categoryName: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    priority: {
      type: Number,
      enum: [0, 1, 2, 3],
      default: 0
    },
    productsId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products"
      }
    ],
    subCategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subcategories"
      }
    ],
    disable: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const CATEGORY_MODEL = mongoose.model("categories", CategorySchema);
module.exports = CATEGORY_MODEL;
