const mongoose = require("mongoose");

const purchaseItemSchema = mongoose.Schema(
  {
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vendors"
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products"
    },
    variantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "variants"
    },
    itemCode: {
      type: String
    },
    vendorProductCode: {
      type: String
    },
    description: {
      type: String
    },
    purchaseWeight: {
      type: String
    },
    orderedQuantity: {
      type: Number
    },
    receivedQuantity: {
      type: Number,
      default: 0
    },
    isReturn: {
      type: Boolean,
      default: false
    },
    returnQuantity: {
      type: Number,
      default: 0
    },
    pricePerUnit: {
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

const PURCHASE_ITEMS_MODEL = mongoose.model(
  "purchaseItems",
  purchaseItemSchema
);

module.exports = PURCHASE_ITEMS_MODEL;
