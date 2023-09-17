import React from "react";
import style from "../../styles/vendor/PurchaseOrder.module.css";
import SearchOption from "../../Components/Common/SearchOption";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, CardBody, Col, Input, Row } from "reactstrap";
document.title = "Vendor List | American Distributors";
const PurchaseList = ({ purchaseOrder, onRowClick }) => {
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

  return (
    <div>
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
                  <i className="ri-add-line align-bottom me-1" style={{}}></i>
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
                      <tr >
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
                    <tbody>
                      {purchaseOrder?.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <Input type="checkbox" />
                          </td>
                          <td>{formatDate(item?.createdAt)}</td>
                          <td onClick={() => onRowClick(item)} className="clickMouseHover">{item?.PoNumber}</td>
                          <td>{item?.soRefrence}</td>
                          <td>
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
                          <td>{item?.pieces}</td>
                          <td>{`$ ${item?.totalAmount}`}</td>
                          <td>{`$ ${item?.totalAmount}`}</td>
                          <td>{item?.deliveryDate}</td>
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
  );
};

export default PurchaseList;
