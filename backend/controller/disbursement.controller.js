const DISBURSEMENT_MODEL = require("../model/disbursementModel");
// const PURCHASE_RECEIPT_MODEL = require("../model/purchaseReceiptModel");
// const PURCHASE_ORDER_MODEL = require("../model/purchaseOrderModel");
const ERROR_RESPONSE = require("../utils/catchErrorResponse");

//update the disbursement after product receipt crearted
module.exports.updateDisbursement = async (req, res) => {
  try {
    const { disbursementId } = req.params; // Send purchase order _id

    // send this below data in req.body:
    // { paymentId, paymentDate, bankAccount, checkNumber, unappliedDeposits, poDeposits, reApplyStatus, auditTrail }

    const disbursement = await DISBURSEMENT_MODEL.findByIdAndUpdate(
      disbursementId,
      req.body
    );

    if (!disbursement) {
      return res.status(404).json({
        status: false,
        message: "Disbursement  not found, Please generate PO first"
      });
    }
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.disbursementOfOneVendor = async (req, res) => {
  try {
    const query = req.query || {};
    //to get all PO data for 1 individual vendor pass vendorId in query(?vendorId=9652fe5625e45) or if want filter by any other fields so can pass in query.

    const disbursement = await DISBURSEMENT_MODEL.find(
      query,
      "-purchaseItemId"
    );

    res.status(200).json({
      status: true,
      data: disbursement
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.oneDisbursementDetails = async (req, res) => {
  try {
    const { disbursementId } = req.params; // Send purchase order _id

    // Retrieve purchase order details and populate the vendorId and variantId fields
    const disbursementDetails = await DISBURSEMENT_MODEL.findById(
      disbursementId
    )
      .populate("vendorId")
      .populate({
        path: "purchaseItemId",
        populate: {
          path: "variantId"
        }
      });

    if (!disbursementDetails) {
      return res.status(404).json({
        status: false,
        message: "Disbursement not found"
      });
    }

    res.status(200).json({
      status: true,
      data: disbursementDetails
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};
