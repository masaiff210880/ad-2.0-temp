import React from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
// internal
import ErrorMsg from "@/components/common/error-msg";
import { useGetProductTypeCategoryQuery, useGetShowCategoryQuery } from "@/redux/features/categoryApi";
import { handleFilterSidebarClose } from "@/redux/features/shop-filter-slice";
import ShopCategoryLoader from "@/components/loader/shop/shop-category-loader";
import style from "../../../styles/productItem.module.css"

const CategoryFilter = ({setCurrPage,shop_right=false}) => {
  const { data: categories, isLoading, isError } = useGetProductTypeCategoryQuery('');
  const router = useRouter();
  const dispatch = useDispatch();

  // handle category route
  const handleCategoryRoute = (category) => {
    setCurrPage(1);
    router.push(
      `/${shop_right?'shop-right-sidebar':'shop'}?category=${category
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
    content = <ShopCategoryLoader loading={isLoading}/>;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && categories?.data?.length === 0) {
    content = <ErrorMsg msg="No Category found!" />;
  }
  if (!isLoading && !isError && categories?.data?.length > 0) {
    const category_items = categories.data;
    content = category_items.map((item) => (
      <li key={item._id}>
        {/* <a
          onClick={() => handleCategoryRoute(item.category)}
          style={{ cursor: "pointer" }}
          className={
            router.query.category ===
            item.category.toLowerCase().replace("&", "").split(" ").join("-")
            ? "active"
            : ""
          }
          >
          {item.category} <span>{item.length}</span>
        </a> */}
      </li>
    ));
    // console.log('content data of right side',content)
  }
  // console.log('category',categories)
  return (
    <>
      <div className="tp-shop-widget mb-50">
        <h3 className={`${'tp-shop-widget-title'} ${style.statusFilterText}`}>Categories</h3>
        <div className="tp-shop-widget-content">
          <div className="tp-shop-widget-categories">
            <ul>{content}</ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryFilter;
