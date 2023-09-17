import { useEffect, useState } from "react";
import { CardElement } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import useCartInfo from "@/hooks/use-cart-info";
import ErrorMsg from "../common/error-msg";
import { Minus, Plus } from "@/svg";
import Link from "next/link";
import {
  add_cart_product,
  quantityDecrement,
} from "@/redux/features/cartSlice";
import { Row } from "react-bootstrap";
import {
  ShimmerCategoryItem,
  ShimmerCategoryList,
} from "react-shimmer-effects";
import { useGetCartDataQuery } from "@/redux/features/cartApi/cartApi";
import { set_cartdata } from "@/redux/features/cartApi/cartSlice";
import Image from "next/image";
import { useUpdatecartQuantityMutation } from "@/redux/features/cartApi/cartApi";
const CheckoutOrderArea = ({
  checkoutData,
  couponRef,
  handleCouponCode,
  couponApplyMsg,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const [updateCartQuantity, {}] = useUpdatecartQuantityMutation();
  const { orderQuantity = 0 } = checkoutData || {};
  const {
    cartTotal = 0,
    stripe,
    isCheckoutSubmit,
    shippingCost,
    discountAmount,
  } = checkoutData;
  // const asdfasdf = useSelector((state) => console.log('state',));
  const resp = useGetCartDataQuery();
  // console.log('response',resp)
  // console.log("card product of checkout data", cart_products);
  const { checkoutOrderData, checkData } = useSelector((state) => {
    return {
      checkoutOrderData: state?.cartItem?.cart_data?.cartItem,
      checkData: state?.cartItem?.cart_data,
    };
  });

  const { total } = useCartInfo();

  const handleIncrement = (id,quantity) => {
    updateCartQuantity({cartItemId:id,quantity:quantity+1})
  };

  const handleDecrement = (id,quantity) => {
    updateCartQuantity({cartItemId:id,quantity:quantity-1})
  };
  useEffect(() => {
    // Simulate a delay (e.g., 2 seconds) before setting isLoading to false
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (resp?.isSuccess) {
      dispatch(set_cartdata(resp.data));
    }
  }, [resp,dispatch]);


  return (
    <div className="tp-checkout-place white-bg">
      <div className="tp-order-info-list">
        {isLoading ? (
          <ShimmerCategoryItem
            hasImage
            imageType="thumbnail"
            imageWidth={100}
            imageHeight={100}
            title
          />
        ) : (
          <ul>
            <table
              style={{
                height: "500px",
                overflowY: "auto",
                display: "block",
                paddingRight: "40px",
                marginBottom: "10px",
                width: "110%",
              }}
            >
             { checkoutOrderData?.map((item,index)=>(
              // console.log('item',item),
               <tr key={index}>
               <li>
                 <div>
                   <td
                     style={{
                       left: "-25px",
                       position: "relative",
                       top: "40px",
                     }}
                   >
                    { item?.variantId?.featuredImage?.src && (
                      <Image src={item?.variantId?.featuredImage?.src} alt={item?.variantId?.featuredImage?.alt} height={100} width={100}  />
                    ) }
                   </td>

                   <td className="tp-cart-quantity">
                     <p>
                       { item?.variantId?.name }
                     </p>
                     <div className="tp-product-quantity ">
                       <span
                         onClick={() => handleDecrement(item?._id,item?.quantity)}
                         className="tp-cart-minus"
                       >
                         <Minus />
                       </span>
                       <input
                         className="tp-cart-input"
                         type="text"
                         value={item?.quantity}
                         readOnly
                       />
                       <span
                         onClick={() => handleIncrement(item?._id,item?.quantity)}
                         className="tp-cart-plus"
                       >
                         <Plus />
                       </span>
                     </div>
                     <br />
                   </td>

                   <td
                     style={{
                       position: "relative",
                       left: "40px",
                       top: "40px",
                     }}
                   >
                     ${item?.subTotal}
                   </td>
                 </div>
               </li>
               <br />
             </tr>
             )) }
            </table>
            <form onSubmit={handleCouponCode}>
              <Row>
                <div className="tp-return-customer-input col-md-8">
                  <input
                    ref={couponRef}
                    type="text"
                    placeholder="Enter a promo code"
                  />
                </div>
                <button
                  type="submit"
                  className="tp-return-customer-btn tp-checkout-btn col-md-4	bg-secondary"
                >
                  Apply
                </button>
              </Row>
            </form>
            {couponApplyMsg && (
              <p className="p-2" style={{ color: "green" }}>
                {couponApplyMsg}
              </p>
            )}
            {/*  subtotal */}
            <li className="tp-order-info-list-subtotal">
              <span>Subtotal</span>
              <span>${checkData?.totalAmount?.toFixed(2)}</span>
            </li>

            {/*  shipping cost */}
            <li className="tp-order-info-list-subtotal">
              <span>Shipping </span>
              <span>${checkData?.shippingCharge?.toFixed(2)}</span>
            </li>

            {/* discount */}
            <li className="tp-order-info-list-subtotal">
              <span>Tax</span>
              <span>${checkData?.tax?.toFixed(2)}</span>
            </li>

            {/* total */}
            <li className="tp-order-info-list-total">
              <span>Total</span>
              <span>${parseFloat(checkData?.grandTotalAmount).toFixed(2)}</span>
            </li>
          </ul>
        )}
      </div>
      {/* <div className="tp-checkout-btn-wrapper">
        <button
          type="submit"
          disabled={!stripe || isCheckoutSubmit}
          className="tp-checkout-btn w-100"
        >
          Place Order
        </button>
      </div> */}
    </div>
  );
};

export default CheckoutOrderArea;
