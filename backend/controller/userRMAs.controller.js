const USER_RMA_MODEL = require("../model/userRMAsModel");
const SALES_ORDER_MODEL = require("../model/salesOrderModel");
const ORDER_ITEMS_MODEL = require("../model/orderItemModel");
const ERROR_RESPONSE = require("../utils/catchErrorResponse");
const { createUserActivity } = require("../utils/createActivity");

module.exports.createUserRMAs = async (req, res) => {
  try {
    const { salesOrderId } = req.params;
    const { user } = req.body;

    const isSalesOrder = await SALES_ORDER_MODEL.findById(salesOrderId);

    if (!isSalesOrder) {
      return res.status(404).json({
        status: false,
        message: "Please create Order first"
      });
    }

    const {
      userId,
      uniqueId,
      orderItemId,
      orderId,
      orderFullfillmentId,
      userPaymentId,
      deliveryDate
    } = isSalesOrder;

    const {
      disposition,
      employee,
      memo = "",
      returnVia = "",
      orderItemIds,
      transactionId = ""
    } = req.body;

    let pieces = 0;
    let totalAmount = 0;

    await Promise.all(
      orderItemIds.map(async (elem) => {
        const isExistItem = orderItemId.includes(elem._id);

        if (!isExistItem) {
          throw new Error("Ordered item and return item does not match");
        }

        const item = await ORDER_ITEMS_MODEL.findById(elem._id);

        item.isReturn = true;
        item.returnQuantity = elem.returnQuantity;

        pieces += elem.returnQuantity;
        totalAmount += Number(elem.returnQuantity) * Number(item.pricePerUnit);
      })
    );

    const payload = {
      userId,
      salesOrderId,
      uniqueId,
      orderItemId,
      orderId,
      orderFullfillmentId,
      userPaymentId,
      transactionId,
      disposition,
      returnVia,
      returnTicketRaisedBy: user.id,
      pieces,
      totalAmount,
      employee,
      memo,
      deliveryDate
    };

    const returnItem = new USER_RMA_MODEL(payload);
    await returnItem.save();

    const body = {
      userId,
      adminId: user?.id,
      subject: `Order : ${uniqueId} raised return ticket`,
      body: `Order number: ${uniqueId} raised a return ticket by admin ${user?.userName} for pieces : ${pieces} and total amount : ${totalAmount}`
    };

    const vendorActivity = await createUserActivity(body, res);

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
    return ERROR_RESPONSE(res, error); // You need to define ERROR_RESPONSE function somewhere.
  }
};

module.exports.editUserRMAs = async (req, res) => {
  try {
    const { rmasId } = req.params;
    const { user } = req.body;

    const isUserRMAs = await USER_RMA_MODEL.findByIdAndUpdate(rmasId, req.body);

    if (!isUserRMAs) {
      return res.status(404).json({
        status: false,
        message: "Return item not found"
      });
    }

    const body = {
      userId: isUserRMAs.userId,
      adminId: user?.id,
      subject: `Order : ${isUserRMAs.uniqueId} edited the return ticket`,
      body: `Order number: ${isUserRMAs.uniqueId} return ticket edited by the admin ${user?.userName} with these details: ${req.body}`
    };

    const vendorActivity = await createUserActivity(body, res);

    if (!vendorActivity) {
      return res.status(400).json({
        status: false,
        message: "Error in creating activity"
      });
    }

    res.status(200).json({
      status: true,
      message: "Return item edited successfully"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.deleteUserRMAs = async (req, res) => {
  try {
    const { rmasId } = req.params;
    const { user } = req.body;

    const deleteUserRMAs = await USER_RMA_MODEL.findByIdAndDelete(rmasId);

    const body = {
      userId: deleteUserRMAs?.userId,
      adminId: user?.id,
      subject: `Order : ${isUserRMAs.uniqueId}, return ticket deleted`,
      body: `Order number: ${isUserRMAs.uniqueId} return ticket deleted by the admin ${user?.userName}.`
    };

    const vendorActivity = await createUserActivity(body, res);

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

module.exports.getUserRMAs = async (req, res) => {
  try {
    let query = req.query || {};

    let rmas = await USER_RMA_MODEL.find(query).sort({ _id: -1 }).exec();

    res.status(200).json({
      status: true,
      data: rmas
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.getOneUserRMAsById = async (req, res) => {
  try {
    const { rmasId } = req.params;

    const rmas = await USER_RMA_MODEL.findById(rmasId);

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
