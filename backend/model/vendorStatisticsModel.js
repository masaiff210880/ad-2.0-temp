const mongoose = require("mongoose");
const validator = require("validator");

const vendorStatisticsSchema = mongoose.Schema(
  {
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vendors"
    },
    year: {
      type: Number
    },
    data: [
      {
        month: {
          type: Number,
          enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
        },
        monthPurchase: {
          type: Number,
          default: 0
        },
        monthReturn: {
          type: Number,
          default: 0
        }
      }
    ],
    yearlyPurchase: {
      type: Number,
      default: 0
    },
    yearlyReturn: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

const VENDOR_STATISTICS_MODEL = mongoose.model(
  "vendorStatistics",
  vendorStatisticsSchema
);

module.exports = VENDOR_STATISTICS_MODEL;
