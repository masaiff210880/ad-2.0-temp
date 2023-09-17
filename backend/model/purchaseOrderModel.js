const mongoose = require("mongoose");

const purchaseOrderSchema = mongoose.Schema(
  {
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vendors"
    },
    purchaseReceiptId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "purchase-receipts"
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
    PoNumber: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      trim: true
    },
    transactionDate: {
      type: Date
    },
    shipToAddress: {
      type: String
    },
    paymentTerms: {
      type: String,
      trim: true
      // enum:[]
    },
    shipVia: {
      type: String,
      trim: true
    },
    // member: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Users"
    // },
    assignedMemberby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "adminRegister"
    },
    deliveryDate: {
      type: String
    },
    dropShipInfo: {
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
    shippingCharges: {
      type: Number,
      default: 0
    },
    grandTotalAmount: {
      type: Number,
      default: 0
    },
    discountAmount: {
      type: Number,
      default: 0
    },
    soRefrence: {
      type: String
    },
    memo: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const PURCHASE_ORDER_MODEL = mongoose.model(
  "purchaseOrders",
  purchaseOrderSchema
);

module.exports = PURCHASE_ORDER_MODEL;
