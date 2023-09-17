const VENDOR_RMA_MODEL = require("../model/vendorRMAsModel");
const PURCHASE_RECEIPT_MODEL = require("../model/purchaseReceiptModel");
const PURCHASE_ITEMS_MODEL = require("../model/purchaseItemModel");
const ERROR_RESPONSE = require("../utils/catchErrorResponse");
const { createVendorActivity } = require("../utils/createActivity");

module.exports.createRMAs = async (req, res) => {
  try {
    const { prId } = req.params;

    const isPrExist = await PURCHASE_RECEIPT_MODEL.findById(prId);

    if (!isPrExist) {
      return res.status(404).json({
        status: false,
        message: "Please create Purchase Receipt first"
      });
    }

    const {
      vendorId,
      purchaseOrderId,
      transactionId,
      disbursementId,
      transactionDate,
      deliveryDate,
      PoNumber = 0
    } = isPrExist;

    const {
      disposition,
      employee,
      user,
      memo = "",
      returnVia = "",
      purchaseItemId
    } = req.body;

    let pieces = 0;
    let totalAmount = 0;

    await Promise.all(
      purchaseItemId.map(async (elem) => {
        const isExistItem = isPrExist.purchaseItemId.includes(elem._id);

        if (!isExistItem) {
          throw new Error("Ordered item and return item does not match");
        }

        const item = await PURCHASE_ITEMS_MODEL.findById(elem._id);

        item.isReturn = true;
        item.returnQuantity = elem.returnQuantity;

        pieces += elem.returnQuantity;
        totalAmount += Number(elem.returnQuantity) * Number(item.pricePerUnit);
      })
    );

    const payload = {
      vendorId,
      purchaseOrderId,
      disposition,
      purchaseReceiptId: prId,
      purchaseItemId,
      pieces,
      totalAmount,
      employee,
      memo,
      returnVia,
      transactionId,
      disbursementId,
      transactionDate,
      deliveryDate,
      returnTicketRaisedBy: user.id
    };

    const returnItem = new VENDOR_RMA_MODEL(payload);
    await returnItem.save();

    const body = {
      vendorId,
      adminId: user?.id,
      subject: `Order : ${PoNumber} raised return ticket`,
      body: `Order number: ${PoNumber} raised a return ticket by admin ${user?.userName} for pieces : ${pieces} and total amount : ${totalAmount}.`
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
      message: "Return ticket created successfully"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.editvendorRMAs = async (req, res) => {
  try {
    const { rmasId } = req.params;
    const { user } = req.body;

    const editVendorReturn = await VENDOR_RMA_MODEL.findByIdAndUpdate(
      rmasId,
      req.body
    );

    if (!editVendorReturn) {
      return res.status(404).json({
        status: false,
        message: "Return item not found"
      });
    }

    const body = {
      userId: editVendorReturn.userId,
      adminId: user?.id,
      subject: `Order : ${editVendorReturn.uniqueId} edited the return ticket`,
      body: `Order number: ${editVendorReturn.uniqueId} return ticket edited by the admin ${user?.userName} with these details: ${req.body}`
    };

    const vendorActivity = await createVendorActivity(body, res);

    if (!vendorActivity) {
      return res.status(400).json({
        status: false,
        message: "Error in creating activity"
      });
    }

    res.status(200).json({
      status: true,
      message: "Return item Edited Successfully"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.deletevendorRMAs = async (req, res) => {
  try {
    const { rmasId } = req.params;

    const deleteVendorRMAs = await VENDOR_RMA_MODEL.findByIdAndDelete(rmasId);

    const body = {
      userId: deleteVendorRMAs?.userId,
      adminId: user?.id,
      subject: `Order : ${deleteVendorRMAs.uniqueId}, return ticket deleted`,
      body: `Order number: ${deleteVendorRMAs.uniqueId} return ticket deleted by the admin ${user?.userName}.`
    };

    const vendorActivity = await createVendorActivity(body, res);

    if (!vendorActivity) {
      return res.status(400).json({
        status: false,
        message: "Error in creating activity"
      });
    }

    res.status(200).json({
      status: true,
      message: "Return receipt deleted successfully"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.getvendorRMAs = async (req, res) => {
  try {
    let query = req.query || {};

    let rmas = await VENDOR_RMA_MODEL.find(query);

    res.status(200).json({
      status: true,
      data: rmas
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.getOnevendorRMAsById = async (req, res) => {
  try {
    const { rmasId } = req.params;

    const rmas = await VENDOR_RMA_MODEL.findById(rmasId);

    if (!rmas) {
      return res.status(404).json({
        status: false,
        message: "Return reaceipt not found"
      });
    }

    res.status(200).json({
      status: true,
      data: rmas
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};
