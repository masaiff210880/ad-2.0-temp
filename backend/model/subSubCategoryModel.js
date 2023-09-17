const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const CategorySchema = mongoose.Schema(
  {
    subSubCategoryLogo: {
      type: String,
      required: false
    },
    subSubCategoryName: {
      type: String,
      required: true,
      trim: true
    },
    subCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subcategories"
    },
    productsId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products"
      }
    ],
    slug: {
      type: String,
      trim: true
    },
    priority: {
      type: Number,
      enum: [0, 1, 2, 3],
      default: 0
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const SUB_SUB_CATEGORY_MODEL = mongoose.model(
  "subsubcategories",
  CategorySchema
);
module.exports = SUB_SUB_CATEGORY_MODEL;
