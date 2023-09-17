const USER_PAYMENT_MODEL = require("../model/userPaymentModel");
const ERROR_RESPONSE = require("../utils/catchErrorResponse");

module.exports.getAllUserPayment = async (req, res) => {
  try {
    let query = req.query || {};

    const allUserPay = await USER_PAYMENT_MODEL.find(query);

    if (!allUserPay) {
      return res.status(404).json({
        status: false,
        message: "Search query not found"
      });
    }

    res.status(200).json({
      status: true,
      data: allUserPay
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.getOneUserPayment = async (req, res) => {
  try {
    const { userPayId } = req.params;

    const userPay = await USER_PAYMENT_MODEL.findById(userPayId);

    if (!userPay) {
      return res.status(404).json({
        status: false,
        message: "Search query not found"
      });
    }

    res.status(200).json({
      status: true,
      data: userPay
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.updateOneUserPay = async (req, res) => {
  try {
    const { userPayId } = req.params;

    const userPay = await USER_PAYMENT_MODEL.findByIdAndUpdate(
      userPayId,
      req.body
    );

    if (!userPay) {
      return res.status(404).json({
        status: false,
        message: "User Payment not found"
      });
    }

    res.status(200).json({
      status: true,
      message: "User Payment updated successfull"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.deleteOneUserPay = async (req, res) => {
  try {
    const { userPayId } = req.params;

    await USER_PAYMENT_MODEL.findByIdAndDelete(userPayId);

    res.status(200).json({
      status: true,
      message: "User Payment deleted successfull"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};
