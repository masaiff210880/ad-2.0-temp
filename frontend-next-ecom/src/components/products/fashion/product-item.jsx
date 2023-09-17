import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";
import Link from "next/link";

import { Cart, CompareThree, QuickView, Wishlist } from "@/svg";
import { handleProductModal } from "@/redux/features/productModalSlice";
import { add_cart_product } from "@/redux/features/cartSlice";
import { add_to_wishlist } from "@/redux/features/wishlist-slice";
import { add_to_compare } from "@/redux/features/compareSlice";
import style from "../../../styles/productItem.module.css";
import Image from "next/image";
import { useCookies } from "react-cookie";

const ProductItem = ({ product, style_2 = false }) => {
  const {
    _id,
    featuredImage,
    category,
    name,
    reviews,
    price,
    discount,
    status,
  } = product || {}; // I removed tag from products
  // console.log("product item", product);
  // const data = {};
  // for(let obj of product){
  //   for(let key in obj){
  //     if(obj.hasOwnProperty(key)){
  //       data[key] = obj[key];
  //     }
  //   }
  // }
  // console.log('object', data);
  const [ratingVal, setRatingVal] = useState(0);
  const [showPrice, setShowPrice] = useState(false);
  const { cart_products } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const isAddedToCart = cart_products.some((prd) => prd._id === _id);
  const isAddedToWishlist = wishlist.some((prd) => prd._id === _id);
  const dispatch = useDispatch();

  useEffect(() => {
    if (reviews && reviews.length > 0) {
      const rating =
        reviews.reduce((acc, review) => acc + review.rating, 0) /
        reviews.length;
      setRatingVal(rating);
    } else {
      setRatingVal(0);
    }
  }, [reviews]);

  const handleAddProduct = (prd) => {
    dispatch(add_cart_product(prd));
  };

  const handleWishlistProduct = (prd) => {
    dispatch(add_to_wishlist(prd));
  };

  const handleCompareProduct = (prd) => {
    dispatch(add_to_compare(prd));
  };
  const [cookies] = useCookies(["userName"]);
  const userName = cookies["userName"];
  // console.log('cart data',product)
  return (
    <div className={`tp-product-item-2 ${style_2 ? "" : "mb-40"}`} >
      <div>
        <div className="tp-product-thumb-2 p-relative z-index-1 fix" key={""}>
          <Link href={`/view/${_id}`}>
            {featuredImage?.src && (
              <Image
                src={featuredImage?.src}
                alt="product img"
                width={284}
                height={302}
              />
            )}
          </Link>
          <div className="tp-product-badge">
            {status === "out-of-stock" && (
              <span className="product-hot">out-stock</span>
            )}
          </div>

          <div className="tp-product-action-2 tp-product-action-blackStyle">
            <div className="tp-product-action-item-2 d-flex flex-column">
              {isAddedToCart ? (
                <Link
                  href="/cart"
                  className={`tp-product-action-btn-2 ${isAddedToCart ? "active" : ""
                    } tp-product-add-cart-btn`}
                >
                  <Cart />
                  <span className="tp-product-tooltip tp-product-tooltip-right">
                    View Cart
                  </span>
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => handleAddProduct(product)}
                  className={`tp-product-action-btn-2 ${isAddedToCart ? "active" : ""
                    } tp-product-add-cart-btn`}
                  disabled={status === "out-of-stock"}
                  style={{
                    backgroundColor: "rgb(251, 168, 7)",
                    color: "white",
                  }}
                >
                  <Cart />
                  <span className="tp-product-tooltip tp-product-tooltip-right">
                    Add to Cart
                  </span>
                </button>
              )}
              <Link href={`/view/${_id}`}>
                <button
                  onClick={() => {
                    dispatch(handleProductModal(product));
                  }}
                  className="tp-product-action-btn-2 tp-product-quick-view-btn"
                  style={{
                    backgroundColor: "rgb(251, 168, 7)",
                    color: "white",
                  }}
                >
                  <QuickView />
                  <span className="tp-product-tooltip tp-product-tooltip-right">
                    Quick View
                  </span>
                </button>
              </Link>
              <button
                disabled={status === "out-of-stock"}
                onClick={() => handleWishlistProduct(product)}
                className={`tp-product-action-btn-2 ${isAddedToWishlist ? "active" : ""
                  } tp-product-add-to-wishlist-btn`}
                style={{
                  backgroundColor: "rgb(251, 168, 7)",
                  color: "white",
                }}
              >
                <Wishlist />
                <span className="tp-product-tooltip tp-product-tooltip-right">
                  Add To Wishlist
                </span>
              </button>
              {/* <button
                  disabled={status === "out-of-stock"}
                  onClick={() => handleCompareProduct(product)}
                  style={{
                    backgroundColor: "rgb(251, 168, 7)",
                    color: "white",
                  }}
                  className="tp-product-action-btn-2 tp-product-add-to-compare-btn"
                >
                  <CompareThree />
                  <span className="tp-product-tooltip tp-product-tooltip-right">
                    Add To Compare
                  </span>
                </button> */}
            </div>
          </div>
        </div>
        <div className="tp-product-content-2 pt-15">
          <h3 className="tp-product-title-2">
            <Link
              href={`/view/${_id}`}
              className={style.productNameStyle}
            >
              {name}
            </Link>
          </h3>
          {/* <div className="tp-product-rating-icon tp-product-rating-icon-2">
              <Rating
                allowFraction
                size={16}
                initialValue={ratingVal}
                readonly={true}
              />
            </div> */}
          <div className="tp-product-price-wrapper">
            {discount > 0 ? (
              <>
                <span className="tp-product-price old-price">${price?.levelTwo}</span>
                <span className="tp-product-price new-price">
                  {" "}
                  $
                  {(
                    Number(price?.levelTwo) -
                    (Number(price?.levelTwo) * Number(discount)) / 100
                  ).toFixed(2)}
                </span>
              </>
            ) : (
              <span className="tp-product-price new-price"><span>{userName ? `$ ${parseFloat(price?.levelTwo).toFixed(2)}` : <Link href={'/login'} style={{ color: '#55585b' }}>Please login to see price</Link>}</span></span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
