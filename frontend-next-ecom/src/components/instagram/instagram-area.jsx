import React, { useState } from 'react';
import Image from 'next/image';
// import { Card } from "react-bootstrap";
import { Carousel } from 'react-bootstrap';
import style from "../../../src/styles/instragram.module.css";
import banner_1 from "@assets/img/product/banner/b-1g.gif";

// internal
import ins_1 from '@assets/img/instagram/insta_1.svg';
import ins_2 from '@assets/img/instagram/insta_2.svg';
import ins_3 from '@assets/img/instagram/insta_3.svg';
import ins_4 from '@assets/img/instagram/insta_4.svg';
import ins_5 from '@assets/img/instagram/image-1.svg';
import img_x1 from '@assets/img/instagram/img-2.svg';

import img_X1 from '@assets/img/instagram/img_X1.svg';
import img_X2 from '@assets/img/instagram/img_X2.svg';
import img_X3 from '@assets/img/instagram/img_X3.svg';
import img_X4 from '@assets/img/instagram/img_X4.svg';
import img_X5 from '@assets/img/instagram/img_X5.svg';
import img_X6 from '@assets/img/instagram/img_X6.svg';
import img_X7 from '@assets/img/instagram/img_X7.svg';
import img_X8 from '@assets/img/instagram/img_X8.svg';
import img_X9 from '@assets/img/instagram/img_X9.svg';
import img_X10 from '@assets/img/instagram/img_X10.svg';

import insta_6 from '@assets/img/instagram/insta_6.svg';
import insta_7 from '@assets/img/instagram/insta_7.svg';

import insta_8 from '@assets/img/instagram/insta_8.svg';

import insta_9 from '@assets/img/instagram/insta_9.svg';

import insta_10 from '@assets/img/instagram/insta_10.svg';


import in_1 from '@assets/img/instagram/in_1.svg';
// import in_2 from '@assets/img/instagram/in_2.svg';
import in_3 from '@assets/img/instagram/in_3.svg';
import in_4 from '@assets/img/instagram/in_4.svg';
import in_5 from '@assets/img/instagram/in_5.svg';
import in_9 from '@assets/img/instagram/in_9.jpg';

// import ins_6 from '@assets/img/instagram/banner1.svg';
import ins_7 from '@assets/img/instagram/banner-1.png';
import ins_8 from '@assets/img/instagram/banner-2.png';
import ins_x from '@assets/img/instagram/banner_4.png';


import ins_9 from '@assets/img/instagram/banner_3.png';
import ins_11 from '@assets/img/instagram/Clock.svg';
import ins_12 from '@assets/img/instagram/in_8.svg';
// import { left } from '@popperjs/core';
import Link from 'next/link';


// instagram data 
const instagram_data = [
  { id: 1, link: 'https://www.instagram.com/', img: ins_1, focusedImg: img_X1 },
  { id: 2, link: 'https://www.instagram.com/', img: ins_2, focusedImg: img_X2 },
  { id: 3, link: 'https://www.instagram.com/', img: ins_3, focusedImg: img_X3 },
  { id: 4, link: 'https://www.instagram.com/', img: ins_4, focusedImg: img_X4 },
  { id: 5, link: 'https://www.instagram.com/', img: ins_5, focusedImg: img_X5 },
  { id: 1, link: 'https://www.instagram.com/', img: insta_6, focusedImg: img_X6 },
  { id: 2, link: 'https://www.instagram.com/', img: insta_7, focusedImg: img_X7 },
  { id: 3, link: 'https://www.instagram.com/', img: insta_8, focusedImg: img_X8 },
  { id: 4, link: 'https://www.instagram.com/', img: insta_9, focusedImg: img_X9 },
  { id: 5, link: 'https://www.instagram.com/', img: insta_10, focusedImg: img_X10 },
]

//bottom picture
const bottom_picture = [
  { id: 1, link: '/shop', img1: in_1 },
  { id: 2, link: 'https://www.instagram.com/', img1: in_5 },
  { id: 3, link: 'https://www.instagram.com/', img1: in_3 },
  { id: 4, link: 'https://www.instagram.com/', img1: in_4 },
  { id: 5, link: 'https://www.instagram.com/', img1: in_5 },
]

const cardData = [
  {
    id: 1,
    imageUrl: { ins_12 },
    title: "E Liquid",
    text: "Using Lorem ipsum to focus attention on graphic elements in a webpage design proposal · ",
  },
  {
    id: 2,
    imageUrl: { ins_12 },
    title: "E Liquid",
    text: "Using Lorem ipsum to focus attention on graphic elements in a webpage design proposal · ",
  },
  {
    id: 3,
    imageUrl: { ins_12 },
    title: "E Liquid",
    text: "Using Lorem ipsum to focus attention on graphic elements in a webpage design proposal · ",
  },
  {
    id: 4,
    imageUrl: { ins_12 },
    title: "E Liquid",
    text: "Using Lorem ipsum to focus attention on graphic elements in a webpage design proposal · ",
  },

  // Add more card data as needed...
];

const InstagramArea = () => {


  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseOver = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseOut = () => {
    setHoveredIndex(null);
  };
  const imagesPerSlide = 5;

  const chunkArray = (arr, chunkSize) => {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  };

  const chunkedInstagramData = chunkArray(instagram_data, imagesPerSlide);
  return (
    <>
      <div style={{ marginBottom: "30px" }}>
        <div className="container">
          <Carousel pauseOnHover={false} className="" style={{
            width: "100%", height: "430px", marginLeft: "4px",
          }}>
            {chunkedInstagramData.map((slide, slideIndex) => (
              <Carousel.Item key={slideIndex}>
                <div style={{ display: "flex", gap: "40px" }}>
                  {slide.map((item, index) => (
                    <div
                      key={item.id}
                      className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12" // Modified grid classes
                      onMouseOver={() => handleMouseOver(index)}
                      onMouseOut={handleMouseOut}
                    >
                      <div style={{ position: "relative", width: "100%", height: "80%" }}>
                        <Image src={item.img} alt="instagram img" className="" style={{
                          width: "100%", height: "100%",
                          filter: hoveredIndex === index ? 'blur(8px)' : 'none',
                          marginTop: "5px",
                        }} />

                        <Link href='/shop'>
                          <Image src={item.focusedImg} alt="Raze Disposable Focused" style={{
                            display: hoveredIndex === index ? 'block' : 'none',
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            width: '100%',
                            height: '100%'
                          }} />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
      <br />
      <br />
      <div className="d-flex justify-content-center mb-4">
        <Image src={banner_1} className="img-fluid" alt="Responsive image" style={{ width: "100%" ,}} />
      </div>

      <div className={style.container4Image}>
        <Image src={ins_7} className={style.img_fluid} alt="Responsive image" />
        <Image src={ins_8} className={style.img_fluid} alt="Responsive image" />
        <Image src={ins_9} className={style.img_fluid} alt="Responsive image" />
        <Image src={ins_x} className={style.img_fluid} alt="Responsive image" />
      </div>


      <div className={`${'d-flex flex-column align-items-center'} ${style.saleDiv}`}>
        {/* Header */}
        <div className="d-flex align-items-center mb-3 header-section">
          <p className="h4 text-white mt-4">SALE THIS WEEK!</p>
          <button type="button" className="btn btn-secondary clock-button mt-4">
            <Image src={ins_11} className="img-fluid " alt="clock" /> 2 Hours left
          </button>
        </div>

        {/* Cards */}
        <div className="row justify-content-center" style={{ width: "100%" }}>
          {cardData.map((card) => (
            <div key={card.id} className="col-15 col-sm-6 col-md-4 col-lg-3">
              <div className={`${style.customCard} card`}>
                {/* Image */}
                <Image src={card.imageUrl.ins_12} alt={card.title}
                  className="card-img-top" width={120} height={240} />

                <div className="card-body">
                  <h5 className="card-title">{card.title}</h5>
                  <p className="card-text">{card.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>





      {/*  */}
      <div className={style.containercontainer1LastDiv}>
        {bottom_picture.map((item) => (
          <div key={item.id} className={style.col1Last}>
            <div>
              <Image src={item.img1} alt="bottom_picture" />
            </div>
          </div>
        ))}
      </div>
      {/*  */}



    </>

  );
};

export default InstagramArea;