const USER_RECENT_ACTIVITY_MODEL = require("../model/userRecentActivityModel");
const USER_MODEL = require("../model/UserModel");
const ERROR_RESPONSE = require("../utils/catchErrorResponse");

module.exports.createRecentUserActivity = async (req, res) => {
  try {
    const { userId } = req.params;
    const { user } = req.body;

    const isUser = await USER_MODEL.findById(userId);

    if (!isUser) {
      return res.status(404).json({
        status: false,
        message: "User not found, please add it first"
      });
    }

    const vendorActivity = await USER_RECENT_ACTIVITY_MODEL.create({
      userId,
      // adminId: "64f0abab0f7ed57c4f5d3ebc",
      adminId: user.id,
      ...req.body
    });

    res.status(200).json({
      status: true,
      message: "User activity added",
      data: vendorActivity
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.editRecentUserActivity = async (req, res) => {
  try {
    const { activityId } = req.params;

    const editActivity = await USER_RECENT_ACTIVITY_MODEL.findByIdAndUpdate(
      activityId,
      req.body
    );

    if (!editActivity) {
      return res.status(404).json({
        status: false,
        message: "User activity activity not found"
      });
    }

    res.status(200).json({
      status: true,
      message: "User activity Edited Successfully"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.deleteRecentUserActivity = async (req, res) => {
  try {
    const { activityId } = req.params;

    await USER_RECENT_ACTIVITY_MODEL.findByIdAndDelete(activityId);

    res.status(200).json({
      status: true,
      message: "User activity Deleted Successfully"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.getAllRecentUserActivity = async (req, res) => {
  try {
    const query = req.query || {};

    const allUseractivity = await USER_RECENT_ACTIVITY_MODEL.find(query)
      .populate({
        path: "adminId",
        select: { avatar: 1, firstName: 1, lastName: 1 }
      })
      .lean();
    // .populate("userId")
    // .populate("productId")
    // .populate("variantId")
    // .populate("poId")
    // .populate("prId");

    res.status(200).json({
      status: false,
      data: allUseractivity
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

// module.exports.getAllRecentVendorActivity = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const allVendoractivity = await USER_RECENT_ACTIVITY_MODEL.find({
//       userId
//     })
//       .populate([
//         "userId",
//         "userId",
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
