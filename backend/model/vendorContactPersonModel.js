const mongoose = require("mongoose");

const vendorContactPersonSchema = mongoose.Schema(
  {
    salutation: {
      type: String,
      required: [true, "Please provide a salutation"],
      trim: true
    },
    firstName: {
      type: String,
      trim: true
    },
    lastName: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      trim: true
    },
    workPhone: {
      type: Number
    },
    mobile: {
      type: Number
    },
    skypeNumber: {
      type: String,
      trim: true
    },
    desgnation: {
      type: String,
      trim: true
    },
    department: {
      type: String,
      trim: true
    },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vendors"
    }
  },
  {
    timestamps: true
  }
);

const VENDOR_CONTACT_PERSON_MODEL = mongoose.model(
  "vendorContactPersons",
  vendorContactPersonSchema
);

module.exports = VENDOR_CONTACT_PERSON_MODEL;
