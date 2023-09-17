const USER_MODEL = require("../model/UserModel");
const { v4: uuidv4 } = require("uuid");
const USER_AND_PRICE_LEVEL_MODEL = require("../model/priceLevelModel");
const ERROR_RESPONSE = require("../utils/catchErrorResponse");
const { loginDevice } = require("../utils/loginDevices");
const { createUserActivity } = require("../utils/createActivity");
const USER_LICENSE_MODEL = require("../model/userLicenseModel");

module.exports.verifiesUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { user } = req.body;

    const verified = await USER_MODEL.findByIdAndUpdate(userId, {
      $set: {
        isProfileVerifiedByAdmin: true,
        mailSentByAdmin: true,
        verifiedAdminId: user.id
      }
    });

    if (!verified) {
      res.status(404).json({
        status: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      status: true,
      message: "User verified, E-Mail sent"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.createUser = async (req, res) => {
  try {
    const { user } = req.body;

    if (user.role === "user") {
      return res.status(401).json({
        status: false,
        message: "You are not authorised"
      });
    }

    const { deviceInfo, ipAddress, ipLocation } = loginDevice(req);

    const loginDevices = [
      {
        deviceInfo: deviceInfo?.toString() || "",
        ipAddress: ipAddress?.toString() || "",
        ipLocation: ipLocation?.toString() || ""
      }
    ];

    const password = uuidv4().substring(0, 6);

    const {
      firstName,
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
      password: firstName + password,
      isUserCreatedByAdmin: true,
      isProfileVerifiedByAdmin: true,
      isUserCheckEmail: true,
      mailSentByAdmin: true,
      userCreatedByAdminId: user?.id,
      userCreatedByAdminName: user?.userName,
      status: "Active",
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
      phoneNumber,
      isProfileVerifiedByAdmin: true,
      verifiedAdminId: user?.id
    };

    await USER_LICENSE_MODEL.create(licensePayload);

    const body = {
      userId: newUser?._id,
      adminId: user?.id,
      subject: "Add a new customer",
      body: `We're thrilled to add a valued customer ${
        newUser?.firstName + newUser?.lastName
      }, by Admin : ${user?.userName} having unique account number ${
        newUser?.internalAccountNumber
      } . We look forward to a fruitful and prosperous journey ahead.`
    };

    const vendorActivity = await createUserActivity(body, res);

    if (!vendorActivity) {
      return res.status(400).json({
        status: false,
        message: "Error in create activity"
      });
    }

    res.status(200).json({
      status: true,
      message: "Customer created successfully",
      password: firstName + password
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.getAllUser = async (req, res) => {
  try {
    const query = req.query || {};
    const users = await USER_MODEL.find(query)
      .populate({ path: "userLicenses", select: { businessName: 1, _id: 0 } })
      .sort({ _id: -1 })
      .exec();

    res.status(200).json({
      status: true,
      data: users
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.getOneUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await USER_MODEL.findById(userId).populate("userLicenses");

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      status: true,
      data: user
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { user, userLicenses } = req.body;

    const isUser = await USER_MODEL.findByIdAndUpdate(userId, req.body);

    if (!isUser) {
      return res.status(404).json({
        status: false,
        message: "User not found"
      });
    }

    const licenseUpdates = userLicenses.map(async (elem) => {
      let licenseId = elem._id;

      delete elem._id;

      const updatedLicense = await USER_LICENSE_MODEL.findByIdAndUpdate(
        licenseId,
        elem,
        { new: true }
      );

      return updatedLicense;
    });

    // Wait for all license updates to complete
    const updatedLicenses = await Promise.all(licenseUpdates);

    const body = {
      userId,
      adminId: user.id,
      subject: "Update the customer details",
      body: `Update the customer, Customer name : ${
        isUser?.firstName + isUser?.lastName
      } having unique account number ${
        isUser?.internalAccountNumber
      } and changes done in ${req.body}.`
    };

    const userActivity = await createUserActivity(body, res);

    if (!userActivity) {
      return res.status(400).json({
        status: false,
        message: "Error in create activity"
      });
    }

    res.status(200).json({
      status: true,
      message: "User updated successfully"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { user } = req.body;

    // ============================================================
    const isUser = await USER_MODEL.findById(userId);

    if (
      isUser?.email === "test@gmail.com" ||
      isUser?.email === "faizan@gmail.com"
    ) {
      return res.status(200).json({
        status: false,
        message:
          "Please do not delete these credentials, It consists other many data"
      });
    }
    // ============================================================

    const deleteUser = await USER_MODEL.findByIdAndDelete(userId);

    if (!deleteUser) {
      return res.status(404).json({
        status: false,
        message: "User not found"
      });
    }

    await USER_LICENSE_MODEL.deleteMany({ userId });

    const body = {
      userId,
      adminId: user?.id,
      subject: "Delete the customer details",
      body: `Delete the customer, Customer name : ${
        deleteUser?.firstName + deleteUser?.lastName
      } having unique account number ${
        deleteUser?.internalAccountNumber
      } by admin : ${user?.userName}.`
    };

    const vendorActivity = await createUserActivity(body, res);

    if (!vendorActivity) {
      return res.status(400).json({
        status: false,
        message: "Error in create activity"
      });
    }

    res.status(200).json({
      status: true,
      message: "User deleted successfully"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.userAndPriceLevel = async (req, res) => {
  try {
    const { levelId } = req.params;

    const level = await USER_AND_PRICE_LEVEL_MODEL.findByIdAndUpdate(
      levelId,
      req.body
    );

    res.status(200).json({
      status: true,
      message: "User/Price level updated successfully",
      data: level
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.getUserTypePriceLevel = async (req, res) => {
  try {
    const level = await USER_AND_PRICE_LEVEL_MODEL.find();

    res.status(200).json({
      status: true,
      data: level
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

// module.exports.addPriceLevel = async (req, res) => {
//   try {
//     const { levelId } = req.params;

//     const level = new USER_AND_PRICE_LEVEL_MODEL({});

//     await level.save();

//     res.status(200).json({
//       status: true,
//       message: "User/Price level updated successfully",
//       data: level
//     });
//   } catch (error) {
//     return ERROR_RESPONSE(res, error);
//   }
// };

module.exports.assignSalesRep = async (req, res) => {
  try {
    const { empId, nickName, userId } = req.body;

    const assignedEmp = await USER_MODEL.findByIdAndUpdate(userId, {
      $set: { salesRepName: nickName, salesRepId: empId }
    });

    if (!assignedEmp) {
      return res.status(404).json({
        status: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      status: true,
      message: "SalesRep assigned to the customer"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};
