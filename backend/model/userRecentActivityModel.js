const mongoose = require("mongoose");

const userRecentActivitySchema = mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "adminregister"
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users"
    },
    subject: {
      type: String,
      trim: true
    },
    body: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      trim: true
    },
    images: [
      {
        type: String,
        trim: true
      }
    ]
  },
  {
    timestamps: true
  }
);

const USER_RECENT_ACTIVITY_MODEL = mongoose.model(
  "user-activity",
  userRecentActivitySchema
);

module.exports = USER_RECENT_ACTIVITY_MODEL;
