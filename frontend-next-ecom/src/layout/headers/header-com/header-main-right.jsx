import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import style from '../../../styles/header.module.css'
// internal
import useCartInfo from "@/hooks/use-cart-info";
import { CartTwo, Email, Menu, User, Wishlist } from "@/svg";
// import { openCartMini } from "@/redux/features/cartSlice";
import { openCartMini } from "@/redux/features/cartApi/cartSlice";
import Notification from "@/svg/compare";
import VerticalLine from "@/svg/VerticalLine";
// import Cookies from "js-cookie";
import { useCookies } from 'react-cookie';
import { useGetCartDataQuery } from "@/redux/features/cartApi/cartApi";
import { set_cartdata } from "@/redux/features/cartApi/cartSlice";

const HeaderMainRight = ({ setIsCanvasOpen }) => {
  const respo = useGetCartDataQuery();
  // const [username,setUsername] = useState("")
  // const { user: userInfo } = useSelector((state) => state.auth);
  // const userInfo = useSelector((state) => console.log(state));
  // console.log('username',userInfo)
  const cartData = useSelector((state)=>state?.cartItem?.cart_data?.cartItem);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { quantity } = useCartInfo();
  const dispatch = useDispatch()
  // console.log('dsfasdfasdfsadfffffffffffffffffffffff')
  // useEffect(()=>{
  //   const cookieData = Cookies.get('userName')
  //   console.log(cookieData)
  // },[])
  // console.log('yyyyy',userInfo)


  const [cookies] = useCookies(['userName']);
  const userName = cookies['userName'];
  useEffect(() => {
    if (respo?.isSuccess) {
      dispatch(set_cartdata(respo.data));
    }
  }, [respo,dispatch]);
  return (
    <div className="tp-header-main-right d-flex align-items-center justify-content-end">
      <div className="tp-header-action d-flex align-items-center ml-50">
        <div className="tp-header-action-item">
          
          {userName && (
          <button
            onClick={() => dispatch(openCartMini())}
            type="button"
            className="tp-header-action-btn cartmini-open-btn"
          >
            <CartTwo />
            <span className="tp-header-action-badge">{cartData?.length}</span>
          </button>
          )}
       
        </div>
        <div className="tp-header-action-item d-none d-lg-block">
          <Link href="#" className="tp-header-action-btn">
            <Notification />
          </Link>
        </div>
        {/* <div className="tp-header-action-item d-none d-lg-block">
          <Link href="/#" className="tp-header-action-btn">
            <Email />
            <span className="tp-header-action-badge">{wishlist.length}</span>
          </Link>
        </div> */}
        <div className="tp-header-action-item d-none d-lg-block">
          <Link href="/#" className="tp-header-action-btn">
            <VerticalLine />
            {/* <span className="tp-header-action-badge">{wishlist.length}</span> */}
          </Link>
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
      <div className="tp-header-login d-none d-lg-block">
        <div className="d-flex align-items-center">
          <div className="tp-header-login-icon">
            <span>
              {userName?.imageURL ? (
                <Link href="/profile">
                  <Image
                    src={userName.imageURL}
                    alt="user img"
                    width={10}
                    height={35}
                  />
                </Link>
              ) : userName ? (
                <Link href="/profile">
                  <h2 className="text-uppercase login_text">
                    {userName[0]}
                  </h2>
                </Link>
              ) : (
                <User />
              )}
            </span>
          </div>
          <div className="tp-header-login-content d-none d-xl-block">
            {/* {!userName &&  */}
                {userName && <Link href="/profile" ><span>Hello,{userName}</span> </Link>}
            
            {/* {userName && <span>Hello, {userName}</span>} */}
            <div className="tp-header-login-title">
              {!userName && <Link href="/login">Login</Link>}
              {!userName && <span>or</span>}
              {!userName && <Link href="/register">Register</Link>}
              {/* {userName && <Link href="/profile" className="pl-10">Your Account</Link>} */}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderMainRight;
