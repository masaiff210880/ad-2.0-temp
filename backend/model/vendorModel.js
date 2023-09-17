const mongoose = require("mongoose");
// const validator = require("validator");

const vendorSchema = mongoose.Schema(
  {
    vendorUniqueId: {
      type: String
    },
    vendorContactPersonId: [
      {
        type: mongoose.Types.ObjectId,
        ref: "vendorContactPersons"
      }
    ],
    isInternationalVendor: {
      type: Boolean,
      default: false
    },
    companyName: {
      type: String,
      trim: true
      // required: [true, "Please provide company name"]
    },
    avatar: {
      type: String,
      trim: true
    },
    vendorType: {
      type: String,
      trim: true
    },
    salutation: {
      type: String,
      // required: [true, "Please provide a salutation"],
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
    attention: {
      type: String,
      trim: true
    },
    address: {
      type: String,
      trim: true
    },
    city: {
      type: String,
      trim: true
    },
    country: {
      type: String,
      trim: true
    },
    state: {
      type: String,
      trim: true
    },
    pinCode: {
      type: String,
      trim: true
    },
    displayName: {
      type: String,
      trim: true
    },
    workPhone: {
      type: Number,
      trim: true
    },
    mobile: {
      type: Number,
      trim: true
    },
    phone: {
      type: Number,
      trim: true
    },
    vendorEmail: {
      type: String,
      // validate: [validator.isEmail, "Provide a valid Email"],
      trim: true,
      unique: true
      // required: [true, "Email address is required"]
    },
    fax: {
      type: String,
      trim: true
    },
    accountNumber: {
      type: String,
      trim: true
    },
    taxId: {
      type: String,
      trim: true
    },
    paymentTerms: {
      type: String,
      trim: true
      // enum:[]
    },
    currency: {
      type: String,
      trim: true
    },
    priceList: {
      type: String,
      trim: true
    },
    // facebook: {
    //   type: String,
    //   trim: true
    // },
    // twitter: {
    //   type: String,
    //   trim: true
    // },
    // shippingMethod: {
    //   type: String,
    //   trim: true
    // },
    // shipToAddress: {
    //   type: String
    // },
    balanceAmount: {
      type: Number,
      default: 0
    },
    remarks: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const VENDOR_MODEL = mongoose.model("vendors", vendorSchema);

module.exports = VENDOR_MODEL;
