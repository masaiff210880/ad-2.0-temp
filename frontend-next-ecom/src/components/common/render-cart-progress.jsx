import React from "react";
import useCartInfo from "@/hooks/use-cart-info";
import style from "../../styles/cart.module.css"
import Link from "next/link";

const RenderCartProgress = () => {
  const { total } = useCartInfo();
  const freeShippingThreshold = 200;
  const progress = (total / freeShippingThreshold) * 100;

// console.log('total',total)
  const getBreadcrumbColor = (threshold) => {
    return total < threshold ? 'red' : 'inherit';
  };

  return (
    <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
          <li className="breadcrumb-item">
              <Link href="/cart" style={{ color: getBreadcrumbColor(0) }}>
                Cart 
              </Link>
            </li>
            <li className={`  ${progress >= 25 ? "active" : " " }`}>
              <span className="glyphicon glyphicon-chevron-right"> </span>{"> "}
              <Link href="/checkout" style={{ color: getBreadcrumbColor(25) }}>
                Information
              </Link>
            </li>
            <li className={`  ${progress >= 25 ? "active" : " " }`}>
              <span className="glyphicon glyphicon-chevron-right"> </span>{"> "}
              <Link href="/shipment" style={{ color: getBreadcrumbColor(25) }}>
                Shipping
              </Link>
            </li>
            <li className={`  ${progress >= 25 ? "active" : " " }`}>
              <span className="glyphicon glyphicon-chevron-right"> </span>{"> "}
              <Link href="/payment" style={{ color: getBreadcrumbColor(25) }}>
                Payment
              </Link>
            </li>
           
          </ol>
        </nav>
    
    </div>
  );
};

export default RenderCartProgress;