const ORDER_ITEMS_MODEL = require("../model/orderItemModel");
const SALES_ORDER_MODEL = require("../model/salesOrderModel");
const ERROR_RESPONSE = require("../utils/catchErrorResponse");

// module.exports.pickedQuantity = async (req, res) => {
//   try {
//     const { user, orderItemId, pickedQuantity, comment, salesOrderId } =
//       req.body;

//     const [orderItem, isSalesOrder] = await Promise.all([
//       ORDER_ITEMS_MODEL.findById(orderItemId),
//       SALES_ORDER_MODEL.findById(salesOrderId)
//     ]);

//     if (!orderItem || isSalesOrder) {
//       return res.status(404).json({
//         status: false,
//         message: "Order not found"
//       });
//     }

//     if (orderItem.quantity < pickedQuantity) {
//       return res.status(400).json({
//         status: false,
//         message:
//           "Picking quantity is more than Order quantity, Please make sure the quantity"
//       });
//     }

//     isSalesOrder.pickedPieces += pickedQuantity;
//     isSalesOrder.isPickingStarted = true;
//     orderItem.pickedQuantity = pickedQuantity;
//     orderItem.balanceQuantity = orderItem.quantity - pickedQuantity;
//     orderItem.comment = comment;

//     await orderItem.save();
//     await isSalesOrder.save();

//     const body = {
//       userId: orderItem?.userId,
//       adminId: user?.id,
//       subject: `${orderItem?.uniqueId} order - Picked all Items`,
//       body: `Order number: ${orderItem?.uniqueId} all material has been picked. Pickereman : ${user?.userName}`
//     };

//     const vendorActivity = await createUserActivity(body, res);

//     if (!vendorActivity) {
//       return res.status(400).json({
//         status: false,
//         message: "Error in create activity"
//       });
//     }

//     return res.status(200).json({
//       status: true,
//       message: "Picked quantity updated successfully",
//       data: orderItem
//     });
//   } catch (error) {
//     return ERROR_RESPONSE(res, error);
//   }
// };

module.exports.pickedQuantity = async (req, res) => {
  try {
    const { user, orderItemId, pickedQuantity, comment, salesOrderId } =
      req.body;

    const [orderItem, isSalesOrder] = await Promise.all([
      ORDER_ITEMS_MODEL.findById(orderItemId),
      SALES_ORDER_MODEL.findById(salesOrderId)
    ]);

    if (!orderItem || !isSalesOrder) {
      return res.status(404).json({
        status: false,
        message: "Order not found"
      });
    }

    if (orderItem.quantity < pickedQuantity) {
      return res.status(400).json({
        status: false,
        message:
          "Picking quantity is more than Order quantity, Please make sure the quantity"
      });
    }

    isSalesOrder.pickedPieces += pickedQuantity;
    // isSalesOrder.isPickingStarted = true;

    Object.assign(orderItem, {
      pickedQuantity,
      balanceQuantity: orderItem.quantity - pickedQuantity,
      comment
    });

    await Promise.all([orderItem.save(), isSalesOrder.save()]);

    // const body = {
    //   userId: orderItem?.userId,
    //   adminId: user?.id,
    //   subject: `${orderItem?.uniqueId} order - Picked all Items`,
    //   body: `Order number: ${orderItem?.uniqueId} all material has been picked. Pickereman : ${user?.userName}`
    // };

    // const vendorActivity = await createUserActivity(body, res);

    // if (!vendorActivity) {
    //   return res.status(400).json({
    //     status: false,
    //     message: "Error in creating activity"
    //   });
    // }

    return res.status(200).json({
      status: true,
      message: "Picked quantity updated successfully",
      data: orderItem
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.verifiedQuantity = async (req, res) => {
  try {
    const { user, orderItemId, verifiedQuantity } = req.body;

    const item = await ORDER_ITEMS_MODEL.findById(orderItemId);

    if (!item) {
      return res.status(404).json({
        status: false,
        message: "Item not found"
      });
    }

    if (item.pickedQuantity === verifiedQuantity) {
      item.verifiedQuantity = verifiedQuantity;
      await item.save();
    } else {
      return res.status(400).json({
        status: false,
        message: "Picked Quantity does not match"
      });
    }

    // const body = {
    //   userId: item?.userId,
    //   adminId: user?.id,
    //   subject: `${item?.uniqueId} order - Item quantity verified`,
    //   body: `Order number: ${item?.uniqueId} all material has been picked and verified. Verifier is : ${user?.userName}`
    // };

    // const vendorActivity = await createUserActivity(body, res);

    // if (!vendorActivity) {
    //   return res.status(400).json({
    //     status: false,
    //     message: "Error in create activity"
    //   });
    // }

    res.status(200).json({
      status: true,
      message: "Verified Quantity updated"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};
