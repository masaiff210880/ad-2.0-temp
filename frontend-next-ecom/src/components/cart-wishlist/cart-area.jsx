import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {set_cartdata} from "@/redux/features/cartApi/cartSlice";
import Link from "next/link";
// internal
import CartCheckout from "./cart-checkout";
import CartItem from "./cart-item";
import RenderCartProgress from "../common/render-cart-progress";
import {
  useGetCartDataQuery,
  useClearCartMutation,
} from "@/redux/features/cartApi/cartApi";
import {notifyError, notifySuccess} from "@/utils/toast";
const CartArea = () => {
  const [productData, setProductData] = useState({});
  const {cartData, cartCheckoutData} = useSelector((state) => {
    return {
      cartData: state?.cartItem?.cart_data?.cartItem,
      cartCheckoutData: state?.cartItem?.cart_data,
    };
  });
  const dispatch = useDispatch();
  const [clearCartMutation, {}] = useClearCartMutation();
  const resp = useGetCartDataQuery();
  useEffect(() => {
    if (resp?.isSuccess) {
      setProductData(resp?.data);
      console.log("dataaaa", resp.data);
      dispatch(set_cartdata(resp.data));
    }
  }, [resp, dispatch]);

  //Clear Cart Data
  const handleClearCart = () => {
    clearCartMutation(productData?.data?._id).then((res) => {
      if (res?.data?.status) {
        notifySuccess(res?.data?.message);
      } else {
        notifyError(res?.data?.error);
      }
    });
  };

  return (
    <>
      <section className="tp-cart-area pb-120">
        <div className="container">
          {cartData?.length === 0 && (
            <div className="text-center pt-50">
              <h3>No Cart Items Found</h3>
              <Link href="/shop" className="tp-cart-checkout-btn mt-20">
                Continue Shipping
              </Link>
            </div>
          )}
          {cartData?.length > 0 && (
            <div className="row">
              <div className="col-xl-9 col-lg-8">
                <div className="tp-cart-list mb-25 mr-30">
                  <div className="cartmini__shipping">
                    <RenderCartProgress />
                  </div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th
                          colSpan="2"
                          className="tp-cart-header-product"
                          style={{position: "relative", left: "113px"}}
                        >
                          Product
                        </th>
                        <th
                          className="tp-cart-header-price"
                          style={{position: "relative", left: "0px"}}
                        >
                          Price
                        </th>
                        <th
                          className="tp-cart-header-quantity"
                          style={{position: "relative", left: "22px"}}
                        >
                          Quantity
                        </th>
                        <th style={{position: "relative", right: "10px"}}>
                          Subtotal
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartData?.map((item, i) => (
                        <CartItem
                          key={i}
                          product={item}
                          setProductData={setProductData}
                          // onDeleteCartItem={handleDeleteCartItem}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>

                <div
                  className="tp-cart-update mr-30"
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    gap: "350px",
                  }}
                >
                  <div class="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Coupon code"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                    />
                    <button class="btn btn-outline-success" type="button">
                      Apply coupon
                    </button>
                  </div>
                  <button
                    onClick={handleClearCart}
                    type="button"
                    className="tp-cart-update-btn"
                    style={{whiteSpace: "nowrap", height: "57px"}}
                  >
                    Empty Cart
                  </button>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <CartCheckout products={cartCheckoutData} />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default CartArea;
