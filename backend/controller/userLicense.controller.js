const { json } = require("express");
const USER_LICENSE_MODEL = require("../model/userLicenseModel");
const USER_MODEL = require("../model/UserModel");
const ERROR_RESPONSE = require("../utils/catchErrorResponse");

module.exports.createLicenseDetails = async (req, res) => {
  try {
    const { userId } = req.params;

    const isExistUser = await USER_MODEL.findById(userId);

    if (!isExistUser) {
      return res.status(404).json({
        status: false,
        message: "User not Exist, Please signup first"
      });
    }

    req.body.userId = userId;

    const license = await USER_LICENSE_MODEL.create(req.body);

    isExistUser.userLicenses.push(license._id);
    await isExistUser.save();

    res.status(200).json({
      status: true,
      message:
        "License and address added successfully, Please wait for admin approval"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.getOneUserAllLicense = async (req, res) => {
  try {
    const { user } = req.body;

    let licenses = await USER_LICENSE_MODEL.find({ userId: user.id })
      .populate({
        path: "userId",
        select: { firstName: 1, lastName: 1 }
      })
      .exec();

    res.status(200).json({
      status: true,
      data: licenses
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.editOneLicense = async (req, res) => {
  try {
    const { licenseId } = req.params;

    const updatedLicense = await USER_LICENSE_MODEL.findByIdAndUpdate(
      licenseId,
      req.body
    );

    if (!updatedLicense) {
      res.status(404),
        json({
          status: true,
          message: "License fields updated"
        });
    }
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.deleteOneLicense = async (req, res) => {
  try {
    const { licenseId } = req.params;

    const deletedLicense = await USER_LICENSE_MODEL.findByIdAndDelete(
      licenseId
    );

    if (!deletedLicense) {
      res.status(404),
        json({
          status: true,
          message: "License fields deleted"
        });
    }
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.getAllLicense = async (req, res) => {
  try {
    const query = req.query || {};

    const licenses = await USER_LICENSE_MODEL.find(query).populate({
      path: "userId",
      select: { firstName: 1, lastName: 1 }
    });

    res.status(200).json({
      status: true,
      data: licenses
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.getOnelicenseById = async (req, res) => {
  try {
    const { licenseId } = req.params;

    const oneLicense = await USER_LICENSE_MODEL.findById(licenseId).populate({
      path: "userId",
      select: { firstName: 1, lastName: 1, email: 1, phoneNumber: 1 }
    });

    if (!oneLicense) {
      return res.status(404).json({
        status: false,
        message: "License not found"
      });
    }

    res.status(200).json({
      status: true,
      data: oneLicense
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};
