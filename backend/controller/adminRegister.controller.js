const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ADMIN_REGISTER_MODEL = require("../model/adminRegisterModel");
const ERROR_RESPONSE = require("../utils/catchErrorResponse");

const { sendEmail } = require("../config/email");
const {
  generateToken,
  tokenForVerify,
  setLogInTokenCookie,
  generateAdminLoginToken,
  setAdminTokenInCookie
} = require("../utils/token");
const { loginDevice } = require("../utils/loginDevices");

exports.adminSignup = async (req, res) => {
  try {
    const user = await ADMIN_REGISTER_MODEL.findOne({ email: req.body.email });
    if (user) {
      res.send({ status: "failed", message: "Email already exists" });
    } else {
      const { deviceInfo, ipAddress, ipLocation } = loginDevice(req);

      const loginDevices = [
        {
          deviceInfo,
          ipAddress,
          ipLocation
        }
      ];
      req.body.loginDevices = loginDevices;
      await ADMIN_REGISTER_MODEL.create(req.body);

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
      const message = "Admin Signup successfully";
      // sendEmail(mailData, res, message);
      res.send({
        status: true,
        message
      });
    }
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        status: false,
        error: "Please provide your credentials"
      });
    }

    const user = await ADMIN_REGISTER_MODEL.findOne({ email });

    if (!user) {
      return res.status(401).json({
        status: false,
        error: "No user found. Please create an account"
      });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(403).json({
        status: false,
        error: "Wrong Credentials"
      });
    }

    let token = generateToken(user);
    // let setTokenInCookie = await setAdminTokenInCookie(token, res, req);

    // let adminCookie = await req.cookies["adminLoginToken"];

    // console.log("adminCookie", adminCookie);
    // console.log("setTokenInCookie", setTokenInCookie);

    res.status(200).json({
      status: true,
      message: "Admin Logged In Successfully",
      userName: `${user.firstName} ${user.lastName}`,
      role: user.role,
      token
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

// logout
exports.adminLogout = async (req, res) => {
  try {
    const token = await req.cookies.adminLoginToken;
    if (token) {
      res.clearCookie("adminLoginToken");
      res.clearCookie("refreshAdminToken");
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

module.exports.getAllAdminData = async (req, res) => {
  try {
    const allAdmin = await ADMIN_REGISTER_MODEL.find();

    res.status(200).json({
      status: true,
      data: allAdmin
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.adminCredentialsUpdate = async (req, res) => {
  try {
    const { adminId } = req.params;

    let adminUpdate = await ADMIN_REGISTER_MODEL.findByIdAndUpdate(
      adminId,
      req.body
    );

    if (!adminUpdate) {
      return res.status(404).json({
        status: false,
        message: "Admin credentials not found"
      });
    }

    res.status(200).json({
      status: true,
      message: "Admin credentials updated"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};
