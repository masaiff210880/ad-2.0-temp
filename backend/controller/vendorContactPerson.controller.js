const VENDOR_CONTACT_PERSON_MODEL = require("../model/vendorContactPersonModel");
const VENDOR_MODEL = require("../model/vendorModel");
const ERROR_RESPONSE = require("../utils/catchErrorResponse");

module.exports.createContactPerson = async (req, res) => {
  try {
    const { vendorId } = req.params;

    const isVendor = await VENDOR_MODEL.findById(vendorId);

    if (!isVendor) {
      return res.status(404).json({
        status: false,
        message: "Vendor not found, please add it first"
      });
    }

    const contactPerson = await VENDOR_CONTACT_PERSON_MODEL.create({
      vendorId,
      ...req.body
    });

    await VENDOR_MODEL.findByIdAndUpdate(
      isVendor._id,
      { $push: { vendorContactPersonId: contactPerson._id } },
      { new: true }
    );

    res.status(200).json({
      status: true,
      message: "Contact person added",
      data: contactPerson
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.editContactPerson = async (req, res) => {
  try {
    const { contactId } = req.params;

    const editContact = await VENDOR_CONTACT_PERSON_MODEL.findByIdAndUpdate(
      contactId,
      req.body
    );

    if (!editContact) {
      return res.status(404).json({
        status: false,
        message: "Contact Person not found"
      });
    }

    res.status(200).json({
      status: true,
      message: "Contact Person Edited Successfully"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.deleteContactPerson = async (req, res) => {
  try {
    const { contactId } = req.params;

    await VENDOR_CONTACT_PERSON_MODEL.findByIdAndDelete(contactId);

    res.status(200).json({
      status: true,
      message: "Contact Person Deleted Successfully"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.getContactPerson = async (req, res) => {
  try {
    const { vendorId } = req.params;

    const allContactPerson = await VENDOR_CONTACT_PERSON_MODEL.find({
      vendorId
    });

    res.status(200).json({
      status: false,
      data: allContactPerson
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};
