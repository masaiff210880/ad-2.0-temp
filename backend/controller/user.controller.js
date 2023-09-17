const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const USER_MODEL = require("../model/UserModel");
const ERROR_RESPONSE = require("../utils/catchErrorResponse");
// const parser = require('ua-parser-js')

const { sendEmail } = require("../config/email");
const {
  generateToken,
  tokenForVerify,
  setLogInTokenCookie
} = require("../utils/token");
const { loginDevice } = require("../utils/loginDevices");
const USER_LICENSE_MODEL = require("../model/userLicenseModel");

// register user
// sign up
exports.signup = async (req, res) => {
  try {
    const user = await USER_MODEL.findOne({ email: req.body.email });
    if (user) {
      res.send({ status: "failed", message: "Email already exists" });
    } else {
      const { deviceInfo, ipAddress, ipLocation } = loginDevice(req);

      const loginDevices = [
        {
          deviceInfo: deviceInfo?.toString() || "",
          ipAddress: ipAddress?.toString() || "",
          ipLocation: ipLocation?.toString() || ""
        }
      ];

      const {
        feinLicense,
        feinNumber,
        otpNumber,
        tobaccoLicense,
        businessLicense,
        governmentIssuedId,
        storeType,
        licenseFor,
        businessName,
        businessAddress,
        city,
        state,
        country,
        pinCode,
        phoneNumber
      } = req.body;

      const payload = {
        ...req.body,
        loginDevices,
        creditAmount: 0,
        internalAccountNumber: uuidv4().substring(0, 6),
        feinLicense: feinLicense.toString(),
        feinNumber: feinNumber,
        otpNumber: otpNumber,
        tobaccoLicense: tobaccoLicense.toString(),
        businessLicense: businessLicense.toString(),
        governmentIssuedId: governmentIssuedId.toString(),
        storeType: storeType,
        licenseFor: licenseFor.toString()
      };

      let newUser = await USER_MODEL.create(payload);

      const licensePayload = {
        userId: newUser._id,
        businessName,
        businessAddress,
        city,
        state,
        country,
        pinCode,
        phoneNumber
      };

      const userLicense = await USER_LICENSE_MODEL.create(licensePayload);

      newUser.userLicenses.push(userLicense._id);

      await newUser.save();

      const mailData = {
        from: process.env.EMAIL_USER,
        to: `${req.body.email}`,
        subject: "Email Activation",
        subject: "Verify Your Email",
        html: `<h2>Hello ${req.body.name}</h2>
        <p>Verify your email address to complete the signup and login into your <strong>shofy</strong> account.</p>
  
          <p>This link will expire in <strong> 10 minute</strong>.</p>
  
          <p style="margin-bottom:20px;">Click this link for active your account</p>
  
          <a href="${
            process.env.STORE_URL
          }/email-verify/${"token"}" style="background:#0989FF;color:white;border:1px solid #0989FF; padding: 10px 15px; border-radius: 4px; text-decoration:none;">Verify Account</a>
  
          <p style="margin-top: 35px;">If you did not initiate this request, please contact us immediately at support@shofy.com</p>
  
          <p style="margin-bottom:0px;">Thank you</p>
          <strong>shofy Team</strong>
           `
      };
      // sendEmail(mailData, res, message);
      res.send({
        status: true,
        message: `Signup Successful, Welcome ${
          newUser.firstName + " " + newUser.lastName
        }. Kindly wait for ADMIN approval`,
        userId: newUser._id
      });
    }
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

/**
 * 1. Check if Email and password are given
 * 2. Load user with email
 * 3. if not user send res
 * 4. compare password
 * 5. if password not correct send res
 * 6. check if user is active
 * 7. if not active send res
 * 8. generate token
 * 9. send user and token
 */
module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        status: false,
        error: "Please provide correct credentials"
      });
    }

    const user = await USER_MODEL.findOne({ email });

    if (!user) {
      return res.status(401).json({
        status: false,
        error: "No user found. Please create an account"
      });
    }

    if (user.status === "Blocked" || user.status === "Rejected") {
      return res.status(401).json({
        status: false,
        error: `Your account has ${user.status}, Please contact to admin`
      });
    }

    if (
      !user.userLicenses ||
      user.userLicenses.length === 0 ||
      user.userLicenses == []
    ) {
      return res.status(401).json({
        status: false,
        message: "Please Add the address and license first"
      });
    }

    if (user.status === "Pending") {
      return res.status(401).json({
        status: false,
        error:
          "Your account is in Pending status and being verified by Admin, Kindly Keep Patience"
      });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(403).json({
        status: false,
        error: "Password is not correct"
      });
    }

    const token = generateToken(user);
    // setLogInTokenCookie(token, res);

    res.status(200).json({
      status: true,
      message: "Logged In Successfully",
      userName: `${user.firstName} ${user.lastName}`,
      userType: user.userType,
      token
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

// logout
exports.logout = async (req, res) => {
  try {
    const token = await req.cookies.loginToken;
    if (token) {
      res.clearCookie("loginToken");
      res.clearCookie("refreshToken");
      res.status(200).json({
        status: true,
        message: "Logout successfully"
      });
    } else {
      res.status(200).json({
        status: false,
        message: "Please Login first"
      });
    }
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

//getAllUserdata
module.exports.getAllUser = async (req, res) => {
  try {
    const allUser = await USER_MODEL.find();

    res.status(200).json({
      status: true,
      data: allUser
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};
// confirmEmail
exports.confirmEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const user = await USER_MODEL.findOne({ confirmationToken: token });

    if (!user) {
      return res.status(403).json({
        status: false,
        error: "Invalid token"
      });
    }

    const expired = new Date() > new Date(user.confirmationTokenExpires);

    if (expired) {
      return res.status(401).json({
        status: false,
        error: "Token expired"
      });
    }

    user.status = "active";
    user.confirmationToken = undefined;
    user.confirmationTokenExpires = undefined;

    await user.save({ validateBeforeSave: false });

    const accessToken = generateToken(user);

    const { password: pwd, ...others } = user.toObject();

    res.status(200).json({
      status: true,
      message: "Successfully activated your account.",
      data: {
        user: others,
        token: accessToken
      }
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

// forgetPassword
exports.forgetPassword = async (req, res) => {
  try {
    const { verifyEmail } = req.body;
    const user = await USER_MODEL.findOne({ email: verifyEmail });
    if (!user) {
      return res.status(404).send({
        message: "User Not found with this email!"
      });
    } else {
      const token = tokenForVerify(user);
      const body = {
        from: process.env.EMAIL_USER,
        to: `${verifyEmail}`,
        subject: "Password Reset",
        html: `<h2>Hello ${verifyEmail}</h2>
        <p>A request has been received to change the password for your <strong>Shofy</strong> account </p>

        <p>This link will expire in <strong> 10 minute</strong>.</p>

        <p style="margin-bottom:20px;">Click this link for reset your password</p>

        <a href=${process.env.STORE_URL}/forget-password/${token} style="background:#0989FF;color:white;border:1px solid #0989FF; padding: 10px 15px; border-radius: 4px; text-decoration:none;">Reset Password</a>

        <p style="margin-top: 35px;">If you did not initiate this request, please contact us immediately at support@shofy.com</p>

        <p style="margin-bottom:0px;">Thank you</p>
        <strong>Shofy Team</strong>
        `
      };
      user.confirmationToken = token;
      const date = new Date();
      date.setDate(date.getDate() + 1);
      user.confirmationTokenExpires = date;
      await user.save({ validateBeforeSave: false });
      const message = "Please check your email to reset password!";
      sendEmail(body, res, message);
    }
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

// confirm-forget-password
exports.confirmForgetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    const user = await USER_MODEL.findOne({ confirmationToken: token });

    if (!user) {
      return res.status(403).json({
        status: false,
        error: "Invalid token"
      });
    }

    const expired = new Date() > new Date(user.confirmationTokenExpires);

    if (expired) {
      return res.status(401).json({
        status: false,
        error: "Token expired"
      });
    } else {
      const newPassword = bcrypt.hashSync(password);
      await USER_MODEL.updateOne(
        { confirmationToken: token },
        { $set: { password: newPassword } }
      );

      user.confirmationToken = undefined;
      user.confirmationTokenExpires = undefined;

      await user.save({ validateBeforeSave: false });

      res.status(200).json({
        status: true,
        message: "Password reset successfully"
      });
    }
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

// change password
exports.changePassword = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password, googleSignIn, newPassword } = req.body || {};
    const user = await USER_MODEL.findOne({ email: email });
    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (googleSignIn) {
      const hashedPassword = bcrypt.hashSync(newPassword);
      await USER_MODEL.updateOne(
        { email: email },
        { password: hashedPassword }
      );
      return res.status(200).json({ message: "Password changed successfully" });
    }
    if (!bcrypt.compareSync(password, user?.password)) {
      return res.status(401).json({ message: "Incorrect current password" });
    } else {
      const hashedPassword = bcrypt.hashSync(newPassword);
      await USER_MODEL.updateOne(
        { email: email },
        { password: hashedPassword }
      );
      res.status(200).json({ message: "Password changed successfully" });
    }
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

// update a profile
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await USER_MODEL.findById(userId);
    if (user) {
      user.name = req.body.name;
      user.email = req.body.email;
      user.phone = req.body.phone;
      user.address = req.body.address;
      user.bio = req.body.bio;
      const updatedUser = await user.save();
      const token = generateToken(updatedUser);
      res.status(200).json({
        status: true,
        message: "Successfully updated profile",
        data: {
          user: updatedUser,
          token
        }
      });
    }
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

// signUpWithProvider
exports.signUpWithProvider = async (req, res) => {
  try {
    const user = jwt.decode(req.params.token);
    const isAdded = await USER_MODEL.findOne({ email: user.email });
    if (isAdded) {
      const token = generateToken(isAdded);
      res.status(200).send({
        status: true,
        data: {
          token,
          user: {
            _id: isAdded._id,
            name: isAdded.name,
            email: isAdded.email,
            address: isAdded.address,
            phone: isAdded.phone,
            imageURL: isAdded.imageURL,
            googleSignIn: true
          }
        }
      });
    } else {
      const newUser = new USER_MODEL({
        name: user.name,
        email: user.email,
        imageURL: user.picture,
        status: "active"
      });

      const signUpUser = await newUser.save();
      // console.log(signUpUser)
      const token = generateToken(signUpUser);
      res.status(200).send({
        status: true,
        data: {
          token,
          user: {
            _id: signUpUser._id,
            name: signUpUser.name,
            email: signUpUser.email,
            imageURL: signUpUser.imageURL,
            googleSignIn: true
          }
        }
      });
    }
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};
