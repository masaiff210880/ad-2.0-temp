const mongoose = require("mongoose");
const validator = require("validator");

const cartSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    cartItem: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Products"
        },
        variantId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "variants"
        },
        quantity: {
          type: Number,
          required: [true, "Please Select the quantity"]
        },
        price: {
          type: Number,
          default: 0
        },
        subTotal: {
          type: Number,
          default: 0
        },
        isComeByCoupon: {
          type: Boolean,
          default: false
        }
      }
    ],
    tax: {
      type: Number,
      default: 0
    },
    isFlatRate: {
      type: Boolean,
      default: true
    },
    shippingCharge: {
      type: Number,
      default: 0
    },
    totalQty: {
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
    isCouponApplied: {
      type: Boolean,
      default: false
    },
    couponId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "coupons"
      }
    ]
  },
  {
    timestamps: true
  }
);

const CART_MODEL = mongoose.model("carts", cartSchema);

module.exports = CART_MODEL;
