module.exports.isCurrentDateInRange = (initialDateStr, finalDateStr) => {
  const currentDate = new Date(); // Get the current date and time
  const initialDate = new Date(initialDateStr);
  const finalDate = new Date(finalDateStr);

  // Make sure the dates are valid in mm/d/yyyy format
  if (isNaN(initialDate.getTime()) || isNaN(finalDate.getTime())) {
    throw new Error("Invalid date format");
  }

  return currentDate >= initialDate && currentDate <= finalDate;
};

module.exports.isVariantInCart = (cart, variantId) => {
  return cart.cartItem.find(
    (item) => JSON.stringify(item.variantId) === JSON.stringify(variantId)
  );
};

module.exports.validateMinimumAmount = (cart, coupon) => {
  return cart.totalAmount >= coupon.minimumAmount;
};

module.exports.applyDiscount = async (cart, discount) => {
  cart.totalAmount -= discount;
  cart.grandTotalAmount -= discount;
  // await cart.save();
};

module.exports.lifeCycleDiscount = (couponLife, value) => {
  let discount = null;

  for (const coupon of couponLife) {
    if (
      value >= coupon.initialTime &&
      (value <= coupon.finalTime || coupon.finalTime === -1)
    ) {
      discount = coupon.discountPercent;
      break;
    }
  }

  return discount;
};
