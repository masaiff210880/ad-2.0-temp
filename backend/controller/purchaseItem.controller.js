const PURCHASE_ITEMS_MODEL = require("../model/purchaseItemModel");
const ERROR_RESPONSE = require("../utils/catchErrorResponse");
const { ObjectId } = require("mongodb");

//Enter received quantity
module.exports.receivedQuantity = async (req, res) => {
  try {
    const { purchaseItemId, receivedQuantity } = req.body;

    const updatedQty = await PURCHASE_ITEMS_MODEL.findByIdAndUpdate(
      purchaseItemId,
      { receivedQuantity }
    );

    if (!updatedQty) {
      return res.status(404).json({
        status: false,
        message: "Item not found"
      });
    }

    return res.status(200).json({
      status: true,
      message: "Received quantity updated successfully",
      updatedOrder
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

// to return the product;
module.exports.returnProduct = async (req, res) => {
  try {
    const { purchaseItemId, returnQuantity } = req.body;

    const purchaseItem = await PURCHASE_ITEMS_MODEL.findByIdAndUpdate(
      purchaseItemId,
      { $set: { isReturn: true, returnQuantity } }
    );

    if (!purchaseItem) {
      return res.status(404).json({
        status: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      status: true,
      message: "product returned quantity added"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

//retrive all the return product according to vendor
module.exports.allReturnedProductList = async (req, res) => {
  try {
    const { vendorId } = req.params;

    const list = await PURCHASE_ITEMS_MODEL.find({ vendorId, isReturn: true });

    res.status(200).json({
      status: true,
      data: list
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.vendorList = async (req, res) => {
  try {
    const { productId } = req.params;

    const pipeline = [
      {
        $match: { productId: new ObjectId(productId) }
      },
      {
        $lookup: {
          from: "vendors",
          localField: "vendorId",
          foreignField: "_id",
          as: "vendor"
        }
      },
      {
        $unwind: "$vendor"
      },
      {
        $unwind: "$vendorProductCode" // Unwind the vendorProductCode array
      },
      {
        $project: {
          vendorProductCode: 1, // Include only the vendorProductCode field
          companyName: "$vendor.companyName",
          firstName: "$vendor.firstName",
          lastName: "$vendor.lastName",
          vendorUniqueId: "$vendor.vendorUniqueId",
          pricePerUnit: "$pricePerUnit"
        }
      },
      {
        $group: {
          _id: {
            pricePerUnit: "$pricePerUnit",
            vendorUniqueId: "$vendorUniqueId",
            vendorProductCode: "$vendorProductCode"
          },
          data: {
            $addToSet: {
              _id: "$_id",
              companyName: "$companyName",
              firstName: "$firstName",
              lastName: "$lastName"
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          pricePerUnit: "$_id.pricePerUnit",
          vendorUniqueId: "$_id.vendorUniqueId",
          vendorProductCode: "$_id.vendorProductCode",
          data: { $arrayElemAt: ["$data", 0] } // Select the first element from the 'data' array
        }
      }
    ];

    const vendorList = await PURCHASE_ITEMS_MODEL.aggregate(pipeline);

    if (vendorList.length === 0) {
      return res.status(404).json({
        status: false,
        message: "Product Not Found"
      });
    }

    res.status(200).json({
      status: true,
      data: vendorList
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};
