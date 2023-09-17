const VENDOR_STATISTICS_MODEL = require("../model/vendorStatisticsModel");
const ERROR_RESPONSE = require("../utils/catchErrorResponse");

// get All Year Statistic Of One Vendor
module.exports.getAllYearStatisticOfOneVendor = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const allStatisticOfOneVendor = await VENDOR_STATISTICS_MODEL.find(
      vendorId
    );

    res.status(200).json({
      status: true,
      data: allStatisticOfOneVendor
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

//get one Year Statistic Of One Vendor
module.exports.getOneYear = async (req, res) => {
  try {
    const { vendorId, year } = req.body;

    const OneYearStatistic = await VENDOR_STATISTICS_MODEL.findOne({
      _id: vendorId,
      year
    });

    res.status(200).json({
      status: true,
      data: OneYearStatistic
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

//create vendor statistics
// module.exports.createVendorStatistic = async (vendorId) => {
//   try {
//     const year = new Date().getFullYear();

//     const existingStatistic = await VENDOR_STATISTICS_MODEL.findOne({
//       vendorId,
//       year
//     });

//     if (existingStatistic) {
//       return true;
//     }

//     const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

//     const data = months.map((mon) => ({
//       month: mon,
//       monthPurchase: 0,
//       monthReturn: 0
//     }));

//     const statistic = new VENDOR_STATISTICS_MODEL({
//       vendorId,
//       year,
//       data,
//       yearlyPurchase: 0,
//       yearlyReturn: 0
//     });

//     await statistic.save();

//     if (statistic) {
//       return true;
//     } else {
//       return false;
//     }
//   } catch (error) {
//     return ERROR_RESPONSE(res, error);
//   }
// };

module.exports.createVendorStatistic = async (vendorId) => {
  try {
    const year = new Date().getFullYear();

    const statisticExists = await VENDOR_STATISTICS_MODEL.exists({
      vendorId,
      year
    });

    if (statisticExists) {
      return true;
    }

    const months = Array.from({ length: 12 }, (_, i) => ({
      month: i,
      monthPurchase: 0,
      monthReturn: 0
    }));

    const statistic = new VENDOR_STATISTICS_MODEL({
      vendorId,
      year,
      data: months,
      yearlyPurchase: 0,
      yearlyReturn: 0
    });

    await statistic.save();

    if (statistic) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.updateStatistic = async (req, res) => {
  try {
    const {
      vendorId,
      year,
      month,
      monthPurchase = null,
      monthReturn = null
    } = req.body;

    let value;

    if (monthPurchase) {
      value = monthPurchase;
    } else if (monthReturn) {
      value = monthReturn;
    }
    const updateStat = await VENDOR_STATISTICS_MODEL.findOneAndUpdate(
      { vendorId, year, "data.month": month },
      { $set: { "data.monthPurchase": value } }
    );

    if (!updateStat) {
      return res.status(404).json({
        status: false,
        message: "statistic not found"
      });
    }

    res.status(200).json({
      status: true,
      message: "Statistic updated"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};
