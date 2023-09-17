import React from "react";
import style from "../../styles/vendor/PurchaseOrder.module.css";
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
} from "reactstrap";
import calender from "../../../src/assets/images/products/calender.svg";
import dummy_img from "../../../src/assets/images/products/small_dummy.svg";
import cart from "../../../src/assets/images/flags/cart.svg";

import { Table } from "react-bootstrap";
import { useState } from "react";
const Splitpicking = ({ rowData }) => {
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
    <div>
      <div>
        <div className="navbar-header">
          <div className="d-flex">
            <SearchOption />
            <button
              type="button"
              className="btn btn-success"
              style={{
                width: "120px",
                height: "45px",
                position: "relative",
                top: "13px",
                left: "8px",
              }}
            >
              <i className="ri-filter-2-fill me-1 align-middle ri-xl"></i>{" "}
              Filters
            </button>
          </div>

          <div className="d-flex align-items-center">
            <div style={{ marginRight: "6px" }}>
              <div className="col-sm-auto ms-auto">
                <div>
                  <Button
                    // to="/add-product"
                    className="btn btn-success "
                  >
                    {/* <i className="ri-add-line align-bottom me-1" style={{}}></i> */}
                    Post
                  </Button>
                </div>
              </div>
            </div>
            <div className={style.commonImgStyle}>
              <i
                className="bx bxs-file-pdf"
                style={{ fontSize: "20px", padding: "9px 9px 9px 9px" }}
              />
            </div>

            <div className={style.commonImgStyle} onClick={handleInvoice}>
              <i
                className="bx bx-printer"
                style={{ fontSize: "20px", padding: "9px 9px 9px 9px" }}
              />
            </div>

            <div className={style.commonImgStyle}>
              <i
                className="mdi mdi-email-outline"
                style={{ fontSize: "23px", padding: "1.5px 9px 1.5px 9px" }}
              />
            </div>

            <div className={style.commonImgStyle}>
              <i
                className="mdi mdi-pencil"
                style={{ fontSize: "23px", padding: "1.5px 9px 1.5px 9px" }}
              />
            </div>

            <div className="d-flex align-items-center">
              <p className=" fs-14 text-muted mb-2 fw-semibold p-3">
                Show PDF View
              </p>

              <div
                className="form-check form-switch form-switch-lg mb-2"
                dir="ltr"
              >
                <Input
                  type="checkbox"
                  className="form-check-input"
                  id="customSwitchsizelg"
                  defaultChecked=""
                />
                {/* <Label className="form-check-label" htmlFor="customSwitchsizelg">Large Size Switch</Label> */}
              </div>
            </div>

            {/* <div>
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
          </div> */}
            {/* <ProductsGlobalFilter /> */}
          </div>
        </div>

        <Row>
          <Col lg={4}>
            <Card>
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
                        <tr className={style.row1}>
                          <th scope="col" style={{ width: "50px" }}>
                            <div className="form-check"></div>
                          </th>
                          <th
                            className={style.sort}
                            data-sort="order_id fas fa-sort"
                          ></th>
                          <th
                            className={style.sort}
                            data-sort="customer fas fa-sort"
                          ></th>
                          <th
                            className={style.sort}
                            data-sort="order_date"
                          ></th>
                          <th className={style.sort} data-sort="sub_total"></th>
                          <th className={style.sort} data-sort="quantity"></th>
                          <th className={style.sort} data-sort="quantity"></th>
                          <th className={style.sort} data-sort="quantity"></th>
                          <th className={style.sort} data-sort="quantity"></th>
                        </tr>
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
                  display: "flex",
                  justifyContent: "space-between",
                  justifyItems: "center",
                  marginTop: "13.5px",
                }}
              >
                <div>
                  <h3 className={style.saleHeadingfirst}>New Picking</h3>
                </div>
                <div className="d-flex align-items-center">
                  <div style={{ marginRight: "6px" }}>
                    <div className="col-sm-auto ms-auto">
                      <div className={style.commonImgStyle}>
                        <i
                          className="mdi mdi-pencil"
                          style={{
                            fontSize: "23px",
                            padding: "1.5px 9px 1.5px 9px",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={style.commonImgStyle}>
                    <i
                      className="bx bxs-file-pdf"
                      style={{ fontSize: "20px", padding: "9px 9px 9px 9px" }}
                    />
                  </div>

                  <div className={style.commonImgStyle} onClick={handleInvoice}>
                    <i
                      className="bx bx-printer"
                      style={{ fontSize: "20px", padding: "9px 9px 9px 9px" }}
                    />
                  </div>

                  <div className={style.commonImgStyle}>
                    <i
                      className="mdi mdi-email-outline"
                      style={{
                        fontSize: "23px",
                        padding: "1.5px 9px 1.5px 9px",
                      }}
                    />
                  </div>

                  <div className={style.commonImgStyle}>
                    <i
                      className="mdi mdi-paperclip"
                      style={{
                        fontSize: "23px",
                        padding: "1.5px 9px 1.5px 9px",
                      }}
                    />
                  </div>

                  <div className="d-flex align-items-center">
                    <button
                      className={style.btnSaveStyle}
                      style={{ width: "84px", height: "40px" }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <Row className="justify-content-center">
                  <div className="border p-3 rounded-20">
                    <Card>
                      <CardBody className="p-4 border-top border-top-dashed">
                        <Row>
                          <Col md={12}>
                            <Card className="mt-4">
                              <CardBody>
                                <TabContent
                                  activeTab={customActiveTab}
                                  className="mt-4"
                                >
                                  <TabPane
                                    id="addproduct-general-info"
                                    tabId="1"
                                  >
                                    <Row>
                                      <Col lg={6}>
                                        <div className="mb-3">
                                          <label
                                            className="form-label"
                                            htmlFor="manufacturer-name-input"
                                          >
                                            Picking Slips
                                          </label>
                                          <Input
                                            type="text"
                                            // className={`form-control ${validation.errors.businessName && validation.touched.businessName ? 'is-invalid' : ''}`}
                                            id="product-orders-input"
                                            placeholder="Enter Business Name"
                                            name="businessName"
                                            aria-label="businessName"
                                            aria-describedby="product-businessName-addon"
                                            // value={validation.values.businessName || ""}
                                            // onBlur={validation.handleBlur}
                                            // onChange={validation.handleChange}
                                          ></Input>
                                          {/* {validation.errors.businessName && validation.touched.businessName ? (
              <div className="invalid-feedback">{validation.errors.businessName}</div>
            ) : null} */}
                                        </div>
                                      </Col>
                                      <Col lg={6}>
                                        <div className="mb-3">
                                          <label
                                            className="form-label"
                                            htmlFor="manufacturer-brand-input"
                                          >
                                            Business Address
                                          </label>
                                          <Input
                                            type="type"
                                            // className={`form-control ${validation.errors.businessAddress && validation.touched.businessAddress ? 'is-invalid' : ''}`}
                                            id="product-orders-input"
                                            placeholder="Enter Business Address"
                                            name="businessAddress"
                                            aria-label="businessAddress"
                                            aria-describedby="product-businessAddress-addon"
                                            // value={validation.values.businessAddress || ""}
                                            // onBlur={validation.handleBlur}
                                            // onChange={validation.handleChange}
                                          ></Input>
                                          {/* {validation.errors.businessAddress && validation.touched.businessAddress ? (
              <div className="invalid-feedback">{validation.errors.businessAddress}</div>
            ) : null} */}
                                        </div>
                                      </Col>
                                    </Row>
                                    <Row>
                                      <Col lg={6}>
                                        <div className="mb-3">
                                          <label
                                            className="form-label"
                                            htmlFor="product-stock-input"
                                          >
                                            Customer Name*
                                          </label>
                                          <div className="input-group mb-3">
                                            <Input
                                              type="text"
                                              className="form-control"
                                              id="product-stock-input"
                                              placeholder="Illinois"
                                              name="city"
                                              // value={validation.values.city || ""}
                                              // onBlur={validation.handleBlur}
                                              // onChange={validation.handleChange}
                                              // invalid={validation.errors.city && validation.touched.city ? true : false}
                                            />
                                            {/* {validation.errors.city && validation.touched.city ? (
                <FormFeedback type="invalid">{validation.errors.city}</FormFeedback>
              ) : null} */}
                                          </div>
                                        </div>
                                      </Col>

                                      <Col sm={6}></Col>
                                      <Col lg={6}>
                                        <div className="mb-3">
                                          <label
                                            className="form-label"
                                            htmlFor="product-stock-input"
                                          >
                                            Sales Order#*
                                          </label>
                                          <div className="input-group mb-3">
                                            <Input
                                              type="text"
                                              className="form-control"
                                              id="product-stock-input"
                                              placeholder="United States"
                                              name="country"
                                              // value={validation.values.country || ""}
                                              // onBlur={validation.handleBlur}
                                              // onChange={validation.handleChange}
                                              // invalid={validation.errors.country && validation.touched.country ? true : false}
                                            />
                                            {/* {validation.errors.country && validation.touched.country ? (
                <FormFeedback type="invalid">{validation.errors.country}</FormFeedback>
              ) : null} */}
                                          </div>
                                        </div>
                                      </Col>

                                      <Col sm={6}>
                                        <div className="mb-3">
                                          <label
                                            className="form-label"
                                            htmlFor="product-price-input"
                                          >
                                            Post Code Zip
                                          </label>
                                          <div className="input-group mb-3">
                                            <Input
                                              type="number"
                                              className="form-control"
                                              id="product-stock-input"
                                              placeholder="294069302"
                                              name="pinCode"
                                              // value={validation.values.pinCode || ""}
                                              // onBlur={validation.handleBlur}
                                              // onChange={validation.handleChange}
                                              // invalid={validation.errors.pinCode && validation.touched.pinCode ? true : false}
                                            />
                                            {/* {validation.errors.pinCode && validation.touched.pinCode ? (
                <FormFeedback type="invalid">{validation.errors.pinCode}</FormFeedback>
              ) : null} */}
                                          </div>
                                        </div>
                                      </Col>
                                    </Row>
                                  </TabPane>
                                </TabContent>
                              </CardBody>
                            </Card>
                          </Col>
                          {/*  */}
                        </Row>
                      </CardBody>
                    </Card>

                    <Col lg={12}>
                      <Card className="mt-n4 mx-n4">
                        <div
                          style={{
                            backgroundColor: "#FEF4E4",
                            borderRadius: "4px",
                          }}
                        >
                          <CardBody className="pb-0 px-4">
                            <Row className="mb-3">
                              <div className="col-md">
                                <Row className="align-items-center g-3">
                                  <div className="col-md">
                                    <div>
                                      {/* <h4 className="fw-bold" style={{ color: "#1F75A4" }}>Fulfill the Sales Order</h4> */}
                                      <div className="hstack gap-3 flex-wrap mt-3">
                                        <div
                                          style={{
                                            color: "#1F75A4",
                                            fontWeight: 400,
                                          }}
                                        >
                                          You can also select or scan the items
                                          to be included from the sales order
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Row>
                              </div>
                              <div className="col-md-auto mt-3">
                                <Button
                                  color="info"
                                  className="btn-label left rounded-pill"
                                >
                                  <i className=" label-icon  rounded-pill fs-16 ">
                                    1
                                  </i>{" "}
                                  Pick Order
                                </Button>
                              </div>
                            </Row>
                          </CardBody>
                        </div>
                      </Card>
                    </Col>

                    <Col lg={12}>
                      <CardBody className="p-4">
                        <div className="table-responsive">
                          <Table className="table-borderless text-center table-nowrap align-middle mb-0">
                            <thead>
                              <tr className="table-active">
                                <th scope="col" style={{ width: "50px" }}></th>
                                <th scope="col" className="text-start">
                                  Item & Description
                                </th>
                                <th scope="col">Ordered</th>
                                <th scope="col">Received</th>
                                <th scope="col">Rate</th>
                                <th scope="col" className="text-end">
                                  Amount
                                </th>
                              </tr>
                            </thead>
                            <tbody id="products-list">
                              <tr>
                                <th scope="row">
                                  <div className="avatar-sm bg-light rounded p-1 me-2">
                                    <img
                                      src={dummy_img}
                                      alt=""
                                      className="img-fluid d-block mx-auto"
                                    />
                                  </div>
                                </th>
                                <td className="text-start">
                                  <span className="fw-medium">
                                    D8 Flight Gummy
                                  </span>
                                  <p className="text-muted mb-0">
                                    SKU : FGU506932
                                  </p>
                                </td>
                                <td>$119.99</td>
                                <td>100</td>
                                <td>$ 20.00</td>
                                <td className="text-end"> $ 4,620</td>
                              </tr>
                              <tr>
                                <th scope="row">
                                  <div className="avatar-sm bg-light rounded p-1 me-2">
                                    <img
                                      src={dummy_img}
                                      alt=""
                                      className="img-fluid d-block mx-auto"
                                    />
                                  </div>
                                </th>
                                <td className="text-start">
                                  <span className="fw-medium">
                                    Funky Republic
                                  </span>
                                  <p className="text-muted mb-0">
                                    SKU : FGU506932
                                  </p>
                                </td>
                                <td>$94.99</td>
                                <td>01</td>
                                <td>$ 20.00</td>
                                <td className="text-end">$94.99</td>
                              </tr>
                              <tr>
                                <th scope="row">
                                  <div className="avatar-sm bg-light rounded p-1 me-2">
                                    <img
                                      src={dummy_img}
                                      alt=""
                                      className="img-fluid d-block mx-auto"
                                    />
                                  </div>
                                </th>
                                <td className="text-start">
                                  <span className="fw-medium">
                                    Hidden hills
                                  </span>
                                  <p className="text-muted mb-0">
                                    SKU : FGU506932
                                  </p>
                                </td>
                                <td>$24.99</td>
                                <td>01</td>
                                <td>$ 20.00</td>
                                <td className="text-end">$24.99</td>
                              </tr>
                              <tr>
                                <th scope="row">
                                  <div className="avatar-sm bg-light rounded p-1 me-2">
                                    <img
                                      src={dummy_img}
                                      alt=""
                                      className="img-fluid d-block mx-auto"
                                    />
                                  </div>
                                </th>
                                <td className="text-start">
                                  <span className="fw-medium">
                                    Modus 200 mg
                                  </span>
                                  <p className="text-muted mb-0">
                                    SKU : FGU506932
                                  </p>
                                </td>
                                <td>$340.00</td>
                                <td>01</td>
                                <td>$ 20.00</td>
                                <td className="text-end">$340.00</td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>

                        <div className=" mt-2">
                          <Table
                            className=" table-borderless align-middle mb-0 ms-auto"
                            style={{ width: "250px" }}
                          >
                            <tbody>
                              <tr>
                                <td>Sub Total</td>
                                <td className="text-end">$ 43370.00</td>
                              </tr>
                              <tr>
                                <td>Shipping Charges</td>
                                <td className="text-end">$ 370400.00</td>
                              </tr>
                              <tr>
                                <td>
                                  Adjustment{" "}
                                  <small className="text-muted"></small>
                                </td>
                                <td className="text-end">$ 100.00</td>
                              </tr>

                              <tr className="border-top border-top-dashed fs-15">
                                <th scope="row">Total Amount</th>
                                <th className="text-end">$ 43370.00</th>
                              </tr>
                            </tbody>
                          </Table>
                        </div>

                        <div className="mb-5">
                          <h6 className="text-muted text-uppercase fw-semibold mb-3">
                            NOTES
                          </h6>
                          <h6 className="text-muted text-uppercase fw-semibold mb-3">
                            Customer Notes
                          </h6>
                          <h6 className="text-muted text-uppercase fw-semibold mb-3">
                            TERMS & CONDITIONS
                          </h6>
                        </div>
                      </CardBody>
                    </Col>
                  </div>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Link to="/vendor" className="btn btn-primary">
          Back
        </Link>
      </div>
    </div>
  );
};

export default Splitpicking;
