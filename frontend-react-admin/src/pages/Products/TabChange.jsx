import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import ProductVendors from './ProductVendors';
import OrderHistory from './OrderHistory';
import MovementHistory from './MovementHistory';
import Variant from './Variant';
import style from "../../../src/assets/scss/config/ProductDetails.module.css";
import classnames from "classnames";
import Overview from "./Overview";
import { Link, useParams } from "react-router-dom";
import { getProducts } from "../../slices/ecommerce/thunk";
import overview from "../../assets/productIcon/Overview1.svg";
import phistory from "../../assets/productIcon/phistory.svg";
import ohistory from "../../assets/productIcon/ohistory.svg";
import mhistory from "../../assets/productIcon/mhistory.svg";
import variant from "../../assets/productIcon/variant.svg";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

const TabChange = (props) => {
    console.log('props',props);


    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(!isClicked);
    };

    const {data} =props;

   


  // Arrow Nav tabs
  const [arrowNavTab, setarrowNavTab] = useState("1");
  const arrowNavToggle = (tab) => {
      if (arrowNavTab !== tab) {
          setarrowNavTab(tab);
      }
  };

  return (
    <div>
        <Row style={{ marginTop: "2%", marginBottom: "3%", marginLeft: "0.4px", marginRight: "0.4px" }}>
                <Col lg={12} >

                    <Card >
                        <CardBody>

                            <Nav pills className={style.navTab} >
                                <div  style={{width: "19%", textAlign:"center"}}><NavItem>
                                    <NavLink
                                        style={{
                                            cursor: "pointer",
                                            backgroundColor: arrowNavTab === "1" ? "#FFFFFF" : "#FFFFFF40", // White background for active
                                            color: arrowNavTab === "1" ? "#2F4C8F" : "#FFFFFF",
                                            fontWeight: arrowNavTab === "1" ? "bold" : "",
                                            height:"43.5px", 
                                            borderRadius: "6px 6px 0px 0px"    // Blue text color for active
                                        }}
                                        className={classnames({
                                            active: arrowNavTab === "1",
                                        })}
                                        onClick={() => {
                                            arrowNavToggle("1");
                                        }}
                                    >
                                        <i className="ri-survey-line" style={{ marginRight: "10px", fontSize: "28px" }}></i>
                                        <span className={style.lastTextTab}>Overview</span> 
                                    </NavLink>
                                </NavItem></div>
                                <div style={{width: "19%", textAlign:"center"}}><NavItem>
                                    <NavLink
                                        style={{
                                            cursor: "pointer",
                                            backgroundColor: arrowNavTab === "2" ? "#FFFFFF" : "#FFFFFF40", // White background for active
                                            color: arrowNavTab === "2" ? "#2F4C8F " : "#FFFFFF",
                                            fontWeight: arrowNavTab === "2" ? "bold" : "",
                                            height:"43.8px" ,
                                            borderRadius: "6px 6px 0px 0px"      // Blue text color for active
                                        }}
                                        onClick={() => {
                                            arrowNavToggle("2");
                                        }}
                                    >
                                       
                                        <i className="las la-sitemap" style={{ marginRight: "10px", fontSize: "28px" }} />
                                        Product Vendors
                                    </NavLink>
                                </NavItem></div>
                                <div style={{width: "19%", textAlign:"center"}}><NavItem>
                                    <NavLink
                                        style={{
                                            cursor: "pointer",
                                            backgroundColor: arrowNavTab === "3" ? "#FFFFFF" : "#FFFFFF40", // White background for active
                                            color: arrowNavTab === "3" ? "#2F4C8F " : "#FFFFFF", // Blue text color for active
                                            fontWeight: arrowNavTab === "3" ? "bold" : "",
                                            height:"42px" ,
                                            borderRadius: "6px 6px 0px 0px"   
                                        }}
                                        onClick={() => {
                                            arrowNavToggle("3");
                                        }}
                                    >
                                        <i className="ri-list-ordered" style={{ marginRight: "10px", fontSize: "28px", }} />
                                        <span className={style.lastTextTab}>Order History</span>
                                    </NavLink>
                                </NavItem></div>
                                <div style={{width: "19%", textAlign:"center"}}><NavItem>
                                    <NavLink
                                        style={{
                                            cursor: "pointer",
                                            backgroundColor: arrowNavTab === "4" ? "#FFFFFF" : "#FFFFFF40", // White background for active
                                            color: arrowNavTab === "4" ? "#2F4C8F " : "#FFFFFF", // Blue text color for active
                                            fontWeight: arrowNavTab === "4" ? "bold" : "",
                                            height:"42px"  ,
                                            borderRadius: "6px 6px 0px 0px"  
                                        }}
                                        onClick={() => {
                                            arrowNavToggle("4");
                                        }}
                                    >
                                        <i className="ri-device-recover-line"  style={{ marginRight: "10px", fontSize: "28px", }}></i>
                                        <span className={style.lastTextTab}>Movement History</span> 
                                    </NavLink>
                                </NavItem></div>
                                <div style={{width: "19%", textAlign:"center"}}><NavItem>
                                    <NavLink
                                        style={{
                                            cursor: "pointer",
                                            backgroundColor: arrowNavTab === "5" ? "#FFFFFF" : "#FFFFFF40", 
                                            color: arrowNavTab === "5" ? "#2F4C8F " : "#FFFFFF", 
                                            fontWeight: arrowNavTab === "5" ? "bold" : "",
                                            height:"42px" ,
                                            borderRadius: "6px 6px 0px 0px"   
                                        }}
                                        onClick={() => {
                                            arrowNavToggle("5");
                                        }}
                                    >
                               
                                        <i className="mdi mdi-cube"  style={{ marginRight: "10px", fontSize: "25px", }}></i>
                                        <span className={style.lastTextTab}>Variant</span> 
                                    </NavLink>
                                </NavItem></div>

                            </Nav>

                            <TabContent
                                activeTab={arrowNavTab}
                                className="text-muted mt-4"
                            >
                                <TabPane tabId="1" id="arrow-overview">
                                    <h6 ><Overview data={data} /></h6>
                                </TabPane>
                                <TabPane tabId="2" id="arrow-profile">

                                    <h6><ProductVendors id={props} /></h6>

                                </TabPane>
                                <TabPane tabId="3" id="arrow-contact">

                                    <h6><OrderHistory /></h6>
                                    
                                </TabPane>
                                <TabPane tabId="4" id="arrow-contact">

                                    <h6><MovementHistory /></h6>
                                </TabPane>
                                <TabPane tabId="5" id="arrow-contact">

                                    <h6><Variant products={props?.products?.variants} /></h6>

                                </TabPane>
                            </TabContent>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
    </div>
  )
}

export default TabChange