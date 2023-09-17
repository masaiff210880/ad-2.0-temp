const { isDate } = require("moment/moment");
const USER_MODEL = require("../model/UserModel");

const isUserValidtoBuy = async (userId) => {
  const isUser = await USER_MODEL.findById(userId).populate("userLicenses");

  if (!isUser) {
    return false;
  }

  if (isUser.status.toLowerCase() !== "active") {
    return false;
  }

  let isData = isUser.userLicenses.find(
    (element) => element.isProfileVerifiedByAdmin === true
  );

  return isData ? true : false;
};

module.exports = { isUserValidtoBuy };
