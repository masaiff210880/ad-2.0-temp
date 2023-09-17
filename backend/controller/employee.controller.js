const { v4: uuidv4 } = require("uuid");
const ERROR_RESPONSE = require("../utils/catchErrorResponse");
const { loginDevice } = require("../utils/loginDevices");
// const { createUserActivity } = require("../utils/createActivity");
const EMPLOYEE_MODEL = require("../model/employeeModel");
const { generateToken } = require("../utils/token");

module.exports.createEmployee = async (req, res) => {
  try {
    const { user } = req.body;
    let { firstName } = req.body;

    if (user.role === "user" || user.role === "employee") {
      return res.status(401).json({
        status: false,
        message: "You are not authorised"
      });
    }

    const { deviceInfo, ipAddress, ipLocation } = loginDevice(req);

    const loginDevices = [
      {
        deviceInfo: deviceInfo?.toString() || "",
        ipAddress: ipAddress?.toString() || "",
        ipLocation: ipLocation?.toString() || ""
      }
    ];

    const password = uuidv4().substring(0, 6);

    const payload = {
      ...req.body,
      password: firstName + password,
      isUserCreatedByAdmin: true,
      createdAdminId: user.id,
      createdAdminName: user.userName,
      status: "Active",
      loginDevices
    };

    await EMPLOYEE_MODEL.create(payload);

    res.status(200).json({
      status: true,
      message: "Employee created successfully",
      password: firstName + password
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.loginEmployee = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        status: false,
        error: "Please provide correct credentials"
      });
    }

    const employee = await EMPLOYEE_MODEL.findOne({ email });

    if (!employee) {
      return res.status(401).json({
        status: false,
        error: "No employee found. Please create an account"
      });
    }

    if (user.status === "Blocked") {
      return res.status(401).json({
        status: false,
        error: `Your account has ${user.status}, Please contact to admin`
      });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(403).json({
        status: false,
        error: "Password is not correct"
      });
    }

    const token = generateToken(user);
    // setLogInTokenCookie(token, res);

    res.status(200).json({
      status: true,
      message: "Logged In Successfully",
      userName: `${user.firstName} ${user.lastName}`,
      userType: user.role,
      token
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.deleteEmployee = async (req, res) => {
  try {
    const { empId } = req.params;

    const deleteEmp = await EMPLOYEE_MODEL.findByIdAndDelete(empId);

    if (!deleteEmp) {
      return res.status(404).json({
        status: false,
        message: "Employee not found"
      });
    }

    res.status(200).json({
      status: true,
      message: "Employee deleted successfully"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.editEmployee = async (req, res) => {
  try {
    const { empId } = req.params;
    const { password } = req.body;

    if (password) {
      return res.status(400).json({
        status: false,
        message: "Update any data apart from password"
      });
    }

    const isEmp = await EMPLOYEE_MODEL.findByIdAndUpdate(empId, req.body);

    if (!isEmp) {
      return res.status(404).json({
        status: false,
        message: "Employee not found"
      });
    }

    res.status(200).json({
      status: true,
      message: "Employee Updated successfully"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.getAllEmployee = async (req, res) => {
  try {
    let query = req.query || {};
    const allEmployee = await EMPLOYEE_MODEL.find(query);

    res.status(200).json({
      status: true,
      data: allEmployee
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};
