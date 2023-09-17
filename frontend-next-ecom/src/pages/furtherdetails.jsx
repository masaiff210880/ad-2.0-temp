import React from 'react';
import SEO from '@/components/seo';
import HeaderTwo from '@/layout/headers/header-2';
import Footer from '@/layout/footers/footer';
import Wrapper from '@/layout/wrapper';
import CommonBreadcrumb from '@/components/breadcrumb/common-breadcrumb';
import FurtherArea from '@/components/login-register/further-area';

const RegisterPage = () => {
  return (
    <Wrapper>
      <SEO pageTitle="Login" />
      <HeaderTwo style_2={true} />
      <CommonBreadcrumb title="Register" subtitle="Register" center={true} />
      <FurtherArea/>
      <Footer primary_style={true} />
    </Wrapper>
  );
};

export default RegisterPage;