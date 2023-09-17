const jwt = require("jsonwebtoken");
const ERROR_RESPONSE = require("../utils/catchErrorResponse");

const authentication = async (req, res, next) => {
  try {
    // let token = await req.cookies["loginToken"];

    let token = req.headers?.authorization?.split(" ")[1];

    if (token) {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      if (decoded) {
        req.body.user = decoded;
        next();
      } else {
        res.status(401).json({
          status: false,
          message: "Please Log-In first"
        });
      }
    } else {
      res.status(401).json({
        status: false,
        message: "Please Log-In first"
      });
    }
  } catch (error) {
    // return ERROR_RESPONSE(res, error);
    res.status(500).send(error);
  }
};

module.exports = authentication;
