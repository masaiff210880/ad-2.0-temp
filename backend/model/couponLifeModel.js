const mongoose = require("mongoose");

const couponLifeSchema = new mongoose.Schema(
  {
    couponId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "coupons"
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users"
    },
    useTime: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

const COUPON_LIFE_MODEL = mongoose.model("couponslives", couponLifeSchema);
module.exports = COUPON_LIFE_MODEL;
