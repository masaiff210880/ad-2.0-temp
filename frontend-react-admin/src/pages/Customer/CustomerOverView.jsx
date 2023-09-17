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
import SalesOrder from '../Customer/PurchaseOrder';
import Overview from '../Customer/OverView'
import {
  getSingleCustomer as onGetSingleCustomer,
  getSalesOrderData as onGetSalesOrderData,
  getPayments as onGetPaymentsData,
  getAllCustomerActivity as onGetActivityData,
  getCustomerRmasData as onGetCustomerRmasData,
} from "../../slices/ecommerce/thunk";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import PaymentCustomer from "./PaymentCustomer";
const CustomerOverView = () => {
  const dispatch = useDispatch()
  const { id } = useParams();
  // console.log('vendorId',id)
  document.title = "Customer OverView";
  SwiperCore.use([Autoplay]);
  const [activeTab, setActiveTab] = useState("1");
  const [activityTab, setActivityTab] = useState("1");
  const [salesOrderList, setSalesOrderList] = useState([]);
  const [paymentList, setPaymentList] = useState([]);
  const [activityList, setActivityLlist] = useState([]);
  const [customerRmsList, setCustomerRmsList] = useState([])
  // const [purchaseReceiptList,setPurchaseReceiptList]= useState([]);
  // const [disburshmentList, setDisburshmentList] = useState([]);

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

  const customerOrder = createSelector(
    (state) => state.Ecommerce.customerOrder,
    (customerOrder) => customerOrder
  );

  const singleCustomerData = createSelector(
    (state) => state.Ecommerce.singleCustomer,
    (singleCustomer) => singleCustomer
  );

  const payments = createSelector(
    (state) => state.Ecommerce.payments,
    (payments) => payments
  );

  const activity = createSelector(
    (state) => state.Ecommerce.customerActivity,
    (customerActivity) => customerActivity
  );

  const customerRmsData = createSelector(
    (state) => state.Ecommerce.customerRMAs,
    (customerRMAs) => customerRMAs
  );

  const customers = useSelector(customerOrder);
  const singleCustomer = useSelector(singleCustomerData);
  const totlPayments = useSelector(payments)
  const totalactivity = useSelector(activity);
  const data = totalactivity.slice(0, 5);
  const customerRms = useSelector(customerRmsData)
  // console.log("first",customerRmsList)

  useEffect(() => {
    if (id !== undefined) {

      dispatch(onGetSingleCustomer(id))
    }
  }, [dispatch, id])

  useEffect(() => {
    if (id !== undefined) {

      dispatch(onGetPaymentsData(id))
    }
  }, [dispatch, id])

  useEffect(() => {
    if (id !== undefined) {

      dispatch(onGetSalesOrderData(id))
    }
  }, [dispatch, id])

  useEffect(() => {
    if (id !== undefined) {

      dispatch(onGetActivityData(id))
    }
  }, [dispatch, id])

  useEffect(() => {
    setSalesOrderList(customers)
  }, [customers])

  useEffect(() => {
    setPaymentList(totlPayments)
  }, [totlPayments])

  useEffect(() => {
    setActivityLlist(data)
  }, [totalactivity])

  useEffect(() => {
    if (id !== undefined) {

      dispatch(onGetCustomerRmasData(id))
    }
  }, [dispatch, id])

  useEffect(() => {
    setCustomerRmsList(customerRms)
  }, [customerRms])
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
                      src={singleCustomer?.avatar}
                      alt="user-img"
                      className="img-thumbnail rounded-circle"
                    />
                  </div>
                </div>

                <Col>
                  <div className="p-2">
                    <h3 className="text-white mb-1">{`${singleCustomer?.firstName} ${singleCustomer?.lastName}`}</h3>
                    <p className="text-white text-opacity-75">
                      { }
                    </p>
                    <div className="hstack text-white-50 gap-1">
                      <div className="me-2">
                        <i className="ri-map-pin-user-line me-1 text-white text-opacity-75 fs-16 align-middle"></i>
                        {singleCustomer?.city}{singleCustomer?.userLicenses[0].businessAddress}
                      </div>
                      <div className="me-3">
                        <i className="ri-building-line me-1 text-white text-opacity-75 fs-16 align-middle"></i>
                        {singleCustomer?.userLicenses[0].businessName || "Phantasm Digital Works"}
                      </div>
                      <div>
                        <i className=" me-2">
                          {" "}
                          {/* <img src={singleCustomer?.avatar} /> */}
                        </i>
                        {singleCustomer?.internalAccountNumber || 1001}
                      </div>
                    </div>
                  </div>
                </Col>

                <Col xs={12} className="col-lg-auto order-last order-lg-0">
                  <Row className="text text-white-50 text-center">
                    <Col lg={6} xs={4}>
                      <div className="p-2" style={{ background: "#019EF7", width: "7vw" }}>
                        <h4 className="text-white mb-1">${singleCustomer?.balanceAmount || 8900}</h4>
                        <p className="fs-14 mb-0 text-white">Payment Dues</p>
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
                            Sales Orders
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
                            Sales Invoice
                          </span>
                        </NavLink>
                      </NavItem>
                      {/* <NavItem className="fs-14">
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
                      </NavItem> */}
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
                          href="#payment"
                          className={classnames({ active: activeTab === "7" })}
                          onClick={() => {
                            toggleTab("7");
                          }}
                        >
                          <i className="ri-list-unordered d-inline-block d-md-none"></i>{" "}
                          <span className="d-none d-md-inline-block">
                            Payment
                          </span>
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
                            Activity
                          </span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                    <div className="flex-shrink-0">
                      <Link
                        to="/pages-profile-settings"
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
                          <Overview singleCustomer={singleCustomer || null} salesOrderList={salesOrderList || []} activity={activityList || []} />
                        </CardBody>
                      </Card>
                    </TabPane>

                    {/* 2nd tab */}
                    <TabPane tabId="2">
                      <Card>
                        <CardBody>
                          <SalesOrder
                            salesOrder={salesOrderList || []}
                          />
                        </CardBody>
                      </Card>
                    </TabPane>

                    {/* 3rd tab */}
                    <TabPane tabId="3">
                      <Card>
                        <CardBody>
                          <PurchaseReceipts
                          // data={purchaseReceiptList||[]} 
                          />
                        </CardBody>
                      </Card>
                    </TabPane>

                    {/* 4th tab */}
                    {/* <TabPane tabId="4">
                      <Card>
                        <CardBody>
                          <Disbursements 
                          // data={disburshmentList || []}
                          />
                        </CardBody>
                      </Card>
                    </TabPane> */}

                    {/* 5 th tab */}
                    <TabPane tabId="5">
                      <Card>
                        <CardBody>
                          <RMas customerRmsList={customerRmsList || []} />
                        </CardBody>
                      </Card>
                    </TabPane>

                    {/* 6th tab */}
                    <TabPane tabId="6">
                      <Card>
                        <CardBody>
                          <Activity activity={activityList || []} />
                        </CardBody>
                      </Card>
                    </TabPane>

                    <TabPane tabId="7">
                      <Card>
                        <CardBody>
                          <PaymentCustomer paymentList={paymentList || []} />
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

export default CustomerOverView;
