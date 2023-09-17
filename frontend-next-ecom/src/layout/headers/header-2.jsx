import React, { useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
// internal
import Menus from './header-com/menus';
import logoSvg from '@assets/img/logo/logoSvg.svg';
import useSticky from '@/hooks/use-sticky';
import useCartInfo from '@/hooks/use-cart-info';
import { openCartMini } from '@/redux/features/cartSlice';
import HeaderTopRight from './header-com/header-top-right';
import CartMiniSidebar from '@/components/common/cart-mini-sidebar';
// import { CartTwo, Compare, Facebook, Menu, PhoneTwo, Wishlist, Search,  } from '@/svg';
import useSearchFormSubmit from '@/hooks/use-search-form-submit';
import OffCanvas from '@/components/common/off-canvas';
import Search1 from '@/svg/search1';
// import style from '../../styles/header2.module.css';// to change the color of login header;


// internal

import Flag from "@assets/img/banner/Flag.svg";
import Flag_1 from "@assets/img/banner/Flag-1.svg";
import style1 from "../../styles/header.module.css";
import logo from "@assets/img/banner/nextLogo.svg";
import style from '../../styles/shopcategory.module.css'


import { CartTwo, CategoryMenu, Compare, Menu, Phone, ShippingCar, Wishlist } from "@/svg";

import HeaderCategory from "./header-com/header-category";
import HeaderMainRight from "./header-com/header-main-right";
import HeaderSearchForm from "@/components/forms/header-search-form";
import { left } from '@popperjs/core';
import Header from './header';

const HeaderTwo = ({ style_2 = false }) => {
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
  const { setSearchText, handleSubmit, searchText } = useSearchFormSubmit();
  const { quantity } = useCartInfo();
  const { sticky } = useSticky();
  const dispatch = useDispatch();
  return (
    <>
      {/* Header component feom Home page */}
      <Header />

      {/* cart mini sidebar start */}
      <CartMiniSidebar />
      {/* cart mini sidebar end */}

      {/* off canvas start */}
      <OffCanvas isOffCanvasOpen={isOffCanvasOpen} setIsCanvasOpen={setIsCanvasOpen} categoryType="fashion" />
      {/* off canvas end */}
    </>
  );
};

export default HeaderTwo;