const express = require("express");
const router = express.Router();

const vendorRMAsController = require("../controller/userRMAs.controller");

// Create a new return product receipt
router.post("/create/:salesOrderId", vendorRMAsController.createUserRMAs);

// Edit to return product receipt
router.patch("/edit/:rmasId", vendorRMAsController.editUserRMAs);

// delete a return product receipt
router.delete("/delete/:rmasId", vendorRMAsController.deleteUserRMAs);

// get all return product receipt
router.get("/view", vendorRMAsController.getUserRMAs);

//  get one return product receipt by ID
router.get("/view/:rmasId", vendorRMAsController.getOneUserRMAsById);

module.exports = router;
