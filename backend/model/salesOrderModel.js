const mongoose = require("mongoose");
const validator = require("validator");

const salesOrderSchema = mongoose.Schema(
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
    userLicense: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user-license"
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
      type: String,
      required: true
    },
    isBillingSameAsShippingAddress: {
      type: Boolean,
      default: false
    },
    shippingCity: {
      type: String
    },
    shippingState: {
      type: String
    },
    shippingCountry: {
      type: String
    },
    shippingPinCode: {
      type: String
    },
    billingAddress: {
      type: String,
      required: true
    },
    billingCity: {
      type: String,
      required: true
    },
    billingState: {
      type: String,
      required: true
    },
    billingCountry: {
      type: String,
      required: true
    },
    billingPincode: {
      type: String,
      required: true
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
    },
    phase: {
      type: String,
      trim: true
    },
    refrence: {
      type: String,
      default: "REF"
    },
    orderStatus: {
      type: String,
      default: "Open"
    },
    stockStatus: {
      type: String,
      default: ""
    },
    assignedTo: {
      type: String,
      default: "none"
    },
    assignedId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "adminregister"
    },
    assignedAt: {
      type: Date
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "adminregister"
    },
    isPickingStarted: {
      type: Boolean,
      default: false
    },
    isPickedAllItems: {
      type: Boolean,
      default: false
    },
    verifierName: {
      type: String,
      default: "none"
    },
    verifierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "adminregister"
    },
    isVerifiedAllItems: {
      type: Boolean,
      default: false
    },
    isPacked: {
      type: Boolean,
      default: false
    },
    isShipped: {
      type: Boolean,
      default: false
    },
    isInvoice: {
      type: Boolean,
      default: false
    },
    billTo: {
      type: String,
      required: true
    },
    accountNo: {
      type: Number,
      default: 0
    },
    orderReceivedDate: {
      type: Date,
      default: new Date()
    },
    orderFilledDate: {
      type: Date
    },
    isFlatRate: {
      type: Boolean,
      default: true
    },
    flatRate: {
      type: Number,
      default: 0
    },
    paymentTerms: {
      type: String,
      // enum: ["Next 30 Day", "Due on Receipt"],
      default: "Due on Receipt"
    },
    pickedPieces: {
      type: Number,
      default: 0
    },
    pieces: {
      type: Number,
      default: 0
    },
    totalAmount: {
      type: Number,
      default: 0
    },
    grandTotalAmount: {
      type: Number,
      default: 0
    },
    depositAmount: {
      type: Number,
      default: 0
    },
    balanceAmount: {
      type: Number,
      default: 0
    },
    tax: {
      type: Number,
      default: 0
    },
    isFullPaid: {
      type: Boolean,
      default: false
    },
    isManagerAllowed: {
      type: Boolean,
      default: false
    },
    allowingManagerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin-register"
    },
    memo: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const SALES_ORDER_MODEL = mongoose.model("salesOrders", salesOrderSchema);

module.exports = SALES_ORDER_MODEL;
