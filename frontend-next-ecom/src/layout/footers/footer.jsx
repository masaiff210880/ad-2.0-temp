import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
// internal
import logo from '@assets/img/logo/ad_new_logo.png';
import logoPng from '@assets/img/logo/logoPng.png';

import pay from '@assets/img/footer/footer-pay.png';
// import social_data from '@/data/social-data';
import { Email, Location } from '@/svg';
// import { Manipulation } from 'swiper';
import email from '@assets/img/footer/emailnew.svg'
import Phone from '@assets/img/footer/Phone.svg'

import style from '../../styles/Footer.module.css'


const Footer = ({ style_2 = false, style_3 = false, primary_style = false }) => {
  return (
    <footer>
      <div className={`tp-footer-area ${primary_style ? 'tp-footer-style-2 tp-footer-style-primary tp-footer-style-6' : ''} ${style_2 ? 'tp-footer-style-2' : style_3 ? 'tp-footer-style-2 tp-footer-style-3' : ''}`}
        data-bg-color={`${style_2 ? 'footer-bg-white' : 'footer-bg-grey'}`}>
         <div className={`tp-footer-top pt-95 pb-40 ${style.footerimg}`}>
                    
          <div className="container">
            <div className="row">
                    
              <div className="col-xl-4 col-lg-3 col-md-4 col-sm-6">
                <div className="tp-footer-widget footer-col-1 mb-50">
                  <div className="tp-footer-widget-content">
                    <div className="tp-footer-logo">

                      <Link href="/">
                        <Image src={logoPng} alt="logo" />
                
                      </Link>
                    </div>
                    <div className={style.location}>
                      <div>
                        <Location />
                      </div>
                      <div className={style.paragraph}>
                        <p>1049 Industrial Dr,Bensenvile,</p>
                        <p>IL 60106,United States  </p>
                      </div>
                    </div>


                    {/* <div className="tp-footer-social">
                      {social_data.map(s => <a href={s.link} key={s.id} target="_blank">
                        <i className={s.icon}></i>
                      </a>
                      )}
                    </div> */}
                    <br />
                    <br />
                    <br />
                    <p> Copyright © 2023 American Distributors LLC.
                      {/* <Link href="/">{" "}ThemePure</Link>. */}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6  ml-2 mt-2">
                <div className="tp-footer-widget footer-col-2 mb-50">
                  <h4 className="tp-footer-widget-title">Need help</h4>
                  <br />
                  <div className="tp-footer-widget-content">
                    <div className={style.phone}>
                    <Image  src={Phone} className={style.phoneimg} alt='image' />
                    <h1 class="text-black-50">+1630-422-1915</h1>
                    </div>
                    <div className={style.email}>
                    <Image  src={email} className={style.emailimg} alt='image'/>
                      <p>info@americandistributorsllc.com</p>
                    </div>
                    <p> Mon-Fri: 10am-7pm(CST) <br />
                      Sat: 10am - 6pm(CST) <br />
                      Sun: Closed
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                <div className="tp-footer-widget footer-col-3 mb-50">
                  <h4 className="tp-footer-widget-title">Information</h4>
                  <div className="tp-footer-widget-content">
                    <br />
                    <p> About US</p>
                    <p>Our Blogs</p>
                    {/* <p>Faq's</p> */}
                    <p>Privacy Policy</p>
                    <p>Registration</p>
                    <p>Terms &amp; Conditions</p>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                <div className="tp-footer-widget footer-col-4 mb-50">
                  <h4 className="tp-footer-widget-title">Payment & Shipping</h4>
                  <div className="tp-footer-widget-content">
                    <div className="tp-footer-talk mb-20">
                      <br />
                      <p>Login /  My Account</p>
                      <p>shipping Policy</p>
                      <p>Order Tracking</p>
                      {/* <span>Got Questions? Call us</span> */}
                      {/* <h4><a href="tel:670-413-90-762">+670 413 90 762</a></h4> */}
                    </div>
                    <br />
                    <Image src={pay} alt="pay" />
                    <div className="tp-footer-contact">
                      {/* <div className="tp-footer-contact-item d-flex align-items-start">
                        <div className="tp-footer-contact-icon">
                          <span>
                            <Email />
                          </span>
                        </div>
                        <div className="tp-footer-contact-content">
                          <p><a href="mailto:shofy@support.com">shofy@support.com</a></p>
                        </div>
                      </div> */}
                      {/* <div className="tp-footer-contact-item d-flex align-items-start">
                        <div className="tp-footer-contact-icon">
                          <span>
                           
                          </span>
                        </div>
                        <div className="tp-footer-contact-content">
                          <p><a href="https://www.google.com/maps/place/Sleepy+Hollow+Rd,+Gouverneur,+NY+13642,+USA/@44.3304966,-75.4552367,17z/data=!3m1!4b1!4m6!3m5!1s0x4cccddac8972c5eb:0x56286024afff537a!8m2!3d44.3304928!4d-75.453048!16s%2Fg%2F1tdsjdj4" target="_blank">79 Sleepy Hollow St. <br /> Jamaica, New York 1432</a></p>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tp-footer-bottom">
          <div className="container">
            <div className="tp-footer-bottom-wrapper">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <div className="tp-footer-copyright">

                  </div>
                </div>
                <div className="col-md-6">
                  <div className="tp-footer-payment text-md-end">
                    <p>

                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;