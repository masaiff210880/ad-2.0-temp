const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

// const AWS = require("aws-sdk");

// // Configure the AWS SDK with your credentials and region
// AWS.config.update({
//   accessKeyId: "YOUR_AWS_ACCESS_KEY_ID",
//   secretAccessKey: "YOUR_AWS_SECRET_ACCESS_KEY",
//   region: "YOUR_AWS_REGION",
// });

// // Create an S3 instance
// const s3 = new AWS.S3();

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      validate: [validator.isEmail, "Provide a valid Email"],
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "Email address is required"]
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Must be at least 6 character"]
    },
    firstName: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
      maxLength: [100, "Name is too large"]
    },
    lastName: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
      minLength: [3, "Name must be at least 3 characters."],
      maxLength: [100, "Name is too large"]
    },
    phoneNumber: {
      type: Number,
      require: true
    },
    role: {
      type: String,
      default: "user"
    },
    userType: {
      type: String,
      enum: process.env.USER_TYPE,
      default: "Gold"
    },
    avatar: {
      type: String
      // validate: [validator.isURL, "Please provide a valid url"]
    },
    isNewUser: {
      type: Boolean,
      default: true
    },
    isSignupWithGoogle: {
      type: Boolean,
      default: false
    },
    // isProfileVerifiedByAdmin: {
    //   type: Boolean,
    //   default: false
    // },
    // verifiedAdminId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "adminregisters"
    // },
    loginDevices: [
      {
        deviceInfo: {
          type: String
        },
        ipAddress: {
          type: String
        },
        ipLocation: {
          type: String
        }
      }
    ],
    userLicenses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user-license"
      }
    ],
    // mailSentByAdmin: {
    //   type: Boolean,
    //   default: false
    // },
    // isUserCheckEmail: {
    //   type: Boolean,
    //   default: false
    // },
    isUserCreatedByAdmin: {
      type: Boolean,
      default: false
    },
    userCreatedByAdminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "adminRegister",
      required: false
    },
    userCreatedByAdminName: {
      type: String,
      trim: true,
      default: "byOwn"
    },
    // shippingAddress: String,
    internalAccountNumber: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      trim: true,
      enum: ["Active", "Blocked", "Inactive", "Pending", "Rejected"],
      default: "Pending"
    },
    creditAmount: {
      type: Number,
      default: 0
    },
    paymentDues: {
      type: Number,
      default: 0
    },
    salesRepName: {
      type: String
    },
    salesRepId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employees"
    },
    feinLicense: {
      type: String
      // validate: [validator.isURL, "Please provide a valid url"]
    },
    feinNumber: {
      type: Number
    },
    otpNumber: {
      type: Number
    },
    tobaccoLicense: {
      type: String
      // validate: [validator.isURL, "Please provide a valid url"]
    },
    businessLicense: {
      type: String
      // validate: [validator.isURL, "Please provide a valid url"]
    },
    governmentIssuedId: {
      type: String
      // validate: [validator.isURL, "Please provide a valid url"]
    },
    storeType: {
      type: String,
      enum: [
        "Distributor",
        "Smoke/Vape",
        "Chain",
        "C-Store/Gas/Liq",
        "Dispensary",
        "Other"
      ]
    },
    licenseFor: {
      type: String,
      required: false
      // enum: ["Retailer", "Wholesaler", "Neither (Smoke shop only)"]
    }
  },
  {
    timestamps: true
  }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const password = this.password;
  const hashedPassword = bcrypt.hashSync(password, 5);
  this.password = hashedPassword;
  next();
});

const USER_MODEL = mongoose.model("User", userSchema);

module.exports = USER_MODEL;
