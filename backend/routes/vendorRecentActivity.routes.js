const express = require("express");
const router = express.Router();

const vendorRecentVendorActivityController = require("../controller/vendorRecentActivity.controller");

router.post(
  "/create/:vendorId",
  vendorRecentVendorActivityController.createRecentVendorActivity
);

// Create a new vendor contact person
router.patch(
  "/edit/:activityId",
  vendorRecentVendorActivityController.editRecentVendorActivity
);

// Create a new vendor contact person
router.delete(
  "/delete/:activityId",
  vendorRecentVendorActivityController.deleteRecentVendorActivity
);

// Create a new vendor contact person
router.get(
  "/view",
  vendorRecentVendorActivityController.getAllRecentVendorActivity
);

module.exports = router;
