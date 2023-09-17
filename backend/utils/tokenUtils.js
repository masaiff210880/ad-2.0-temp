const jwt = require("jsonwebtoken");
const key = process.env.JWT_SECRET || "$$demoUserDevSECRET%%";
const refreshkey = process.env.REFRESHJWT_SECRET || "$$demoRefreshDevSECRET%%";

const verifyToken = (token) => {
  if (!token) return {};
  return new Promise((resolve, reject) =>
    jwt.verify(token, key, (err, decoded) =>
      err ? reject({ message: err }) : resolve(decoded.id)
    )
  );
};

module.exports.verifyJWT = async function (jwt) {
  return await verifyToken(jwt);
};

module.exports.signJWT = async function (payload) {
  return jwt.sign(payload, key, { expiresIn: "24h" });
};

module.exports.signRefreshJWT = function (payload) {
  return jwt.sign(payload, refreshkey, { expiresIn: "28h" });
};

module.exports.setCookie = async function (res, token) {
  var date = new Date();
  date.setTime(date.getTime() + 28 * 60 * 60 * 1000); //increase cookie time

  let cookieAuthObj = {
    expires: date,
    secure: false,
    sameSite: "none",
    path: "/",
    httpOnly: false,
  };

  if (process.env.NODE_ENV && process.env.NODE_ENV === "production") {
    cookieAuthObj = {
      expires: date,
      secure: true,
      domain: ".today.green",
      sameSite: "none",
      path: "/",
      httpOnly: false,
      withCredentials: true,
    };
  } else if (process.env.NODE_ENV && process.env.NODE_ENV === "staging") {
    cookieAuthObj = {
      expires: date,
      secure: true,
      domain: ".today.green",
      sameSite: "none",
      path: "/",
      httpOnly: false,
      withCredentials: true,
    };
  } else if (process.env.NODE_ENV && process.env.NODE_ENV === "development") {
    cookieAuthObj = {
      expires: date,
      secure: false,
      // sameSite: "none",
      path: "/",
      httpOnly: false,
    };
  }

  res.cookie("auth_tk", token, cookieAuthObj);
};

module.exports.setRefreshCookie = async function (res, token) {
  let date = new Date();
  date.setTime(date.getTime() + 28 * 60 * 60 * 1000);

  let cookieAuthObj = {
    expires: date,
    secure: false,
    sameSite: "none",
    path: "/",
    httpOnly: false,
  };

  if (process.env.NODE_ENV && process.env.NODE_ENV === "production") {
    cookieAuthObj = {
      expires: date,
      secure: true,
      domain: ".today.green",
      sameSite: "none",
      path: "/",
      httpOnly: false,
      withCredentials: true,
    };
  } else if (process.env.NODE_ENV && process.env.NODE_ENV === "staging") {
    cookieAuthObj = {
      expires: date,
      secure: true,
      domain: ".today.green",
      sameSite: "none",
      path: "/",
      httpOnly: false,
      withCredentials: true,
    };
  } else if (process.env.NODE_ENV && process.env.NODE_ENV === "development") {
    cookieAuthObj = {
      expires: date,
      secure: false,
      // sameSite: 'none',
      path: "/",
      httpOnly: false,
    };
  }

  res.cookie("refresh_tk", token, cookieAuthObj);
};

module.exports.clearCookie = async function (res) {
  let cookieAuthObj;
  if (process.env.NODE_ENV && process.env.NODE_ENV === "production") {
    cookieAuthObj = {
      expires: new Date(),
      secure: true,
      domain: ".today.green.com",
      sameSite: "none",
      path: "/",
      httpOnly: false,
      // signed: true
    };
  } else if (process.env.NODE_ENV && process.env.NODE_ENV === "staging") {
    cookieAuthObj = {
      expires: new Date(),
      secure: true,
      domain: ".today.green.xyz",
      sameSite: "none",
      path: "/",
      httpOnly: false,
      // signed: true,
    };
  } else if (process.env.NODE_ENV && process.env.NODE_ENV === "development") {
    cookieAuthObj = {
      expires: new Date(),
      secure: true,
      sameSite: "none",
      path: "/",
      httpOnly: false,
    };
  }
  res.cookie("auth_tk", "deleted", cookieAuthObj);
  res.clearCookie("refresh_tk");
};