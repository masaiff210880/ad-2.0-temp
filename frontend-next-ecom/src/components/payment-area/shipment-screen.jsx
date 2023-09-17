import React, { useEffect, useState } from "react";
import ErrorMsg from "../common/error-msg";
import { useSelector } from "react-redux";
import Link from "next/link";
import Accordion from "react-bootstrap/Accordion";
import style from "../../styles/payment.module.css";
// import Radium from 'radium';
import Card from "react-bootstrap/Card";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import { Label } from "reactstrap";
import payment from "@/pages/payment";
import payment_logo from "../../../public/assets/img/icon/payment-option.png";
import RenderCartProgress from "../common/render-cart-progress";
import { ShimmerTitle, ShimmerSocialPost } from "react-shimmer-effects";

const Shipment = ({ register, errors }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [paymentMethod, setPaymmentMethod] = useState("");

  const handlePaymentMethod = (e) => {
    setPaymmentMethod(e.target.value);
  };

  console.log('shipping',paymentMethod)
  //   console.log('payment method',paymentMethod)
  // const shimmerWidth = 10; // Set your desired width
  // const shimmerHeight = 20; // Set your desired height

  useEffect(() => {
    // Simulate a delay (e.g., 2 seconds) before setting isLoading to false
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // other shimer effect

  // const ShimmerEffect = () => {
  //     const [shimmering, setShimmering] = useState(true);

  //     useEffect(() => {
  //       const shimmerInterval = setInterval(() => {
  //         setShimmering((prev) => !prev);
  //       }, 1000); // Adjust the interval as needed

  //       return () => clearInterval(shimmerInterval);
  //     }, []);

  //     return (
  //       <div
  //         className={`shimmer-effect ${shimmering ? 'shimmer' : ''}`}
  //         style={{ width: '100%', height: '100%', position: 'relative' }}
  //       >
  //         <div
  //           style={{
  //             width: '100%',
  //             height: '100%',
  //             backgroundColor: 'rgba(0, 0, 0, 0.05)', // Shimmer color
  //             backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.1) 50%, transparent 100%)',
  //             backgroundSize: '200% 100%',
  //             backgroundPosition: '200% 0',
  //             position: 'absolute',
  //             animation: 'shimmer 1.5s infinite', // Adjust animation duration as needed
  //           }}
  //         ></div>
  //       </div>
  //     );
  //   }

  const CustomToggle = ({ children, eventKey }) => {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log("totally custom!")
    );

    return (
      <>
        <label
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          {/* <Image src={payment_logo}/> */}

          <input
            name="checkbox"
            type="radio"
            style={{ marginRight: "10px" }}
            onClick={decoratedOnClick}
          />

          {children}
          {/* <label style={{marginRight:'150px'}}>anwar</label> */}
        </label>
      </>
    );
  };

  const { user } = useSelector((state) => state.auth);

  return (
    <div className="tp-checkout-bill-area">
      <div>
        <RenderCartProgress />
      </div>

      <div className="border rounded">
        <table class="table">
          {isLoading ? (
            <ShimmerTitle line={2} gap={10} />
          ) : (
            <tbody>
              <tr>
                <td>Contact</td>
                <td>panthasamdigitalworks@gmail.com</td>
                <td></td>
              </tr>
              <tr>
                <td style={{ borderBottom: "none" }}>Ship to</td>
                <td style={{ borderBottom: "none" }}>
                  Muhammad suhail, 64179 N Oakley Ave, Chicago, IL 60645
                </td>
                <td style={{ borderBottom: "none" }}>
                  {" "}
                  <Link href="/checkout">change</Link>
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>

      <div>
        <h3
          className="tp-checkout-bill-title text-dark mt-4"
          style={{ fontSize: "25px", fontWeight: 400 }}
        >
          Shipping method
        </h3>
        <div className="border rounded">
          <table class="table">
            <tbody>
              <tr>
                <td>
                  <input
                    class="form-check-input mr-2"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios1"
                    value="Flat rate"
                    style={{ marginRight: "10px" }}
                    onChange={handlePaymentMethod}
                  />
                  Flat rate
                </td>
                <td></td>
                <td className="text-end">$15.00</td>
              </tr>
              <tr>
                <td style={{ borderBottom: "none" }}>
                  <input
                    class="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios1"
                    value="Regular pickup"
                    onChange={handlePaymentMethod}
                    style={{ marginRight: "10px" }}
                  />
                  Regular pickup
                </td>
                {/* <td ></td>
                            <td></td> */}
              </tr>
            </tbody>
          </table>
        </div>
        {/* <div>
                    <Accordion
                    // (defaultActiveKey="0") when it is placed for default open the below accordian
                    >
                        <Card>
                            <Card.Header style={{ backgroundColor: 'white' }}>
                                <CustomToggle eventKey="0">Flat rate</CustomToggle>
                            </Card.Header>
                        </Card>
                        <Card>
                            <Card.Header style={{ backgroundColor: 'white' }}>
                                <CustomToggle eventKey="1">Regular pickup</CustomToggle>
                            </Card.Header>
                        </Card>
                    </Accordion>
                </div> */}
      </div>

      <div>
        <div className="row mt-4">
          <div className="col-md-6 ">
            <div className="tp-checkout-input">
              <Link href="/checkout">
                <label className="text-info">
                  {"<<   "} Return to information
                </label>
              </Link>
            </div>
          </div>
          <div className="col-md-6 d-flex justify-content-end w-50">
            <Link href="/payment">
              <button className="btn bg-black text-white ">
                {" "}
                Continue to payment
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipment;
