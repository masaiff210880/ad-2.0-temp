import React, { useState } from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Input,
  Button,
} from "reactstrap";
import SearchHeaderTab from "./SearchHeaderTab";
import style from "../../../src/assets/scss/config/ProductDetails.module.css";
import line from "../../assets/productIcon/Line.svg";
import rArr from "../../assets/productIcon/rArr.svg";
import Line2 from "../../assets/productIcon/Line2.svg";
import doubleArr from "../../assets/productIcon/doubleArr.svg";

import {
  ButtonGroup,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Table,
  UncontrolledDropdown,
} from "reactstrap";
import classnames from "classnames";
import { Link } from "react-router-dom";

const Overview = (props) => {
  const favouriteBtn = (ele) => {
    if (ele.closest("button").classList.contains("active")) {
      ele.closest("button").classList.remove("active");
    } else {
      ele.closest("button").classList.add("active");
    }
  };

  const [customActiveTab, setcustomActiveTab] = useState("1");
  const toggleCustom = (tab) => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };

  const { data } = props;

  // console.log("this is props", props);
  // console.log( "single",data);
  const [isClicked, setIsClicked] = useState(false);
  const [isClicked1, setIsClicked1] = useState(false);
  const [isClicked2, setIsClicked2] = useState(false);
  const [isClicked3, setIsClicked3] = useState(false);

  const [isClicked4, setIsClicked4] = useState(false);
  const [isClicked5, setIsClicked5] = useState(false);
  const [isClicked6, setIsClicked6] = useState(false);
  const [isClicked7, setIsClicked7] = useState(false);

  const toggleClick = () => {
    setIsClicked(!isClicked);
  };
  const toggleClick1 = () => {
    setIsClicked1(!isClicked1);
  };
  const toggleClick2 = () => {
    setIsClicked2(!isClicked2);
  };
  const toggleClick3 = () => {
    setIsClicked3(!isClicked3);
  };
  const toggleClick4 = () => {
    setIsClicked4(!isClicked4);
  };
  const toggleClick5 = () => {
    setIsClicked5(!isClicked5);
  };
  const toggleClick6 = () => {
    setIsClicked6(!isClicked6);
  };
  const toggleClick7 = () => {
    setIsClicked7(!isClicked7);
  };

  // const [productList, setproductList] = useState();
  // const assigned = productList.map((item) => item.total);
  // let subTotal = 0;
  // for (let i = 0; i < assigned.length; i++) {
  //   subTotal += Math.round(assigned[i]);
  // }

  return (
    <>
      <div>
        {/* Tab Search Header */}
        <SearchHeaderTab />

        {/* Table below  */}
      </div>
      <div
        className="table-responsive"
        style={{
          overflowX: "hidden",
          borderTop: " 1px solid  #4DAFE640",
          borderBottom: " 1px solid #4DAFE640",
        }}
      >
        <Table className="table-bordered align-middle table-nowrap mb-0" style={{overflow:"hidden"}}>
          <thead>
            <tr>
              <th scope="col" className={style.tableText}>
                {data?.handsOnQuantity || 100} <br />
                <span className={style.subTabText}>Quantity on Hand</span>
              </th>
              <th scope="col" className={style.tableText}>
                {data?.stock_quantity && 100} <br />
                <span className={style.subTabText}>Quantity Available</span>
              </th>
              <th scope="col" className={style.tableText}>
                {data?.upcomingQuantity || 100} <br />
                <span className={style.subTabText}>Quantity Upcoming</span>
              </th>

              <th scope="col" className={style.subTabTextL}>
                Location <br />
                <span className={style.subTabTextQ}>Quantity</span>
              </th>
              <th scope="col">
                <ButtonGroup>
                  <UncontrolledDropdown
                    style={{ marginBottom: "80px", marginLeft: "15px" }}
                  >
                    <DropdownToggle tag="button" className="btn btn-light">
                      Location<i className="mdi mdi-chevron-down"></i>
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-lg-end" end={true}>
                      <DropdownItem>Menu item</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </ButtonGroup>
                <span className={style.subTabTextNum}>15</span>
              </th>
            </tr>
          </thead>
        </Table>
      </div>
      <div>
        <Col lg={12} sm={6} style={{ display: "flex"}}>
          <Card className={style.cardStyle}>
            <CardBody>
              <Row>
                <Col>
                  <div className="product-content mt-5">
                    <h5 className="fs-14 mb-3" style={{ fontWeight: "bold" }}>
                      {" "}
                      Pricing & Cost{" "}
                    </h5>
                    <Nav tabs className="nav-tabs-custom nav-primary">
                      <NavItem>
                        <NavLink
                          style={{
                            cursor: "pointer",
                            fontWeight:
                              customActiveTab === "1" ? "bold" : "normal", // Set the font-weight to "bold" when active
                            color:
                              customActiveTab === "1" ? "#2F4C8F" : "black", // Change the color when active
                          }}
                          className={classnames({
                            active: customActiveTab === "1",
                          })}
                          onClick={() => {
                            toggleCustom("1");
                          }}
                        >
                          Normal
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          style={{
                            cursor: "pointer",
                            fontWeight:
                              customActiveTab === "2" ? "bold" : "normal", // Set the font-weight to "bold" when active
                            color:
                              customActiveTab === "2" ? "#2F4C8F" : "black", // Change the color when active
                          }}
                          onClick={() => {
                            toggleCustom("2");
                          }}
                        >
                          Advanced
                        </NavLink>
                      </NavItem>
                    </Nav>

                    <TabContent
                      activeTab={customActiveTab}
                      className="border border-top-0 p-4"
                      id="nav-tabContent"
                    >
                      <TabPane id="nav-speci" tabId="1">
                        <div style={{ display: "flex" }}>
                          <div
                            className="table-responsive"
                            style={{ display: "flex" }}
                          >
                            <div>
                              <form>
                                <div className={style.advHeading}>
                                  <label
                                    className="form-label"
                                    htmlFor="exampleDropdownFormEmail"
                                  >
                                    PRICING SCHEME
                                  </label>
                                </div>
                                <div className={style.normalDivStyle1}>
                                  <label
                                    className="form-label"
                                    htmlFor="exampleDropdownFormEmail"
                                  >
                                    Unit Average Cost
                                  </label>
                                </div>
                                <div className={style.normalDivStyle1}>
                                  <label
                                    className="form-label"
                                    htmlFor="exampleDropdownFormEmail"
                                  >
                                    Unit Last Cost
                                  </label>
                                </div>
                                <div className={style.normalDivStyle1}>
                                  <label
                                    className="form-label"
                                    htmlFor="exampleDropdownFormEmail"
                                  >
                                    Lowest Selling Price
                                  </label>
                                </div>
                                <div className={style.normalDivStyle1}>
                                  <label
                                    className="form-label"
                                    htmlFor="exampleDropdownFormEmail"
                                  >
                                    Suggested Retail Price
                                  </label>
                                </div>
                                <div className={style.normalDivStyle1}>
                                  <label
                                    className="form-label"
                                    htmlFor="exampleDropdownFormEmail"
                                  >
                                    Web Sale Price
                                  </label>
                                </div>
                              </form>
                            </div>

                            <div style={{ display: "flex" }}>
                              <div
                                style={{
                                  marginLeft: "165px",
                                  marginTop: "2px",
                                }}
                              >
                                <form>
                                  <div>
                                    <label
                                      className="form-label"
                                      htmlFor="exampleDropdownFormEmail"
                                    >
                                      MARKUP
                                    </label>
                                    <Input
                                      type="text"
                                      style={{
                                        width: "60%",
                                        marginBottom: "10px",
                                        marginTop: "5px",
                                      }}
                                      className="form-control"
                                      id="exampleDropdownFormEmail"
                                      placeholder=""
                                    />
                                  </div>
                                  <div>
                                    <Input
                                      type="text"
                                      style={{
                                        width: "60%",
                                        marginBottom: "10px",
                                        marginTop: "5px",
                                      }}
                                      className="form-control"
                                      id="exampleDropdownFormEmail"
                                      placeholder=""
                                    />
                                  </div>
                                  <div>
                                    <Input
                                      type="text"
                                      style={{
                                        width: "60%",
                                        marginBottom: "10px",
                                        marginTop: "5px",
                                      }}
                                      className="form-control"
                                      id="exampleDropdownFormEmail"
                                      placeholder=""
                                    />
                                  </div>
                                  <div>
                                    <Input
                                      type="text"
                                      style={{
                                        width: "60%",
                                        marginBottom: "10px",
                                        marginTop: "5px",
                                      }}
                                      className="form-control"
                                      id="exampleDropdownFormEmail"
                                      placeholder=""
                                    />
                                  </div>
                                  <div>
                                    <Input
                                      type="text"
                                      style={{
                                        width: "60%",
                                        marginBottom: "10px",
                                        marginTop: "5px",
                                      }}
                                      className="form-control"
                                      id="exampleDropdownFormEmail"
                                      placeholder=""
                                    />
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                          <div
                            className="table-responsive"
                            style={{ display: "flex", overflow: "hidden" }}
                          >
                            <div>
                              <form>
                                <div className={style.advHeading}>
                                  <label
                                    className="form-label"
                                    htmlFor="exampleDropdownFormEmail"
                                    style={{ whiteSpace: "nowrap" }}
                                  >
                                    PRICING SCHEME
                                  </label>
                                </div>
                                <div className={style.normalDivStyle1}>
                                  <label
                                    className="form-label"
                                    htmlFor="exampleDropdownFormEmail"
                                  >
                                    Silver
                                  </label>
                                </div>
                                <div className={style.normalDivStyle1}>
                                  <label
                                    className="form-label"
                                    htmlFor="exampleDropdownFormEmail"
                                  >
                                    Gold
                                  </label>
                                </div>
                                <div className={style.normalDivStyle1}>
                                  <label
                                    className="form-label"
                                    htmlFor="exampleDropdownFormEmail"
                                  >
                                    Platinum
                                  </label>
                                </div>
                                <div className={style.normalDivStyle3}>
                                  <label
                                    className="form-label"
                                    htmlFor="exampleDropdownFormEmail"
                                  >
                                    Price Calculation
                                  </label>
                                </div>
                                <div className={style.normalDivStyle1}>
                                  <label
                                    className="form-label"
                                    htmlFor="exampleDropdownFormEmail"
                                  >
                                    Price Rounded
                                  </label>
                                </div>
                              </form>
                            </div>

                            <div style={{ display: "flex" }}>
                              <div
                                style={{ marginLeft: "50px", marginTop: "2px" }}
                              >
                                <form>
                                  <div>
                                    <label
                                      className="form-label"
                                      htmlFor="exampleDropdownFormEmail"
                                    >
                                      MARKUP
                                    </label>
                                    <Input
                                      type="text"
                                      style={{
                                        width: "60%",
                                        marginBottom: "10px",
                                        marginTop: "5px",
                                      }}
                                      className="form-control"
                                      id="exampleDropdownFormEmail"
                                      placeholder=""
                                    />
                                  </div>
                                  <div>
                                    <Input
                                      type="text"
                                      style={{
                                        width: "60%",
                                        marginBottom: "10px",
                                        marginTop: "5px",
                                      }}
                                      className="form-control"
                                      id="exampleDropdownFormEmail"
                                      placeholder=""
                                    />
                                  </div>
                                  <div>
                                    <Input
                                      type="text"
                                      style={{
                                        width: "60%",
                                        marginBottom: "10px",
                                        marginTop: "5px",
                                      }}
                                      className="form-control"
                                      id="exampleDropdownFormEmail"
                                      placeholder=""
                                    />
                                  </div>
                                </form>
                                <div className={style.dropdownCal1}>
                                  <ButtonGroup>
                                    <UncontrolledDropdown className="me-1">
                                      <DropdownToggle
                                        tag="button"
                                        className="btn btn-light"
                                        style={{ width: "180px" }}
                                      >
                                        <i
                                          className="mdi mdi-chevron-down"
                                          style={{
                                            display: "flex",
                                            justifyContent: "end",
                                          }}
                                        ></i>
                                      </DropdownToggle>
                                      <DropdownMenu
                                        className="dropdown-menu-lg-"
                                        end={true}
                                      >
                                        <DropdownItem>Fixed Price</DropdownItem>
                                        <DropdownItem>
                                          Markup Percentage
                                        </DropdownItem>
                                        <DropdownItem>
                                          Margin Percentage
                                        </DropdownItem>
                                        <DropdownItem>
                                          Fixed Percentage
                                        </DropdownItem>
                                        <DropdownItem>
                                          Reduction Amount
                                        </DropdownItem>
                                      </DropdownMenu>
                                    </UncontrolledDropdown>
                                  </ButtonGroup>
                                </div>
                                <div className={style.dropdownCal1}>
                                  <ButtonGroup>
                                    <UncontrolledDropdown className="me-1">
                                      <DropdownToggle
                                        tag="button"
                                        className="btn btn-light"
                                        style={{ width: "180px" }}
                                      >
                                        <i
                                          className="mdi mdi-chevron-down"
                                          style={{
                                            display: "flex",
                                            justifyContent: "end",
                                          }}
                                        ></i>
                                      </DropdownToggle>
                                      <DropdownMenu
                                        className="dropdown-menu-lg-"
                                        end={true}
                                      >
                                        <DropdownItem>Rounded</DropdownItem>
                                        <DropdownItem>Not Rounded</DropdownItem>
                                      </DropdownMenu>
                                    </UncontrolledDropdown>
                                  </ButtonGroup>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabPane>
                      <TabPane id="nav-detail" tabId="2">
                        <div style={{ display: "flex" }}>
                          <div
                            className="table-responsive"
                            style={{ display: "flex" }}
                          >
                            <div>
                              <form>
                                <div className={style.advHeading}>
                                  <label
                                    className="form-label"
                                    htmlFor="exampleDropdownFormEmail"
                                  >
                                    PRICING SCHEME
                                  </label>
                                </div>
                                <div className={style.normalDivStyle1}>
                                  <label
                                    className="form-label"
                                    htmlFor="exampleDropdownFormEmail"
                                  >
                                    Unit Average Cost
                                  </label>
                                </div>
                                <div className={style.normalDivStyle1}>
                                  <label
                                    className="form-label"
                                    htmlFor="exampleDropdownFormEmail"
                                  >
                                    Unit Last Cost
                                  </label>
                                </div>
                                <div className={style.normalDivStyle1}>
                                  <label
                                    className="form-label"
                                    htmlFor="exampleDropdownFormEmail"
                                  >
                                    Lowest Selling Price
                                  </label>
                                </div>
                                <div className={style.normalDivStyle1}>
                                  <label
                                    className="form-label"
                                    htmlFor="exampleDropdownFormEmail"
                                  >
                                    Suggested Retail Price
                                  </label>
                                </div>
                                <div className={style.normalDivStyle1}>
                                  <label
                                    className="form-label"
                                    htmlFor="exampleDropdownFormEmail"
                                  >
                                    Web Sale Price
                                  </label>
                                </div>
                              </form>
                            </div>

                            <div style={{ display: "flex" }}>
                              <div className={style.perDollarBtn}>
                                <Button
                                  style={{
                                    marginBottom: "8px",
                                    backgroundColor: "#2F4C8F",
                                    border: "none",
                                    fontWeight: "bold",
                                    backgroundColor: isClicked
                                      ? "#2F4C8F"
                                      : "#FAF9F6",
                                  }}
                                  outline
                                  className={`custom-toggle ${
                                    isClicked ? "active" : ""
                                  }`}
                                  onClick={toggleClick}
                                >
                                  <span className="icon-on">%</span>
                                  <span className="icon-off">$</span>
                                </Button>
                                <br />
                                <Button
                                  style={{
                                    marginBottom: "8px",
                                    backgroundColor: "#2F4C8F",
                                    border: "none",
                                    fontWeight: "bold",
                                    backgroundColor: isClicked1
                                      ? "#2F4C8F"
                                      : "#FAF9F6",
                                  }}
                                  outline
                                  className={`custom-toggle ${
                                    isClicked1 ? "active" : ""
                                  }`}
                                  onClick={toggleClick1}
                                >
                                  <span className="icon-on">%</span>
                                  <span className="icon-off">$</span>
                                </Button>
                                <br />
                                <Button
                                  style={{
                                    marginBottom: "8px",
                                    backgroundColor: "#2F4C8F",
                                    border: "none",
                                    fontWeight: "bold",
                                    backgroundColor: isClicked2
                                      ? "#2F4C8F"
                                      : "#FAF9F6",
                                  }}
                                  outline
                                  className={`custom-toggle ${
                                    isClicked2 ? "active" : ""
                                  }`}
                                  onClick={toggleClick2}
                                >
                                  <span className="icon-on">%</span>
                                  <span className="icon-off">$</span>
                                </Button>
                                <br />
                                <Button
                                  style={{
                                    marginBottom: "8px",
                                    backgroundColor: "#2F4C8F",
                                    border: "none",
                                    fontWeight: "bold",
                                    backgroundColor: isClicked3
                                      ? "#2F4C8F"
                                      : "#FAF9F6",
                                  }}
                                  outline
                                  className={`custom-toggle ${
                                    isClicked3 ? "active" : ""
                                  }`}
                                  onClick={toggleClick3}
                                >
                                  <span className="icon-on">%</span>
                                  <span className="icon-off">$</span>
                                </Button>
                                <br />
                                <Button
                                  style={{
                                    marginBottom: "8px",
                                    backgroundColor: "#2F4C8F",
                                    border: "none",
                                    fontWeight: "bold",
                                    backgroundColor: isClicked4
                                      ? "#2F4C8F"
                                      : "#FAF9F6",
                                  }}
                                  outline
                                  className={`custom-toggle ${
                                    isClicked4 ? "active" : ""
                                  }`}
                                  onClick={toggleClick4}
                                >
                                  <span className="icon-on">%</span>
                                  <span className="icon-off">$</span>
                                </Button>
                              </div>

                              <div
                                style={{
                                  marginLeft: "10px",
                                  marginTop: "1.5px",
                                }}
                              >
                                <form>
                                  <div>
                                    <label
                                      className="form-label"
                                      htmlFor="exampleDropdownFormEmail"
                                    >
                                      MARKUP
                                    </label>
                                    <Input
                                      type="text"
                                      style={{
                                        width: "60%",
                                        marginBottom: "10px",
                                        marginTop: "5px",
                                      }}
                                      className="form-control"
                                      id="exampleDropdownFormEmail"
                                      placeholder=""
                                    />
                                  </div>
                                  <div>
                                    <Input
                                      type="text"
                                      style={{
                                        width: "60%",
                                        marginBottom: "10px",
                                        marginTop: "5px",
                                      }}
                                      className="form-control"
                                      id="exampleDropdownFormEmail"
                                      placeholder=""
                                    />
                                  </div>
                                  <div>
                                    <Input
                                      type="text"
                                      style={{
                                        width: "60%",
                                        marginBottom: "10px",
                                        marginTop: "5px",
                                      }}
                                      className="form-control"
                                      id="exampleDropdownFormEmail"
                                      placeholder=""
                                    />
                                  </div>
                                  <div>
                                    <Input
                                      type="text"
                                      style={{
                                        width: "60%",
                                        marginBottom: "10px",
                                        marginTop: "5px",
                                      }}
                                      className="form-control"
                                      id="exampleDropdownFormEmail"
                                      placeholder=""
                                    />
                                  </div>
                                  <div>
                                    <Input
                                      type="text"
                                      style={{
                                        width: "60%",
                                        marginBottom: "10px",
                                        marginTop: "5px",
                                      }}
                                      className="form-control"
                                      id="exampleDropdownFormEmail"
                                      placeholder=""
                                    />
                                  </div>
                                </form>
                              </div>

                              <div
                                style={{
                                  marginLeft: "10px",
                                  marginTop: "1.5px",
                                }}
                              >
                                <form>
                                  <div>
                                    <label
                                      className="form-label"
                                      htmlFor="exampleDropdownFormEmail"
                                    >
                                      Sales Price
                                    </label>
                                    <Input
                                      type="text"
                                      style={{
                                        width: "60%",
                                        marginBottom: "10px",
                                        marginTop: "5px",
                                        marginRight: "30px",
                                      }}
                                      className="form-control"
                                      id="exampleDropdownFormEmail"
                                      placeholder=""
                                    />
                                  </div>
                                  <div>
                                    <Input
                                      type="text"
                                      style={{
                                        width: "60%",
                                        marginBottom: "10px",
                                        marginTop: "5px",
                                      }}
                                      className="form-control"
                                      id="exampleDropdownFormEmail"
                                      placeholder=""
                                    />
                                  </div>
                                  <div>
                                    <Input
                                      type="text"
                                      style={{
                                        width: "60%",
                                        marginBottom: "10px",
                                        marginTop: "5px",
                                      }}
                                      className="form-control"
                                      id="exampleDropdownFormEmail"
                                      placeholder=""
                                    />
                                  </div>
                                  <div>
                                    <Input
                                      type="text"
                                      style={{
                                        width: "60%",
                                        marginBottom: "10px",
                                        marginTop: "5px",
                                      }}
                                      className="form-control"
                                      id="exampleDropdownFormEmail"
                                      placeholder=""
                                    />
                                  </div>
                                  <div>
                                    <Input
                                      type="text"
                                      style={{
                                        width: "60%",
                                        marginBottom: "10px",
                                        marginTop: "5px",
                                      }}
                                      className="form-control"
                                      id="exampleDropdownFormEmail"
                                      placeholder=""
                                    />
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                          <div
                            className="table-responsive"
                            style={{ display: "flex" }}
                          >
                            <div>
                              <form>
                                <div className={style.advHeading}>
                                  <label
                                    className="form-label"
                                    htmlFor="exampleDropdownFormEmail"
                                    style={{ whiteSpace: "nowrap" }}
                                  >
                                    PRICING SCHEME
                                  </label>
                                </div>
                                <div className={style.normalDivStyle1}>
                                  <label
                                    className="form-label"
                                    htmlFor="exampleDropdownFormEmail"
                                  >
                                    Silver
                                  </label>
                                </div>
                                <div className={style.normalDivStyle1}>
                                  <label
                                    className="form-label"
                                    htmlFor="exampleDropdownFormEmail"
                                  >
                                    Gold
                                  </label>
                                </div>
                                <div className={style.normalDivStyle1}>
                                  <label
                                    className="form-label"
                                    htmlFor="exampleDropdownFormEmail"
                                  >
                                    Platinum
                                  </label>
                                </div>
                                <div className={style.normalDivStyle3}>
                                  <label
                                    className="form-label"
                                    htmlFor="exampleDropdownFormEmail"
                                  >
                                    Price Calculation
                                  </label>
                                </div>
                                <div className={style.normalDivStyle1}>
                                  <label
                                    className="form-label"
                                    htmlFor="exampleDropdownFormEmail"
                                  >
                                    Price Rounded
                                  </label>
                                </div>
                              </form>
                            </div>

                            <div style={{ display: "flex" }}>
                              <div className={style.perDollarBtn}>
                                <Button
                                  style={{
                                    marginBottom: "8px",
                                    backgroundColor: "#2F4C8F",
                                    border: "none",
                                    fontWeight: "bold",
                                    backgroundColor: isClicked5
                                      ? "#2F4C8F"
                                      : "#FAF9F6",
                                  }}
                                  outline
                                  className={`custom-toggle ${
                                    isClicked5 ? "active" : ""
                                  }`}
                                  onClick={toggleClick5}
                                >
                                  <span className="icon-on">%</span>
                                  <span className="icon-off">$</span>
                                </Button>
                                <br />
                                <Button
                                  style={{
                                    marginBottom: "8px",
                                    backgroundColor: "#2F4C8F",
                                    border: "none",
                                    fontWeight: "bold",
                                    backgroundColor: isClicked6
                                      ? "#2F4C8F"
                                      : "#FAF9F6",
                                  }}
                                  outline
                                  className={`custom-toggle ${
                                    isClicked6 ? "active" : ""
                                  }`}
                                  onClick={toggleClick6}
                                >
                                  <span className="icon-on">%</span>
                                  <span className="icon-off">$</span>
                                </Button>
                                <br />
                                <Button
                                  style={{
                                    marginBottom: "8px",
                                    backgroundColor: "#2F4C8F",
                                    border: "none",
                                    fontWeight: "bold",
                                    backgroundColor: isClicked7
                                      ? "#2F4C8F"
                                      : "#FAF9F6",
                                  }}
                                  outline
                                  className={`custom-toggle ${
                                    isClicked7 ? "active" : ""
                                  }`}
                                  onClick={toggleClick7}
                                >
                                  <span className="icon-on">%</span>
                                  <span className="icon-off">$</span>
                                </Button>
                                <br />
                              </div>

                              <div
                                style={{
                                  marginLeft: "10px",
                                  marginTop: "1.5px",
                                }}
                              >
                                <form>
                                  <div>
                                    <label
                                      className="form-label"
                                      htmlFor="exampleDropdownFormEmail"
                                    >
                                      MARKUP
                                    </label>
                                    <Input
                                      type="text"
                                      style={{
                                        width: "60%",
                                        marginBottom: "10px",
                                        marginTop: "5px",
                                      }}
                                      className="form-control"
                                      id="exampleDropdownFormEmail"
                                      placeholder=""
                                    />
                                  </div>
                                  <div>
                                    <Input
                                      type="text"
                                      style={{
                                        width: "60%",
                                        marginBottom: "10px",
                                        marginTop: "5px",
                                      }}
                                      className="form-control"
                                      id="exampleDropdownFormEmail"
                                      placeholder=""
                                    />
                                  </div>
                                  <div>
                                    <Input
                                      type="text"
                                      style={{
                                        width: "60%",
                                        marginBottom: "10px",
                                        marginTop: "5px",
                                      }}
                                      className="form-control"
                                      id="exampleDropdownFormEmail"
                                      placeholder=""
                                    />
                                  </div>
                                </form>
                                <div className={style.dropdownCal}>
                                  <ButtonGroup>
                                    <UncontrolledDropdown className="me-1">
                                      <DropdownToggle
                                        tag="button"
                                        className="btn btn-light"
                                        style={{ width: "200px" }}
                                      >
                                        <i
                                          className="mdi mdi-chevron-down"
                                          style={{
                                            display: "flex",
                                            justifyContent: "end",
                                          }}
                                        ></i>
                                      </DropdownToggle>
                                      <DropdownMenu
                                        className="dropdown-menu-lg-"
                                        end={true}
                                      >
                                        <DropdownItem>Fixed Price</DropdownItem>
                                        <DropdownItem>
                                          Markup Percentage
                                        </DropdownItem>
                                        <DropdownItem>
                                          Margin Percentage
                                        </DropdownItem>
                                        <DropdownItem>
                                          Fixed Percentage
                                        </DropdownItem>
                                        <DropdownItem>
                                          Reduction Amount
                                        </DropdownItem>
                                      </DropdownMenu>
                                    </UncontrolledDropdown>
                                  </ButtonGroup>
                                </div>
                              </div>

                              <div
                                style={{
                                  marginLeft: "10px",
                                  marginTop: "1.5px",
                                }}
                              >
                                <form>
                                  <div>
                                    <label
                                      className="form-label"
                                      htmlFor="exampleDropdownFormEmail"
                                    >
                                      Sales Price
                                    </label>
                                    <Input
                                      type="text"
                                      style={{
                                        width: "40%",
                                        marginBottom: "10px",
                                        marginTop: "5px",
                                        marginRight: "30px",
                                      }}
                                      className="form-control"
                                      id="exampleDropdownFormEmail"
                                      placeholder=""
                                    />
                                  </div>
                                  <div>
                                    <Input
                                      type="text"
                                      style={{
                                        width: "40%",
                                        marginBottom: "10px",
                                        marginTop: "5px",
                                      }}
                                      className="form-control"
                                      id="exampleDropdownFormEmail"
                                      placeholder=""
                                    />
                                  </div>
                                  <div>
                                    <Input
                                      type="text"
                                      style={{
                                        width: "40%",
                                        marginBottom: "10px",
                                        marginTop: "5px",
                                      }}
                                      className="form-control"
                                      id="exampleDropdownFormEmail"
                                      placeholder=""
                                    />
                                  </div>
                                </form>
                                <br />
                                <div
                                  style={{
                                    marginTop: "65px",
                                    position: "relative",
                                    right: "159px",
                                  }}
                                >
                                  <ButtonGroup>
                                    <UncontrolledDropdown className="me-1">
                                      <DropdownToggle
                                        tag="button"
                                        className="btn btn-light"
                                        style={{ width: "200px" }}
                                      >
                                        <i
                                          className="mdi mdi-chevron-down"
                                          style={{
                                            display: "flex",
                                            justifyContent: "end",
                                          }}
                                        ></i>
                                      </DropdownToggle>
                                      <DropdownMenu
                                        className="dropdown-menu-lg-"
                                        end={true}
                                      >
                                        <DropdownItem>Rounded</DropdownItem>
                                        <DropdownItem>Not Rounded</DropdownItem>
                                      </DropdownMenu>
                                    </UncontrolledDropdown>
                                  </ButtonGroup>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabPane>
                    </TabContent>
                  </div>
                  <div className={style.lastDivCard}>
                    <p style={{ color: "white" }}>Cost</p>
                    <div
                      type="text"
                      className={style.inputStyleLDC}
                      placeholder="$ 0.00"
                    >
                      $ 0.00
                    </div>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
          <Col lg={8} sm={4}>
            <Card className={style.smallCardStyle}>
              <div style={{ padding: "18.86px" }}>
                <textarea
                  className="form-control"
                  placeholder="Remark"
                  rows="3"
                ></textarea>
              </div>
              <div style={{ display: "flex" }}>
                <div className="table-responsive" style={{ margin: "25px" }}>
                  <table className="table table-borderless mb-0">
                    <tbody>
                      <tr style={{ color: "#0A3E89 " }}>
                        <td>Quantity Breakdown</td>
                      </tr>
                      <img src={line} alt="" style={{ marginLeft: "8px" }} />
                      <tr>
                        <td>On Hand</td>
                        <td className="text-end" id="cart-discount">
                          100 {""}
                        </td>
                      </tr>
                      <tr>
                        <td>Reserved</td>
                        <td className="text-end" id="cart-shipping">
                          0 {""}
                        </td>
                      </tr>
                      <tr>
                        <td>Available </td>
                        <td className="text-end" id="cart-tax">
                          100{""}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="table-responsive" style={{ margin: "25px" }}>
                  <table className="table table-borderless mb-0">
                    <tbody>
                      <tr>
                        <td style={{ color: "#0A3E89 " }}>Select location</td>
                      </tr>
                      <img src={line} alt="" style={{ marginLeft: "8px" }} />
                      <img src={rArr} alt="" className={style.rArrow} />
                      <tr>
                        <td>Picked</td>
                        <td className="text-end" id="cart-discount">
                          0 {""}
                        </td>
                      </tr>
                      <tr>
                        <td>On Order</td>
                        <td className="text-end" id="cart-shipping">
                          75 {""}
                        </td>
                      </tr>
                      <tr>
                        <td>In Transit </td>
                        <td className="text-end" id="cart-tax">
                          0{""}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          </Col>
        </Col>
      </div>
      <div>
        <img src={Line2} alt="" style={{ width: "100%", marginTop: "50px" }} />
      </div>

      <div>
        <div className={style.lastStyle}>
          <h5>Reorder settings</h5>
          <button className={style.lastBtn}>
            <i className="ri-pencil-fill align-bottom"> Edit Render Settings</i>
          </button>
        </div>
        <h6 className={style.lastText}>2 locations with reorder enables</h6>
      </div>
      <div style={{ marginLeft: "30px", marginTop: "5px" }}>
        <Link to="/product-list">
          <img src={doubleArr} alt="" />
        </Link>
      </div>
    </>
  );
};

export default Overview;
