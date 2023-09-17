import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import Link from "next/link";
// internal
import { Close, Minus, Plus } from "@/svg";
import {
  useDeleteCartItemMutation,
  useUpdatecartQuantityMutation,
} from "@/redux/features/cartApi/cartApi";
import { useGetCartDataQuery } from "@/redux/features/cartApi/cartApi";

import { notifyError, notifySuccess } from "@/utils/toast";
const CartItem = ({ product, setProductData }) => {
  
  const [deleteCartItem, {}] = useDeleteCartItemMutation();
  const [updateCartQuantity, {}] = useUpdatecartQuantityMutation();
  const [updateCall, setUpdateCall] = useState(false);
  const { _id, price, quantity = 0, subTotal } = product || {};
  const dispatch = useDispatch();
  // handle increment quantity
  const handleAddProduct = (quantity) => {
    updateCartQuantity({ cartItemId: _id, quantity: quantity + 1 });
  };
  // handle decrement quantity
  const handleDecrement = (quantity) => {
    updateCartQuantity({ cartItemId: _id, quantity: quantity - 1 });
  };

  const resp = useGetCartDataQuery({
    enabled: !updateCall,
  });
  useEffect(() => {
    setProductData(resp?.data);
    if (resp?.isSuccess) {
      setUpdateCall(false);
    }
  }, [resp, dispatch, setProductData]);

  const handleRemovePrd = (productId) => {
    deleteCartItem({ cartItemId: productId }).then((res) => {
      // console.log("res", res);
      if (res?.data?.status) {
        notifySuccess(res?.data?.message);
      } else {
        notifyError(res?.data?.error);
      }
    });
    setUpdateCall(true);
  };

  return (
    <tr>
      {/* Close Icon */}
      <td className="tp-cart-img">
        <button
          onClick={() => handleRemovePrd(_id)}
          className="tp-cart-action-btn"
        >
          <Close />
        </button>
      </td>

      <td className="tp-cart-title">
        <div style={{ display: "flex", marginRight: "10px" }}>
          {product?.variantId?.featuredImage?.src && (
            <Link href={`/product-details/${product._id}`}>
              <Image
                src={product?.variantId?.featuredImage?.src}
                alt={product?.featuredImage?.alt}
                width={100}
                height={100}
              />
            </Link>
          )}
          <div style={{ whiteSpace: "nowrap", marginTop: "35px" }}>
            {product?.variantId?.name.substring(0, 40) + "..."}
          </div>
        </div>
      </td>

      {/* Price */}
      <td className="tp-cart-price">${price}</td>

      {/* Quantity */}
      <td className="tp-cart-quantity">
        <div className="tp-product-quantity mt-10 mb-10">
          <span
            onClick={() => handleDecrement(quantity)}
            className="tp-cart-minus"
          >
            <Minus />
          </span>
          <input
            className="tp-cart-input"
            type="text"
            value={quantity}
            readOnly
          />
          <span
            onClick={() => handleAddProduct(quantity)}
            className="tp-cart-plus"
          >
            <Plus />
          </span>
        </div>
      </td>
      <td>${subTotal}</td>
    </tr>
  );
};

export default CartItem;
