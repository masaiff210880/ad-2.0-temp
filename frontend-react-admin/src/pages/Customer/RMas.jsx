import React from "react";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import style from "../../assets/scss/config/ProductDetails.module.css";
import CommonDiv from "./CommonDiv";
import { Link } from "react-router-dom";
import SearchOption from "../../Components/Common/SearchOption";

const RMas = ({ customerRmsList }) => {
  console.log('first', customerRmsList)
  function formatDate(inputDateString) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    try {
      const dateObject = new Date(inputDateString);
      const year = dateObject.getFullYear();
      const month = dateObject.getMonth();
      const day = dateObject.getDate();

      const formattedDate = `${day} ${months[month]}, ${year}`;
      return formattedDate;
    } catch (error) {
      console.error("Error parsing or formatting date:", error);
      return "Invalid Date";
    }
  }
  function convertDate(isoDate) {
    const dt = new Date(isoDate);
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    return dt.toLocaleString('en-US', options);
  }

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
                              Transaction ID
                            </th>
                            <th
                              className={style.sort}
                              data-sort="customer fas fa-sort"
                            >
                              Status
                            </th>
                            <th className={style.sort} data-sort="order_date">
                              Trans. Date
                            </th>
                            <th className={style.sort} data-sort="sub_total">
                              Disposition
                            </th>
                            <th className={style.sort} data-sort="quantity">
                              Delivery Date
                            </th>
                            <th className={style.sort} data-sort="quantity">
                              Pieces
                            </th>
                            <th className={style.sort} data-sort="quantity">
                              Employee
                            </th>
                            <th className={style.sort} data-sort="quantity">
                              Total Amount
                            </th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {customerRmsList?.map((item) => (
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
                              <td className={style.ordertext}>{item?.transactionId}</td>
                              <td className={style.customer}>
                                {
                                  <span
                                    className={
                                      item?.status.toLowerCase() === "upcoming"
                                        ? "badge bg-secondary-subtle text-secondary"
                                        : item?.status.toLowerCase() === "closed"
                                          ? "badge bg-danger-subtle text-danger"
                                          : "badge bg-success-subtle text-success"
                                    }
                                  >
                                    {item?.status}
                                  </span>
                                }
                              </td>
                              <td className={style.ordertext}>{formatDate(item?.transactionDate)}</td>
                              <td className={style.ordertext}>{item?.disposition}</td>
                              <td>{convertDate(item?.updatedAt)}</td>
                              <td className={style.ordertext}>{item?.pieces}</td>
                              <td className={style.ordertext}>{item?.employee}</td>
                              <td className={style.ordertext}>
                                {item?.totalAmount}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default RMas;
