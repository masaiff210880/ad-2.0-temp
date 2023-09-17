const { routes } = require("..");
const PRODUCT_MODEL = require("../model/ProductModel");
const PURCHASE_ITEMS_MODEL = require("../model/purchaseItemModel");
const SALES_ORDER_MODEL = require("../model/salesOrderModel");
const USER_LICENSE_MODEL = require("../model/userLicenseModel");
const VARIANT_MODEL = require("../model/variantModel");
const ERROR_RESPONSE = require("../utils/catchErrorResponse");
const express = require("express");
const router = express.Router();

router.patch("/all-salesorder", async (req, res) => {
  try {
    const allOrder = await SALES_ORDER_MODEL.find();
    let i = 1;
    for (let elem of allOrder) {
      await SALES_ORDER_MODEL.findByIdAndUpdate(elem._id, {
        billTo: "XYZ ABC company",
        accountNo: 4560 + 4 * i,
        balanceAmount: elem.grandTotalAmount - elem.depositAmount,
        orderFilledDate: new Date(),
        assignedTo: "none",
        verifierName: "none"
      });
      i += 4;
    }

    res.status(200).json({
      status: true,
      message: "All sales order updated"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
});

// add fields in all variants
router.patch("/variant", async (req, res) => {
  try {
    // const allProducts = await VARIANT_MODEL.find();
    await VARIANT_MODEL.updateMany({
      disable: false,
      isStock: true,
      isDeleted: false
    });

    // for (let elem of allProducts) {
    //   await VARIANT_MODEL.findByIdAndUpdate(elem._id, req.body);
    // }
    // await PRODUCT_MODEL.updateMany(req.body);

    res.send("Add fields in VARIANTS");
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
});

// update totalQty in salesOrder
router.patch("/totalqty", async (req, res) => {
  try {
    const allSalesOrder = await SALES_ORDER_MODEL.find().populate(
      "orderItemId"
    );

    for (let elem of allSalesOrder) {
      let sum = 0;
      for (let item of elem.orderItemId) {
        sum += item.quantity;
      }
      await SALES_ORDER_MODEL.findByIdAndUpdate(elem._id, { pieces: sum });
    }

    res.status(200).json({
      status: true,
      message: "sales Order Updated"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
});

// feed images in variants
router.patch("/feed", async (req, res) => {
  try {
    const variants = await VARIANT_MODEL.find();

    for (elem of variants) {
      const product = await PRODUCT_MODEL.findById(elem.productId);
      let image = "";
      let name = "";
      let alt = "";
      if (product) {
        image =
          product.featuredImage?.src || product.featuredImage?.src !== null
            ? product.featuredImage?.src
            : "";
        name =
          product.featuredImage?.name || product.featuredImage?.name !== null
            ? product.featuredImage?.name
            : "";
        alt =
          product.featuredImage?.alt || product.featuredImage?.src !== null
            ? product.featuredImage?.alt
            : "";
      }

      let featuredImage = {
        src: image,
        name: name,
        alt: alt
      };

      await VARIANT_MODEL.findByIdAndUpdate(elem._id, { featuredImage });
    }

    res.status(200).json({
      status: true,
      message: "Feed images in variants image"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
});

router.patch("/up-date", async (req, res) => {
  try {
    await USER_LICENSE_MODEL.updateMany({ phoneNumber: 7896541238 });

    res.status(200).json({
      status: true,
      message: "USER_LICENSE_MODEL code added"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
});

router.patch("/add-vendor", async (req, res) => {
  try {
    await PRODUCT_MODEL.updateMany({
      vendors: [
        {
          vendorId: "64f03f81e85e6aea6013ce04",
          vendorItemCode: "ABC123XYZ",
          costPrice: 200,
          profitPercent: {
            levelOne: 25,
            levelTwo: 20,
            levelThree: 15
          }
        },
        {
          vendorId: "64f03fc1e85e6aea6013ce06",
          vendorItemCode: "ABC123XYZ",
          costPrice: 250,
          profitPercent: {
            levelOne: 25,
            levelTwo: 20,
            levelThree: 15
          }
        },
        {
          vendorId: "64f03ff7e85e6aea6013ce08",
          vendorItemCode: "ABC123XYZ",
          costPrice: 300,
          profitPercent: {
            levelOne: 25,
            levelTwo: 20,
            levelThree: 15
          }
        },
        {
          vendorId: "64f0402ae85e6aea6013ce0a",
          vendorItemCode: "ABC123XYZ",
          costPrice: 150,
          profitPercent: {
            levelOne: 25,
            levelTwo: 20,
            levelThree: 15
          }
        },
        {
          vendorId: "64f04054e85e6aea6013ce0c",
          vendorItemCode: "ABC123XYZ",
          costPrice: 300,
          profitPercent: {
            levelOne: 25,
            levelTwo: 20,
            levelThree: 15
          }
        },
        {
          vendorId: "64f0406fe85e6aea6013ce0e",
          vendorItemCode: "ABC123XYZ",
          costPrice: 200,
          profitPercent: {
            levelOne: 25,
            levelTwo: 20,
            levelThree: 15
          }
        },
        {
          vendorId: "64f04076e85e6aea6013ce10",
          vendorItemCode: "ABC123XYZ",
          costPrice: 200,
          profitPercent: {
            levelOne: 25,
            levelTwo: 20,
            levelThree: 15
          }
        }
      ]
    });

    res.status(200).json({
      status: true,
      message: "PRODUCT_MODEL code added"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
});

module.exports = router;
