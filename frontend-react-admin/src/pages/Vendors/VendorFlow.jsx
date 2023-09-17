import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import SwiperCore, { Autoplay } from "swiper";
//Images
import avatar1 from "../../assets/images/users/avatar-1.jpg";
import style from "../../styles/products/VendorFlow.module.css";
// icons
import profile from "../../assets/vendorIcons/profileIcon.svg";
import RMas from "./RMas";
import Activity from "./Activity";
import Disbursements from "./Disbursements";
import PurchaseReceipts from "./PurchaseReceipts";
import PurchaseOrder from "./PurchaseOrder";
import OverView from "../Pages/profile/OverView";
import { getAllVendorPO as onGetAllVendorPO  , getSingleVendorData as onSingleVendorData,getPurchaseReceiptData as onGetPurchaseReceiptData, getAllDisburshmentData as onGetDisburshmentData, getAllVendorActivity as onGetActivityData} from "../../slices/ecommerce/thunk";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
const VendorFlow = () => {
  const dispatch = useDispatch()
  const {id} = useParams();
  // console.log('vendorId',id)
  document.title = "Vendor List | American Distributors";
  SwiperCore.use([Autoplay]);
  const [activeTab, setActiveTab] = useState("1");
  const [activityTab, setActivityTab] = useState("1");
  const [purchaseorderList,setPurchaseOrderList] = useState([]);
  const [purchaseReceiptList,setPurchaseReceiptList]= useState([]);
  const [disburshmentList, setDisburshmentList] = useState([]);
  const [vendoractivityList, setVendoractivityList] = useState([]);

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const toggleActivityTab = (tab) => {
    if (activityTab !== tab) {
      setActivityTab(tab);
    }
  };

  const selectedPurchaseOrder = createSelector(
    (state) => state.Ecommerce.purchaseOrder,
    (purchaseOrder) => purchaseOrder
  );

  const singleVendorData = createSelector(
    (state) => state.Ecommerce.singleVendor,
    (singleVendor) => singleVendor
  );


  const getPurchaseData = createSelector(
    (state) => state.Ecommerce.purchaseReceipt,
    (purchaseReceipt) => purchaseReceipt
  );

  const getAllDisburshmentData = createSelector(
    (state) => state.Ecommerce.disburshment,
    (disburshment) => disburshment
  );

  const activityData = createSelector(
    (state) => state.Ecommerce.vendorActivity,
    (vendorActivity) => vendorActivity
   );

  

  const purchaseData = useSelector(selectedPurchaseOrder);
  const singleVendor = useSelector(singleVendorData);
  const purchaseReceipt = useSelector(getPurchaseData)
  const disburshmentData = useSelector(getAllDisburshmentData)
  const acivityData = useSelector(activityData);

  // console.log('singleData',purchaseReceiptList)

  useEffect(()=>{
    
      dispatch(onGetAllVendorPO(id))
    
  },[dispatch])

  useEffect(()=>{
    setPurchaseOrderList(purchaseData)
  },[purchaseData])
  
  useEffect(()=>{
    setDisburshmentList(disburshmentData)
  },[disburshmentData])

  useEffect(()=>{
    setVendoractivityList(acivityData)
  },[acivityData])

  useEffect(()=>{
    if(!id===undefined){
      dispatch(onSingleVendorData(id))
    }
  },[dispatch,id])

  useEffect(()=>{
      dispatch(onGetPurchaseReceiptData(id))
  },[dispatch])

  useEffect(()=>{
    dispatch(onGetDisburshmentData(id))
},[dispatch])

  useEffect(()=>{
    setPurchaseReceiptList(purchaseReceipt)
  },[purchaseReceipt])

  useEffect(()=>{
    dispatch(onGetActivityData(id))
  },[dispatch])

  useEffect(()=>{
    setVendoractivityList(acivityData)
  },[acivityData])

// console.log("activity data", acivityData)
  return (
    <React.Fragment>
      <div className={style.bgcontainer}>
        <div className="page-content">
          <Container fluid>
            <div className="profile-foreground position-relative mx-n4 mt-n4">
              <div className={`profile-wid-bg ${style.profilebg}`}>
                {/* <img src={""} alt="" className="profile-wid-img" /> */}
              </div>
            </div>
            <div className="pt-4 mb-4 mb-lg-3 pb-lg-4">
              <Row className="g-4">
                <div className="col-auto">
                  <div className="avatar-lg">
                    <img
                      src={avatar1}
                      alt="user-img"
                      className="img-thumbnail rounded-circle"
                    />
                  </div>
                </div>

                <Col>
                  <div className="p-2">
                    <h3 className="text-white mb-1">{}</h3>
                    <p className="text-white text-opacity-75">
                      {`${singleVendor?.firstName} ${singleVendor?.lastName}`}
                    </p>
                    <div className="hstack text-white-50 gap-1">
                      <div className="me-2">
                        <i className="ri-map-pin-user-line me-1 text-white text-opacity-75 fs-16 align-middle"></i>
                        {singleVendor?.city},{singleVendor?.state},{singleVendor?.country}
                      </div>
                      <div className="me-3">
                        <i className="ri-building-line me-1 text-white text-opacity-75 fs-16 align-middle"></i>
                        { singleVendor?.companyName }
                      </div>
                      <div>
                        <i className=" me-2">
                          {" "}
                          <img src={profile} />
                        </i>
                        {singleVendor?.vendorUniqueId}
                      </div>
                    </div>
                  </div>
                </Col>

                <Col xs={12} className="col-lg-auto order-last order-lg-0">
                  <Row className="text text-white-50 text-center">
                    <Col lg={6} xs={4}>
                      <div className={`p-2 ${style.textbg}`}>
                        <h4 className="text-white mb-1">${singleVendor?.balanceAmount}</h4>
                        <p className="fs-14 mb-0 text-white">PaymentDues</p>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>

            <Row>
              <Col lg={12}>
                <div>
                  <div className="d-flex">
                    <Nav
                      pills
                      className="animation-nav profile-nav gap-2 gap-lg-3 flex-grow-1"
                      role="tablist"
                    >
                      <NavItem className="fs-14">
                        <NavLink
                          href="#overview-tab"
                          className={classnames({ active: activeTab === "1" })}
                          onClick={() => {
                            toggleTab("1");
                          }}
                        >
                          <i className="ri-airplay-fill d-inline-block d-md-none"></i>{" "}
                          <span className="d-none d-md-inline-block">
                            Overview
                          </span>
                        </NavLink>
                      </NavItem>
                      <NavItem className="fs-14"></NavItem>
                      <NavItem className="fs-14">
                        <NavLink
                          href="#purchaseorder-tab"
                          className={classnames({ active: activeTab === "2" })}
                          onClick={() => {
                            toggleTab("2");
                          }}
                        >
                          <i className="ri-airplay-fill d-inline-block d-md-none"></i>{" "}
                          <span className="d-none d-md-inline-block">
                            Purchase Orders
                          </span>
                        </NavLink>
                      </NavItem>
                      <NavItem className="fs-14">
                        <NavLink
                          href="#purchase-receipts-tab"
                          className={classnames({ active: activeTab === "3" })}
                          onClick={() => {
                            toggleTab("3");
                          }}
                        >
                          <i className="ri-airplay-fill d-inline-block d-md-none"></i>{" "}
                          <span className="d-none d-md-inline-block">
                            Purchase Receipts
                          </span>
                        </NavLink>
                      </NavItem>
                      <NavItem className="fs-14">
                        <NavLink
                          href="#disbursements-tab"
                          className={classnames({ active: activeTab === "4" })}
                          onClick={() => {
                            toggleTab("4");
                          }}
                        >
                          <i className="ri-airplay-fill d-inline-block d-md-none"></i>{" "}
                          <span className="d-none d-md-inline-block">
                            Disbursements
                          </span>
                        </NavLink>
                      </NavItem>
                      <NavItem className="fs-14">
                        <NavLink
                          href="#RMAs-tab"
                          className={classnames({ active: activeTab === "5" })}
                          onClick={() => {
                            toggleTab("5");
                          }}
                        >
                          <i className="ri-airplay-fill d-inline-block d-md-none"></i>{" "}
                          <span className="d-none d-md-inline-block">RMAs</span>
                        </NavLink>
                      </NavItem>
                      <NavItem className="fs-14">
                        <NavLink
                          href="#activities"
                          className={classnames({ active: activeTab === "6" })}
                          onClick={() => {
                            toggleTab("6");
                          }}
                        >
                          <i className="ri-list-unordered d-inline-block d-md-none"></i>{" "}
                          <span className="d-none d-md-inline-block">
                            Activities
                          </span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                    <div className="flex-shrink-0">
                      <Link
                        className={`btn btn-info ${style.editbtn}`}
                      >
                        <i className="ri-edit-box-line align-bottom"></i> Edit
                        Profile
                      </Link>
                    </div>
                  </div>

                  <TabContent activeTab={activeTab} className="pt-4">
                    {/* 1st Tab */}
                    <TabPane tabId="1">
                      <Card>
                        <CardBody className={style.vendorFlowCard}>
                          <OverView id={id} purchaseOrder={purchaseorderList||[]} vendoractivityList={vendoractivityList||[]} />
                        </CardBody>
                      </Card>
                    </TabPane>

                    {/* 2nd tab */}
                    <TabPane tabId="2">
                      <Card>
                        <CardBody>
                          <PurchaseOrder purchaseOrder={purchaseorderList || []} />
                        </CardBody>
                      </Card>
                    </TabPane>

                    {/* 3rd tab */}
                    <TabPane tabId="3">
                      <Card>
                        <CardBody>
                          <PurchaseReceipts data={purchaseReceiptList||[]} />
                        </CardBody>
                      </Card>
                    </TabPane>

                    {/* 4th tab */}
                    <TabPane tabId="4">
                      <Card>
                        <CardBody>
                          <Disbursements data={disburshmentList || []}/>
                        </CardBody>
                      </Card>
                    </TabPane>

                    {/* 5 th tab */}
                    <TabPane tabId="5">
                      <Card>
                        <CardBody>
                          <RMas />
                        </CardBody>
                      </Card>
                    </TabPane>

                    {/* 6th tab */}
                    <TabPane tabId="6">
                      <Card>
                        <CardBody>
                          <Activity vendoractivityList={vendoractivityList||[]} />
                        </CardBody>
                      </Card>
                    </TabPane>
                  </TabContent>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </React.Fragment>
  );
};

export default VendorFlow;
