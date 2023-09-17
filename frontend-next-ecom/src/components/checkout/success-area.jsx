// import React from 'react'

// const SuccessArea = () => {
//   return (
//     <div>success-area</div>
//   )
// }

// export default SuccessArea

import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
// internal
import CheckoutBillingArea from "./checkout-billing-area";
import CheckoutCoupon from "./checkout-coupon";
import CheckoutLogin from "./checkout-login";
import CheckoutOrderArea from "./checkout-order-area";
import useCheckoutSubmit from "@/hooks/use-checkout-submit";
import SuccessCoupon from "./success-coupon";

const SuccessArea = () => {
  const checkoutData = useCheckoutSubmit();
  const {handleSubmit,submitHandler,register,errors,handleCouponCode,couponRef,couponApplyMsg} = checkoutData;
  const { cart_products } = useSelector((state) => state.cart);
  return (
    <>
      <section
        className="tp-checkout-area pb-120"
        style={{ backgroundColor: "#EFF1F5" }}
      >
        <div className="container">
          {cart_products.length === 0 && (
            <div className="text-center pt-50">
              <h3 className="py-2">No items found in cart to checkout</h3>
              <Link href="/shop" className="tp-checkout-btn">
                Return to shop
              </Link>
            </div>
          )}
          {cart_products.length > 0 && (
            <div className="row">
              <div className="col-xl-7 col-lg-7">
                <div className="tp-checkout-verify">
                  {/* <CheckoutLogin /> */}
                  {/* <CheckoutCoupon
                    handleCouponCode={handleCouponCode}
                    couponRef={couponRef}
                    couponApplyMsg={couponApplyMsg}
                  /> */}
                  <br />
                </div>
              </div>
              <form onSubmit={handleSubmit(submitHandler)}>
                <div className="row">
                  <div className="col-lg-7">
                    <SuccessCoupon register={register} errors={errors} />
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

export default SuccessArea;