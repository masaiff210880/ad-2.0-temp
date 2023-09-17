import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
// internal
import useCartInfo from "@/hooks/use-cart-info";
import RenderCartProgress from "./render-cart-progress";
import empty_cart_img from "@assets/img/product/cartmini/empty-cart.png";
import { closeCartMini, remove_product } from "@/redux/features/cartSlice";
import { useGetCartDataQuery } from "@/redux/features/cartApi/cartApi";
import { set_cartdata } from "@/redux/features/cartApi/cartSlice";
import { useDeleteCartItemMutation } from "@/redux/features/cartApi/cartApi";
import { notifyError, notifySuccess } from "@/utils/toast";
const CartMiniSidebar = () => {
  const { cart_products, cartMiniOpen } = useSelector((state) => state.cart);
  const [deleteCartItem, {}] = useDeleteCartItemMutation();
  const resp = useGetCartDataQuery();
  // console.log('response',resp)
  // console.log('card products',cart_products)
  // const cartminsddsData = useSelector((state)=>console.log('state',))
  const { cartminiData, cartData } = useSelector((state) => {
    return {
      cartminiData: state?.cartItem?.cart_data?.cartItem,
      cartData: state?.cartItem?.cart_data,
    };
  });
  // console.log('mini cart data',cartminiData)
  const { total } = useCartInfo();
  const dispatch = useDispatch();

  // handle remove product
  const handleRemovePrd = (cartItemId) => {
    // dispatch(remove_product(prd))
    deleteCartItem({ cartItemId }).then((res) => {
      if (res?.data?.status) {
        notifySuccess(res?.data?.message);
      } else {
        notifyError(res?.data?.error);
      }
    });
    // console.log('cartItemId',cartItemId)
  };

  // handle close cart mini
  const handleCloseCartMini = () => {
    dispatch(closeCartMini());
  };
  useEffect(() => {
    if (resp?.isSuccess) {
      dispatch(set_cartdata(resp.data));
    }
  }, [resp, dispatch]);
  return (
    <>
      <div
        className={`cartmini__area tp-all-font-roboto ${
          cartMiniOpen ? "cartmini-opened" : ""
        }`}
      >
        <div className="cartmini__wrapper d-flex justify-content-between flex-column">
          <div className="cartmini__top-wrapper">
            <div className="cartmini__top p-relative">
              <div className="cartmini__top-title">
                <h4>Shopping cart</h4>
              </div>
              <div className="cartmini__close">
                <button
                  onClick={() => dispatch(closeCartMini())}
                  type="button"
                  className="cartmini__close-btn cartmini-close-btn"
                >
                  <i className="fal fa-times"></i>
                </button>
              </div>
            </div>
            <div className="cartmini__shipping">
              <RenderCartProgress />
            </div>
            {cartminiData?.length > 0 && (
              <div className="cartmini__widget">
                {cartminiData?.map((item, index) => (
                  // console.log('cart min item',item?.variantId?.featuredImage?.src),
                  <div key={index} className="cartmini__widget-item">
                    <div className="cartmini__thumb">
                      {item?.variantId?.featuredImage?.src && (
                        <Image
                          src={item?.variantId?.featuredImage?.src}
                          alt={item?.variantId?.featuredImage?.alt}
                          height={100}
                          width={100}
                        />
                      )}
                    </div>
                    <div className="cartmini__content">
                      <h5 className="cartmini__title">
                        <Link href={`/product-details/${item._id}`}>
                          {item.title}
                        </Link>
                      </h5>
                      <div className="cartmini__price-wrapper">
                        {/* {item.discount > 0 ? <span className="cartmini__price">${(Number(item.price) - (Number(item.price) * Number(item.discount)) / 100).toFixed(2)}</span> : <span className="cartmini__price">${item.price.toFixed(2)}</span>} */}
                        {/* <span className="cartmini__quantity">{" "}x{item.orderQuantity}</span> */}
                      </div>
                    </div>
                    <a
                      onClick={() => handleRemovePrd(item?._id)}
                      className="cartmini__del cursor-pointer"
                    >
                      <i className="fa-regular fa-xmark"></i>
                    </a>
                  </div>
                ))}
              </div>
            )}
            {/* if no item in cart */}
            {/* {cart_products.length === 0 && <div className="cartmini__empty text-center">
              <Image src={empty_cart_img} alt="empty-cart-img" />
              <p>Your Cart is empty</p>
              <Link href="/shop" className="tp-btn">Go to Shop</Link>
            </div>} */}
          </div>
          <div className="cartmini__checkout">
            <div className="cartmini__checkout-title mb-30">
              <h4 className="text-dark">Subtotal:</h4>
              {/* <span>${total.toFixed(2)}</span> */}
              <span>${cartData?.grandTotalAmount?.toFixed(2)}</span>
            </div>
            <div className="cartmini__checkout-btn">
              <Link
                href="/cart"
                onClick={handleCloseCartMini}
                className="tp-btn mb-10 w-100"
              >
                {" "}
                view cart
              </Link>
              <Link
                href="/checkout"
                onClick={handleCloseCartMini}
                className="tp-btn tp-btn-border w-100"
              >
                {" "}
                checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* overlay start */}
      <div
        onClick={handleCloseCartMini}
        className={`body-overlay ${cartMiniOpen ? "opened" : ""}`}
      ></div>
      {/* overlay end */}
    </>
  );
};

export default CartMiniSidebar;
