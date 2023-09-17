import React from "react";
import CommonDiv from "./CommonDiv";
import SearchOption from "../../Components/Common/SearchOption";
import style from '../../assets/scss/config/ProductDetails.module.css'
import { Link } from "react-router-dom";
import { Button, Card, CardBody, Col, Row } from "reactstrap";

const Disbursements = () => {
  return (
    <div>
      <CommonDiv />

      <div>
        <div className="layout-width">
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
              <div style={{ marginRight: "5px" }}>
                <div className="col-sm-auto ms-auto">
                  <div>
                    <Button className="btn btn-success">Post</Button>
                  </div>
                </div>
              </div>
              <div className={style.commonImgStyle}>
                <i
                  className="bx bxs-file-pdf"
                  style={{ fontSize: "20px", padding: "9px 9px 9px 9px" }}
                />
              </div>

              <div className={style.commonImgStyle}>
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

              <div>
                <div className="col-sm-auto ms-auto">
                  <div>
                    <Link
                      to="/add-product"
                      className="btn btn-success bg_add_product"
                    >
                      <i
                        className="ri-add-line align-bottom me-1"
                        style={{}}
                      ></i>
                      Add New
                    </Link>
                  </div>
                </div>
              </div>

              {/* <ProductsGlobalFilter /> */}
            </div>
          </div>
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <div className="listjs-table" id="customerList">
                    <div
                      className={`table-responsive table-card mt-3 mb-1 ${style.responsiveTable}`}
                      style={{ overflowX: "auto" }}
                    >
                      <table
                        className={`table align-middle table-nowrap ${style.table}`}
                        id="customerTable"
                      >
                        <thead className={`table-light ${style.head}`}>
                          <tr className={style.row1}>
                            <th scope="col" style={{ width: "50px" }}>
                              <div className="form-check">
                                <input
                                  className={`form-check-input ${style.checkbox}`}
                                  type="checkbox"
                                  id="checkAll"
                                  value="option"
                                />
                              </div>
                            </th>
                            <th
                              className={style.sort}
                              data-sort="order_id fas fa-sort"
                            >
                              Date
                            </th>
                            <th
                              className={style.sort}
                              data-sort="customer fas fa-sort"
                            >
                              Purchase Order
                            </th>
                            <th className={style.sort} data-sort="order_date">
                              Reference#
                            </th>
                            <th className={style.sort} data-sort="sub_total">
                              Status
                            </th>
                            <th className={style.sort} data-sort="quantity">
                              Received
                            </th>
                            <th className={style.sort} data-sort="quantity">
                              Billed
                            </th>
                            <th className={style.sort} data-sort="quantity">
                              Amount
                            </th>
                            <th className={style.sort} data-sort="quantity">
                              Expected Delivery
                            </th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
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
                            <td className={style.ordertext}>13 Jan 2023</td>
                            <td className={style.customer}>PO-00001</td>
                            <td className={style.ordertext}>26495</td>
                            <td>
                              <span className="badge bg-info-subtle text-info text-uppercase">
                                open
                              </span>
                            </td>
                            <td className={style.ordertext}>255</td>
                            <td className={style.ordertext}>$654</td>
                            <td className={style.ordertext}>$35228</td>
                            <td className={style.ordertext}>
                              20 Dec, 2021,{" "}
                              <span className={style.time}>02:21 AM</span>
                            </td>
                          </tr>
                        </tbody>
                        <tbody className="list form-check-all">
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
                            <td className={style.ordertext}>13 Jan 2023</td>
                            <td className={style.customer}>PO-00001</td>
                            <td className={style.ordertext}>26495</td>
                            <td>
                              <span className="badge bg-info-subtle text-info text-uppercase">
                                open
                              </span>
                            </td>
                            <td className={style.ordertext}>255</td>
                            <td className={style.ordertext}>$654</td>
                            <td className={style.ordertext}>$35228</td>
                            <td className={style.ordertext}>
                              20 Dec, 2021,{" "}
                              <span className={style.time}>02:21 AM</span>
                            </td>
                          </tr>
                        </tbody>
                        <tbody className="list form-check-all">
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
                            <td className={style.ordertext}>13 Jan 2023</td>
                            <td className={style.customer}>PO-00001</td>
                            <td className={style.ordertext}>26495</td>
                            <td>
                              <span className="badge bg-info-subtle text-info text-uppercase">
                                open
                              </span>
                            </td>
                            <td className={style.ordertext}>255</td>
                            <td className={style.ordertext}>$654</td>
                            <td className={style.ordertext}>$35228</td>
                            <td className={style.ordertext}>
                              20 Dec, 2021,{" "}
                              <span className={style.time}>02:21 AM</span>
                            </td>
                          </tr>
                        </tbody>
                        <tbody className="list form-check-all">
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
                            <td className={style.ordertext}>13 Jan 2023</td>
                            <td className={style.customer}>PO-00001</td>
                            <td className={style.ordertext}>26495</td>
                            <td>
                              <span className="badge bg-info-subtle text-info text-uppercase">
                                open
                              </span>
                            </td>
                            <td className={style.ordertext}>255</td>
                            <td className={style.ordertext}>$654</td>
                            <td className={style.ordertext}>$35228</td>
                            <td className={style.ordertext}>
                              20 Dec, 2021,{" "}
                              <span className={style.time}>02:21 AM</span>
                            </td>
                          </tr>
                        </tbody>
                        <tbody className="list form-check-all">
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
                            <td className={style.ordertext}>13 Jan 2023</td>
                            <td className={style.customer}>PO-00001</td>
                            <td className={style.ordertext}>26495</td>
                            <td>
                              <span className="badge bg-info-subtle text-info text-uppercase">
                                open
                              </span>
                            </td>
                            <td className={style.ordertext}>255</td>
                            <td className={style.ordertext}>$654</td>
                            <td className={style.ordertext}>$35228</td>
                            <td className={style.ordertext}>
                              20 Dec, 2021,{" "}
                              <span className={style.time}>02:21 AM</span>
                            </td>
                          </tr>
                        </tbody>
                        <tbody className="list form-check-all">
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
                            <td className={style.ordertext}>13 Jan 2023</td>
                            <td className={style.customer}>PO-00001</td>
                            <td className={style.ordertext}>26495</td>
                            <td>
                              <span className="badge bg-info-subtle text-info text-uppercase">
                                open
                              </span>
                            </td>
                            <td className={style.ordertext}>255</td>
                            <td className={style.ordertext}>$654</td>
                            <td className={style.ordertext}>$35228</td>
                            <td className={style.ordertext}>
                              20 Dec, 2021,{" "}
                              <span className={style.time}>02:21 AM</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>

        {/* <div> */}

        {/* </div> */}
      </div>
    </div>
  );
};

export default Disbursements;
