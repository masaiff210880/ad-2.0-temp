

import React,{useEffect} from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import SEO from '@/components/seo';
import Wrapper from '@/layout/wrapper';
import HeaderTwo from '@/layout/headers/header-2';
import Footer from '@/layout/footers/footer';
import ShipmentSection from '@/components/payment-area/shipment-area';


const shipment = () => {
  // const router = useRouter();
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
      {/* <CommonBreadcrumb title="Payment" subtitle="Cart Payment" bg_clr={true} /> */}
      <ShipmentSection />
      <Footer style_2={true} />
   
    </Wrapper>
  );
};

export default shipment;