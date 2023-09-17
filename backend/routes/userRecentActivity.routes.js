const express = require("express");
const router = express.Router();

const userRecentActivityController = require("../controller/userRecentActivity.controller");

router.post(
  "/create/:userId",
  userRecentActivityController.createRecentUserActivity
);

// Create a new User contact person
router.patch(
  "/edit/:activityId",
  userRecentActivityController.editRecentUserActivity
);

// Create a new User contact person
router.delete(
  "/delete/:activityId",
  userRecentActivityController.deleteRecentUserActivity
);

// Create a new User contact person
router.get("/view", userRecentActivityController.getAllRecentUserActivity);

module.exports = router;
