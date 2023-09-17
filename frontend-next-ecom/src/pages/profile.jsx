import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useCookies } from 'react-cookie';

import { useRouter } from "next/router";
// internal
import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import HeaderTwo from "@/layout/headers/header-2";
import Footer from "@/layout/footers/footer";
import ProfileArea from "@/components/my-account/profile-area";
import { useGetUserOrdersQuery } from "@/redux/features/order/orderApi";
import Loader from "@/components/loader/loader";

// old code with below code getting warnings in build time ///


// const ProfilePage = () => {
//   const router = useRouter();
//   const [cookies] = useCookies(['userName']);

//   const { data: orderData, isError, isLoading, } = useGetUserOrdersQuery();
//   useEffect(() => {
//     // const isAuthenticate = Cookies.get("userInfo");
//     const userName = cookies['userName'];
//     if (!userName) {
//       router.push("/login");
//     } else {
//       router.push("/profile");
//     }
//   }, [router]);

//   if (isLoading) {
//     return (
//       <div
//         className="d-flex align-items-center justify-content-center"
//         style={{ height: "100vh" }}
//       >
//         <Loader loading={isLoading} />
//       </div>
//     );
//   }

//   return (
//     <Wrapper>
//       <SEO pageTitle="Profile" />
//       <HeaderTwo style_2={true} />
//       <ProfileArea orderData={orderData} />
//       <Footer style_2={true} />
//     </Wrapper>
//   );
// };


const ProfilePage = () => {
  const router = useRouter();
  const [cookies] = useCookies(['userName']);

  const { data: orderData, isError, isLoading } = useGetUserOrdersQuery(); // Make sure to replace 'useGetUserOrdersQuery' with your actual query hook

  useEffect(() => {
    const userName = cookies['userName'];
    if (!userName) {
      router.push('/login');
    }
  }, [router, cookies]);

  if (isLoading) {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: '100vh' }}
      >
        <Loader loading={isLoading} />
      </div>
    );
  }

  return (
    <Wrapper>
      <SEO pageTitle="Profile" />
      <HeaderTwo style_2={true} />
      <ProfileArea orderData={orderData} />
      <Footer style_2={true} />
    </Wrapper>
  );
};



export default ProfilePage;
