

import React from "react";
import style from "../../styles/sales/Salesfinallist.module.css";
import SearchOption from "../../Components/Common/SearchOption";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Col,
  Input,
  Label,
  Row,
  CardHeader,
  TabContent,
  TabPane,
  ButtonGroup,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
  Container,
} from "reactstrap";
import calender from "../../assets/images/flags/calender.svg";
// import dummy_img from "../../../src/assets/images/products/small_dummy.svg";
import lock from "../../assets/images/flags/lock.svg";

import { Table } from "react-bootstrap";
import { useState } from "react";
// import CommonDiv from "./CoomonDiv";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import Commondiv from "./Commomdiv";
// import CommonDiv from "../Vendors/CommonDiv";
const SalesFinalScreen = ({ rowData }) => {
  const handleInvoice = () => {
    window.print();
  };

  const [customActiveTab, setcustomActiveTab] = useState("1");
  const toggleCustom = (tab) => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };
  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="SalesOrder" pageTitle="Salesorder List" belong="Salesorder" />

        <div>
          <Row>
            <Col lg={4}>
              <Card>
                <CardHeader>
                  <div className="navbar-header " style={{ display: "flex", gap: "15px" }}>
                    <div className="d-flex">
                      <SearchOption />
                      <button
                        type="button"
                        className="btn btn-success "
                        style={{
                          width: "120px",
                          height: "36px",
                          position: "relative",
                          top: "16.5px",
                          left: "8px",


                        }}
                      >
                        <i className="ri-filter-2-fill me-1 align-middle ri-xl"></i>{" "}
                        Filter
                      </button>
                    </div>

                    <div className="col-sm-auto ms-auto" >
                      <div>
                        <Link
                          to="#"
                          className="btn btn-success bg_add_product"
                        >
                          <i
                            className="ri-add-line align-bottom me-1"
                            style={{}}
                          ></i>
                          New
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="listjs-table" id="customerList">
                    <div
                      className={`table-responsive table-card mt-1 mb-1 ${style.responsiveTable}`}
                      style={{ overflowX: "auto" }}
                    >
                      <table
                        className={`table align-middle table-nowrap ${style.table}`}
                        id="customerTable"
                      >
                        <thead className={`table-light ${style.head}`}>
                        </thead>
                        <tbody
                          className="list form-check-all"
                          style={{ height: "70px" }}
                        >
                          <tr>
                            <th scope="row">
                              <div className="form-check">
                                <input
                                  className={`form-check-input ${style.checkbox}`}
                                  type="checkbox"
                                  name="chk_child"
                                  value="option1"
                                />
                              </div>
                            </th>
                            <td className={style.customer}>
                              <h1>PO-00001</h1>
                              <div className={style.cal_div}>
                                <div className={style.cal}>
                                  <img
                                    src={calender}
                                    alt="calender"
                                    width={"100%"}
                                  />
                                  <h1>02nd Jan</h1>
                                </div>
                                <div className={style.cal}>
                                  <img
                                    src={calender}
                                    alt="calender"
                                    width={"100%"}
                                  />
                                  <h1>5.00 pm</h1>
                                </div>
                              </div>
                            </td>
                            <td className={style.ordertext}></td>
                            <td></td>
                            <td className={style.money}>
                              <h1>$ 600.00</h1>
                              <span className="badge bg-info-subtle text-info text-uppercase">
                                open
                              </span>
                            </td>
                          </tr>
                        </tbody>

                        <tbody
                          className="list form-check-all"
                          style={{ height: "70px" }}
                        >
                          <tr>
                            <th scope="row">
                              <div className="form-check">
                                <input
                                  className={`form-check-input ${style.checkbox}`}
                                  type="checkbox"
                                  name="chk_child"
                                  value="option1"
                                />
                              </div>
                            </th>
                            <td className={style.customer}>
                              <h1>PO-00001</h1>
                              <div className={style.cal_div}>
                                <div className={style.cal}>
                                  <img
                                    src={calender}
                                    alt="calender"
                                    width={"100%"}
                                  />
                                  <h1>02nd Jan</h1>
                                </div>
                                <div className={style.cal}>
                                  <img
                                    src={calender}
                                    alt="calender"
                                    width={"100%"}
                                  />
                                  <h1>5.00 pm</h1>
                                </div>
                              </div>
                            </td>
                            <td className={style.ordertext}></td>
                            <td></td>
                            <td className={style.money}>
                              <h1>$ 600.00</h1>
                              <span className="badge bg-info-subtle text-info text-uppercase">
                                open
                              </span>
                            </td>
                          </tr>
                        </tbody>

                        <tbody
                          className="list form-check-all"
                          style={{ height: "70px" }}
                        >
                          <tr>
                            <th scope="row">
                              <div className="form-check">
                                <input
                                  className={`form-check-input ${style.checkbox}`}
                                  type="checkbox"
                                  name="chk_child"
                                  value="option1"
                                />
                              </div>
                            </th>
                            <td className={style.customer}>
                              <h1>PO-00001</h1>
                              <div className={style.cal_div}>
                                <div className={style.cal}>
                                  <img
                                    src={calender}
                                    alt="calender"
                                    width={"100%"}
                                  />
                                  <h1>02nd Jan</h1>
                                </div>
                                <div className={style.cal}>
                                  <img
                                    src={calender}
                                    alt="calender"
                                    width={"100%"}
                                  />
                                  <h1>5.00 pm</h1>
                                </div>
                              </div>
                            </td>
                            <td className={style.ordertext}></td>
                            <td></td>
                            <td className={style.money}>
                              <h1>$ 600.00</h1>
                              <span className="badge bg-info-subtle text-info text-uppercase">
                                open
                              </span>
                            </td>
                          </tr>
                        </tbody>

                        <tbody
                          className="list form-check-all"
                          style={{ height: "70px" }}
                        >
                          <tr>
                            <th scope="row">
                              <div className="form-check">
                                <input
                                  className={`form-check-input ${style.checkbox}`}
                                  type="checkbox"
                                  name="chk_child"
                                  value="option1"
                                />
                              </div>
                            </th>
                            <td className={style.customer}>
                              <h1>PO-00001</h1>
                              <div className={style.cal_div}>
                                <div className={style.cal}>
                                  <img
                                    src={calender}
                                    alt="calender"
                                    width={"100%"}
                                  />
                                  <h1>02nd Jan</h1>
                                </div>
                                <div className={style.cal}>
                                  <img
                                    src={calender}
                                    alt="calender"
                                    width={"100%"}
                                  />
                                  <h1>5.00 pm</h1>
                                </div>
                              </div>
                            </td>
                            <td className={style.ordertext}></td>
                            <td></td>
                            <td className={style.money}>
                              <h1>$ 600.00</h1>
                              <span className="badge bg-info-subtle text-info text-uppercase">
                                open
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col lg={8}>
              <Card>
                <CardHeader
                  style={{
                    // display: "flex",
                    // justifyContent: "space-between",
                    // justifyItems: "center",
                    // marginTop: "13.5px",
                  }}
                >
                  {/*  */}

                  <div className="layout-width">
                    <div className="navbar-header">
                      <div className="d-flex">
                        <SearchOption />
                        <button
                          type="button"
                          className="btn btn-success "
                          style={{
                            width: "120px",
                            height: "36px",
                            position: "relative",
                            top: "16.5px",
                            left: "8px",


                          }}
                        >
                          <i className="ri-filter-2-fill me-1 align-middle ri-xl"></i>{" "}
                          Filter
                        </button>
                      </div>

                      <div className="d-flex align-items-center">
                        <div className="col-sm-auto ms-auto">
                          <div>
                            <Link
                              to="/add-product"
                              className="btn btn-success bg_add_product"
                            >
                              <i className="ri-add-line align-bottom me-1" style={{}}></i>
                              Add New

                            </Link>
                          </div>
                        </div>
                        {/* <ProductsGlobalFilter /> */}
                      </div>
                    </div>

                    <div>
                      <Commondiv />
                    </div>
                  </div>
                  {/*  */}
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col md={6}>
                      {/* <div className="address-div d-flex justify-content-end"> */}
                      <div className="d-flex flex-column align-items-start mx-3">
                        <div>

                          <h6 className="text-muted text-uppercase fw-semibold mb-3">
                            Bill To
                          </h6>
                          <p className="fw-medium mb-2" id="billing-name">Mr. Raj Patel</p>
                          <p className="fw-medium mb-2" id="billing-address-line-1">Pitt Discount Smoke V Shubh Investment</p>
                          <p className="fw-medium mb-2"><span id="billing-phone-no">2707 B N Broadway Street</span></p>
                          <p className="fw-medium mb-2"><span id="billing-tax-no">Pittisburg KS 66762</span></p>
                        </div>

                        <div>
                          <h6 className="text-muted text-uppercase fw-semibold mb-3 mt-3">
                            Ship To
                          </h6>
                          <p className="fw-medium mb-2" id="shipping-name">Mr. Raj Patel</p>
                          <p className="fw-medium mb-2" id="shipping-address-line-1">Pitt Discount Smoke V Shubh Investment </p>
                          <p className="fw-medium mb-2"><span id="shipping-phone-no">2707 B N Broadway Street</span></p>
                          <p className="fw-medium mb-2"><span id="billing-tax-no">Pittisburg KS 66762</span></p>
                        </div>
                      </div>
                      {/* </div> */}
                    </Col>

                    <Col md={6}>
                      <div className="address-div d-flex justify-content-end">
                        <div className="d-flex flex-column align-items-end">
                          <div>

                            <Row className="mb-3 ">
                              {/* <Col> */}
                              {/* <Card className="mx-3"> */}
                              {/* <CardBody> */}


                              <Col lg={3} >
                                <Label htmlFor="nameInput" className="form-label">Invoice Terms</Label>
                              </Col>
                              <Col lg={9} >
                                <select className="form-select py-2 px-3 mb-3" data-choices data-choices-sorting="true" id="specificSizeSelect">
                                  <option >XXXXXXXX</option>
                                  <option defaultValue="1">One</option>
                                  <option defaultValue="2">Two</option>
                                  <option defaultValue="3">Three</option>
                                </select>
                              </Col>
                              <Col lg={3} >
                                <Label htmlFor="nameInput" className="form-label">Ship VIA</Label>
                              </Col>
                              <Col lg={9} >
                                <select className="form-select py-2 px-3 mb-3" data-choices data-choices-sorting="true" id="specificSizeSelect">
                                  <option >XXXX</option>
                                  <option defaultValue="1">One</option>
                                  <option defaultValue="2">Two</option>
                                  <option defaultValue="3">Three</option>
                                </select>
                              </Col>
                              <Col lg={3} >
                                <Label htmlFor="nameInput" className="form-label">Fill By</Label>
                              </Col>
                              <Col lg={9} >
                                <select className="form-select py-2 px-3 mb-3 ml-3" data-choices data-choices-sorting="true" id="specificSizeSelect">
                                  <option >8/26/2023</option>
                                  <option defaultValue="1">One</option>
                                  <option defaultValue="2">Two</option>
                                  <option defaultValue="3">Three</option>
                                </select>
                              </Col>
                              {/* </CardBody> */}
                              {/* </Card> */}
                              {/* </Col> */}


                              <Col>
                                <Card className="mb-3 mt-2 mx-3">
                                  <CardBody>
                                    <div className="table-card">
                                      <table className="table mb-0">
                                        <tbody>
                                          <tr>
                                            <td className="fw-medium">Rep.</td>
                                            <td className="text-start">XXXXXX</td>
                                          </tr>
                                          <tr>
                                            <td className="fw-medium">Tax Code</td>
                                            <td>OS</td>
                                          </tr>
                                          <tr>
                                            <td className="fw-medium">P.O. Number</td>
                                            <td>PO-0001</td>
                                          </tr>

                                        </tbody>
                                      </table>
                                    </div>
                                  </CardBody>
                                </Card>
                              </Col>
                            </Row>
                          </div>
                        </div>
                      </div>
                    </Col>

                    <Col lg={12}>
                      <CardBody>
                        <div className="table-responsive">
                          <Table className="table-bordered align-middle table-nowrap mb-0">
                            <thead>
                              <tr>
                                <th scope="col">Item Code</th>
                                <th scope="col">Description</th>
                                <th scope="col">Status</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">UM</th>
                                <th scope="col">Filled</th>
                                <th scope="col">Unit Price</th>
                                <th scope="col">Extended Price</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr style={{ height: "60px" }}>
                                <td className="fw-medium">D8flight12344</td>
                                <td>D8 FLIGHT DELTA 8 HEAVY HITTERS</td>
                                <td>
                                  <div>
                                    <img src={lock} alt="redcross" width={"13px"} height={"13px"} />
                                    Locked
                                  </div>
                                </td>
                                <td>50</td>
                                <td>EA</td>
                                <td>0</td>

                                <td>9.49</td>

                                <td>56.94</td>
                              </tr>
                              <tr style={{ height: "60px" }}>
                                <td className="fw-medium">D8flight12344</td>
                                <td>FUNKY REPUBLIC Ti7000 5% DISPO</td>
                                <td>
                                  <div>
                                    <img src={lock} alt="redcross" width={"13px"} height={"13px"} />
                                    Locked
                                  </div>
                                </td>
                                <td>50</td>
                                <td>EA</td>
                                <td>0</td>

                                <td>9.49</td>

                                <td>56.94</td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                      </CardBody>
                    </Col>

                    {/* <Col> */}
                    {/* <Row> */}
                    <CardBody>
                      <Row>
                        <Col md={6}>
                          <div className="mt-4">
                            {/* pCost Div */}
                            <div style={{ display: "flex", marginLeft: "33.5px", gap: "60px" }}>
                              <p>Piece Count</p>
                              <div className={style.pieceCountDiv}>0</div>
                            </div>
                            <br />
                            <div style={{ display: "flex", marginLeft: "33.5px", gap: "72px" }}>
                              <p>Employee:</p>
                              <div className={style.pieceCountDiv}>0</div>
                            </div>
                            <br />
                            <div style={{ display: "flex", marginLeft: "33.5px", gap: "95px" }}>
                              <p>Memo:</p>
                              <div className={style.pieceL2CountDiv}>0</div>
                            </div>
                            <br />

                          </div>
                        </Col>

                        <Col md={6}>
                          <div className="table-responsive mx-3">
                            {/* <table className="table table-nowrap align-middle table-borderless mb-0">
                                          <tbody> */}
                            {/* <tr className="border-top border-top-dashed">
                                        <td colSpan="3"></td>
                                        <td colSpan="2" className="fw-medium p-0"> */}
                            <table className="table table-borderless mb-0">
                              <tbody>
                                <tr>
                                  <td>Sub Total</td>
                                  <td className="text-end">$359.96</td>
                                </tr>
                                <tr>
                                  <td>
                                    Freight{" "}
                                    {" "}

                                  </td>
                                  <td className="text-end">-$53.99</td>
                                </tr>
                                <tr>
                                  <td>Taxes</td>
                                  <td className="text-end">$65.00</td>
                                </tr>
                                <tr>
                                  <td>Total Due</td>
                                  <td className="text-end">$44.99</td>
                                </tr>
                                <tr className="border-top border-top-dashed">
                                  <th scope="row">Balance Due</th>
                                  <th className="text-end">$415.96</th>
                                </tr>
                              </tbody>
                            </table>
                            {/* </td>
                                      </tr> */}
                            {/* </tbody>
                                        </table> */}
                          </div>
                        </Col>
                      </Row>

                    </CardBody>
                    {/* </Row> */}
                    {/* </Col> */}
                  </Row>
                </CardBody>
              </Card>
            </Col>


          </Row>

          <Link to="/vendor" className="btn btn-primary">
            Back
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default SalesFinalScreen;

