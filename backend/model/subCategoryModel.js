const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const subCategorySchema = mongoose.Schema(
  {
    subCategoryLogo: {
      type: String,
      required: false
    },
    subCategoryName: {
      type: String,
      required: true,
      trim: true
    },
    // categoryId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "categories"
    // },
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
    subSubCategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subsubcategories"
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

const SUB_CATEGORY_MODEL = mongoose.model("subcategories", subCategorySchema);
module.exports = SUB_CATEGORY_MODEL;
