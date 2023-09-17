const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const adminSchema = mongoose.Schema(
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
      required: [false, "Password is required"],
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
      type: Number
    },
    role: {
      type: String,
      enum: ["admin", "superadmin", "masteradmin"],
      default: "admin"
    },
    avatar: {
      type: String
      // validate: [validator.isURL, "Please provide a valid url"]
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
    isSignupWithGoogle: {
      type: Boolean,
      default: false
    },
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
    ]
  },
  {
    timestamps: true
  }
);

adminSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const password = this.password;
  const hashedPassword = bcrypt.hashSync(password, 5);
  this.password = hashedPassword;
  next();
});

const ADMIN_REGISTER_MODEL = mongoose.model("adminregister", adminSchema);

module.exports = ADMIN_REGISTER_MODEL;
