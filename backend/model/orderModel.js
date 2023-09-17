const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
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
    salesOrderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "salesrOrders"
    },
    orderFullfillmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "orderFullfillments"
    },
    userPaymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user-payments"
    },
    userLicense: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user-licenses"
    },
    name: {
      type: String
    },
    address: {
      type: String
    },
    email: {
      type: String
    },
    contact: {
      type: String
    },
    city: {
      type: String
    },
    country: {
      type: String
    },
    zipCode: {
      type: String
    },
    totalAmount: {
      type: Number,
      default: 0
    },
    pieces: {
      type: Number,
      default: 0
    },
    isPaid: {
      type: Boolean,
      default: false
    },
    paymentMethod: {
      type: String,
      // enum: ["card", "online", "cod"],
      required: [true, "Please Select the payment method"]
    },
    orderNote: {
      type: String,
      required: false
    },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Delivered"],
      default: "Pending"
    }
  },
  {
    timestamps: true
  }
);

const ORDER_MODEL = mongoose.model("orders", orderSchema);
module.exports = ORDER_MODEL;
