import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import useCheckoutSubmit from "@/hooks/use-checkout-submit";
import CartPayment from "../payment-area/cart-payment";
import CheckoutOrderArea from "../checkout/checkout-order-area";


const PaymentSection = () => {
  const checkoutData = useCheckoutSubmit();
  const { handleSubmit, submitHandler, register, errors, handleCouponCode, couponRef, couponApplyMsg } = checkoutData;
  // const { cart_products } = useSelector((state) => state.cart);
  const cartData = useSelector((state)=>state?.cartItem?.cart_data?.cartItem);
  return (
    <>
      <section
        className="tp-checkout-area pb-120"
        style={{ backgroundColor: "#EFF1F5" }}
      >
        <div className="container">
          {cartData?.length === 0 && (
            <div className="text-center pt-50">
              <h3 className="py-2">No items found in cart to checkout</h3>
              <Link href="/shop" className="tp-checkout-btn">
                Return to shop
              </Link>
            </div>
          )}
          {cartData?.length > 0 && (
            <div className="row">
              <div className="col-xl-7 col-lg-7">
                <div className="tp-checkout-verify">
                  <br />
                </div>
              </div>
              <form onSubmit={handleSubmit(submitHandler)}>
                <div className="row">
                  <div className="col-lg-7">
                    <CartPayment checkoutData={checkoutData} />
                  </div>
                  <div className="col-lg-5">
                    <CheckoutOrderArea checkoutData={checkoutData} />
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default PaymentSection;
