const mongoose = require("mongoose");

const orderItemSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    userName: {
      type: String
    },
    userType: {
      type: String
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products"
    },
    variantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "variants"
    },
    quantity: {
      type: Number
    },
    pickedQuantity: {
      type: Number,
      default: 0
    },
    balanceQuantity: {
      type: Number,
      default: 0
    },
    verifiedQuantity: {
      type: Number,
      default: 0
    },
    comment: {
      type: String,
      trim: true
    },
    price: {
      type: Number,
      default: 0
    },
    subTotal: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

const ORDER_ITEMS_MODEL = mongoose.model("orderItems", orderItemSchema);

module.exports = ORDER_ITEMS_MODEL;
