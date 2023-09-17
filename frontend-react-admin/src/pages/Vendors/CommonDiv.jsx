// import React from 'react'

// const CommonDiv = () => {
//   return (
//     <div>CommonDiv</div>
//   )
// }

// export default CommonDiv

import React from "react";
import { Col, Row } from "reactstrap";
import style from "../../styles/products/Rmas.module.css";

const CommonDiv = () => {
  document.title = "Vendor List | American Distributors";
  return (
    <div>
      <Row className="align-items-start">
        <Col sm={4} className={style.firstDiv}>
          <div className={style.innerDiv}>
            <p>VID :</p>
            <p>Msc-125748</p>
          </div>
        </Col>

        <Col sm={4} className={style.SecDiv}>
          <div className={style.innerDiv}>
            <p>Account :</p>
            <p>CG69504</p>
          </div>
        </Col>

        <Col sm={4} className={style.thirdDiv}>
          <div className={style.innerDiv}>
            <p>Balance :</p>
            <p>102,555.00</p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CommonDiv;
