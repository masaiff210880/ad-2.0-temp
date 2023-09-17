import React, { useEffect, useState } from "react";
import style from "../../styles/vendor/PurchaseOrder.module.css";
import SearchOption from "../../Components/Common/SearchOption";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, Col, Input, Label, Row } from "reactstrap";
import calender from "../../../src/assets/images/products/calender.svg";
import dummy_img from "../../../src/assets/images/products/small_dummy.svg";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { getOneSalesData } from "../../slices/ecommerce/thunk";

function convertDate(isoDate) {
  const dt = new Date(isoDate);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  };
  return dt.toLocaleString("en-US", options);
}

function formatDate(inputDate) {
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
    "Dec"
  ];

  // Parse the input date string
  const date = new Date(inputDate);

  // Extract day, month, and year
  const day = date.getDate();
  const month = months[date.getMonth()];

  // Create a function to add 'st', 'nd', 'rd', or 'th' to the day
  function getDayWithSuffix(day) {
    if (day >= 11 && day <= 13) {
      return day + "th";
    }
    switch (day % 10) {
      case 1:
        return day + "st";
      case 2:
        return day + "nd";
      case 3:
        return day + "rd";
      default:
        return day + "th";
    }
  }

  // Format the date in the desired format
  const formattedDate = getDayWithSuffix(day) + " " + month;

  return formattedDate;
}

// const singleSalesData = () => {};

const SplitData = ({ rowData, salesOrder }) => {
  console.log("rowdata", rowData, salesOrder);

  const [salesId, setSalesID] = useState(null);
  const dispatch = useDispatch();

  const [selectedRowData, setSelectedRowData] = useState(null);
  const singleSalesData = (salesId) => {
    setSalesID(salesId);
  };

  const selectSingleSalesData = createSelector(
    (state) => state.Ecommerce.singleSalesOrder,
    (singleSalesOrder) => singleSalesOrder
  );

  const salesSinlgeData = useSelector(selectSingleSalesData);

  rowData = selectedRowData ? selectedRowData : rowData;

  useEffect(() => {
    if (salesSinlgeData.length > 0) {
    }
    setSelectedRowData(salesSinlgeData);
  }, [salesSinlgeData]);

  useEffect(() => {
    dispatch(getOneSalesData(salesId));
  }, [dispatch, salesId]);

  const handleInvoice = () => {
    window.print();
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
                left: "8px"
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
                      <tbody className="list form-check-all">
                        {salesOrder?.map((item) => (
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
                            <td
                              className={style.customer}
                              style={{ cursor: "pointer" }}
                              onClick={() => singleSalesData(item?._id)}
                            >
                              <h1>{`Order : ${item?.uniqueId}`}</h1>
                              <div className={style.cal_div}>
                                <div className={style.cal}>
                                  <img
                                    src={calender}
                                    alt="calender"
                                    width={"100%"}
                                  />
                                  <h1>{formatDate(item?.createdAt)}</h1>
                                </div>
                                <div className={style.cal}>
                                  <img
                                    src={calender}
                                    alt="calender"
                                    width={"100%"}
                                  />
                                  <h1>
                                    {convertDate(item?.createdAt).split(",")[2]}
                                  </h1>
                                </div>
                              </div>
                            </td>
                            <td className={style.ordertext}></td>
                            <td className={style.money}>
                              <h1>{`$ ${item?.grandTotalAmount}`}</h1>
                              {
                                <span
                                  className={
                                    item?.orderStatus?.toLowerCase() ===
                                    "closed"
                                      ? "badge bg-danger-subtle text-danger"
                                      : "badge bg-success-subtle text-success"
                                  }
                                >
                                  {item?.orderStatus}
                                </span>
                              }
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

          <Col lg={8}>
            <Card>
              <CardBody>
                <Row className="justify-content-center">
                  {/* <Col xxl={9}> */}
                  {/* <Card id="demo"> */}
                  {/* <Row> */}

                  <div className="border p-3 rounded-20">
                    <Col lg={12}>
                      <CardBody className="p-4">
                        <Row className="g-3">
                          <Col lg={5} xs={6}>
                            <p className=" fs-24 text-muted mb-2 text-uppercase fw-semibold">
                              Sales Order
                            </p>
                            <h5 className="fs-14 mb-0">
                              <span id="invoice-no">{`Sales Order - ${rowData?.uniqueId}`}</span>
                            </h5>
                          </Col>
                        </Row>
                      </CardBody>
                    </Col>

                    <Card>
                      <CardBody className="p-4 border-top border-top-dashed">
                        <Row>
                          <Col md={6}>
                            <div className="table-responsive">
                              <tbody>
                                <tr className="mb-5">
                                  <td>Reference</td>
                                  <td className="" id="cart-subtotal">
                                    {rowData?.refrence}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Order Date </td>
                                  <td className="" id="cart-discount">
                                    {convertDate(rowData?.createdAt)}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Expected Shipment Date</td>
                                  <td className="" id="cart-shipping">
                                    12 NOV 2023
                                  </td>
                                </tr>
                                <tr>
                                  <td>Delivery Method </td>
                                  <td className="" id="cart-tax">
                                    Bike
                                  </td>
                                </tr>
                                <tr>
                                  <td>Sales Person</td>
                                  <td className="" id="cart-tax"></td>
                                </tr>
                              </tbody>
                            </div>
                            {/* <div className="order-div">
                            <div className="d-flex align-items-center mb-2">
                              <div className="flex-shrink-0">
                                <p className="text-muted mb-0 fs-14">Reference#</p>
                              </div>
                              <div className="flex-grow-1 ms-2 ml-20">
                                <h6 className="mb-0 fs-14 ">Ref - PO - 0001</h6>
                              </div>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                              <div className="flex-shrink-0">
                                <p className="text-muted mb-0 fs-14">Order Date</p>
                              </div>
                              <div className="flex-grow-1 ms-2">
                                <h6 className="mb-0 fs-14">12 JUL 2021</h6>
                              </div>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                              <div className="flex-shrink-0">
                                <p className="text-muted mb-0 fs-14">Expected Shipment Date</p>
                              </div>
                              <div className="flex-grow-1 ms-2">
                                <h6 className="mb-0 fs-14">12 AUG 2021</h6>
                              </div>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                              <div className="flex-shrink-0">
                                <p className="text-muted mb-0 fs-14">Delivery Method</p>
                              </div>
                              <div className="flex-grow-1 ms-2">
                                <h6 className="mb-0 fs-14">Bike</h6>
                              </div>
                            </div>
                            <div className="d-flex align-items-center">
                              <div className="flex-shrink-0">
                                <p className="text-muted mb-0 fs-14">Sales Person</p>
                              </div>
                              <div className="flex-grow-1 ms-2">
                                <h6 className="mb-0"></h6>
                              </div>
                            </div>
                          </div> */}
                          </Col>

                          <Col md={6}>
                            <div className="address-div d-flex justify-content-end">
                              <div className="d-flex flex-column">
                                <div>
                                  <h6 className="text-muted text-uppercase fw-semibold mb-3">
                                    Billing Address
                                  </h6>
                                  <p
                                    className="fw-medium mb-2"
                                    id="billing-name"
                                  >
                                    {rowData?.billTo}
                                  </p>
                                  <p
                                    className="fw-medium mb-2"
                                    id="billing-address-line-1"
                                  >
                                    {rowData?.billingAddress}
                                  </p>
                                  <p className="fw-medium mb-2">
                                    <span id="billing-phone-no">
                                      {rowData?.billingCity +
                                        ", " +
                                        rowData?.billingState}
                                    </span>
                                  </p>
                                  <p className="fw-medium mb-2">
                                    <span id="billing-tax-no">
                                      {rowData?.billingCountry +
                                        ", " +
                                        rowData?.billingPincode}
                                    </span>
                                  </p>
                                </div>

                                <div>
                                  <h6 className="text-muted text-uppercase fw-semibold mb-3 mt-3">
                                    Shipping Address
                                  </h6>
                                  <p
                                    className="fw-medium mb-2"
                                    id="shipping-name"
                                  >
                                    {rowData?.name}
                                  </p>
                                  <p
                                    className="fw-medium mb-2"
                                    id="shipping-address-line-1"
                                  >
                                    {rowData?.address}
                                  </p>
                                  <p className="fw-medium mb-2">
                                    <span id="shipping-phone-no">
                                      {rowData?.shippingCity +
                                        ", " +
                                        rowData?.shippingState}
                                    </span>
                                  </p>
                                  <p className="fw-medium mb-2">
                                    <span id="billing-tax-no">
                                      {rowData?.shippingCountry +
                                        ", " +
                                        rowData?.shippingPinCode}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* <div className="address-div d-flex justify-content-end">
  <div className="d-flex flex-column align-items-end">
    <div>
      <h6 className="text-muted text-uppercase fw-semibold mb-3">
        Billing Address
      </h6>
      <p className="fw-medium mb-2" id="billing-name">
        {rowData?.billTo}
      </p>
      <p className="fw-medium mb-2" id="billing-address-line-1">
        {rowData?.billingAddress}
      </p>
      <p className="fw-medium mb-2">
        <span id="billing-phone-no">
          {rowData?.billingCity + ", " + rowData?.billingState}
        </span>
      </p>
      <p className="fw-medium mb-2">
        <span id="billing-tax-no">
          {rowData?.billingCountry + ", " + rowData?.billingPincode}
        </span>
      </p>
    </div>
  </div>

  <div>
    <h6 className="text-muted text-uppercase fw-semibold mb-3 mt-3">
      Shipping Address
    </h6>
    <p className="fw-medium mb-2" id="shipping-name">
      {rowData?.name}
    </p>
    <p className="fw-medium mb-2" id="shipping-address-line-1">
      {rowData?.address}
    </p>
    <p className="fw-medium mb-2">
      <span id="shipping-phone-no">
        {rowData?.shippingCity + ", " + rowData?.shippingState}
      </span>
    </p>
    <p className="fw-medium mb-2">
      <span id="billing-tax-no">
        {rowData?.shippingCountry + ", " + rowData?.shippingPinCode}
      </span>
    </p>
  </div>
</div> */}
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>

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
                              {rowData?.orderItemId?.map((item) => (
                                <tr>
                                  <th scope="row">
                                    <div className="avatar-sm bg-light rounded p-1 me-2">
                                      <img
                                        src={
                                          item?.variantId?.featuredImage?.src
                                        }
                                        alt=""
                                        className="img-fluid d-block mx-auto"
                                      />
                                    </div>
                                  </th>
                                  <td className="text-start">
                                    <span className="fw-medium">
                                      {item?.variantId?.name}
                                    </span>
                                    <p className="text-muted mb-0">
                                      {item?.variantId?.sku}
                                    </p>
                                  </td>
                                  <td>{item?.quantity}</td>
                                  <td>{item?.verifiedQuantity}</td>
                                  <td>{`$ ${item?.price}`}</td>
                                  <td className="text-end">{`$ ${item?.subTotal}`}</td>
                                </tr>
                              ))}
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
                                <td className="text-end">{`$ ${rowData?.totalAmount}`}</td>
                              </tr>
                              <tr>
                                <td>Shipping Charges</td>
                                <td className="text-end">{`$ ${rowData?.flatRate}`}</td>
                              </tr>
                              <tr>
                                <td>
                                  Advance <small className="text-muted"></small>
                                </td>
                                <td className="text-end">{`$ ${rowData?.depositAmount}`}</td>
                              </tr>

                              <tr className="border-top border-top-dashed fs-15">
                                <th scope="row">Total Amount</th>
                                <th className="text-end">{`$ ${rowData?.grandTotalAmount}`}</th>
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

export default SplitData;
