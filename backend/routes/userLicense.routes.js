const express = require("express");
const router = express.Router();
const userLicenseController = require("../controller/userLicense.controller");
const authentication = require("../middleware/authentication");

router.post(
  "/fill-details/:userId",
  userLicenseController.createLicenseDetails
);

router.use(authentication);

router.get("/user", userLicenseController.getOneUserAllLicense);

// edit license
router.patch("/edit/:licenseId", userLicenseController.editOneLicense);

// delete license
router.delete("/delete/:licenseId", userLicenseController.deleteOneLicense);

// get all license, for more filter apply query
router.get("/all", userLicenseController.getAllLicense);

// Enter the new details of user license and address

// get one license
router.get("/one/:licenseId", userLicenseController.getOnelicenseById);

module.exports = router;
