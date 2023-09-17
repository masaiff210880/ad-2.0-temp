const mongoose = require("mongoose");

const disbursementSchema = mongoose.Schema(
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
    transactionId: {
      type: String,
      trim: true
    },
    transactionDate: {
      type: Date
    },
    paymentId: {
      type: String
    },
    paymentDate: {
      type: Date
    },
    bankAccount: {
      type: String,
      trim: true
    },
    checkNumber: {
      type: String,
      trim: true
    },
    employee: {
      type: String,
      trim: true
    },
    location: {
      type: String,
      trim: true
    },
    totalDisburded: {
      type: Number
    },
    totalAmount: {
      type: Number
    },
    amountPaid: {
      type: Number
    },
    unappliedDeposits: {
      type: Number
    },
    poDeposits: {
      type: Number
    },
    paymentMemo: {
      type: String
    },
    reApplyStatus: {
      type: String
    },
    reConciled: {
      type: String
    },
    auditTrail: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const DISBURSEMENT_MODEL = mongoose.model("disbursements", disbursementSchema);

module.exports = DISBURSEMENT_MODEL;
