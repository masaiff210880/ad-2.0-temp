const mongoose = require("mongoose");

const vendorRecentActivitySchema = mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "adminregister"
    },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vendors"
    },
    subject: {
      type: String,
      trim: true
    },
    bodies: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      trim: true
    },
    images: [
      {
        type: String,
        trim: true
      }
    ],
    isAnyRef: {
      type: Boolean,
      default: false
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products"
    },
    variantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "variants"
    },
    poId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "purchaseOrders"
    },
    prId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "purchase-receipts"
    }
  },
  {
    timestamps: true
  }
);

const VENDOR_RECENT_ACTIVITY_MODEL = mongoose.model(
  "vendor-activity",
  vendorRecentActivitySchema
);

module.exports = VENDOR_RECENT_ACTIVITY_MODEL;
