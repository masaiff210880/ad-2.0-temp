const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    couponName: {
      type: String,
      trim: true
    },
    logo: {
      type: String,
      trim: true
    },
    couponCode: {
      type: String,
      trim: true
    },
    applyDate: {
      type: String,
      trim: true,
      required: [true, "Please provide the Apply date of coupon"]
    },
    endDate: {
      type: String,
      trim: true,
      required: [true, "Please provide the End date of coupon"]
    },
    couponType: {
      type: String,
      trim: true,
      required: false
    },
    isNewCustomersOnly: {
      type: Boolean,
      default: false
    },
    isOnUserType: {
      type: Boolean,
      dafault: false
    },
    // isCommonApply: {
    //   type: Boolean,
    //   dafault: false
    // },
    isDiscountPercentage: {
      type: Boolean,
      dafault: false
    },
    isFlatRateOff: {
      type: Boolean,
      dafault: false
    },
    isBuyGetless: {
      type: Boolean,
      dafault: false
    },
    isBuyGetFree: {
      type: Boolean,
      dafault: false
    },
    isBuyPaylessQty: {
      type: Boolean,
      dafault: false
    },
    isShippingDiscount: {
      type: Boolean,
      dafault: false
    },
    isLifeCycleCoupon: {
      type: Boolean,
      dafault: false
    },
    // isMinAmtGetFree: {
    //   type: Boolean,
    //   dafault: false
    // },
    // isParticularVariant: {
    //   type: Boolean,
    //   dafault: false
    // },
    isApplyOnCategory: {
      type: Boolean,
      dafault: false
    },
    isMinimunAmt: {
      type: Boolean,
      dafault: false
    },
    isOnlyForNewUser: {
      type: Boolean,
      default: false
    },
    userTypeName: {
      type: String,
      trim: true,
      default: "all",
      enum: ["silver", "gold", "platinum", "all"]
    },
    categoryName: {
      type: String,
      trim: true
    },
    couponLife: [
      {
        initialTime: Number,
        finalTime: Number,
        discountPercent: Number
      }
    ],
    // particularVariantId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "variants",
    //   required: false
    // },
    buyQty: {
      type: Number
    },
    buyVariant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "variants",
      required: false
    },
    getFreeQty: {
      type: Number
    },
    getFreeVariant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "variants",
      required: false
    },
    getLessPercent: {
      type: Number
    },
    getLessPercentVariant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "variants",
      required: false
    },
    discountPercentage: {
      type: Number
    },
    flatRateOff: {
      type: Number
    },
    minimumAmount: {
      type: Number
    }
  },
  {
    timestamps: true
  }
);

const COUPON_MODEL = mongoose.model("coupons", couponSchema);
module.exports = COUPON_MODEL;
