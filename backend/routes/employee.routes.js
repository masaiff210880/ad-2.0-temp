const express = require("express");
const router = express.Router();
const employeeController = require("../controller/employee.controller");

// get all employee
router.get("/all", employeeController.getAllEmployee);

router.post("/create", employeeController.createEmployee);

router.post("/login", employeeController.loginEmployee);

router.delete("/delete/:empId", employeeController.deleteEmployee);

router.patch("/edit/:empId", employeeController.editEmployee);

module.exports = router;
