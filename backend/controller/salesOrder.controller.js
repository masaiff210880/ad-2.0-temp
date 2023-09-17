const SALES_ORDER_MODEL = require("../model/salesOrderModel");
const ERROR_RESPONSE = require("../utils/catchErrorResponse");
const { createUserActivity } = require("../utils/createActivity");

module.exports.viewSalesOrder = async (req, res) => {
  try {
    const query = req.query || {};
    const customerOrder = await SALES_ORDER_MODEL.find(
      query,
      "-userId -orderItemId"
    );

    res.status(200).json({
      status: true,
      data: customerOrder
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.pickingStarted = async (req, res) => {
  try {
    const { salesOrderId } = req.params;
    const { user } = req.body;

    const isSalesOrder = await SALES_ORDER_MODEL.findById(salesOrderId);

    if (!isSalesOrder) {
      return res.status(404).json({
        status: false,
        message: "Order not found"
      });
    }

    if (isSalesOrder.assignedId !== user.id) {
      return res.status(404).json({
        status: false,
        message: `Order no. : ${isSalesOrder.uniqueId}, is not assigned to you.`
      });
    }

    isSalesOrder.isPickingStarted = true;
    await isSalesOrder.save();

    res.status(200).json({
      status: true,
      message: `Order no. : ${startPick.uniqueId}, picking process started.`
    });
  } catch (error) {}
};

module.exports.assignPicker = async (req, res) => {
  try {
    const { user, salesOrderId, nickName, assignedId } = req.body;

    const isSalesOrder = await SALES_ORDER_MODEL.findById(salesOrderId);

    if (!isSalesOrder) {
      return res.status(404).json({
        status: false,
        message: "Order not found"
      });
    }

    if (isSalesOrder.isPickedAllItems) {
      return res.status(200).json({
        status: false,
        message: `Order no. : ${isSalesOrder.uniqueId}, This Order picking process completed by ${isSalesOrder.assignedTo}`
      });
    }

    isSalesOrder.assignedTo = nickName;
    isSalesOrder.assignedBy = user.id;
    isSalesOrder.assignedId = assignedId;
    isSalesOrder.phase = "P";
    isSalesOrder.assignedAt = new Date();
    isSalesOrder.stockStatus = "Pick";

    //just for now
    isSalesOrder.verifierName = nickName;

    isSalesOrder.save();

    const body = {
      userId: isSalesOrder?.userId,
      adminId: user.id,
      subject: `${isSalesOrder?.uniqueId} order assigned to pickerman`,
      body: `Order number: ${isSalesOrder?.uniqueId} assigned to pickerman by ${user.userName} for pick the material.`
    };

    const vendorActivity = await createUserActivity(body, res);

    if (!vendorActivity) {
      return res.status(400).json({
        status: false,
        message: "Error in create activity"
      });
    }

    return res.status(200).json({
      status: true,
      message: `Order successfully assigned to ${nickName}`
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.pickingCompleted = async (req, res) => {
  try {
    const { user, salesOrderId } = req.body;

    const isSalesOrder = await SALES_ORDER_MODEL.findById(salesOrderId);

    if (!isSalesOrder) {
      return res.status(404).json({
        status: false,
        message: "Order not found"
      });
    }

    if (isSalesOrder.isPickedAllItems) {
      return res.status(200).json({
        status: false,
        message: `Order no. : ${isSalesOrder.uniqueId}, This Order picking process completed, Assigned to verifier ${isSalesOrder.verifierName}`
      });
    }

    isSalesOrder.isPickedAllItems = true;
    isSalesOrder.phase = "PV";
    isSalesOrder.verifyAt = new Date();
    isSalesOrder.stockStatus = `Verified(${isSalesOrder.verifierName})... Ready to Fill`;

    isSalesOrder.save();

    const body = {
      userId: isSalesOrder?.userId,
      adminId: user.id,
      subject: `${isSalesOrder?.uniqueId} order - Picking completed`,
      body: `Order number: ${isSalesOrder?.uniqueId} picked all Items by ${isSalesOrder?.assignedTo}, Now move for verify process.`
    };

    const vendorActivity = await createUserActivity(body, res);

    if (!vendorActivity) {
      return res.status(400).json({
        status: false,
        message: "Error in create activity"
      });
    }

    return res.status(200).json({
      status: true,
      message: "Picking process completed, moved to picker"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.salesOrderDetails = async (req, res) => {
  try {
    const { salesOrderId } = req.params;
    const customerOrderDetails = await SALES_ORDER_MODEL.findById(
      salesOrderId
    ).populate({
      path: "orderItemId",
      populate: {
        path: "variantId"
      }
    });

    if (!customerOrderDetails) {
      return res.status(404).json({
        status: false,
        message: "Customer Details not found"
      });
    }

    res.status(200).json({
      status: true,
      data: customerOrderDetails
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.pickerAllOrder = async (req, res) => {
  try {
    const { user } = req.body;
    // const userName = user.userName;

    const allOrder = await SALES_ORDER_MODEL.find({
      //select the required fields
      // assignedTo: userName,
      assignedId: user.id,
      isPickedAllItems: false
    });

    res.status(200).json({
      status: true,
      data: allOrder
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.verifierAllData = async (req, res) => {
  try {
    const allOrder = await SALES_ORDER_MODEL.find({
      isPickedAllItems: true,
      isVerifiedAllItems: false
    });

    res.status(200).json({
      status: true,
      data: allOrder
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.allowByManager = async (req, res) => {
  try {
    const { salesOrderId } = req.params;
    const { user } = req.body;

    const isSalesOrder = await SALES_ORDER_MODEL.findById(salesOrderId);

    isSalesOrder.isManagerAllowed = true;
    isSalesOrder.allowingManagerId = user.id;

    await isSalesOrder.save();

    const body = {
      userId: isSalesOrder?.userId,
      adminId: user.id,
      subject: `${isSalesOrder?.uniqueId} order allowed for the packing process`,
      body: `Order number: ${isSalesOrder?.uniqueId} payment cleared by manager ${user?.userName}, Now proceeded for the further process(packing).`
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
      message: "Order procedded for the further process"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.updateSalesOrder = async (req, res) => {
  try {
    const { salesOrderId } = req.params;
    const { user } = req.body;

    const updateorder = await SALES_ORDER_MODEL.findByIdAndUpdate(
      salesOrderId,
      req.body
    );

    const body = {
      userId: updateorder?.userId,
      adminId: user.id,
      subject: `${updateorder?.uniqueId} has been updated`,
      body: `Order number: ${updateorder?.uniqueId} is updated by admin ${user?.userName} with these details : ${req.body}`
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
      message: "Order Updated Succesfully"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};
