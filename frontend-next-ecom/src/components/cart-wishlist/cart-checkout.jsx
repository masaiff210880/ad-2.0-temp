import React, {useState} from "react";
import Link from "next/link";

const CartCheckout = ({products}) => {
  console.log("_________________", products);
  const [shiConst, setShipCost] = useState();

  // handle shipping cost
  const handleShippingCost = (value) => {
    if (value === "free") {
      setShipCost(0);
    } else {
      setShipCost(value);
    }
  };
  return (
    <div className="tp-cart-checkout-wrapper mt-4" style={{width: "530px"}}>
      <div className="tp-cart-checkout-top d-flex align-items-center justify-content-between">
        <span className="tp-cart-checkout-top-title">Subtotal</span>
        {/* <span className="tp-cart-checkout-top-price">${total}</span> */}
        <span className="tp-cart-checkout-top-price">
          ${products?.totalAmount?.toFixed(2)}
        </span>
      </div>
      <div className="tp-cart-checkout-shipping">
        <h4 className="tp-cart-checkout-shipping-title">Shipping</h4>
        <div
          className="tp-cart-checkout-shipping-option-wrapper"
          style={{display: "flex", justifyContent: "space-between"}}
        >
          <div>
            <p style={{fontWeight: 600}}>Shipping</p>
          </div>
          <div>
            <div className="tp-cart-checkout-shipping-option">
              <input id="flat_rate" type="radio" name="shipping" />
              <label
                htmlFor="flat_rate"
                onClick={() => handleShippingCost(products?.shippingCharge)}
              >
                Flat rate:{" "}
                <span style={{fontWeight: 600}}>
                  ${products?.data?.shippingCharge}
                </span>
              </label>
            </div>
            <div className="tp-cart-checkout-shipping-option">
              <input id="local_pickup" type="radio" name="shipping" />
              <label
                htmlFor="local_pickup"
                onClick={() => handleShippingCost(products?.shippingCharge)}
              >
                Regular pickup
              </label>
            </div>

            <p>
              Shipping to 8563 w Foster Ave, <br /> Chicago, IL 60656. <br />
              Change address
            </p>
          </div>
        </div>
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <p style={{fontWeight: 600}}>Tax</p>
          <p style={{marginRight: "5px", fontWeight: 600}}>${products?.tax}</p>
        </div>
      </div>
      <div className="tp-cart-checkout-total d-flex align-items-center justify-content-between">
        <span>Total</span>
        {/* <span>${(total + shipCost).toFixed(2)}</span> */}
        <span style={{marginRight: "5px", fontWeight: 600}}>
          ${products?.grandTotalAmount?.toFixed(2)}
        </span>
      </div>
      <div className="tp-cart-checkout-proceed">
        <Link href="/checkout" className="tp-cart-checkout-btn w-100">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default CartCheckout;
