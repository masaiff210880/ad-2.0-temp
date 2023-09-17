import React from "react";
import { Col, Row } from "reactstrap";
import style from "../../styles/sales/salescommondiv.module.css";
// import style from "../../styles/Salesorder/salescommondiv.module.css";


const Commondiv = () => {
  return (
    <div>
      <Row className="align-items-start">
        <Col sm={4} className={style.firstDiv}>
          <div className={style.innerDiv}>
            <p>Original Trans. No.</p>
            <p>99196</p>
          </div>
        </Col>

        <Col sm={4} className={style.SecDiv}>
          <div className={style.innerDiv}>
            <p>Account :</p>
            <p>335901</p>
          </div>
        </Col>
      </Row>
      <Row className="align-items-start">
        <Col sm={4} className={style.firstDiv}>
          <div className={style.innerDiv}>
            <p>Trans. Date</p>
            <p>08/25/2023</p>
          </div>
        </Col>

        <Col sm={4} className={style.SecDiv}>
          <div className={style.innerDiv}>
            <p>Order No.</p>
            <p>10226275</p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Commondiv;