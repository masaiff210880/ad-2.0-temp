const PRODUCT_MODEL = require("../model/ProductModel");
const VARIANT_MODEL = require("../model/variantModel");
const USER_MODEL = require("../model/UserModel");
const CART_MODEL = require("../model/cartModel");
const { findPriceByUserType, priceRemovel } = require("../utils/productFilter");
const { isUserValidtoBuy } = require("../utils/cartUtils");
const ERROR_RESPONSE = require("../utils/catchErrorResponse");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports.emptyCart = async (req, res) => {
  try {
    const { id } = req.params;
    const isDeleted = await CART_MODEL.findByIdAndDelete(id);

    if (!isDeleted) {
      return res.status(404).json({
        status: false,
        message: "Cart not found, Please add any items first!"
      });
    }

    res.status(200).json({
      status: true,
      message: "Cart has been emptied"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.addToCart = async (req, res) => {
  try {
    const { user, cartItem } = req.body;
    const { userType, id } = user;

    const isUserValid = await isUserValidtoBuy(user.id);

    if (!isUserValid) {
      return res.status(200).json({
        status: false,
        message:
          "Product purchase is temporarily disabled, kindly contact the admin for assistance."
      });
    }

    let cart = await CART_MODEL.findOne({ userId: id });

    if (!cart) {
      // If cart doesn't exist for the user, create a new cart document
      cart = new CART_MODEL({ userId: user.id, cartItem: [] });
    }

    for (const incomingItem of cartItem) {
      const existingCartItem = cart.cartItem.find(
        (item) =>
          JSON.stringify(item.variantId) ===
          JSON.stringify(incomingItem.variantId)
      );

      if (existingCartItem) {
        // Item with the same variantId already exists in the cart, increase the quantity
        existingCartItem.quantity += incomingItem.quantity;
      } else {
        // Item with the variantId does not exist, push a new document to cartItem array
        const variant = await VARIANT_MODEL.findById(incomingItem.variantId);

        if (!variant) {
          return res.status(404).json({
            status: false,
            message: "Item not found"
          });
        }

        const getPrice = await findPriceByUserType(userType);

        const newItem = {
          productId: variant.productId,
          categories: variant.categories,
          variantId: incomingItem.variantId,
          quantity: incomingItem.quantity,
          price: variant.price[getPrice]
        };

        cart.cartItem.push(newItem);
      }
    }

    // Calculate totalAmount and totalQty using reduce
    const { totalAmount, totalQty } = cart.cartItem.reduce(
      (acc, item) => {
        item.subTotal = item.price * item.quantity;
        acc.totalAmount += item.subTotal;
        acc.totalQty += item.quantity;
        return acc;
      },
      { totalAmount: 0, totalQty: 0 }
    );

    const shippingCharge = 0; // Take from master list
    const tax = 0;
    const grandTotalAmount = totalAmount + tax + shippingCharge;

    cart.totalAmount = totalAmount;
    cart.totalQty = totalQty;
    cart.shippingCharge = shippingCharge;
    cart.grandTotalAmount = grandTotalAmount;

    await cart.save();

    res.status(200).json({
      status: true,
      message: "Products added to the cart",
      cart
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.viewCart = async (req, res) => {
  try {
    const { user } = req.body;

    let fieldSelect = await priceRemovel(false, null, "user");

    const cart = await CART_MODEL.findOne({ userId: user.id })
      .populate("couponId")
      .populate({
        path: "cartItem.variantId",
        match: { disable: false },
        select: fieldSelect
      });

    if (!cart) {
      return res.status(404).json({
        status: false,
        message: "Cart not found"
      });
    }

    await cart.save();

    res.status(200).json({
      status: true,
      data: cart
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.shareCart = async (req, res) => {
  try {
    const { foreignId } = req.params;
    const { user } = req.body;
    const userType = user.userType;

    let priceFilter = await priceRemovel(true, userType, "user");

    const cart = await CART_MODEL.findOne({ userId: foreignId }).populate(
      "cartItem.variantId",
      priceFilter
    );

    if (!cart) {
      return res.status(404).json({
        status: false,
        message: "Cart not found"
      });
    }

    res.status(200).json({
      status: true,
      data: cart
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

// Increase and decrease the quantity
module.exports.updateCartItem = async (req, res) => {
  try {
    const { user, cartItemId, quantity } = req.body;

    const { userType } = user;

    const cart = await CART_MODEL.findOneAndUpdate(
      { userId: user.id, "cartItem._id": cartItemId },
      { $set: { "cartItem.$.quantity": quantity } }
    ).populate({
      path: "cartItem.variantId",
      match: { disable: false },
      select: { price: 1 }
    });

    if (!cart) {
      return res.status(404).json({
        status: false,
        message: "CartItem or Cart not found"
      });
    }

    let sum = 0;
    let totalItem = 0;

    const getPrice = await findPriceByUserType(userType);

    for (let elem of cart.cartItem) {
      const variant = elem.variantId;

      elem.price = variant.price[getPrice];

      totalItem += Number(elem.quantity);

      elem.subTotal = Number(elem.price) * Number(elem.quantity);
      sum += elem.subTotal;
    }

    cart.totalAmount = sum;
    const shippingCharge = 0; //take from master list
    const tax = 0;
    cart.totalQty = totalItem;
    cart.shippingCharge = shippingCharge;
    cart.grandTotalAmount = sum + tax + shippingCharge;
    await cart.save();

    res.status(200).json({
      status: true,
      message: "CartItem quantity updated successfully"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.finalCart = async (req, res) => {
  try {
    const { user, cartId } = req.body;
    const userType = user.userType;

    const cart = await CART_MODEL.findById(cartId).populate({
      path: "cartItem.variantId",
      match: { disable: false },
      select: { price: 1 }
    });

    if (!cart) {
      return res.status(404).json({
        status: false,
        message: "Cart not found"
      });
    }

    let sum = 0;
    let totalItem = 0;

    const getPrice = await findPriceByUserType(userType);

    for (let elem of cart.cartItem) {
      const variant = elem.variantId;

      elem.price = variant.price[getPrice];

      totalItem += elem.quantity;

      elem.subTotal = elem.price * elem.quantity;
      sum += elem.subTotal;
    }

    cart.totalAmount = sum;
    const shippingCharge = 0; //take from master list
    const tax = 0;
    cart.totalQty = totalItem;
    cart.shippingCharge = shippingCharge;
    cart.grandTotalAmount = sum + tax + shippingCharge;
    await cart.save();

    res.status(200).json({
      status: true,
      message: "Finalized the cart",
      cart
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

// module.exports.deleteOneItemInCart = async (req, res) => {
//   try {
//     const { cartId, cartItemId } = req.body;

//     const cart = await CART_MODEL.findByIdAndUpdate(
//       cartId,
//       {
//         $pull: { cartItem: { _id: cartItemId } }
//       },
//       { new: true }
//     );

//     if (!cart) {
//       return res.status(404).json({
//         status: false,
//         message: "Cart not found"
//       });
//     }

//     await cart.save();

//     return res.status(200).json({
//       status: true,
//       message: "Item deleted from cart"
//     });
//   } catch (error) {
//     return ERROR_RESPONSE(res, error);
//   }
// };

module.exports.deleteOneItemInCart = async (req, res) => {
  try {
    const { user, cartItemId } = req.body;

    const cart = await CART_MODEL.findOne({ userId: user.id });

    if (!cart) {
      return res.status(404).json({
        status: false,
        message: "Cart not found"
      });
    }

    const deletedItemIndex = cart.cartItem.findIndex(
      (item) => JSON.stringify(item._id) === JSON.stringify(cartItemId)
    );

    console.log("deletedddd", deletedItemIndex);

    if (deletedItemIndex === -1) {
      return res.status(404).json({
        status: false,
        message: "Item not found in cart"
      });
    }

    const deletedItem = cart.cartItem[deletedItemIndex];

    // Calculate the changes in totals
    const quantityChange = -deletedItem.quantity;
    const totalAmountChange = -deletedItem.subTotal;
    const grandTotalChange = -deletedItem.subTotal; // subtract its tax also

    // Remove the item from the cartItem array
    cart.cartItem.splice(deletedItemIndex, 1);

    // Update cart totals
    cart.totalQty += quantityChange;
    cart.totalAmount += totalAmountChange;
    cart.grandTotalAmount += grandTotalChange;

    await cart.save();

    return res.status(200).json({
      status: true,
      message: "Item deleted from cart"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};
