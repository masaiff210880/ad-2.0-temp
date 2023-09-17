const mongoose = require("mongoose");

const purchaseReceiptSchema = mongoose.Schema(
  {
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vendors"
    },
    purchaseOrderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "purchaseOrders"
    },
    purchaseItemId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "purchaseItems"
      }
    ],
    disbursementId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "disbursements"
    },
    transactionId: {
      type: String,
      trim: true
    },
    transactionDate: {
      type: Date
    },
    billReference: {
      type: String
    },
    paymentTerms: {
      type: String,
      trim: true
      // enum:[]
    },
    dueDate: {
      type: String
    },
    location: {
      type: String,
      trim: true
    },
    refPoPr: {
      type: String
    },
    pieces: {
      type: Number
    },
    employee: {
      type: String
    },
    totalAmount: {
      type: Number
    },
    depositeAmount: {
      type: Number,
      default: 0
    },
    balanceAmount: {
      type: Number,
      default: 0
    },
    discountAmount: {
      type: Number,
      default: 0
    },
    freightAmount: {
      type: Number,
      default: 0
    },
    soRefrence: {
      type: String
    },
    memo: {
      type: String
    },
    trackingNumber: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const PURCHASE_RECEIPT_MODEL = mongoose.model(
  "purchase-receipts",
  purchaseReceiptSchema
);

module.exports = PURCHASE_RECEIPT_MODEL;
