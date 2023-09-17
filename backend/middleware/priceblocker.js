const jwt = require("jsonwebtoken");
const ERROR_RESPONSE = require("../utils/catchErrorResponse");

module.exports.priceBlocker = async (req, res) => {
  try {
    let isLogin = false;
    let role = "user";
    // let token = await req.cookies["loginToken"];

    let token = req.headers?.authorization?.split(" ")[1];

    if (token) {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      if (decoded) {
        req.body.user = decoded;
        isLogin = true;
        role = decoded.role;
      }
    }

    return { isLogin, role };
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};
