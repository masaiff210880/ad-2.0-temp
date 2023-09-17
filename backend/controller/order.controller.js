const { v4: uuidv4 } = require("uuid");
const ORDER_ITEMS_MODEL = require("../model/orderItemModel");
const SALES_ORDER_MODEL = require("../model/salesOrderModel");
const CART_MODEL = require("../model/cartModel");
const VARIANT_MODEL = require("../model/variantModel");
const ERROR_RESPONSE = require("../utils/catchErrorResponse");
const USER_PAYMENT_MODEL = require("../model/userPaymentModel");
const PRODUCT_MODEL = require("../model/ProductModel");
const { createUserActivity } = require("../utils/createActivity");
const USER_LICENSE_MODEL = require("../model/userLicenseModel");

module.exports.createOrder = async (req, res) => {
  try {
    let {
      user,
      userLicense,
      email,
      refrence,
      contact,
      isPaid,
      paymentMethod,
      orderNote,
      paymentTerms,
      advanceAmount,
      memo,
      billTo,
      status,
      receiptNumber,
      isOnlinePayment,
      checkNumber,
      takeAmtEmpName,
      takeAmtEmpId,
      location,
      paymentMemo,
      billingAddress,
      billingCity,
      billingState,
      billingCountry,
      billingPincode,
      paymentDescription,
      isBillingSameAsShippingAddress
    } = req.body;

    if (
      (isOnlinePayment && checkNumber) ||
      (isOnlinePayment && takeAmtEmpName)
    ) {
      return res.status(400).json({
        status: false,
        message: "Please select any one payment option"
      });
    }

    const isValidUserLicense = await USER_LICENSE_MODEL.findById(userLicense);

    if (!isValidUserLicense.isProfileVerifiedByAdmin) {
      return res.status(200).json({
        status: false,
        message:
          "Your selected Address license is not vlaid, kindly contact to Admin"
      });
    }

    const cart = await CART_MODEL.findOne({ userId: user.id });

    if (!cart) {
      return res.status(404).json({
        status: false,
        message: "Cart not found"
      });
    }

    const licenseUser = JSON.stringify(isValidUserLicense.userId);
    const cartUser = JSON.stringify(cart.userId);

    if (licenseUser !== cartUser) {
      return res.status(404).json({
        status: false,
        message: "User License not matched with user credentials"
      });
    }

    const {
      cartItem,
      tax,
      isFlatRate,
      flatRate,
      totalAmount,
      totalQty,
      grandTotalAmount
    } = cart;

    const uniqueId = uuidv4().substring(0, 6);

    const orderItems = await Promise.all(
      cartItem.map(async (elem) => {
        await VARIANT_MODEL.findByIdAndUpdate(elem.variantId, {
          $inc: { stock_quantity: -elem.quantity }
        });

        await PRODUCT_MODEL.findByIdAndUpdate(elem.productId, {
          $inc: { stock_quantity: -elem.quantity }
        });

        return {
          userId: user.id,
          userType: user.userType,
          userName: user.userName,
          productId: elem.productId,
          variantId: elem.variantId,
          quantity: elem.quantity,
          price: elem.price,
          subTotal: elem.subTotal
        };
      })
    );

    const createdOrderItems = await ORDER_ITEMS_MODEL.insertMany(orderItems);
    const orderItemIds = createdOrderItems.map((item) => item._id);

    const paymentPayload = {
      userId: user.id,
      uniqueId,
      orderItemId: orderItemIds,
      userLicense,
      receiptNumber,
      accountNo: user.accountNumber,
      checkNumber,
      isOnlinePayment,
      takeAmtEmpName: isOnlinePayment ? "Employee Web" : takeAmtEmpName,
      takeAmtEmpId: isOnlinePayment ? null : takeAmtEmpId,
      paymentDescription,
      totalQty,
      totalAmount: grandTotalAmount,
      location,
      advanceAmount,
      balanceAmount: grandTotalAmount - advanceAmount,
      paymentMemo
    };

    let pay = new USER_PAYMENT_MODEL(paymentPayload);
    let payment = await pay.save();

    const {
      businessName,
      businessAddress,
      city,
      state,
      country,
      pinCode,
      phoneNumber
    } = isValidUserLicense;

    if (isBillingSameAsShippingAddress) {
      billTo = businessName;
      contact = phoneNumber;
      billingAddress = businessAddress;
      billingCity = city;
      billingState = state;
      billingCountry = country;
      billingPincode = pinCode;
    }

    const salesPayload = {
      userId: user.id,
      uniqueId,
      name: businessName,
      address: businessAddress,
      email,
      contact,
      refrence,
      orderItemId: orderItemIds,
      userPaymentId: payment._id,
      userLicense,
      billTo,
      accountNo: user.accountNumber,
      pieces: totalQty,
      orderReceivedDate: new Date(),
      isFlatRate,
      flatRate,
      isFullPaid: isPaid,
      paymentTerms,
      paymentMethod,
      orderNote,
      totalAmount,
      grandTotalAmount,
      advanceAmount,
      balanceAmount: grandTotalAmount - advanceAmount,
      tax,
      memo,
      status,
      shippingCity: city,
      shippingState: state,
      shippingCountry: country,
      shippingPinCode: pinCode,
      billingAddress,
      billingCity,
      billingState,
      billingCountry,
      billingPincode,
      isBillingSameAsShippingAddress
    };

    await SALES_ORDER_MODEL.create(salesPayload);

    const body = {
      userId: user.id,
      adminId: null,
      subject: `${user.userName} has placed order`,
      body: `Order placed having order unique number ${uniqueId} with name : ${businessName}, address : ${
        businessAddress + city + country + "," + pinCode
      }, contact : ${
        email + "," + contact
      } with total quantity : ${totalQty}, total amount : ${totalAmount} among advance deposite amount is : ${advanceAmount} and balancne amount is : ${
        totalAmount - advanceAmount
      }.`
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
      message: "Order Created"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};
