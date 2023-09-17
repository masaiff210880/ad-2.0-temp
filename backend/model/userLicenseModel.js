const mongoose = require("mongoose");
// const validator = require("validator");
// const bcrypt = require("bcryptjs");

const userLicenseSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    // feinLicense: {
    //   type: String
    //   // validate: [validator.isURL, "Please provide a valid url"]
    // },
    // feinNumber: {
    //   type: Number
    // },
    // otpNumber: {
    //   type: Number
    // },
    // tobaccoLicense: {
    //   type: String
    //   // validate: [validator.isURL, "Please provide a valid url"]
    // },
    // businessLicense: {
    //   type: String
    //   // validate: [validator.isURL, "Please provide a valid url"]
    // },
    // governmentIssuedId: {
    //   type: String
    //   // validate: [validator.isURL, "Please provide a valid url"]
    // },
    // storeType: {
    //   type: String,
    //   enum: [
    //     "Distributor",
    //     "Smoke/Vape",
    //     "Chain",
    //     "C-Store/Gas/Liq",
    //     "Dispensary",
    //     "Other"
    //   ]
    // },
    // licenseFor: {
    //   type: String,
    //   required: false
    //   // enum: ["Retailer", "Wholesaler", "Neither (Smoke shop only)"]
    // },
    businessName: {
      type: String,
      trim: true,
      minLength: [3, "Name must be at least 3 characters."],
      maxLength: [100, "Name is too large"]
    },
    businessAddress: {
      type: String,
      trim: true,
      minLength: [5, "Please provide full address"],
      maxLength: [150, "Name is too large"]
    },
    city: {
      type: String,
      trim: true,
      maxLength: [50, "City name is too large"]
    },
    state: {
      type: String,
      trim: true,
      maxLength: [50, "State name is too large"]
    },
    country: {
      type: String,
      trim: true,
      maxLength: [50, "Country name is too large"]
    },
    pinCode: {
      type: Number
    },
    phoneNumber: {
      type: Number
    },
    isProfileVerifiedByAdmin: {
      type: Boolean,
      default: false
    },
    verifiedAdminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "adminregisters"
    }
  },
  {
    timestamps: true
  }
);

const USER_LICENSE_MODEL = mongoose.model("user-license", userLicenseSchema);

module.exports = USER_LICENSE_MODEL;
