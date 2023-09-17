import React, { useEffect, useState } from "react";
import { useGetProductTypeQuery } from "@/redux/features/productApi";
// import { ShapeLine, TabLine } from "@/svg";
import ProductItem from "./product-item";
import ErrorMsg from "@/components/common/error-msg";
// import bg from "@assets/img/banner/Mark_bg.svg"
import HomePrdLoader from "@/components/loader/home/home-prd-loader";
import { ShapeLine } from "@/svg";

const tabs = ["new", "featured", "topSellers"];

const ProductArea = () => {
  const [activeTab, setActiveTab] = useState("new");
  const { data: products, isError, isLoading, refetch } =
    useGetProductTypeQuery({ type: '', query: `${activeTab}=true` });

  // console.log('------------------',userType,'------------',priceLevel)
  // handleActiveTab
  const handleActiveTab = (tab) => {
    setActiveTab(tab);
  };
  // refetch when active value change
  useEffect(() => {
    refetch()
  }, [activeTab, refetch])

  // decide what to render
  let content = null;

  if (isLoading) {
    content = (
      <HomePrdLoader loading={isLoading} />
    );
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && products?.data?.length === 0) {
    content = <ErrorMsg msg="No Products found!" />;
  }
  if (!isLoading && !isError && products?.data?.length > 0) {
    const product_items = products.data;
    content = product_items.map((prd, i) => (
      <div key={i} className="col-xl-3 col-lg-3 col-sm-6">
        <ProductItem product={prd} />
      </div>
    ))
  }
  // console.log('new product',products)
  return (
    <section className="tp-product-area pb-55" style={{
      backgroundColor:"#E5FFFF",
      marginTop:"-60px"
      }}>
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <div className="tp-section-title-wrapper mb-40">
              <h3 className="tp-section-title mt-4">
                Trending products
                {/* <ShapeLine /> */}
              </h3>
            </div>
          </div>
          {/* <div className="col-xl-7 col-lg-6 col-md-7">
            <div className="tp-product-tab tp-product-tab-border mb-45 tp-tab d-flex justify-content-md-end">
              <ul className="nav nav-tabs justify-content-sm-end">
                {tabs.map((tab, i) => (
                  <li key={i} className="nav-item">
                    <button
                      onClick={() => handleActiveTab(tab)}
                      className={`nav-link text-capitalize ${
                        activeTab === tab ? "active" : ""
                      }`}
                    >
                      {tab.split("-").join(" ")}
                      <span className="tp-product-tab-line">
                        <TabLine />
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div> */}
        </div>
        <div className="row">
          {content}
        </div>

        {/* <h1 style={{color :"red"}}>Pagination here</h1> */}
      </div>
    </section>
  );
};

export default ProductArea;
