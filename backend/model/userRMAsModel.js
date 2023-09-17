const mongoose = require("mongoose");

const userRAMsSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
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
    orderFullfillmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "orderFullfillments"
    },
    userPaymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user-payments"
    },
    salesOrderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "salesrOrders"
    },
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
      type: Date,
      default: new Date()
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

const USER_RMA_MODEL = mongoose.model("user-return-item", userRAMsSchema);

module.exports = USER_RMA_MODEL;
