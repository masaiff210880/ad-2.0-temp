const ORDER_FULLFILL_MODEL = require("../model/orderFullfillModel");
const SALES_ORDER_MODEL = require("../model/salesOrderModel");
const ERROR_RESPONSE = require("../utils/catchErrorResponse");
const { createUserActivity } = require("../utils/createActivity");

module.exports.viewFullfillOrder = async (req, res) => {
  try {
    let query = req.query || {};
    const allOrder = await ORDER_FULLFILL_MODEL.find(query, "-orderItemId")
      .sort({ _id: -1 })
      .exec();

    res.status(200).json({
      status: true,
      data: allOrder
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.createFullfillOrder = async (req, res) => {
  try {
    const { user, salesOrderId } = req.body;

    const salesOrder = await SALES_ORDER_MODEL.findById(salesOrderId);

    if (!salesOrder) {
      return res.status(404).json({
        status: false,
        message: "Sales Order not found"
      });
    }

    if (!salesOrder.isManagerAllowed) {
      return res.status(403).json({
        status: false,
        message: "Manager not allowed to this order"
      });
    }

    const { userId, uniqueId, orderItemId, orderId } = salesOrder;

    const fullfillOrder = new ORDER_FULLFILL_MODEL({
      userId,
      uniqueId,
      orderItemId,
      orderId,
      salesOrderId
    });

    await SALES_ORDER_MODEL.findByIdAndUpdate(salesOrderId, {
      orderFullfillmentId: fullfillOrder._id
    });

    const body = {
      userId,
      adminId: "",
      subject: `${uniqueId} order has moved for packing process`,
      body: `Order's material has available and allowed by the manager : ${user?.userName} now it has been moved for packing process.`
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
      message: "Order Fulfillment process started"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.viewFullfillOrderDetails = async (req, res) => {
  try {
    const { fullfillId } = req.params.id;

    const fullfillOrder = await ORDER_FULLFILL_MODEL.findById(fullfillId)
      .populate({
        path: "orderItemId",
        populate: {
          path: "variantId"
        }
      })
      .sort({ _id: -1 })
      .exec();

    if (!fullfillOrder) {
      return res.status(404).json({
        status: false,
        message: "Fullfill Order not found"
      });
    }

    res.status(200).json({
      status: true,
      data: fullfillOrder
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.insertPackingDetails = async (req, res) => {
  try {
    const { fullfillId } = req.params.id;
    const { user } = req.body;
    const fullfill = await ORDER_FULLFILL_MODEL.findById(fullfillId);

    if (!fullfill) {
      return res.status(404).json({
        status: false,
        message: "Not found in packing, first insert it in packing first"
      });
    }

    const {
      totalBoxes,
      boxesDetails,
      isPacked,
      unitOfTotalWeight = "kg"
    } = req.body;

    if (totalBoxes !== boxesDetails.lenght || boxesDetails.lenght === 0) {
      return res.status(400).json({
        status: false,
        message: "Give all boxes dimensions"
      });
    }

    const totalWeight = boxesDetails.reduce((acc, box) => {
      return acc + box.weightOfBox;
    }, 0);

    fullfill.totalBoxes = totalBoxes;
    fullfill.boxesDetails = boxesDetails;
    fullfill.totalWeightOfBoxes = totalWeight;
    fullfill.unitOfTotalWeight = unitOfTotalWeight;
    fullfill.isPacked = isPacked;

    await fullfill.save();

    const body = {
      userId: fullfill?.userId,
      adminId: "",
      subject: `${fullfill?.uniqueId} order is under packing process`,
      body: `Order number: ${fullfill?.uniqueId} under packing process by ${user?.userName} with total boxes : ${totalBoxes}, total weight of boxes : ${totalWeightOfBoxes}.`
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
      message: "Packing data saved"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.getAllPackedOrder = async (req, res) => {
  try {
    const packedOrder = await ORDER_FULLFILL_MODEL.find({ isPacked: true })
      .sort({ _id: -1 })
      .exec();

    res.status(200).json({
      status: true,
      data: packedOrder
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.getAllUnpackedOrder = async (req, res) => {
  try {
    const unPackedOrder = await ORDER_FULLFILL_MODEL.find({ isPacked: false })
      .sort({ _id: -1 })
      .exec();

    res.status(200).json({
      status: true,
      data: unPackedOrder
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.updateOrderFullfill = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { user } = req.params;

    const updateorder = await ORDER_FULLFILL_MODEL.findByIdAndUpdate(
      orderId,
      req.body
    );

    if (!updateorder) {
      return res.status(404).json({
        status: false,
        message: "Order Not Found"
      });
    }

    const body = {
      userId: updateorder?.userId,
      adminId: "",
      subject: `${updateorder?.uniqueId} order is updated`,
      body: `Order number: ${updateorder?.uniqueId} has been updated by admin : ${user?.userName} with these deatails : ${req.body}`
    };

    const vendorActivity = await createUserActivity(body, res);

    if (!vendorActivity) {
      return res.status(400).json({
        status: false,
        message: "Error in create activity"
      });
    }
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.deleteOrderFullfill = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { user } = req.params;

    const deleteOrder = await ORDER_FULLFILL_MODEL.findByIdAndDelete(orderId);

    if (!deleteOrder) {
      return res.status(404).json({
        status: false,
        message: "Order Not Found"
      });
    }

    const body = {
      userId: deleteOrder?.userId,
      adminId: "",
      subject: `${deleteOrder?.uniqueId} packing process order has deleted`,
      body: `Order number: ${deleteOrder?.uniqueId} has been deleted by admin : ${user?.userName}`
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
      message: "Order Deleted Succesfully"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.packingCompleted = async (req, res) => {
  try {
    const { orderId } = req.params;

    const packedOrder = await ORDER_FULLFILL_MODEL.findById(orderId);

    if (!packedOrder) {
      return res.send(404).json({
        status: false,
        message: "Order not found"
      });
    }

    const salesId = packedOrder.salesOrderId;

    await Promise.all([
      ORDER_FULLFILL_MODEL.findByIdAndUpdate(orderId, {
        $set: { isPacked: true }
      }),
      SALES_ORDER_MODEL.findByIdAndUpdate(salesId, {
        $set: { isPacked: true }
      })
    ]);

    const body = {
      userId: packedOrder?.userId,
      adminId: "",
      subject: `${packedOrder?.uniqueId} order is under packing process`,
      body: `Order number: ${packedOrder?.uniqueId} material has been packed, now Ready for despatch`
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
      message: "Packing completed, Ready for despatch"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};
