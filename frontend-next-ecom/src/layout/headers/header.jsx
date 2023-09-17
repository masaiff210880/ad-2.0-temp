import React, { useEffect, useState } from "react";
import style from "../../styles/header.module.css";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
// internal
import Menus from "./header-com/menus";
import useSticky from "@/hooks/use-sticky";
import logo from "@assets/img/banner/nextLogo.svg";
import Flag from "@assets/img/banner/Flag.svg";
import Flag_1 from "@assets/img/banner/Flag-1.svg";
import useCartInfo from "@/hooks/use-cart-info";
import OffCanvas from "@/components/common/off-canvas";
import { openCartMini } from "@/redux/features/cartSlice";
import HeaderCategory from "./header-com/header-category";
import HeaderTopRight from "./header-com/header-top-right";
import HeaderMainRight from "./header-com/header-main-right";
import CartMiniSidebar from "@/components/common/cart-mini-sidebar";
import HeaderSearchForm from "@/components/forms/header-search-form";
import { useGetCartDataQuery } from "@/redux/features/cartApi/cartApi";
import { set_cartdata } from "@/redux/features/cartApi/cartSlice";
import { useCookies } from "react-cookie";
import {
  CartTwo,
  CategoryMenu,
  Compare,
  Menu,
  Phone,
  ShippingCar,
  Wishlist,
} from "@/svg";
import { left } from "@popperjs/core";

const Header = () => {
  const resp = useGetCartDataQuery();
  const stikeyData = useSelector((state)=>state?.cartItem?.cart_data?.cartItem)
  function showDrawer() {

    const categoryMenuContent = document.getElementById("categoryMenuContent");
    categoryMenuContent.style.display = "block";
  }

  function hideDrawer() {
    const categoryMenuContent = document.getElementById("categoryMenuContent");
    categoryMenuContent.style.display = "none";
  }

  const { wishlist } = useSelector((state) => state.wishlist);
  const [isOffCanvasOpen, setIsCanvasOpen] = useState(false);
  const [isCategoryActive, setIsCategoryActive] = useState(false);
  const { quantity } = useCartInfo();
  const { sticky } = useSticky();
  const dispatch = useDispatch();
  const [cookies] = useCookies(["userName"]);
  const userName = cookies["userName"];
  // console.log('userName',userName)
  useEffect(()=>{
    if(resp?.isSuccess){
      set_cartdata(resp?.data)
    }
  },[resp])
  return (
    <>
      <header>
        <div className="tp-header-area p-relative z-index-11">
          {/* header top start  */}
          <div className="tp-header-top black-bg p-relative z-index-1 d-none d-md-block">
            <div className="container">
              <div className="row align-items-center">
                <h1 style={{ textAlign: "center", padding: "15px" }}>
                  THIS PRODUCT CONTAINS NICOTINE. NICOTINE IS AN ADDICTIVE
                  CHEMICAL.
                </h1>
              </div>
            </div>
          </div>

          <div className="tp-header-top red-bg p-relative z-index-1 d-none d-md-block">
            <div className={style.container}>
              <div className="row align-items-center">
                <HeaderTopRight />
              </div>
            </div>
          </div>

          {/* header main start */}
          <div className="tp-header-main tp-header-sticky">
            <div className="container">
              <div className={style.FlagLogo}>
                <Image src={Flag_1} alt="Flag" className="img-fluid rounded" />
              </div>
              <div className="row align-items-center">
                <div className="col-xl-2 col-lg-2 col-md-4 col-6">
                  <div className={style.adlogo}>
                    <Link href="/">
                      <Image src={logo} alt="logo" />
                    </Link>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-7 d-none d-lg-block">
                  <div className="tp-header-search pl-70">
                    <HeaderSearchForm />
                  </div>
                </div>
                <div
                  className="col-xl-4 col-lg-3 col-md-8 col-6 header-right-content"
                  style={{ position: "relative", right: "-250px" }}
                >
                  <HeaderMainRight setIsCanvasOpen={setIsCanvasOpen} />
                </div>
              </div>
            </div>
          </div>
          {/* header bottom start */}
          <div
            className={`${"tp-header-bottom tp-header-bottom-border d-none d-lg-block"}`}
          >
            <div className="container">
              <div className="tp-mega-menu-wrapper p-relative">
                <div className="row align-items-center">
                  <div className="col-xl-3 col-lg-3">
                    {/* category start */}
                    <div className="tp-header-category tp-category-menu tp-header-category-toggle">
                      <div
                        className={`${"tp-category-menu-btn"} ${
                          style.tp_category_menu_toggle
                        }`}
                        onMouseEnter={showDrawer}
                        onMouseLeave={hideDrawer}
                      >
                        <span>
                          <CategoryMenu />
                        </span>
                        SHOP BY CATEGORY
                      </div>
                      <nav
                        className={style.tp_category_menu_content}
                        id="categoryMenuContent"
                      ></nav>
                    </div>
                    {/* category end */}
                  </div>
                  <div className="col-xl-6 col-lg-6">
                    <div className="main-menu menu-style]-1">
                      <nav className="tp-main-menu-content">
                        <Menus />
                      </nav>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3">
                    <div
                      className="tp-header-contact d-flex align-items-center justify-content-end"
                      style={{ position: "relative", left: "120px" }}
                    >
                      <div className="tp-header-contact-icon">
                        <span>
                          <Phone />
                        </span>
                      </div>
                      <div className="tp-header-contact-content">
                        <h5>Hotline:</h5>
                        <p>
                          <a href="tel:402-763-282-46" className="text-dark">
                            +1 234 567 0001
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* sticky header start */}
      <div
        id="header-sticky-2"
        className={`tp-header-sticky-area ${sticky ? "header-sticky-2" : ""}`}
      >
        <div className="container">
          <div className="tp-mega-menu-wrapper p-relative">
            <div className="row align-items-center">
              <div className="col-xl-3 col-lg-3 col-md-3 col-6">
                <div className="logo">
                  <Link href="/">
                    <Image src={logo} alt="logo" />
                  </Link>
                </div>
              </div>
              <div
                className="col-xl-6 col-lg-6 col-md-6 d-none d-md-block"
                style={{ marginTop: "5px", marginBottom: "6px" }}
              >
                <div className="tp-header-sticky-menu main-menu menu-style-1 d-none d-lg-block">
                  <nav id="mobile-menu">
                    <Menus />
                  </nav>
                </div>
              </div>
              {userName && (
                <div className="col-xl-3 col-lg-3 col-md-3 col-6">
                  <div className="tp-header-action d-flex align-items-center justify-content-end ml-50">
                    <div className="tp-header-action-item d-none d-lg-block">
                      <Link href="/compare" className="tp-header-action-btn">
                        <Compare />
                      </Link>
                    </div>
                    <div className="tp-header-action-item d-none d-lg-block">
                      <Link href="/wishlist" className="tp-header-action-btn">
                        <Wishlist />
                        <span className="tp-header-action-badge">
                          {wishlist.length}
                        </span>
                      </Link>
                    </div>
                    <div className="tp-header-action-item">
                      <button
                        onClick={() => dispatch(openCartMini())}
                        type="button"
                        className="tp-header-action-btn cartmini-open-btn"
                      >
                        <CartTwo />
                        <span className="tp-header-action-badge">
                          {stikeyData?.length}
                        </span>
                      </button>
                    </div>
                    <div className="tp-header-action-item d-lg-none">
                      <button
                        onClick={() => setIsCanvasOpen(true)}
                        type="button"
                        className="tp-header-action-btn tp-offcanvas-open-btn"
                      >
                        <Menu />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* sticky header end */}

      {/* cart mini sidebar start */}
      <CartMiniSidebar />
      {/* cart mini sidebar end */}

      {/* off canvas start */}
      <OffCanvas
        isOffCanvasOpen={isOffCanvasOpen}
        setIsCanvasOpen={setIsCanvasOpen}
        categoryType="electronics"
      />
      {/* off canvas end */}
    </>
  );
};

export default Header;
