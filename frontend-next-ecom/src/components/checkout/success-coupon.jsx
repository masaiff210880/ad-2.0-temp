// import React from 'react'

// const SuccessCoupon = () => {
//   return (
//     <div>success-coupon</div>
//   )
// }

// export default SuccessCoupon
import React, { useState } from "react";

import ErrorMsg from "../common/error-msg";
import { useSelector } from "react-redux";
import Link from "next/link";

// import checkIcon from '../../../public/assets/img/icon/menu/'
import checkIcon from '../../../public/assets/img/icon/checkTickIcon.svg'
import Image from "next/image";


const SuccessCoupon = ({ register, errors }) => {
    const [isHidden, setIsHidden] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen((prevState) => !prevState);

    const { user } = useSelector((state) => state.auth);

    const handleAddProduct = (prd) => {
        dispatch(add_cart_product(prd))
    }



    const toggleVisibility = () => {
        setIsHidden(!isHidden);
    };
    const toggleVisible = () => {
        setHidden(!hidden);
    };

    return (

        <div className="tp-checkout-bill-area">
            {/* <ShimmerTable row={5} col={5} /> */}
            <div className="d-flex">
    <div>
        <Image src={checkIcon}  style={{marginTop:"-7px",width:"45px",height:"30px"}} alt="image"/>
    </div>
    <div>
        <h5 className="tp-checkout-bill-title text-dark mb-1" >Order 100175</h5>
        <p className="mb-5">Thank you Mohammed!</p>
    </div>
</div>
                <div className="tp-checkout-bill-form border "style={{height:"150px"}}>
                <table className="table ml-3 ">
                    <div className="mt-15 ml-10">

                        <p className="text-body-secondary">Processing</p>
                        <p>september 9,2023</p>
                        </div>
                    <br />
                    </table>
                </div>
            <br />

            <div className="tp-checkout-bill-form border" style={{height:"75px"}}>
                <table className="table">
                    <div className="mt-15 ml-10">
                        <h1 className="text-body-secondary">Order Updates</h1>
                        <p>you will get shipping and delivery updates by email.</p>
                        </div>
                    <br />
                    </table>
                
            </div>

            <div class="mb-3 d-flex mt-3 border p-3">
                <div className="p-3">
                    <h1 for="exampleFormControlTextarea1" class="form-label" style={{color:"gray"}}>Information </h1>
                    <br/>

                    <div class="no-gap">
                        <h1  style={{marginBottom:"5px",margin:"auto",color:"gray"}}>Contact Information</h1>
                        <p > jass.suhail@gmail.com</p>
                    </div>
                    <div>
                    <h1  style={{marginBottom:"5px",margin:"auto",color:"gray",marginTop:"153px"}}>Shipping Address</h1>
                        <p>Mohammed Suhail <br />8563 w Foster Ave <br />Chicago,IL,60106</p>
                    </div>
                    <div>
                    <h1  style={{marginBottom:"5px",margin:"auto",color:"gray"}}>Shipping </h1>
                    <p>Flat rate</p>
                    </div>
                </div>
                <div className="ml-125 mt-70">
                <h1 for="exampleFormControlTextarea1" class="form-label" style={{color:"gray"}}>Payment </h1>
                <p class="small"> On account(Platinum customers Only *** <br/>
                    PLEASE DO NOT USE THIS PAYMENT METHOD <br/> UNTIL YOUR ACCOUNT IS ENROLLED IN IT. YOUR <br />ORDER WILL AUTOMATICALLY GET <br /> CANCELLED.)</p>
              
                <br />
                <div>
                <h1  style={{marginBottom:"5px",margin:"auto",color:"gray"}}>Billing Address</h1>
              
                        <p>Mohammed Suhail <br />8563 w Foster Ave <br />Chicago,IL,60106</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuccessCoupon;
