const express = require("express");
const router = express.Router();

const vendorSattisticController = require("../controller/vendorStatistics.controller");

// get All Year Statistic Of One Vendor
router.get(
  "/all-stat/:vendorId",
  vendorSattisticController.getAllYearStatisticOfOneVendor
);

//get one Year Statistic Of One Vendor
router.get("/one-stat", vendorSattisticController.getOneYear);

router.patch("/edit-stat", vendorSattisticController.updateStatistic);

module.exports = router;
