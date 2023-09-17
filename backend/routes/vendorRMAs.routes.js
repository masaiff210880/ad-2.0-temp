const express = require("express");
const router = express.Router();

const vendorRMAsController = require("../controller/vendorRMAs.controller");

// Create a new return product receipt
router.post("/create/:prId", vendorRMAsController.createRMAs);

// Edit to return product receipt
router.patch("/edit/:rmasId", vendorRMAsController.editvendorRMAs);

// delete a return product receipt
router.delete("/delete/:rmasId", vendorRMAsController.deletevendorRMAs);

// get all return product receipt
router.get("/view", vendorRMAsController.getvendorRMAs);

//  get one return product receipt by ID
router.get("/view/:rmasId", vendorRMAsController.getOnevendorRMAsById);

module.exports = router;
