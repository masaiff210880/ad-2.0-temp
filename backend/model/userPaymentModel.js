const mongoose = require("mongoose");

const userPaymentSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
      //required: true
    },
    uniqueId: {
      type: String,
      unique: true,
      required: [true, "please give uniqueId"]
    },
    orderItemId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "orderItems"
      }
    ],
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "orders"
    },
    userLicense: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user-license"
    },
    receiptNumber: {
      type: Number
    },
    paymentDate: {
      type: Date,
      default: new Date()
    },
    accountNo: {
      type: String,
      trim: true
    },
    checkNumber: {
      type: String,
      trim: true
    },
    paymentDescription: {
      type: String,
      trim: true
    },
    isOnlinePayment: {
      type: Boolean,
      default: false
    },
    takeAmtEmpName: {
      type: String,
      trim: true
    },
    takeAmtEmpId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employees"
    },
    location: {
      type: String,
      trim: true
    },
    totalAmount: {
      type: Number
    },
    amountPaid: {
      type: Number
    },
    balanceAmount: {
      type: Number
    },
    paymentMemo: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const USER_PAYMENT_MODEL = mongoose.model("user-payments", userPaymentSchema);

module.exports = USER_PAYMENT_MODEL;
