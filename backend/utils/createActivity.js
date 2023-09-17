const USER_RECENT_ACTIVITY_MODEL = require("../model/userRecentActivityModel");
const VENDOR_RECENT_ACTIVITY_MODEL = require("../model/vendorRecentActivityModel");
const ERROR_RESPONSE = require("../utils/catchErrorResponse");

const createVendorActivity = async (body, res) => {
  try {
    await VENDOR_RECENT_ACTIVITY_MODEL.create(body);

    return { message: "Vendor activity added" };
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

const createUserActivity = async (body, res) => {
  try {
    await USER_RECENT_ACTIVITY_MODEL.create(body);

    return { message: "User activity added" };
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports = { createUserActivity, createVendorActivity };
