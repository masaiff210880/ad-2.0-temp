const VENDOR_RECENT_ACTIVITY_MODEL = require("../model/vendorRecentActivityModel");
const VENDOR_MODEL = require("../model/vendorModel");
const ERROR_RESPONSE = require("../utils/catchErrorResponse");

module.exports.createRecentVendorActivity = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const { user } = req.body;

    const isVendor = await VENDOR_MODEL.findById(vendorId);

    if (!isVendor) {
      return res.status(404).json({
        status: false,
        message: "Vendor not found, please add it first"
      });
    }

    const vendorActivity = await VENDOR_RECENT_ACTIVITY_MODEL.create({
      vendorId,
      // adminId: "64f0abab0f7ed57c4f5d3ebc",
      adminId: user.id,
      ...req.body
    });

    res.status(200).json({
      status: true,
      message: "Vendor activity added",
      data: vendorActivity
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.editRecentVendorActivity = async (req, res) => {
  try {
    const { activityId } = req.params;

    const editActivity = await VENDOR_RECENT_ACTIVITY_MODEL.findByIdAndUpdate(
      activityId,
      req.body
    );

    if (!editActivity) {
      return res.status(404).json({
        status: false,
        message: "Vendor activity activity not found"
      });
    }

    res.status(200).json({
      status: true,
      message: "Vendor activity Edited Successfully"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.deleteRecentVendorActivity = async (req, res) => {
  try {
    const { activityId } = req.params;

    await VENDOR_RECENT_ACTIVITY_MODEL.findByIdAndDelete(activityId);

    res.status(200).json({
      status: true,
      message: "Vendor activity Deleted Successfully"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.getAllRecentVendorActivity = async (req, res) => {
  try {
    const query = req.query || {};

    const allVendoractivity = await VENDOR_RECENT_ACTIVITY_MODEL.find(query)
      .populate({
        path: "adminId",
        select: { avatar: 1, firstName: 1, lastName: 1 }
      })
      .lean();
    // .populate("vendorId")
    // .populate("productId")
    // .populate("variantId")
    // .populate("poId")
    // .populate("prId");

    res.status(200).json({
      status: false,
      data: allVendoractivity
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

// module.exports.getAllRecentVendorActivity = async (req, res) => {
//   try {
//     const { vendorId } = req.params;

//     const allVendoractivity = await VENDOR_RECENT_ACTIVITY_MODEL.find({
//       vendorId
//     })
//       .populate([
//         "userId",
//         "vendorId",
//         "productId",
//         "variantId",
//         "poId",
//         "prId"
//       ])
//       .exec();

//     res.status(200).json({
//       status: true,
//       data: allVendoractivity
//     });
//   } catch (error) {
//     return ERROR_RESPONSE(res, error);
//   }
// };
