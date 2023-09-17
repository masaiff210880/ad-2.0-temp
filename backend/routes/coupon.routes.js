const express = require("express");
const router = express.Router();
const couponController = require("../controller/coupon.controller");

//To create a coupon
router.post("/add-coupon", couponController.createCoupon);

router.get("/all-coupon", couponController.getAllCoupon);

//to remove all coupons
router.get("/remove-coupon", couponController.removeCoupon);

router.patch("/update-coupon/:couponId", couponController.updateCoupon);

router.delete("/delete-coupon/:couponId", couponController.deleteCoupon);

//to apply coupon
router.patch("/apply-coupon", couponController.applyCoupon);

module.exports = router;
