import React,{useEffect} from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
// internal
import SEO from '@/components/seo';
import Wrapper from '@/layout/wrapper';
import HeaderTwo from '@/layout/headers/header-2';
import Footer from '@/layout/footers/footer';
import CommonBreadcrumb from '@/components/breadcrumb/common-breadcrumb';
import SuccessArea from '@/components/checkout/success-area';


const CheckoutPage = () => {
  const router = useRouter();
  // useEffect(() => {
  //   const isAuthenticate = Cookies.get("userInfo");
  //   if(!isAuthenticate){
  //     router.push("/login")
  //   }
  // },[router])
  return (
    <Wrapper>
      <SEO pageTitle="Checkout" />
      <HeaderTwo style_2={true} />
      <CommonBreadcrumb title="Checkout" subtitle="Checkout" bg_clr={true} />
      <SuccessArea/>
      <Footer style_2={true} />
   
    </Wrapper>
  );
};

export default CheckoutPage;