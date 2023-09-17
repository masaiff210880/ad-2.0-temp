const PURCHASE_RECEIPT_MODEL = require("../model/purchaseReceiptModel");
const PURCHASE_ORDER_MODEL = require("../model/purchaseOrderModel");
const PURCHASE_ITEMS_MODEL = require("../model/purchaseItemModel");
const { createVendorStatistic } = require("./vendorStatistics.controller");
const ERROR_RESPONSE = require("../utils/catchErrorResponse");
const PRODUCT_MODEL = require("../model/ProductModel");
const VARIANT_MODEL = require("../model/variantModel");
const { createVendorActivity } = require("../utils/createActivity");

module.exports.createPurchaseReceipt = async (req, res) => {
  try {
    const { poId } = req.params;
    const { user } = req.body;
    const po = await PURCHASE_ORDER_MODEL.findById(poId).populate(
      "purchaseItemId"
    );

    if (!po) {
      return res.status(404).json({
        status: false,
        message:
          "Purchase order not found, please create a purchase order first."
      });
    }

    const isExistPr = await PURCHASE_RECEIPT_MODEL.findOne({
      purchaseOrderId: poId
    });

    if (isExistPr) {
      return res.status(400).json({
        status: false,
        message: "Purchase receipt already created for this order."
      });
    }

    const {
      billReference,
      location,
      refPoPr,
      freightAmount,
      trackingNumber,
      purchaseItem // send in an array with received quantity[{_id, receivedQuantity}]
    } = req.body;

    const {
      vendorId,
      purchaseItemId,
      transactionId,
      disbursementId,
      transactionDate,
      paymentTerms,
      deliveryDate,
      employee,
      depositeAmount,
      balanceAmount,
      discountAmount,
      soRefrence,
      memo
    } = po;

    let totalQuantity = 0;
    let totalAmount = 0;

    const updatePurchaseItems = purchaseItem.map(async (elem) => {
      const item = purchaseItemId.find(
        (id) => JSON.stringify(id._id) === JSON.stringify(elem.purchaseItemId)
      );
      console.log("item", item);
      let purchaseItem = await PURCHASE_ITEMS_MODEL.findByIdAndUpdate(item, {
        receivedQuantity: elem.receivedQuantity
      });

      totalQuantity += elem.receivedQuantity;
      totalAmount += elem.receivedQuantity * item.pricePerUnit;
    });

    await Promise.all(updatePurchaseItems);

    const payload = {
      vendorId,
      purchaseOrderId: poId,
      purchaseItemId,
      transactionId,
      disbursementId,
      transactionDate,
      billReference,
      paymentTerms,
      dueDate: deliveryDate,
      location,
      refPoPr,
      pieces: totalQuantity,
      employee,
      totalAmount,
      depositeAmount,
      balanceAmount,
      discountAmount,
      freightAmount,
      soRefrence,
      memo,
      trackingNumber
    };

    const productReceipt = new PURCHASE_RECEIPT_MODEL(payload);
    await productReceipt.save();

    po.purchaseReceiptId = productReceipt._id;
    await po.save();

    const updateStockQuantities = async (itemId) => {
      const purchaseItem = await PURCHASE_ITEMS_MODEL.findById(itemId);

      const updateData = {
        $inc: {
          stock_quantity: +purchaseItem.receivedQuantity,
          handsOnQuantity: +purchaseItem.receivedQuantity,
          upcomingQuantity: -purchaseItem.orderedQuantity
        }
        // $addToSet: {
        //   vendors: [
        //     { vendorId, vendorItemCode: purchaseItem.vendorProductCode }
        //   ]
        // }
      };

      await Promise.all([
        PRODUCT_MODEL.findByIdAndUpdate(purchaseItem.productId, updateData, {
          new: true // To get the updated document
        }),
        VARIANT_MODEL.findByIdAndUpdate(purchaseItem.variantId, updateData, {
          new: true // To get the updated document
        })
      ]);
    };

    // let isProduct = await PRODUCT_MODEL.findById(purchaseItem.productId);
    // if (!isProduct.vendors.includes(vendorId)) {
    //   isProduct.vendors.push(vendorId);
    //   await isProduct.save();
    // }

    // const updateStockQuantities = async (itemId) => {
    //   const purchaseItem = await PURCHASE_ITEMS_MODEL.findById(itemId);

    //   await PRODUCT_MODEL.findByIdAndUpdate(purchaseItem.productId, {
    //     $inc: {
    //       stock_quantity: +purchaseItem.receivedQuantity,
    //       handsOnQuantity: +purchaseItem.receivedQuantity,
    //       upcomingQuantity: -purchaseItem.orderedQuantity
    //     }
    //   });
    //   await VARIANT_MODEL.findByIdAndUpdate(purchaseItem.variantId, {
    //     $inc: {
    //       stock_quantity: +purchaseItem.receivedQuantity,
    //       handsOnQuantity: +purchaseItem.receivedQuantity,
    //       upcomingQuantity: -purchaseItem.orderedQuantity
    //     }
    //   });
    // };

    await Promise.all(purchaseItemId.map(updateStockQuantities));

    const statistic = await createVendorStatistic(vendorId);

    if (!statistic) {
      return res.status(500).json({
        status: false,
        message:
          "Product Receipt created but something went wrong in statistics."
      });
    }

    const body = {
      vendorId,
      adminId: user.id,
      subject: "Created Purchase Receipt",
      body: `Purchase receipt generated for transactionId : ${transactionId}, received quantity : ${totalQuantity} and total amount : ${totalAmount}.`
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
      message: "Product Receipt created"
      // data: productReceipt
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.createAllProductReceiptAsPerPO = async (req, res) => {
  try {
    const purchaseOrders = await PURCHASE_ORDER_MODEL.find();

    const productReceiptPromises = purchaseOrders.map(async (po) => {
      const {
        vendorId,
        purchaseItemId,
        transactionId,
        transactionDate,
        deliveryDate,
        totalAmount,
        balanceAmount,
        discountAmount,
        soRefrence,
        memo
      } = po;

      const productReceiptPayload = {
        vendorId,
        purchaseOrderId: po._id,
        purchaseItemId,
        transactionId,
        transactionDate,
        billReference: "REF12345",
        paymentTerms: po.paymentTerms,
        dueDate: deliveryDate,
        location: "chicago US",
        refPoPr: "1234abcd",
        pieces: po.pieces,
        employee: po.employee,
        totalAmount,
        depositeAmount: po.depositeAmount,
        balanceAmount,
        discountAmount,
        freightAmount: 200,
        soRefrence,
        memo,
        trackingNumber: "qwerty12345"
      };

      const productReceipt = new PURCHASE_RECEIPT_MODEL(productReceiptPayload);
      await productReceipt.save();

      po.purchaseReceiptId = productReceipt._id;
      await po.save();

      const updatePromises = purchaseItemId.map(async (itemId) => {
        const purchaseItem = await PURCHASE_ITEMS_MODEL.findById(itemId);

        const quantityIncrement = +purchaseItem.receivedQuantity;
        const quantityDecrement = -purchaseItem.orderedQuantity;

        const updateProductPromises = [
          PRODUCT_MODEL.findByIdAndUpdate(purchaseItem.productId, {
            $inc: {
              stock_quantity: quantityIncrement,
              handsOnQuantity: quantityIncrement,
              upcomingQuantity: quantityDecrement
            }
          }),
          VARIANT_MODEL.findByIdAndUpdate(purchaseItem.variantId, {
            $inc: {
              stock_quantity: quantityIncrement,
              handsOnQuantity: quantityIncrement,
              upcomingQuantity: quantityDecrement
            }
          })
        ];

        await Promise.all(updateProductPromises);
      });

      await Promise.all(updatePromises);

      await createVendorStatistic(vendorId);
    });

    await Promise.all(productReceiptPromises);

    res.status(200).json({
      status: true,
      message: "All Product Receipts created as per PO"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.viewPurchaseReceiptOfOneVendor = async (req, res) => {
  try {
    const query = req.query || {};
    //to get all PO data for 1 individual vendor pass vendorId in query(?vendorId=9652fe5625e45) or if want filter by any other fields so can pass in query.

    const purchaseOrder = await PURCHASE_RECEIPT_MODEL.find(
      query,
      "-purchaseItemId"
    );

    res.status(200).json({
      status: true,
      data: purchaseOrder
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.onePurchaseReceiptDetails = async (req, res) => {
  try {
    const { prId } = req.params; // Send purchase order _id

    // Retrieve purchase order details and populate the vendorId and variantId fields
    const purchaseOrderDetails = await PURCHASE_RECEIPT_MODEL.findById(prId)
      .populate("vendorId")
      .populate({
        path: "purchaseItemId",
        populate: {
          path: "variantId"
        }
      });

    if (!purchaseOrderDetails) {
      return res.status(404).json({
        status: false,
        message: "Purchase order not found"
      });
    }

    res.status(200).json({
      status: true,
      data: purchaseOrderDetails
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};
