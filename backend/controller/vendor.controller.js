const VENDOR_MODEL = require("../model/vendorModel");
const ERROR_RESPONSE = require("../utils/catchErrorResponse");
const { createVendorActivity } = require("../utils/createActivity");

// create a new vendor
module.exports.createVendor = async (req, res) => {
  try {
    const { user } = req.body;
    const newVendor = await VENDOR_MODEL.create(req.body);

    const body = {
      vendorId: newVendor._id,
      adminId: user.id,
      subject: "Add a new vendor",
      body: `We're thrilled to add a valued vendor ${
        newVendor.firstName + newVendor.lastName
      } having uniqueId ${
        newVendor.uniqueId
      } . We look forward to a fruitful and prosperous journey ahead`
    };

    const vendorActivity = await createVendorActivity(body, res);

    if (!vendorActivity) {
      return res.status(400).json({
        status: false,
        message: "Error in create activity"
      });
    }

    res.status(201).json({
      status: true,
      data: newVendor
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

// get all vendors data
module.exports.allVendor = async (req, res) => {
  try {
    const query = req.query || {};
    const vendors = await VENDOR_MODEL.find(query);

    res.status(200).json({
      status: true,
      data: vendors
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

// Get a specific vendor by ID
module.exports.getOneVendor = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const vendor = await VENDOR_MODEL.findById(vendorId);
    // .populate(
    //   "vendorContactPersonId"
    // );

    if (!vendor) {
      return res.status(404).json({
        status: false,
        message: "Vendor not found"
      });
    }

    res.status(200).json({
      status: true,
      data: vendor
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

// Update a vendor by ID
module.exports.updateVendor = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const { user } = req.body;

    const updatedVendor = await VENDOR_MODEL.findByIdAndUpdate(
      vendorId,
      req.body
    );

    if (!updatedVendor) {
      return res.status(404).json({
        status: false,
        message: "Vendor not found"
      });
    }

    const body = {
      vendorId,
      adminId: user.id,
      subject: "Update the vendor details",
      body: `Update the vendor, Vendor name : ${
        updatedVendor?.firstName + updatedVendor?.lastName
      } having uniqueId ${newVendor.uniqueId} and changes done in ${req.body}.`
    };

    const vendorActivity = await createVendorActivity(body, res);

    if (!vendorActivity) {
      return res.status(400).json({
        status: false,
        message: "Error in create activity"
      });
    }

    res.status(200).json({
      status: true,
      data: updatedVendor
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

// Delete a vendor by ID
module.exports.deleteVendor = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const { user } = req.body;
    const deletedVendor = await VENDOR_MODEL.findByIdAndDelete(vendorId);

    if (!deletedVendor) {
      return res.status(404).json({
        status: false,
        message: "Vendor not found"
      });
    }

    const body = {
      vendorId,
      adminId: user.id,
      subject: "Delete the vendor details",
      body: `Delete the vendor, Vendor name : ${
        deletedVendor?.firstName + deletedVendor?.lastName
      } having uniqueId ${deletedVendor.uniqueId}.`
    };

    const vendorActivity = await createVendorActivity(body, res);

    if (!vendorActivity) {
      return res.status(400).json({
        status: false,
        message: "Error in create activity"
      });
    }

    res.status(200).json({
      status: true,
      message: "Vendor deleted successfully"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};
