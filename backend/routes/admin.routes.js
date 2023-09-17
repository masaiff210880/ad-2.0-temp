const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin.controller");

//to verify the user after check the license
router.patch("/user-verified/:userId", adminController.verifiesUser);

//to add a new user by admin
router.post("/user-create", adminController.createUser);

//to retrive all the user
router.get("/all-user", adminController.getAllUser);

//to retrive one user details
router.get("/one-user/:userId", adminController.getOneUser);

//update any user
router.patch("/update-user/:userId", adminController.updateUser);

//delete any user
router.delete("/delete-user/:userId", adminController.deleteUser);

router.patch("/user-price-level/:levelId", adminController.userAndPriceLevel);

// router.post("/user-price-level", adminController.addPriceLevel);

router.get("/get-level", adminController.getUserTypePriceLevel);

// assign sales rep by Admin
router.get("/sales-rep", adminController.assignSalesRep);

module.exports = router;
