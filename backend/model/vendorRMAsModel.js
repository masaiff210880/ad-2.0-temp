const mongoose = require("mongoose");

const vendorRAMsSchema = mongoose.Schema(
  {
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vendors"
    },
    purchaseReceiptId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "purchase-receipts"
    },
    purchaseOrderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "purchaseOrders"
    },
    disbursementId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "disbursements"
    },
    purchaseItemId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "purchaseItems"
      }
    ],
    transactionId: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      trim: true,
      default: "Open"
    },
    transactionDate: {
      type: Date
    },
    disposition: {
      type: String
    },
    paymentTerms: {
      type: String,
      trim: true
      // enum:[]
    },
    returnVia: {
      type: String,
      trim: true
    },
    // member: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Users"
    // },
    returnTicketRaisedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "adminRegister"
    },
    deliveryDate: {
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
    memo: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const VENDOR_RMA_MODEL = mongoose.model("vendor-return-item", vendorRAMsSchema);

module.exports = VENDOR_RMA_MODEL;
