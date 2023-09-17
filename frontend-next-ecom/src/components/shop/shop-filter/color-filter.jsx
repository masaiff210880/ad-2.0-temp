import React from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import style from "../../../styles/productItem.module.css"
// internal
import ErrorMsg from "@/components/common/error-msg";
import { useGetAllProductsQuery } from "@/redux/features/productApi";
import { handleFilterSidebarClose } from "@/redux/features/shop-filter-slice";
import ShopColorLoader from "@/components/loader/shop/color-filter-loader";

const ColorFilter = ({setCurrPage,shop_right=false}) => {
  const { data: products, isError, isLoading } = useGetAllProductsQuery();
  const router = useRouter();
  const dispatch = useDispatch()

  // handle color 
  const handleColor = (clr) => {
    setCurrPage(1)
    router.push(
      `/${shop_right?'shop-right-sidebar':'shop'}?color=${clr
        .toLowerCase()
        .replace("&", "")
        .split(" ")
        .join("-")}`
    )
    dispatch(handleFilterSidebarClose());
  }
  // decide what to render
  let content = null;

  if (isLoading) {
    content = <ShopColorLoader loading={isLoading}/>;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && products?.data?.length === 0) {
    content = <ErrorMsg msg="No Products found!" />;
  }
  if (!isLoading && !isError && products?.data?.length > 0) {
    const product_items = products.data;
    // console.log('product item',product_items)
    let allColor = [];
    product_items.forEach((product) => {
      let uniqueColor = new Set(product.galleryImage.map((item) => item?.color));
      allColor = [...new Set([...allColor, ...uniqueColor])];
      // console.log('color',uniqueColor)
    });

    let uniqueColors = [
      ...new Map(allColor.map((color) => [color?.name, color])).values(),
    ];
    // console.log('color',uniqueColors)
    content = uniqueColors.map((item, i) => {
      if (item) {
        return (
          <li key={i}>
            <div className="tp-shop-widget-checkbox-circle">
              <input
                type="checkbox"
                id={item.title}
                checked={
                  router.query.color ===
                  item.title.toLowerCase().replace("&", "").split(" ").join("-")
                    ? "checked"
                    : false
                }
                readOnly
              />
              <label
                onClick={() => handleColor(item.title)}
                htmlFor={item.title}
              >
                {item.title}
              </label>
              <span
                style={{ backgroundColor: `${item.clrCode}` }}
                className="tp-shop-widget-checkbox-circle-self"
              ></span>
            </div>
            <span className="tp-shop-widget-checkbox-circle-number">
              {
                product_items
                  .map((p) => p.galleryImage)
                  .flat()
                  .filter((i) => i?.color?.title === item?.title).length
              }
            </span>
          </li>
        );
      }
    });
    // console.log('content ',content)
  }
// console.log('filter by color',products)
  return (
    <>
      <div className="tp-shop-widget mb-50">
        <h3 className={`${'tp-shop-widget-title'} ${style.statusFilterText}`}>Filter by Color</h3>
        <div className="tp-shop-widget-content">
          <div className="tp-shop-widget-checkbox-circle-list">
            <ul>{content}</ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ColorFilter;
