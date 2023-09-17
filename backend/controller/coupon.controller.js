const COUPON_MODEL = require("../model/couponModel");
const CART_MODEL = require("../model/cartModel");
const VARIANT_MODEL = require("../model/variantModel");
const ERROR_RESPONSE = require("../utils/catchErrorResponse");
const { json } = require("express");
const USER_MODEL = require("../model/UserModel");
const { finalizeCart } = require("../utils/cartUtils");
const fs = require("fs");
const COUPON_LIFE_MODEL = require("../model/couponLifeModel");
const {
  isCurrentDateInRange,
  validateMinimumAmount,
  applyDiscount,
  lifeCycleDiscount,
  isVariantInCart
} = require("../utils/couponUtils");
const { default: mongoose } = require("mongoose");
const { Types } = require("aws-sdk/clients/acm");

module.exports.createCoupon = async (req, res) => {
  try {
    const coupon = new COUPON_MODEL(req.body);
    await coupon.save();

    res.status(200).json({
      status: true,
      message: "Coupon get created",
      data: coupon
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.getAllCoupon = async (req, res) => {
  try {
    let query = req.query || {};
    const coupons = await COUPON_MODEL.find(query);

    res.status(200).json({
      status: true,
      data: coupons
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.updateCoupon = async (req, res) => {
  try {
    const { couponId } = req.params;

    const updateCoupon = await COUPON_MODEL.findByIdAndUpdate(
      couponId,
      req.body
    );

    if (!updateCoupon) {
      return res.status(404).json({
        status: false,
        message: "Coupon not found"
      });
    }

    res.status(200).json({
      status: true,
      message: "Coupon updated"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.deleteCoupon = async (req, res) => {
  try {
    const { couponId } = req.params;

    const deleteCoupon = await COUPON_MODEL.findByIdAndDelete(couponId);

    if (!deleteCoupon) {
      return res.status(404).json({
        status: false,
        message: "Coupon not found"
      });
    }

    res.status(200).json({
      status: true,
      message: "Coupon deleted"
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

const findItemByVariantIdAndCouponStatus = (cartItem, variantId, cond) => {
  return cartItem.find(
    (item) =>
      JSON.stringify(item.variantId) === JSON.stringify(variantId) &&
      item.isComeByCoupon === cond
  );
};

const removeItemsByCouponStatusAndVariantId = (
  cartItem,
  variantId,
  isComeByCouponStatus
) => {
  for (let i = cartItem.length - 1; i >= 0; i--) {
    const item = cartItem[i];
    if (
      JSON.stringify(item.variantId) === JSON.stringify(variantId) &&
      item.isComeByCoupon === isComeByCouponStatus
    ) {
      cartItem.splice(i, 1);
    }
  }
};

module.exports.removeCoupon = async (req, res) => {
  try {
    const { user, couponId, cartId } = req.body;
    const { id, isNewUser } = user;

    const coupon = await COUPON_MODEL.findById(couponId);

    if (!coupon) {
      return res.json({
        status: 404,
        message: "Coupon not found"
      });
    }

    const cart = await CART_MODEL.findById(cartId);

    if (!cart) {
      return res.json({
        status: 404,
        message: "Cart not found"
      });
    }

    // let isExistCoupon = cart.couponId.find((item)=> JSON.stringify(item) === JSON.stringify(coupon._id))

    if (!cart.couponId.includes(couponId)) {
      return res.status(400).json({
        status: false,
        message: "You have not applied this coupon"
      });
    }

    const {
      // isOnUserType,
      // isCommonApply,
      isDiscountPercentage,
      isFlatRateOff,
      isBuyGetFree,
      isLifeCycleCoupon,
      // isMinAmtGetFree,
      isBuyPaylessQty,
      isShippingDiscount,
      isParticularVariant,
      isBuyGetless,
      isOnlyForNewUser
      // isMinimunAmt
    } = coupon;

    if (!isOnlyForNewUser && !isNewUser) {
      await USER_MODEL.findByIdAndUpdate(id, { $set: { isNewUser: true } });
    }

    if (isParticularVariant) {
      let isVariant = isVariantInCart(cart, coupon.particularVariantId);

      if (!isVariant) {
        return res.status(404).json({
          status: false,
          message: "Product not found in cart for this offer"
        });
      }

      if (isDiscountPercentage) {
        let percent = 100 - coupon.discountPercentage;
        let price = (isVariant.price / percent) * coupon.discountPercentage;
        isVariant.price += price;
        isVariant.subTotal += price;
        cart.totalAmount += price;
        cart.grandTotalAmount += price;
      }

      if (isFlatRateOff) {
        isVariant.price += coupon.flatRateOff;
        isVariant.subTotal += coupon.flatRateOff;
        cart.totalAmount += coupon.flatRateOff;
        cart.grandTotalAmount += price;
      }
    }

    if (isDiscountPercentage && !isParticularVariant) {
      let percent = 100 - coupon.discountPercentage;
      let price = (cart.totalAmount / percent) * coupon.discountPercentage;
      cart.totalAmount += price;
      cart.grandTotalAmount += price;
    }

    if (isFlatRateOff && !isParticularVariant) {
      cart.totalAmount += coupon.flatRateOff;
      cart.grandTotalAmount += coupon.flatRateOff;
    }

    if (isBuyGetFree) {
      let isVariant = isVariantInCart(cart, coupon.buyVariant);
      let variantItem = await isVariantInCart(cart, coupon.getFreeVariant);
      let reduceQuantity =
        Math.floor(isVariant.quantity / coupon.buyQty) * coupon.getFreeQty;
      variantItem.quantity -= reduceQuantity;

      cart.markModified("cartItem");
    }

    if (isShippingDiscount) {
      let percent = 100 - coupon.discountPercentage;
      let price = (cart.shippingCharge / percent) * coupon.discountPercentage;

      cart.shippingCharge += price;
      cart.totalAmount += price;
      cart.grandTotalAmount += price;
    }

    if (isBuyPaylessQty) {
      let isVariant = isVariantInCart(cart, coupon.buyVariant);

      if (!isVariant) {
        return res.status(404).json({
          status: false,
          message: "Product not found in cart for this offer"
        });
      }

      let freeQty =
        Math.floor(isVariant.quantity / coupon.buyQty) * coupon.getFreeQty;

      let gainRate = isVariant.price * freeQty;
      isVariant.price += gainRate;
      isVariant.subTotal += gainRate;

      cart.totalAmount += gainRate;
      cart.grandTotalAmount += gainRate;
    }

    // if (isBuyGetless) {
    //   let isVariant = isVariantInCart(cart, coupon.buyVariant);

    //   if (!isVariant) {
    //     return res.status(404).json({
    //       status: false,
    //       message: "Product not found in cart for this offer"
    //     });
    //   }

    //   let isExistFreeVariant = isVariantInCart(
    //     cart,
    //     coupon.getLessPercentVariant
    //   );

    //   let lessPercent;

    //   let getLessItem = findItemByVariantIdAndCouponStatus(
    //     cart.cartItem,
    //     coupon.getLessPercentVariant,
    //     true
    //   );

    //   if (!getLessItem) {
    //     let percent = 100 - coupon.getLessPercent;

    //     lessPercent =
    //       (isExistFreeVariant.subTotal / percent) * coupon.getLessPercent;

    //     isExistFreeVariant.price +=
    //       (isExistFreeVariant.price / percent) * coupon.getLessPercent;

    //     isExistFreeVariant.subTotal += lessPercent;

    //     cart.markModified("cartItem");
    //   } else {
    //     const mainItem = findItemByVariantIdAndCouponStatus(
    //       cart.cartItem,
    //       coupon.getLessPercentVariant,
    //       false
    //     );

    //     lessPercent = getLessItem.quantity * mainItem.price - getLessItem;
    //     mainItem.quantity += getLessItem;
    //     mainItem.subTotal =
    //       (mainItem.quantity + getLessItem.quantity) * mainItem.price;

    //     removeItemsByCouponStatusAndVariantId(
    //       cart.cartItem,
    //       coupon.getLessPercentVariant,
    //       true
    //     );

    //     cart.markModified("cartItem");
    //   }

    //   cart.totalAmount += lessPercent;
    //   cart.grandTotalAmount += lessPercent;
    // }

    if (isBuyGetless) {
      let lessPercent;

      const mainItem = findItemByVariantIdAndCouponStatus(
        cart.cartItem,
        coupon.getLessPercentVariant,
        false
      );

      let getLessItem = findItemByVariantIdAndCouponStatus(
        cart.cartItem,
        coupon.getLessPercentVariant,
        true
      );

      if (!getLessItem) {
        let percent = 100 - coupon.getLessPercent;

        lessPercent = (mainItem.subTotal / percent) * coupon.getLessPercent;

        mainItem.price += (mainItem.price / percent) * coupon.getLessPercent;

        mainItem.subTotal += lessPercent;

        cart.markModified("cartItem");
      } else {
        lessPercent =
          getLessItem.quantity * mainItem.price - getLessItem.subTotal;
        mainItem.quantity += getLessItem.quantity;
        mainItem.subTotal = mainItem.quantity * mainItem.price;

        removeItemsByCouponStatusAndVariantId(
          cart.cartItem,
          coupon.getLessPercentVariant,
          true
        );

        cart.markModified("cartItem");
      }

      cart.totalAmount += lessPercent;
      cart.grandTotalAmount += lessPercent;
    }

    if (isLifeCycleCoupon) {
      const lifeCoupon = await COUPON_LIFE_MODEL.findOne({
        couponId: coupon._id,
        userId: id
      });

      const noOfused = lifeCoupon.useTime - 1;

      let cycleDiscount = lifeCycleDiscount(coupon.couponLife, noOfused);

      await COUPON_LIFE_MODEL.findByIdAndUpdate(lifeCoupon._id, {
        $set: { useTime: noOfused }
      });

      let percent = 100 - cycleDiscount;

      const gainRate = (cart.grandTotalAmount / percent) * cycleDiscount;
      cart.totalAmount += gainRate;
      cart.grandTotalAmount += gainRate;
    }

    let updateCouponId = cart.couponId.filter(
      (item) => item.toString() !== coupon._id.toString()
    );

    cart.isCouponApplied = false;
    cart.couponId = updateCouponId;

    await cart.save();

    res.status(200).json({
      status: true,
      message: "Coupon has removed",
      data: cart
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};

module.exports.applyCoupon = async (req, res) => {
  try {
    const { user, cartId, couponCode } = req.body;

    const { id, userType, isNewUser } = user;
    const coupon = await COUPON_MODEL.findOne({ couponCode });

    if (!coupon) {
      return res.status(404).json({
        status: false,
        message: "Invalid Coupon"
      });
    }

    const initialDateStr = coupon.applyDate;
    const finalDateStr = coupon.endDate;

    let isValid = isCurrentDateInRange(initialDateStr, finalDateStr);

    if (!isValid) {
      return res.status(404).json({
        status: false,
        message: "Coupon Expired"
      });
    }

    const cart = await CART_MODEL.findById(cartId);

    if (!cart) {
      return res.status(404).json({
        status: false,
        message: "Cart not found"
      });
    }

    const {
      isOnUserType,
      isCommonApply,
      isDiscountPercentage,
      isFlatRateOff,
      isBuyGetFree,
      isLifeCycleCoupon,
      // isMinAmtGetFree,
      isBuyPaylessQty,
      isShippingDiscount,
      isParticularVariant,
      isBuyGetless,
      isOnlyForNewUser,
      isMinimunAmt
    } = coupon;

    if (cart.couponId.includes(coupon._id)) {
      return res.status(400).json({
        status: false,
        message: "This coupon already applied to this cart"
      });
    }

    if (
      isOnUserType &&
      coupon.userTypeName.toLowerCase() !== userType.toLowerCase()
    ) {
      return res.status(401).json({
        status: false,
        message: "Invalid coupon"
      });
    }

    if (isOnlyForNewUser && !isNewUser) {
      return res.status(400).json({
        status: false,
        message: "This offer is only for new user"
      });
    }

    if (isMinimunAmt) {
      let validAmt = validateMinimumAmount(cart, coupon);

      if (!validAmt) {
        return res.status(404).json({
          status: false,
          message: `This offer is not applicable for this amount, please purchase more for at least $${coupon.minimumAmount}`
        });
      }
    }
    // ==============================================================================================================

    if (isCommonApply) {
      if (cart.totalQty < coupon.buyQty) {
        return res.status(404).json({
          status: false,
          message: `Quantity does not fullfill for this offer, To apply it require ${coupon.buyQty} product atleast`
        });
      }
    }

    if (isBuyGetless) {
      let isVariant = isVariantInCart(cart, coupon.buyVariant);

      if (!isVariant) {
        return res.status(404).json({
          status: false,
          message: "Product not found in cart for this offer"
        });
      }

      if (isVariant.quantity < coupon.buyQty) {
        return res.status(400).json({
          status: false,
          message: "Quantity does not fullfill for this offer"
        });
      }

      let isExistFreeVariant = isVariantInCart(
        cart,
        coupon.getLessPercentVariant
      );

      if (!isExistFreeVariant) {
        return res.status(401).json({
          status: false,
          message: "Please add the offer product in cart first"
        });
      }

      const variant = await VARIANT_MODEL.findOne({
        _id: coupon.getLessPercentVariant,
        disable: false
      });

      if (!variant) {
        return res.status(200).json({
          status: false,
          message: "Sorry! free product is out of stock now"
        });
      }

      let lessPercent;

      if (isVariant.quantity >= isExistFreeVariant.quantity) {
        lessPercent =
          (isExistFreeVariant.subTotal / 100) * coupon.getLessPercent;
        isExistFreeVariant.price -=
          (isExistFreeVariant.price / 100) * coupon.getLessPercent;
        isExistFreeVariant.subTotal -= lessPercent;
        cart.markModified("cartItem");
      } else {
        let discountQty = isExistFreeVariant.quantity - isVariant.quantity;
        isExistFreeVariant.quantity -= discountQty;
        isExistFreeVariant.subTotal -= discountQty * isExistFreeVariant.price;
        let lessPrice =
          isExistFreeVariant.price -
          (isExistFreeVariant.price / 100) * coupon.getLessPercent;
        let discountItem = {
          productId: variant.productId,
          variantId: coupon.getLessPercentVariant,
          quantity: discountQty,
          category: isExistFreeVariant.category,
          price: lessPrice,
          subTotal: lessPrice * discountQty,
          isComeByCoupon: true
        };
        cart.cartItem.push(discountItem);
        lessPercent =
          isExistFreeVariant.price * discountQty - lessPrice * discountQty;
        cart.markModified("cartItem");
      }

      cart.totalAmount -= lessPercent;
      cart.grandTotalAmount -= lessPercent;
    }

    if (isParticularVariant) {
      let isVariant = isVariantInCart(cart, coupon.particularVariantId);

      if (!isVariant) {
        return res.status(404).json({
          status: false,
          message: "Product not found in cart for this offer"
        });
      }

      if (isDiscountPercentage) {
        const discount = (isVariant.price / 100) * coupon.discountPercentage;
        isVariant.price -= discount;
        isVariant.subTotal -= discount;
        cart.totalAmount -= discount;
        applyDiscount(cart, discount);
      }

      if (isFlatRateOff) {
        isVariant.price -= coupon.flatRateOff;
        isVariant.subTotal -= coupon.flatRateOff;
        cart.totalAmount -= coupon.flatRateOff;
        applyDiscount(cart, coupon.flatRateOff);
      }
    }

    if (isBuyPaylessQty) {
      let isVariant = isVariantInCart(cart, coupon.buyVariant);

      if (!isVariant) {
        return res.status(404).json({
          status: false,
          message: "Product not found in cart for this offer"
        });
      }

      if (isVariant.quantity < coupon.buyQty) {
        return res.status(400).json({
          status: false,
          message: "Quantity does not fullfill for this offer"
        });
      }

      let freeQty =
        Math.floor(isVariant.quantity / coupon.buyQty) * coupon.getFreeQty;

      let lessRate = isVariant.price * freeQty;
      isVariant.price -= lessRate;
      isVariant.subTotal -= lessRate;

      cart.totalAmount -= lessRate;
      cart.grandTotalAmount -= lessRate;
    }

    if (isLifeCycleCoupon) {
      const lifeCoupon = await COUPON_LIFE_MODEL.findOne({
        couponId: coupon._id,
        userId: id
      });

      const noOfused = lifeCoupon ? lifeCoupon.useTime + 1 : 1;

      let cycleDiscount = lifeCycleDiscount(coupon.couponLife, noOfused);

      if (lifeCoupon) {
        await COUPON_LIFE_MODEL.findByIdAndUpdate(lifeCoupon._id, {
          $set: { useTime: noOfused }
        });
      } else {
        let lifeCycleCoupon = new COUPON_LIFE_MODEL({
          couponId: coupon._id,
          userId: id,
          useTime: 1
        });

        await lifeCycleCoupon.save();
      }

      const discount = (cart.grandTotalAmount / 100) * cycleDiscount;
      applyDiscount(cart, discount);
    }
    // ==================================================================================================================

    if (isShippingDiscount) {
      let shippingDiscount =
        (cart.shippingCharge / 100) * coupon.discountPercentage;

      cart.shippingCharge -= shippingDiscount;
      cart.totalAmount -= shippingDiscount;
      cart.grandTotalAmount -= shippingDiscount;
    }

    if (isDiscountPercentage && !isParticularVariant) {
      const discount = (cart.totalAmount / 100) * coupon.discountPercentage;
      applyDiscount(cart, discount);
    }

    if (isFlatRateOff && !isParticularVariant) {
      applyDiscount(cart, coupon.flatRateOff);
    }

    if (isBuyGetFree) {
      let isVariant = isVariantInCart(cart, coupon.buyVariant);

      if (!isVariant) {
        return res.status(404).json({
          status: false,
          message: "Product not found in cart for this offer"
        });
      }

      if (isVariant.quantity < coupon.buyQty) {
        return res.status(400).json({
          status: false,
          message: "Quantity does not fullfill for this offer"
        });
      }

      let freeQty =
        Math.floor(isVariant.quantity / coupon.buyQty) * coupon.getFreeQty;

      const variant = await VARIANT_MODEL.findOne({
        _id: coupon.getFreeVariant,
        disable: false
      });

      if (!variant) {
        return res.status(200).json({
          status: false,
          message: "Sorry! free product is out of stock now"
        });
      }

      if (variant.quantity < freeQty) {
        return res.status(400).json({
          status: false,
          message: `Sorry we don not have fullfill free quantity, we have only ${variant.quantity} nos`
        });
      }

      if (
        isVariant &&
        JSON.stringify(coupon.buyVariant) ===
          JSON.stringify(coupon.getFreeVariant)
      ) {
        isVariant.quantity += freeQty;
        await cart.markModified("cartItem");
        await cart.save();
      } else if (
        isVariant &&
        JSON.stringify(coupon.buyVariant) !==
          JSON.stringify(coupon.getFreeVariant)
      ) {
        let isExistFreeVariant = isVariantInCart(cart, coupon.getFreeVariant);

        if (isExistFreeVariant) {
          isExistFreeVariant.quantity += freeQty;
        } else {
          const freeVariant = {
            productId: variant.productId,
            variantId: coupon.getFreeVariant,
            quantity: freeQty,
            price: 0,
            subTotal: 0
          };
          cart.cartItem.push(freeVariant);
        }

        await cart.markModified("cartItem");
        // await cart.save();
      }
    }

    cart.isCouponApplied = true;
    cart.couponId.push(coupon._id);
    cart.markModified("couponId");
    await cart.save();

    const cartData = await CART_MODEL.findById(cartId);
    await USER_MODEL.findByIdAndUpdate(id, { $set: { isNewUser: false } });

    return res.status(200).json({
      status: true,
      message: "Coupon applied successfully",
      data: cartData
    });
  } catch (error) {
    return ERROR_RESPONSE(res, error);
  }
};
