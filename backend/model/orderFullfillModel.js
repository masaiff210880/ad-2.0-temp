const mongoose = require("mongoose");
const validator = require("validator");

const orderFullfillSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    uniqueId: {
      type: String,
      unique: true
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
    salesOrderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "salesrOrders"
    },
    totalBoxes: {
      type: Number,
      default: 0
    },
    boxesDetails: [
      {
        lengthOfBox: {
          type: Number,
          default: 0
        },
        unitOflength: {
          type: String,
          default: "cm"
        },
        widthOfBox: {
          type: Number,
          default: 0
        },
        unitOfWidth: {
          type: String,
          default: "cm"
        },
        heightOfBox: {
          type: Number,
          default: 0
        },
        unitOfHeight: {
          type: String,
          default: "cm"
        },
        weightOfBoxe: {
          type: Number,
          default: 0
        },
        unitOfWeight: {
          type: String,
          default: "gm"
        }
      }
    ],
    totalWeightOfBoxes: {
      type: Number,
      default: 0
    },
    unitOfTotalWeight: {
      type: String,
      default: "kg"
    },
    isPacked: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const ORDER_FULLFILL_MODEL = mongoose.model(
  "orderFullfillments",
  orderFullfillSchema
);

module.exports = ORDER_FULLFILL_MODEL;
