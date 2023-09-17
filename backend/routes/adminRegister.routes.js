const express = require("express");
const router = express.Router();
const adminRegisterController = require("../controller/adminRegister.controller");

//to signup a new admin
router.post("/signup", adminRegisterController.adminSignup);

//to login admin
router.post("/login", adminRegisterController.adminLogin);

// to logout the admin
router.get("/logout", adminRegisterController.adminLogout);

//getAllAdminData
router.get("/all", adminRegisterController.getAllAdminData);

//getAllAdminData
router.patch(
  "/update/:adminId",
  adminRegisterController.adminCredentialsUpdate
);

module.exports = router;
