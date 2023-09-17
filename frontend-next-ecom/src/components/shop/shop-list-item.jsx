import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { Rating } from "react-simple-star-rating";
import Link from "next/link";
// internal
import { Cart, CompareThree, QuickView, Wishlist } from "@/svg";
import { handleProductModal } from "@/redux/features/productModalSlice";
import { add_cart_product } from "@/redux/features/cartSlice";
import { add_to_wishlist } from "@/redux/features/wishlist-slice";
import { add_to_compare } from "@/redux/features/compareSlice";
import style from "../../styles/shopListItem.module.css"
import { useCookies } from "react-cookie";

const ShopListItem = ({ product }) => {
  const { _id, featuredImage, category, name, reviews, price, discount, tags, description } = product || {};
  const dispatch = useDispatch()
  const [ratingVal, setRatingVal] = useState(0);
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
// console.log(product)
  // console.log('price',price)

  // handle add product
  const handleAddProduct = (prd) => {
    dispatch(add_cart_product(prd));
  };
  // handle wishlist product
  const handleWishlistProduct = (prd) => {
    dispatch(add_to_wishlist(prd));
  };

  // handle compare product
  const handleCompareProduct = (prd) => {
    dispatch(add_to_compare(prd));
  };
  // console.log('sadfsdf', product)
  const [cookies] = useCookies(["userName"]);
  const userName = cookies["userName"];
  // console.log(featuredImage)
  return (
    <>
      {/* { product && product.map((item)=>{ */}
      {/* {product?.map((item) => ( */}
        <div className="tp-product-list-item d-md-flex">
          <div className="tp-product-list-thumb p-relative fix">
            <Link href={`/view/${_id}`}>
              {featuredImage?.src && (
                <Image src={featuredImage?.src} alt="product img" className={style.productitemStyle} width={300} height={100} />
              )}
            </Link>

            <div className="tp-product-action-2 tp-product-action-blackStyle">
              <div className="tp-product-action-item-2 d-flex flex-column">
                <button
                  type="button"
                  className="tp-product-action-btn-2 tp-product-quick-view-btn"
                  onClick={() => dispatch(handleProductModal(product))}
                  style={{ backgroundColor: "rgb(251, 168, 7)", color: "white" }}
                >
                  <Cart />
                  <span className="tp-product-tooltip tp-product-tooltip-right">
                    Add to Cart
                  </span>
                </button>
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
                  type="button"
                  onClick={() => handleWishlistProduct(product)}
                  className="tp-product-action-btn-2 tp-product-add-to-wishlist-btn"
                  style={{ backgroundColor: "rgb(251, 168, 7)", color: "white" }}
                >
                  <Wishlist />
                  <span className="tp-product-tooltip tp-product-tooltip-right">
                    Add To Wishlist
                  </span>
                </button>
                {/* <button
                type="button"
                onClick={() => handleCompareProduct(product)}
                className="tp-product-action-btn-2 tp-product-add-to-compare-btn"
                style={{ backgroundColor: "rgb(251, 168, 7)", color: "white" }}
              >
                <CompareThree />
                <span className="tp-product-tooltip tp-product-tooltip-right">
                  Add To Compare
                </span>
              </button> */}
              </div>
            </div>
          </div>
          <div className="tp-product-list-content">
            <div className="tp-product-content-2 pt-15">
              <div className="tp-product-tag-2">
                {tags?.map((t, i) => <a key={i} href="#">{t}</a>)}
              </div>
              <h3 className="tp-product-title-2" style={{ width: "100%" }}>
                <Link href={`/product-details/${_id}`} className={style.shopNameStyle}>{name}</Link>
              </h3>
              {/* <div className="tp-product-rating-icon tp-product-rating-icon-2">
              <Rating allowFraction size={16} initialValue={ratingVal} readonly={true} />
            </div> */}
              {/* <div className="tp-product-price-wrapper">
                {discount > 0 ? (
                  <>
                    <span className="tp-product-price old-price">${price?.levelTwo}</span>
                    <span className="tp-product-price new-price">
                      {" "}
                      $
                      {(
                        Number(price?.levelTwo) -
                        (Number(price?.levelTwo) * Number(discount)) / 100).toFixed(2)}
                    </span>
                  </>
                ) : (
                  
                )}
              </div> */}
              <span className="tp-product-price new-price"><span>{userName ? `$ ${parseFloat(price?.levelTwo).toFixed(2)}` : <Link href={'/login'} style={{ color: '#55585b' }}>Please login to see price</Link>}</span></span>
              <p style={{ width: '300px' }}>
                {product.short_description}
              </p>
              <div className="tp-product-list-add-to-cart">
                <Link href={`/view/${_id}`}>
                  <button
                  
                    className="tp-product-list-add-to-cart-btn"
                  >
                    Quick View
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      {/* ))} */}
    </>
  );
};

export default ShopListItem;
