const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    commentedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    commentedByName: {
      type: String,
      trim: true
    },
    poId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    comment: {
      type: String,
      trim: true,
      require: [true, "Please give the comment"]
    }
  },
  {
    timestamps: true
  }
);

const COMMENT_MODEL = mongoose.model("comments", commentSchema);
module.exports = COMMENT_MODEL;
