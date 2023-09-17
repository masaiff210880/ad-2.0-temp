import React from "react";
import Image from "next/image";
import {useRouter} from "next/router";
// internal
import ErrorMsg from "../common/error-msg";
import {useGetShowCategoryQuery} from "@/redux/features/categoryApi";
import HomeCateLoader from "../loader/home/home-cate-loader";
import img_1 from "../../../public/assets/ad/productD-1.svg";
import img_2 from "../../../public/assets/ad/productD-2.svg";
import style from "../../styles/electronicCategory.module.css";

const ElectronicCategory = () => {
  const {data: categories, isLoading, isError} = useGetShowCategoryQuery();
  const router = useRouter();
  // console.log('testing purpose',categories)
  // handle category route
  const handleCategoryRoute = (title) => {
    router.push(`/shop-category`);
  };
  // decide what to render
  let content = null;

  if (isLoading) {
    content = <HomeCateLoader loading={isLoading} />;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && categories?.status?.length === 0) {
    content = <ErrorMsg msg="No Category found!" />;
  }
  if (!isLoading && !isError && categories?.data?.length > 0) {
    const category_items = categories.data;
    // console.log('category items',category_items)
    content = category_items.map((item) => (
      <div className="col" key={item._id}>
        {/* <div className="tp-product-category-item text-center mb-40">
          <div className="tp-product-category-thumb fix">
            <a className='cursor-pointer' onClick={() => handleCategoryRoute(item.parent)}>
              <Image src={item.categoryLogo} alt="product-category" width={76} height={98} />
            </a>
          </div>
          <div className="tp-product-category-content">
            <h3 className="tp-product-category-title">
              <a className='cursor-pointer' onClick={() => handleCategoryRoute(item.categoryName)}>
                {item.parent}
              </a>
            </h3>
            <p>{item.categoryName}</p>
          </div>
        </div> */}
      </div>
    ));
  }
  // <div><Image src={img_1} /></div>
  // console.log("category data", categories);
  return (
    <section className="tp-product-category pt-60 pb-15">
      <div className="container">
        <div
          className={`${"row row-cols-xl-5 row-cols-lg-5 row-cols-md-4"} ${
            style.styleStarContainer
          }`}
        >
          {content}
        </div>
      </div>
    </section>
  );
};

export default ElectronicCategory;
