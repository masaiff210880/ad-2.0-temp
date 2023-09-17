import React, {useEffect, useState} from "react";
import ErrorMsg from "../common/error-msg";
import {useSelector} from "react-redux";
import Link from "next/link";
import Accordion from "react-bootstrap/Accordion";
import style from "../../styles/payment.module.css";
import Card from "react-bootstrap/Card";
import {useAccordionButton} from "react-bootstrap/AccordionButton";
import {Label} from "reactstrap";
import payment from "@/pages/payment";
import RenderCartProgress from "../common/render-cart-progress";
import icon from "../../../public/assets/img/icon/plusIcon.svg";
import country from "@/data/common/country";
import Image from "next/image";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  ShimmerCategoryItem,
  ShimmerCategoryList,
  ShimmerTitle,
  ShimmerSocialPost,
  ShimmerThumbnail,
} from "react-shimmer-effects";
import {useAddSalesOrderMutation} from "@/redux/features/cartApi/cartApi";
import payment_logo from "../../../public/assets/img/icon/payment-option.png";
import {notifyError, notifySuccess} from "@/utils/toast";
import {useRouter} from "next/router";

// const schema = Yup.object().shape({
//   email: Yup.string().required("Email is required").email().label("Email"),
//   // password: Yup.string().required("Password is Required").min(6).label(),
//   // firstName: Yup.string()
//   //   .matches(/^[A-Za-z\s]*$/, "First Name should only contain letters")
//   //   .required("First Name is required"),
//   // lastName: Yup.string()
//   //   .matches(/^[A-Za-z\s]*$/, "Last Name should only contain letters")
//   //   .required("Last Name is required"),
// });

const CartPayment = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isHidden, setIsHidden] = useState(false);
  const [hidden, setHidden] = useState(false);
  // const {cartData} = useSelector((state) => {
  //   state?.cartItem;
  // });
  console.log("");
  const toggleVisibility = () => {
    setIsHidden(!isHidden);
  };
  const toggleVisible = () => {
    setHidden(!hidden);
  };

  useEffect(() => {
    // Simulate a delay (e.g., 2 seconds) before setting isLoading to false
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   reset,
  // } = useForm({
  //   resolver: yupResolver(schema),
  // });

  // const onSubmit = (data,event) => {
  //   event.preventDefault()
  //   console.log('email',data.email)
  //   // registerUser({
  //   //   firstName: data.firstName,
  //   //   lastName: data.lastName,
  //   //   email: data.email,
  //   //   password: data.password,
  //   //   userName: data.userName,
  //   //   phoneNumber: data.phoneNumber,
  //   //   licenseFor: "Shop",
  //   //   feinLicense: "XYZABC695847",
  //   //   feinNumber: "1235665",
  //   //   tobaccoLicense: "VPBXWE584747",
  //   //   businessLicense: "BZYMNE69584",
  //   //   governmentIssuedId: "5847586958",
  //   //   otpNumber: data.licenseFor,
  //   //   businessName: data.businessName,
  //   //   businessAddress: data.businessAddress,
  //   //   city: data.city,
  //   //   state: data.state,
  //   //   country: data.country,
  //   //   pinCode: data.pinCode,
  //   // }).then((result) => {
  //   //   console.log('result',result)
  //   //   if (result?.data?.status) {
  //   //     notifySuccess(result?.data?.message);
  //   //     // console.log(result);
  //   //     setTimeout(()=>{
  //   //       router.push(redirect || "/login");
  //   //     },3000)
  //   //     reset();
  //   //   }
  //   // }).catch((error)=>{
  //   //   notifyError(error.message);
  //   // })
  // };

  const CustomToggle = ({children, eventKey}) => {
    const decoratedOnClick = useAccordionButton(eventKey, (e) =>
      console.log("credit-card", e.target.value)
    );

    return (
      <label style={{display: "flex", alignItems: "center", cursor: "pointer"}}>
        {/* <Image src={payment_logo}/> */}

        <input
          name="credit-card"
          type="radio"
          style={{marginRight: "10px"}}
          onClick={decoratedOnClick}
          defaultChecked
          value={children}
        />

        {children}
      </label>
    );
  };

  const CustomToggleOne = ({children, eventKey}) => {
    const decoratedOnClick = useAccordionButton(eventKey, (e) =>
      console.log("Radio Button Value:", e.target.value)
    );

    return (
      <label style={{display: "flex", alignItems: "center", cursor: "pointer"}}>
        <input
          name="credit-card"
          type="radio"
          style={{marginRight: "10px"}}
          onClick={decoratedOnClick}
          defaultChecked
          value={children}
        />

        <Image
          // src="D:\Ad-Next-js-sep\ad-fe-next-js\public\assets\img\icon\payment-option.png"// Replace with the actual path to your image
          src={payment_logo} // Replace with the actual path to your image
          alt="Image Description"
          width={200}
          height={25}
          style={{position: "relative", left: "350px "}}
        />
        <span style={{position: "relative", right: "200px"}}>{children}</span>
      </label>
    );
  };

  const {user} = useSelector((state) => state.auth);
  // const StyledCustomToggle = Radium(CustomToggle);
  const [addSalesOrder, {}] = useAddSalesOrderMutation();
  const router = useRouter();
  const id = useSelector((state) => state?.cartItem?.user_data[0]?._id);
  // console.log('id',id)
  const handleCompleteOrder = () => {
    const obj = {
      userLicense: id,
      paymentMethod: "Reguar Pickup",
      paymentTerms: "Cash",
      advanceAmount: 0,
      receiptNumber: 0,
      isOnlinePayment: false,
      billTo: "",
      billingAddress: "Office No : 32 Floor : 04 , Shanti Complex",
      billingCity: "Texas",
      billingState: "California",
      billingCountry: "USA",
      billingPincode: 584769,
    };
    console.log("obj", obj);
    // addSalesOrder(obj).then((res) => {
    //   if (res?.data) {
    //     notifySuccess("Order Completed");
    //     setTimeout(() => {
    //       router.push("/");
    //     }, 5000);
    //   } else {
    //     notifyError(res.error?.message);
    //   }
    // });
  };

  return (
    <div className="tp-checkout-bill-area">
      <div>
        <RenderCartProgress />
      </div>

      <div className="border rounded">
        <table class="table">
          {isLoading ? (
            <ShimmerTitle line={3} gap={10} />
          ) : (
            <tbody>
              <tr>
                <td>Contact</td>
                <td>panthasamdigitalworks@gmail.com</td>
                <td></td>
              </tr>
              <tr>
                <td>Ship to</td>
                <td>Muhammad suhail, 64179 N Oakley Ave, Chicago, IL 60645</td>
                <td style={{paddingTop: "10px"}}>
                  {" "}
                  <Link href="/checkout" style={{color: "black"}}>
                    change
                  </Link>
                </td>
                {/* <td style={{paddingTop:"10px"}}></td> */}
              </tr>
              <tr>
                <td style={{borderBottom: "none"}}>Method</td>
                <td style={{borderBottom: "none"}}>Flat rate</td>
                <td style={{borderBottom: "none"}}>
                  {" "}
                  <Link href="/shipment" style={{color: "black"}}>
                    change
                  </Link>
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>

      <div>
        <h3
          className="tp-checkout-bill-title text-dark mt-4"
          style={{fontSize: "25px", fontWeight: 400}}
        >
          Payments
        </h3>
        <label className="mb-4">
          All transactions are secured and encrypted{" "}
        </label>

        <div>
          <Accordion defaultActiveKey="0">
            <Card>
              <Card.Header style={{backgroundColor: "white"}}>
                {isLoading ? (
                  <ShimmerTitle line={1} variant="primary" />
                ) : (
                  <CustomToggleOne eventKey="0" style={{textAlign: "left"}}>
                    Credit-Debit Card
                  </CustomToggleOne>
                )}
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body style={{backgroundColor: "rgba(242,242,242,1)"}}>
                  <div className="tp-checkout-bill-form">
                    <div className="tp-checkout-bill-inner">
                      <div className="row">
                        {isLoading ? (
                          <ShimmerTitle line={1} variant="primary" />
                        ) : (
                          <div
                            className="col-md-5 mb-2"
                            style={{marginLeft: "30px"}}
                          >
                            <label>Pay securely using credit cards.</label>
                          </div>
                        )}

                        {isLoading ? (
                          <ShimmerThumbnail height={150} rounded />
                        ) : (
                          <>
                            <div
                              className="col-md-11"
                              style={{marginLeft: "30px"}}
                            >
                              <div className="tp-checkout-input">
                                <label>
                                  Card number<span>*</span>
                                </label>
                                <input
                                  // {...register("country", { required: `country is required!` })}
                                  name="cardnumber"
                                  id="cardnumber"
                                  type="text"
                                  placeholder="Card number"
                                />
                                {/* <ErrorMsg msg={errors?.lastName?.message} /> */}
                              </div>
                            </div>
                            <div
                              className="col-md-5"
                              style={{marginLeft: "30px"}}
                            >
                              <div className="tp-checkout-input">
                                <label>
                                  Expiry(MM/YY) <span>*</span>
                                </label>
                                <input
                                  // {...register("expiry", {
                                  //   required: `firstName is required!`,
                                  // })}
                                  name="expiry"
                                  id="expiry"
                                  type="text"
                                  placeholder="MM/YY"
                                  defaultValue={user?.firstName}
                                />
                                {/* <ErrorMsg msg={errors?.firstName?.message} /> */}
                              </div>
                            </div>
                            <div
                              className="col-md-5"
                              style={{marginLeft: "50px"}}
                            >
                              <div className="tp-checkout-input">
                                <label>
                                  Card Code <span>*</span>
                                </label>
                                <input
                                  // {...register("lastName", {
                                  //   required: `lastName is required!`,
                                  // })}
                                  name="lastName"
                                  id="lastName"
                                  type="text"
                                  placeholder="CVC"
                                />
                                {/* <ErrorMsg msg={errors?.lastName?.message} /> */}
                              </div>
                            </div>
                            <div
                              className="col-md-5"
                              style={{marginLeft: "30px"}}
                            >
                              <div class="form-check">
                                <input
                                  class="form-check-input position-static mt-1"
                                  type="checkbox"
                                  id="blankCheckbox"
                                  value="option1"
                                  aria-label="..."
                                />
                                <label className="mb-1">Save to account</label>
                              </div>
                            </div>
                          </>
                        )}
                        <br />
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header style={{backgroundColor: "white"}}>
                {isLoading ? (
                  <ShimmerTitle line={1} variant="primary" />
                ) : (
                  <CustomToggle eventKey="1">
                    On Account (Platinum Customers Only *** PLEASE DONT USE THIS
                    PAYMENT METHOD UNTIL YOUR ACCOUNT IS ENROLLED IN IT. YOUR
                    ORDER WILL AUTOMATICALLY GET CANCELLED.)
                  </CustomToggle>
                )}
              </Card.Header>
            </Card>
          </Accordion>
        </div>
      </div>
      <div>
        <h3
          className="tp-checkout-bill-title text-dark mt-4"
          style={{fontSize: "25px", fontWeight: 400}}
        >
          Billing address
        </h3>
        <label className="mb-4">
          Select the addredd that matches your card or payment method{" "}
        </label>

        <div>
          <Accordion
            defaultActiveKey="1"
            // (defaultActiveKey="1") when it is placed for default open the below accordian
          >
            <Card>
              <Card.Header style={{backgroundColor: "white"}}>
                <CustomToggle eventKey="0">
                  Same as Shipping address
                </CustomToggle>
              </Card.Header>
            </Card>
            <Card>
              <Card.Header style={{backgroundColor: "white"}}>
                <CustomToggle eventKey="1">
                  Use a different billing address
                </CustomToggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body style={{backgroundColor: "rgba(242,242,242,1)"}}>
                  <div className="tp-checkout-bill-form">
                    <div className="tp-checkout-bill-inner">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="tp-checkout-input ">
                            <label>
                              First Name <span>*</span>
                            </label>
                            <input
                              // {...register("email", {
                              //   required: `Email is required!`,
                              // })}
                              name="email"
                              id="email"
                              type="text"
                              placeholder="First Name"
                            />
                            {/* <ErrorMsg msg={errors?.email?.message} /> */}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="tp-checkout-input">
                            <label>
                              Last Name <span>*</span>
                            </label>
                            <input
                              // {...register("lastName", {
                              //   required: `Last name is required!`,
                              // })}
                              name="lastName"
                              id="lastName"
                              type="text"
                              placeholder="Last Name"
                            />
                            {/* <ErrorMsg msg={errors?.lastName?.message} /> */}
                          </div>
                        </div>

                        <div className="tp-checkout-input col-md-12 d-flex">
                          {!isHidden ? (
                            <>
                              <Image
                                className=""
                                src={icon}
                                alt="Toggle"
                                onClick={toggleVisibility}
                                style={{
                                  cursor: "pointer",
                                  width: "13px",
                                  height: "13px",
                                  marginTop: "10px",
                                }}
                              />{" "}
                              &nbsp;
                              <label
                                className=" mt-1"
                                onClick={toggleVisibility}
                                style={{color: "#2196f3"}}
                              >
                                Add company (optional)
                              </label>
                            </>
                          ) : (
                            <div className=" col-md-12 mt-3">
                              <div className="tp-checkout-input">
                                <input
                                  name="address"
                                  id="address"
                                  type="text"
                                  placeholder="Company name (optional)"
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        <div className=" col-md-12">
                          <div className="tp-checkout-input">
                            <label>Street address</label>
                            <input
                              // {...register("address", { required: ` Street  Address is required!` })}
                              name="address"
                              id="address"
                              type="text"
                              placeholder="House number and street name"
                            />
                            {/* <ErrorMsg msg={errors?.address?.message} /> */}
                          </div>
                        </div>

                        <div className="tp-checkout-input col-md-12 d-flex">
                          {!hidden ? (
                            <>
                              <Image
                                className=""
                                src={icon}
                                alt="Toggle"
                                onClick={toggleVisible}
                                style={{
                                  cursor: "pointer",
                                  width: "13px",
                                  height: "13px",
                                  marginTop: "10px",
                                }}
                              />{" "}
                              &nbsp;
                              <label
                                className=" mt-1"
                                onClick={toggleVisibility}
                                style={{color: "#2196f3"}}
                              >
                                Add Address Line 2 (optional)
                              </label>
                            </>
                          ) : (
                            <div className=" col-md-12 mt-3">
                              <div className="tp-checkout-input">
                                <input
                                  name="address"
                                  id="address"
                                  type="text"
                                  placeholder="Apartment,suite,unit,etc.(optional)"
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="col-md-4">
                          <div className="tp-checkout-input">
                            <label>Country</label>
                            <div class="custom-select-wrapper">
                              <select
                                // {...register("storeType")}
                                id="storeType"
                                name="storeType"
                                className="w-100 border-dark-subtle"
                                style={{height: "50px", padding: "5px"}}
                              >
                                <option value="">
                                  Select a country/region
                                </option>
                                {country.map((country, index) => (
                                  <option
                                    key={index}
                                    value={country.countryName}
                                  >
                                    {country.countryName}
                                  </option>
                                ))}
                              </select>
                            </div>

                            {/* <ErrorMsg msg={errors?.country?.message} /> */}
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="tp-checkout-input">
                            <label>Postcode ZIP</label>
                            <input
                              // {...register("zipCode", { required: `Zipcode is required!` })}
                              name="zipCode"
                              id="zipCode"
                              type="text"
                              placeholder="Postcode/ZIP"
                            />
                            {/* <ErrorMsg msg={errors?.zipCode?.message} /> */}
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="tp-checkout-input">
                            <label>State</label>
                            <select
                              // {...register("storeType")}
                              id="storeType"
                              name="storeType"
                              className="w-100 border-dark-subtle"
                              style={{height: "50px", padding: "5px"}}
                            >
                              <option value="">Select a country/region</option>
                              {country.map((country, index) => (
                                <option key={index} value={country.countryName}>
                                  {country.countryName}
                                </option>
                              ))}
                            </select>
                            {/* <ErrorMsg msg={errors?.state?.message} /> */}
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="tp-checkout-input">
                            <label>Town / City</label>
                            <input
                              // {...register("city", { required: `City is required!` })}
                              name="city"
                              id="city"
                              type="text"
                              placeholder="City"
                            />
                            {/* <ErrorMsg msg={errors?.city?.message} /> */}
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="tp-checkout-input">
                            <label>
                              Phone <span>*</span>
                            </label>
                            <input
                              // {...register("contactNo", {
                              //   required: `Contact number is required!`,
                              // })}
                              name="contactNo"
                              id="contactNo"
                              type="text"
                              placeholder="Phone"
                            />
                            {/* <ErrorMsg msg={errors?.contactNo?.message} /> */}
                          </div>
                        </div>
                        <br />
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>

        <div className="mt-4">
          <Label>
            Your personal data will be used to process your order, support your
            experience throughout this website, and for other purposes described
            in our <span style={{color: "cyan"}}>privacy policy.</span>
          </Label>
        </div>

        <br />
        <div className="row">
          <div className="col-md-6 ">
            <div className="tp-checkout-input">
              <Link href="/shipment">
                <label className="text-info">{"<<   "}Return to Shipping</label>
              </Link>
            </div>
          </div>
          <div className="col-md-6 d-flex justify-content-end w-50">
            <Link href="#">
              <button
                className="btn bg-black text-white "
                onClick={handleCompleteOrder}
              >
                {" "}
                Complete Order
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPayment;
