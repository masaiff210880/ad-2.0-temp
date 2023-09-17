const express = require("express");
const router = express.Router();
const userPaymentController = require("../controller/userPayment.controller");

router.get("/all", userPaymentController.getAllUserPayment);

router.get("/one/:userPayId", userPaymentController.getOneUserPayment);

router.get("/update/:userPayId", userPaymentController.updateOneUserPay);

router.get("/delete/:userPayId", userPaymentController.deleteOneUserPay);

module.exports = router;
