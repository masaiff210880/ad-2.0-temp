import React from 'react';
import category_image1 from '@assets/img/category/cate_1.gif';
import category_image2 from '@assets/img/category/cate_2.gif';

import category_image3 from '@assets/img/category/cate_3.gif';
import category_image4 from '@assets/img/category/cate_4.gif';

// import category_image5 from '@assets/img/category/cate_5.gif';


import style from '../../styles/header.module.css'
import Image from 'next/image';
const FeatureArea = () => {
  return (
    <div className={`${'d-flex justify-content-center'} ${style.banner1}`}>
          <div><Image src={category_image4}  alt='image' style={{width:"100%", height:"460px"}} /></div>
          <div><Image src={category_image2}  alt='image' style={{width:"100%", height:"460px"}} /></div>
          <div><Image src={category_image4}  alt='image' style={{width:"100%", height:"460px"}} /></div>
          <div><Image src={category_image2}  alt='image' style={{width:"100%", height:"460px"}} /></div>
          
    </div>
  );
};

export default FeatureArea;