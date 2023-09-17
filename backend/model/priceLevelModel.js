const mongoose = require("mongoose");

const userAndPriceLevelSchema = new mongoose.Schema(
  {
    userType: {
      type: Array,
      default: []
    },
    priceLevel: {
      type: Array,
      default: []
    }
  },
  {
    timestamps: true
  }
);

const USER_AND_PRICE_LEVEL_MODEL = mongoose.model(
  "userandpricelevel",
  userAndPriceLevelSchema
);

module.exports = USER_AND_PRICE_LEVEL_MODEL;
