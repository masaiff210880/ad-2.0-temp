import React, {useEffect, useState} from "react";

import ErrorMsg from "../common/error-msg";
import {useDispatch, useSelector} from "react-redux";
import Link from "next/link";
import style from "../../styles/payment.module.css";
import icon from "../../../public/assets/img/icon/plusIcon.svg";
import Image from "next/image";
import {useGetUserDataQuery} from "@/redux/features/cartApi/cartApi";
import country from "@/data/common/country";
import RenderCartProgress from "../common/render-cart-progress";
import {
  set_userdata,
  set_billingaddress,
} from "@/redux/features/cartApi/cartSlice";
const CheckoutBillingArea = ({register, errors}) => {
  const dispatch = useDispatch();
  const resp = useGetUserDataQuery();
  // console.log("response", resp);
  const [isHidden, setIsHidden] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const [isBilling, setIsBilling] = useState(null);

  const {user} = useSelector((state) => state.auth);
  const handleAddProduct = (prd) => {
    dispatch(add_cart_product(prd));
  };

  const toggleVisibility = () => {
    setIsHidden(!isHidden);
  };
  const toggleVisible = () => {
    setHidden(!hidden);
  };

  const handleBillingAddress = (e) => {
    setIsBilling(e.target.value);
    console.log("billing ", e.target.value);
    const lol = {id: e.target.value};
    dispatch(set_billingaddress(lol));
  };

  console.log('billing',isBilling)

  // const sdfadf= useSelector((state)=>console.log('state',state))

  useEffect(() => {
    if (resp?.isSuccess) {
      dispatch(set_userdata(resp?.data));
    }
  }, [resp, dispatch]);

  // const sdfsdf = useSelector((state)=>console.log())

  // console.log("billing", isBilling);

  return (
    <div className="tp-checkout-bill-area">
      <div>
        <RenderCartProgress />
      </div>
      {/* <ShimmerTable row={5} col={5} /> */}

      <div>
        <h3
          className="tp-checkout-bill-title text-dark"
          style={{fontSize: "25px", fontWeight: 400}}
        >
          Information
        </h3>

        <p className="mb-4">
          Welcome back,{" "}
          <span style={{fontWeight: 600, color: "black"}}>{"Admin"}</span>{" "}
          (phantasmdigitalworks@gmail.com)
        </p>
      </div>

      {/* <h3 className="tp-checkout-bill-title text-dark" style={{ fontSize: "25px", fontWeight: 400 }}>Shipping address</h3> */}

      <div class="container">
        <div class="row mt-3">
          <div class="card w-100">
            {resp?.data?.data?.map((item, index) => (
              <div key={index}>
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-6 d-flex align-items-center">
                      <input
                        type="radio"
                        id="radio1"
                        name="billing"
                        value={item?.isProfileVerifiedByAdmin && item?._id}
                        onChange={handleBillingAddress}
                        disabled={!item?.isProfileVerifiedByAdmin}
                      />
                      <label for="radio1" className={`ml-3 ${style.billtext}`}>
                        <b>
                          <u>Billing Address</u>
                        </b>
                      </label>
                    </div>
                  </div>

                  <div class="row mt-3" key={index}>
                    <div class="col-md-12">
                      <table class="table table-borderless">
                        <table>
                          <tbody>
                            <tr>
                              <td colspan="2">
                                <b>First Name:</b> {item?.userId?.firstName}
                              </td>
                              <td colspan="2">
                                <b>Last Name:</b> {item?.userId?.lastName}
                              </td>
                            </tr>
                            <tr>
                              <td colspan="4">
                                <b>Company Name:</b> {item?.businessName}
                              </td>
                            </tr>
                            <tr>
                              <td colspan="6">
                                <b>Company Address:</b>
                                {item?.businessAddress}
                              </td>
                            </tr>
                            <tr>
                              <td colspan="2">
                                <b>Country:</b> {item?.country}
                              </td>

                              <td colspan="2">
                                <b>State:</b> {item?.state}
                              </td>
                              <td colspan="2">
                                <b>Zip Code:</b> {item?.pinCode}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </table>
                    </div>
                  </div>
                  <hr />
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-6 mt-3">
            <div className="">
              <Link href="/cart">
                <i className="text-info ">{"<< "}Return to cart</i>
              </Link>
            </div>
          </div>
          <div className="d-flex justify-content-end col-md-6">
            <Link href="/shipment">
              <button className="btn bg-black text-white w-100 mt-3">
                {" "}
                Continue to shipping
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutBillingArea;
