import React, { useEffect, useState } from "react";
import SEO from "@/components/seo";
import HeaderTwo from "@/layout/headers/header-2";
import Footer from "@/layout/footers/footer";
import Wrapper from "@/layout/wrapper";
import CommonBreadcrumb from "@/components/breadcrumb/common-breadcrumb";
import { useRouter } from "next/router";
import { Close, Minus, Plus } from "@/svg";
import { useGetProductQuery } from "@/redux/features/productApi";
import { useDispatch } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useAddProductMutation } from "@/redux/features/cartApi/cartApi";
import { useCookies } from "react-cookie";
import Link from "next/link";
import Image from "next/image";

const View = () => {
  const [cartItem, setCartItem] = useState({});
  const [productDetails, setProductDetails] = useState([]);
  const [addProductCart, {}] = useAddProductMutation();
  // console.log("productDetails", productDetails);
  const [showImage, setShowImage] = useState(false);
  const router = useRouter();
  const { id, redirect } = router.query;
  const { data: products } = useGetProductQuery(id);

  console.log("products", products);

  const initialMainImage = products?.data?.galleryImage?.[0] || null;
  const [mainImage, setMainImage] = useState(initialMainImage);
  const [productVariant, setProductVariant] = useState({});
  const styles = {
    mainContainer: {
      display: "flex",
      border: "1px solid #ccc",
      padding: "20px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      width: "90%",
      borderRadius: "10px",
      margin: "20px auto",

      backgroundColor: "#f9f9f9",
    },
    imageContainer: {
      flex: 1,
      paddingRight: "20px",
    },
    mainImage: {
      width: "100%",
      height: "auto",
      borderRadius: "10px",
      marginBottom: "10px",
      backgroundColor: "#f9f9f9",
    },
    gallerySlider: {
      display: "flex",
      columnGap: "5px",
      // justifyContent: 'space-between',
    },
    galleryImage: {
      width: "18%", // Adjusted to fit 5 images side by side
      height: "auto",
      borderRadius: "10px",
      cursor: "pointer", // Indicate that images are clickable
    },
    textContainer: {
      flex: 2,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    title: {
      marginTop: 0,
      color: "#333",
      whiteSpace: "nowrap",
    },
    text: {
      marginTop: "10px",
      color: "#fe6c22",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
    },
    tableHeader: {
      border: "1px solid #ccc",
      padding: "8px",
      fontWeight: "bold",
      backgroundColor: "#f5f5f5", // light gray background for headers
    },
    tableCell: {
      border: "1px solid #ccc",
      padding: "8px",
    },

    subtext: {
      fontWeight: "400",
      color: "black",
      marginTop: "10px",
      fontSize: "14px",
    },
    subtext1: {
      fontWeight: "500",
      color: "#fe6c22",
      marginTop: "10px",
      fontSize: "14px",
    },
    capStyle: {
      marginleft: "10px",
    },
    btnAddToCart: {
      display: "flex",
      justifyContent: "left",
      marginBottom: "20px",
      marginTop: "20px",
    },
  };

  const handleGalleryImageClick = (src) => {
    setShowImage(true);
    setMainImage(src);
  };

  function handleQuantityIncrement(idx, productId, variantId) {
    const updatedProductDetails = [...productDetails];
    const newObj = { ...productVariant };
    // Update the value if the key exists, or create a new key if it doesn't
    const existingProductIndex = updatedProductDetails.findIndex(
      (item) => item.variantId === variantId
    );

    if (existingProductIndex > -1) {
      updatedProductDetails[existingProductIndex].quantity += 1;
      newObj[variantId] += 1;
    } else {
      newObj[variantId] = 1;
      updatedProductDetails.push({
        productId,
        variantId,
        quantity: 1,
      });
    }
    setProductVariant(newObj);
    setProductDetails(updatedProductDetails);
  }

  function handleQuantityDecrement(idx, productId, variantId) {
    const updatedProductDetails = [...productDetails];
    const newObj = { ...productVariant };
    const existingProductIndex = updatedProductDetails.findIndex(
      (item) => item.productId === productId && item.variantId === variantId
    );

    if (existingProductIndex > -1) {
      if (updatedProductDetails[existingProductIndex].quantity >= 1) {
        updatedProductDetails[existingProductIndex].quantity -= 1;
        newObj[variantId] -= 1;
      } else {
        updatedProductDetails.splice(existingProductIndex, 1);
      }
    }
    setProductVariant(newObj);
    setProductDetails(updatedProductDetails);
  }

  const addToCart = () => {
    // setCartItem({ cartItem: productDetails });
    addProductCart({ cartItem: productDetails }).then((res) => {
      if (res?.data) {
        notifySuccess("Added to Cart!");
        setTimeout(() => {
          router.push(redirect || "/cart");
        }, 1000);
      } else {
        notifyError(res.error?.message);
      }
    });
  };

  //  const getFlavour=(flavour)=>{
  //   re
  //  }

  const [cookies] = useCookies(["userName"]);
  const userName = cookies["userName"];

  return (
    <Wrapper>
      <SEO pageTitle="View" />
      <HeaderTwo style_2={true} />
      <CommonBreadcrumb title="Product View" subtitle="Product View" />

      <div style={styles.mainContainer}>
        <div style={styles.imageContainer}>
          <Image
            src={
              showImage ? mainImage?.src : products?.data?.featuredImage?.src
            }
            alt="Main Description"
            style={styles.mainImage}
            height={100}
            width={100}
          />

          <div style={styles.gallerySlider}>
            {products?.data?.galleryImage?.slice(0, 5).map((img, index) => (
              <Image
                key={index}
                src={img?.src}
                alt="Gallery Description"
                style={styles.galleryImage}
                onClick={() => handleGalleryImageClick(img)}
                height={100}
                width={100}
              />
            ))}
          </div>
        </div>
        <div style={styles.textContainer}>
          <h2 style={styles.title}>{products?.data?.name}</h2>
          <h3 style={styles.text}>
            {userName ? (
              `AD Price: $ ${products?.data?.price?.levelTwo}`
            ) : (
              <Link
                href={"/login"}
                style={{ color: "#55585b", fontSize: "18px" }}
              >
                Please login to see price
              </Link>
            )}
            <span style={styles.subtext}>
              <br />
              34125
            </span>
          </h3>

          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Name</th>
                <th style={styles.tableHeader}>
                  {products?.data?.attributes[0]?.name}
                </th>
                <th style={styles.tableHeader}>Price</th>
                <th style={styles.tableHeader}>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {products?.data?.variants?.map((item, index) => (
                <tr key={index}>
                  <td style={styles.tableCell}>{item?.name}</td>
                  <td style={styles.tableCell}>{item?.name.split("-")[1]}</td>
                  <td style={styles.tableCell}>
                    <span style={styles.subtext1}>
                      ${item?.price?.levelTwo}
                    </span>
                  </td>
                  <td style={styles.tableCell}>
                    <div className="tp-product-quantity ">
                      <span
                        onClick={() =>
                          handleQuantityDecrement(
                            index,
                            item.productId,
                            item._id
                          )
                        }
                        className="tp-cart-minus"
                      >
                        <Minus />
                      </span>
                      <input
                        className="tp-cart-input"
                        type="text"
                        value={productVariant[item._id] || 0}
                        readOnly
                      />
                      <span
                        onClick={() => {
                          handleQuantityIncrement(
                            index,
                            item.productId,
                            item._id
                          );
                        }}
                        className="tp-cart-plus"
                      >
                        <Plus />
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={styles.btnAddToCart}>
            <button
              type="button"
              className="tp-cart-update-btn"
              style={{ whiteSpace: "nowrap", height: "57px" }}
              onClick={addToCart}
            >
              Add to Cart
            </button>
          </div>
          {products?.data?.categories?.map((item, index) => (
            <div style={{ fontWeight: "600" }} key={index}>
              Categories {item?.categoryName}
            </div>
          ))}
          <div style={{ fontWeight: "600" }}>SKU {products?.data?.sku}</div>
        </div>
      </div>
      <Footer primary_style={true} />
    </Wrapper>
  );
};

export default View;
