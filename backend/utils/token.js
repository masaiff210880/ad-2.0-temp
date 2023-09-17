const jwt = require("jsonwebtoken");
// const USER_AND_PRICE_LEVEL_MODEL = require("../model/priceLevelModel");
const fs = require("fs");
require("dotenv").config();

exports.generateToken = (userInfo) => {
  let payload = {
    id: userInfo._id,
    userName: userInfo.firstName + " " + userInfo.lastName,
    role: userInfo.role
  };

  if (userInfo.role.toLowerCase() === "user") {
    (payload.userType = userInfo.userType),
      (payload.isNewUser = userInfo.isNewUser);
      (payload.accountNumber = userInfo.internalAccountNumber);
  }

  const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: "25h"
  });

  return token;
};

// module.exports.setLogInTokenCookie = async function (res, token) {
//   try {
//     var date = new Date();
//     date.setTime(date.getTime() + 24 * 60 * 60 * 1000);

//     let cookieDetails = {
//       expires: date,
//       httpOnly: false
//     };

//     // res.clearCookie("adminLoginToken");
//     res.cookie("loginToken", token, cookieDetails);

//     // let adminCooki = await req.cookies["loginToken"];

//     // console.log("adminCooki", adminCooki);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error setting cookies.");
//   }
// };

// module.exports.generateAdminLoginToken = async function (userInfo, res) {
//   try {
//     const payload = {
//       id: userInfo._id,
//       userName: userInfo.firstName + " " + userInfo.lastName,
//       role: userInfo.role
//     };

//     const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
//       expiresIn: "25h"
//     });

//     return token;
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error setting admin cookies.");
//   }
// };

// module.exports.setAdminTokenInCookie = async function (token, res, req) {
//   try {
//     var date = new Date();
//     date.setTime(date.getTime() + 24 * 60 * 60 * 1000);

//     let cookieDetails = {
//       expires: date,
//       secure: false, // Set to true for HTTPS connections
//       // domain: "http://dev-admin.phantasm.digital/", // Set domain to the current domain
//       domain: "http://localhost:7000/", // Set domain to the current domain
//       // domain: ".localhost:3001/", // Set domain to the current domain
//       // domain: ".31.220.20.11:8080", // Set domain to the current domain
//       // domain: "dev-admin.phantasm.digital", // Set domain to the current domain
//       path: "/", // Set to the path where the token is needed
//       httpOnly: false,
//       withCredentials: true
//     };

//     // let cookieDetails = {
//     //   expires: date,
//     //   secure: true,
//     //   sameSite: "none",
//     //   path: "/",
//     //   httpOnly: false
//     // };

//     res.clearCookie("loginToken");
//     console.log("token", token);

//     await res.cookie("adminLoginToken", token, cookieDetails);

//     let adminCookie = await req.cookies["adminLoginToken"];

//     console.log("adminCookie", adminCookie);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error setting admin login token cookie.");
//   }
// };

// module.exports.setAdminTokenInCookie = async function (token, res) {
//   var date = new Date();
//   date.setTime(date.getTime() + 24 * 60 * 60 * 1000);

//   let cookieDetails = {
//     expires: date,
//     secure: true,
//     sameSite: "none",
//     path: "/",
//     httpOnly: false
//   };

//   if (process.env.NODE_ENV && process.env.NODE_ENV === "production") {
//     console.log("coming");
//     cookieDetails = {
//       expires: date,
//       secure: false,
//       domain: "localhost",
//       sameSite: "none",
//       path: "/",
//       httpOnly: false,
//       withCredentials: true
//     };
//   } else if (process.env.NODE_ENV && process.env.NODE_ENV === "staging") {
//     cookieDetails = {
//       expires: date,
//       secure: true,
//       domain: "localhost",
//       // domain: '.faizan.com',
//       sameSite: "none",
//       path: "/",
//       httpOnly: false,
//       withCredentials: true
//     };
//   } else if (process.env.NODE_ENV && process.env.NODE_ENV === "development") {
//     cookieDetails = {
//       expires: date,
//       secure: true,
//       sameSite: "none",
//       domain: "localhost",
//       path: "/",
//       httpOnly: false,
//     };
//   }

//   res.clearCookie("loginToken");

//   await res.cookie("adminLoginToken", token, cookieDetails);
// };

// module.exports.setLogInTokenCookie = async function (token, res) {
//   var date = new Date();
//   date.setTime(date.getTime() + 24 * 60 * 60 * 1000);

//   let cookieDetails = {
//     expires: date,
//     secure: true,
//     sameSite: "none",
//     path: "/",
//     httpOnly: false
//   };

//   if (process.env.NODE_ENV && process.env.NODE_ENV === "production") {
//     console.log("coming");
//     cookieDetails = {
//       expires: date,
//       secure: false,
//       domain: "localhost",
//       sameSite: "none",
//       path: "/",
//       httpOnly: false,
//       withCredentials: true
//     };
//   } else if (process.env.NODE_ENV && process.env.NODE_ENV === "staging") {
//     cookieDetails = {
//       expires: date,
//       secure: true,
//       domain: "localhost",
//       // domain: '.faizan.com',
//       sameSite: "none",
//       path: "/",
//       httpOnly: false,
//       withCredentials: true
//     };
//   } else if (process.env.NODE_ENV && process.env.NODE_ENV === "development") {
//     cookieDetails = {
//       expires: date,
//       secure: true,
//       sameSite: "none",
//       path: "/",
//       httpOnly: false
//     };
//   }

//   res.clearCookie("adminLoginToken");

//   await res.cookie("loginToken", token, cookieDetails);
// };
