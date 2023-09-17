import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
// internal
import { Cart, QuickView, Wishlist } from "@/svg";
import Timer from "@/components/common/timer";
import { handleProductModal } from "@/redux/features/productModalSlice";
import { add_cart_product } from "@/redux/features/cartSlice";
import { add_to_wishlist } from "@/redux/features/wishlist-slice";
import style from "../../../styles/productItem.module.css";
import { useGetAdminLevelQuery } from "@/redux/features/productApi";
import { useCookies } from "react-cookie";
const ProductItem = ({ product, offer_style = false }) => {
  // console.log('product item',product)
  const adminLevel = useGetAdminLevelQuery();
  // const {userType,priceLevel} = adminLevel?.data?.data[0];

  // let userTypes = adminLevel?.data?.data[0]?.userType;
  // let priceLevel = adminLevel?.data?.data[0]?.priceLevel;

  // let finalPrice = priceLevel[userTypes?.indexOf(isUser)]
  // console.log('finalPrice',finalPrice)

  // console.log('price level',userTypes)

  const {
    _id,
    featuredImage,
    category,
    name,
    reviews = 5,
    price = 200,
    discount,
    status,
    userType,
    offerExpiryTime,
  } = product || {};
  let isUser = "";
  if (userType == null) {
    isUser += "gold";
  }

  let priceLevel;
  let userTypes;

  if (
    adminLevel &&
    adminLevel.data &&
    adminLevel.data.data &&
    adminLevel.data.data[0]
  ) {
    priceLevel = adminLevel.data.data[0].priceLevel;
  } else {
    // Handle the case when the data is undefined
    priceLevel = ""; // Set a default value or handle the error accordingly
  }
  if (
    adminLevel &&
    adminLevel.data &&
    adminLevel.data.data &&
    adminLevel.data.data[0]
  ) {
    userTypes = adminLevel.data.data[0].userType;
  } else {
    // Handle the case when the data is undefined
    userTypes = ""; // Set a default value or handle the error accordingly
  }

  let levelTwo = priceLevel[userTypes?.indexOf(isUser)];
  // console.log('levelTow',levelTow)

  const { cart_products } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const isAddedToCart = cart_products.some((prd) => prd._id === _id);
  const isAddedToWishlist = wishlist.some((prd) => prd._id === _id);
  const dispatch = useDispatch();
  const [ratingVal, setRatingVal] = useState(0);
  useEffect(() => {
    if (reviews && reviews.length > 0) {
      const rating = reviews.reduce((acc, review) => acc + review.rating, 0);
      reviews.length;
      setRatingVal(rating);
    } else {
      setRatingVal(0);
    }
  }, [reviews]);

  // handle add product
  const handleAddProduct = (prd) => {
    // console.log('cart Data',prd)
    // console.log('cart Item',newObj)
    // dispatch(addProductToCartAPI(newObj));
  };
  // handle wishlist product
  const handleWishlistProduct = (prd) => {
    dispatch(add_to_wishlist(prd));
  };
  // console.log(featuredImage + "i from data");
  const [cookies] = useCookies(["userName"]);
  const userName = cookies["userName"];

  return (
    <>
      <div
        className={`${
          offer_style ? "tp-product-offer-item" : "mb-25"
        } tp-product-item transition-3`}
      >
        <div className="tp-product-thumb p-relative fix ">
          <Link href={`/shop`}>
            {featuredImage?.src && (
              <Image
                src={featuredImage?.src}
                width="0"
                height="0"
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
                alt="product-electronic"
              />
            )}

            <div className="tp-product-badge">
              {status === "out-of-stock" && (
                <span className="product-hot">out-stock</span>
              )}
            </div>
          </Link>

          {/*  product action */}
          <div className="tp-product-action">
            <div className="tp-product-action-item d-flex flex-column">
              {isAddedToCart ? (
                <Link
                  href="/cart"
                  className={`tp-product-action-btn ${
                    isAddedToCart ? "active" : ""
                  } tp-product-add-cart-btn`}
                >
                  <Cart /> <span className="tp-product-tooltip">View Cart</span>
                </Link>
              ) : (
                <button
                  onClick={() => handleAddProduct(product)}
                  type="button"
                  className={`tp-product-action-btn ${
                    isAddedToCart ? "active" : ""
                  } tp-product-add-cart-btn`}
                  disabled={status === "out-of-stock"}
                  style={{ backgroundColor: "#FBA807", color: "white" }}
                >
                  <Cart />

                  <span className="tp-product-tooltip">Add to Cart</span>
                </button>
              )}
              <Link href={`/view/${_id}`}>
                <button
                  onClick={() => dispatch(handleProductModal(product))}
                  type="button"
                  className="tp-product-action-btn tp-product-quick-view-btn"
                  style={{ backgroundColor: "#FBA807", color: "white" }}
                >
                  <QuickView />

                  <span className="tp-product-tooltip">Quick View</span>
                </button>
              </Link>
              <button
                type="button"
                className={`tp-product-action-btn ${
                  isAddedToWishlist ? "active" : ""
                } tp-product-add-to-wishlist-btn`}
                onClick={() => handleWishlistProduct(product)}
                disabled={status === "out-of-stock"}
                style={{ backgroundColor: "#FBA807", color: "white" }}
              >
                <Wishlist />
                <span className="tp-product-tooltip">Add To Wishlist</span>
              </button>
            </div>
          </div>
        </div>
        {/*  product content */}
        <div className="tp-product-content">
          <div className="tp-product-category">
            <Link href={`/view/${_id}`}>{category?.name}</Link>
          </div>
          <h3 className="tp-product-title">
            <Link href={`/view/${_id}`} className={style.productNameStyle}>
              {name}
            </Link>
          </h3>
          {/* <div className="tp-product-rating d-flex align-items-center">
            <div className="tp-product-rating-icon">
              <Rating
                allowFraction
                size={16}
                initialValue={ratingVal}
                readonly={true}
              />
            </div>
            <div className="tp-product-rating-text">
              <span>
                ({reviews && reviews.length > 0 ? reviews.length : 0} Review)
              </span>
            </div>
          </div> */}
          <div className="tp-product-price-wrapper">
            {discount > 0 ? (
              <>
                <span className="tp-product-price old-price">
                  ${price?.levelTwo}
                </span>
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
              <span className="tp-product-price new-price">
                <span>
                  {userName ? (
                    `$ ${parseFloat(price?.levelTwo).toFixed(2)}`
                  ) : (
                    <Link href={"/login"} style={{ color: "#55585b" }}>
                      Please login to see price
                    </Link>
                  )}
                </span>
              </span>
            )}
          </div>
          {offer_style && (
            <div className="tp-product-countdown">
              <div className="tp-product-countdown-inner">
                {dayjs().isAfter(offerExpiryTime) ? (
                  <ul>
                    <li>
                      <span>{0}</span> Day
                    </li>
                    <li>
                      <span>{0}</span> Hrs
                    </li>
                    <li>
                      <span>{0}</span> Min
                    </li>
                    <li>
                      <span>{0}</span> Sec
                    </li>
                  </ul>
                ) : (
                  <Timer expiryTimestamp={new Date(offerExpiryTime)} />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductItem;
