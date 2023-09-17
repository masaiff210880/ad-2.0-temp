import React from "react";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import { CardHeader, Input, Label, CardBody } from "reactstrap";
import style from "../../assets/scss/config/ProductReceipt.module.css";

import { Link } from "react-router-dom";
import SearchOption from "../../Components/Common/SearchOption";

// Define your DetailScreen component
const DetailScreen = ({ rowData }) => {
  document.title = "Vendor List | American Distributors";
  return (
    // Your detail screen JSX code here
    <div>
      {/* SubPurchaseReceipts code*/}
      <div className="mt-4" style={{ width: "100%" }}>
        <Col>
          <CardHeader className="border-0 rounded">
            <Row className="align-items-center justify-content-between">
              <Col xxl={6} className="d-flex align-items-center">
                <button
                  type="button"
                  className="btn btn-success d-flex align-items-center"
                  style={{ marginLeft: "12.5px" }}
                >
                  <i className="ri-filter-2-fill me-1 align-middle ri-xl"></i>
                  Filter
                </button>

                <div className={style.subPurchaseRepts}>
                  <p>All purchase Order</p>
                </div>
              </Col>

              <Col
                xl={3}
                style={{ display: "flex", flexDirection: "row-reverse" }}
              >
                <div className="hstack gap-2">
                  <div
                    className={`${style.commonIconStyle} d-flex align-items-center`}
                    style={{ margin: "0px 12px" }}
                  >
                    <i className="mdi mdi-paperclip" />
                  </div>
                  <button
                    type="button"
                    className="btn btn-success"
                    style={{ width: "137px" }}
                  >
                    Post
                  </button>
                  <div
                    className={`${style.commonIconStyle} d-flex align-items-center`}
                    style={{ margin: "0px 5px" }}
                  >
                    <i
                      className="bx bx-printer"
                      style={{ padding: "5px 0px" }}
                    />
                  </div>
                  <div
                    className={`${style.commonIconStyle} d-flex align-items-center`}
                  >
                    <i className="mdi mdi-email-outline" />
                  </div>
                  <button
                    className="btn btn-danger"
                    // onClick={() => {
                    //   setModal(true);
                    // }}
                    style={{ width: "149px" }}
                  >
                    <i className="ri-add-fill me-1 align-bottom"></i> Add New
                  </button>
                </div>
              </Col>
            </Row>
          </CardHeader>
        </Col>
        <div className="mt-4">
          <Col>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p className={style.purchaseResptsPara}>PURCHASE RECEIPT</p>
              <SearchOption />
            </div>
          </Col>
        </div>
        <div className="mt-4" style={{ display: "flex" }}>
          {/* 1st div */}
          <div>
            <div className={style.sPRfirstDiv}>
              <div className={style.sRPSubFirtDiv}>
                <i className="ri-arrow-right-line"></i>
                <span>Vendor</span>
              </div>
            </div>
            <div>
              <p className={style.sPRSubSecDiv}>RECEIPT For</p>
              <div className={style.sPRBoxSecDiv}>
                <label className="form-check-label">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="radioGroup"
                    value="option1"
                  />{" "}
                  Items
                </label>
                <label className="form-check-label">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="radioGroup"
                    value="option2"
                  />{" "}
                  Expenses
                </label>
              </div>
            </div>
          </div>

          {/* 2 div */}
          <div style={{ marginLeft: "59px", width: "25%" }}>
            <Col>
              <Card className="mb-3">
                <CardBody>
                  <div className="table-card">
                    <table className="table mb-0">
                      <tbody>
                        <tr>
                          <td className="fw-medium">Ref Order</td>
                          <td>1022301</td>
                        </tr>
                        <tr>
                          <td className="fw-medium">Vendor ID</td>
                          <td>D8FLIGHT</td>
                        </tr>
                        <tr>
                          <td className="fw-medium">Trans. Date</td>
                          <td>13/05/2023</td>
                        </tr>
                        <tr>
                          <td className="fw-medium">Trans. Date</td>
                          <td>13/05/2023</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </div>

          {/* 3 div */}
          <div style={{ marginLeft: "59px", width: "20%" }}>
            <Col>
              <Card className="mb-3">
                <CardBody style={{ height: "238px" }}>
                  <div className="table-card">
                    <table className="table mb-0">
                      <tbody>
                        <tr>
                          <td className="fw-medium">Bill Terms</td>
                          <td style={{ color: "#119AD5" }}>Due on Receipt</td>
                        </tr>
                        <tr>
                          <td className="fw-medium">Due Date</td>
                          <td>13/08/2023</td>
                        </tr>
                        <tr>
                          <td className="fw-medium">Bill Reference</td>
                          <td></td>
                        </tr>
                        {/* <tr>
                          <td className="fw-medium"></td>
                          <td></td>
                        </tr> */}
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </div>
        </div>
        {/* table */}
        <div className="mt-4">
          <div className="table-responsive table-card mt-3 mb-1">
            <table
              className="table align-middle table-nowrap"
              id="customerTable"
            >
              <thead className={style.tableHeading}>
                <tr>
                  <th scope="col">
                    <div className="form-check">
                      {/* <input className="form-check-input" type="checkbox" id="checkAll" value="option" /> */}
                    </div>
                  </th>
                  <th className="sort" style={{ paddingTop: "20px" }}>
                    Item Code
                  </th>
                  <th className="sort" style={{ paddingTop: "20px" }}>
                    Ref Loc
                  </th>
                  <th className="sort" style={{ paddingTop: "20px" }}>
                    Description
                  </th>
                  <th className="sort" style={{ paddingTop: "20px" }}>
                    Vendor Item
                  </th>
                  <th className="sort" style={{ paddingTop: "20px" }}>
                    Quantity
                  </th>
                  <th className="sort" style={{ paddingTop: "20px" }}>
                    UM
                  </th>
                  <th className="sort" style={{ paddingTop: "20px" }}>
                    Unit Price
                  </th>
                  <th className="sort" style={{ paddingTop: "20px" }}>
                    Extended Price
                  </th>
                </tr>
              </thead>
              <tbody className="list form-check-all">
                <tr>
                  <th scope="row">
                    <div className="form-check"></div>
                  </th>

                  <td>D8flight12344</td>
                  <td style={{ color: "#119AD5", fontWeight: 400 }}>101</td>
                  <td>26495</td>
                  <td></td>
                  <td>50</td>
                  <td>EA</td>
                  <td>3.50</td>
                  <td>0.00</td>
                </tr>
              </tbody>
            </table>
            <div className="noresult" style={{ display: "none" }}>
              <div className="text-center">
                <lord-icon
                  src="https://cdn.lordicon.com/msoeawqm.json"
                  trigger="loop"
                  colors="primary:#121331,secondary:#08a88a"
                  style={{ width: "75px", height: "75px" }}
                ></lord-icon>
                <h5 className="mt-2">Sorry! No Result Found</h5>
                <p className="text-muted mb-0">
                  We've searched more than 150+ Orders We did not find any
                  orders for you search.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* 2ndLastDiv */}
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
            <div style={{ display: "flex", marginLeft: "33.5px", gap: "59px" }}>
              <p>Tracking No.</p>
              <div className={style.pieceL2CountDiv}>0</div>
            </div>
          </div>
          {/* freightDiv */}
          <div className="mt-4 mr-4">
            <div
              style={{ display: "flex", gap: "60px", marginRight: "50.5px" }}
            >
              <p style={{ fontWeight: 500 }}>Freight</p>
              <p style={{ fontWeight: 500 }}>$ 0.00</p>
            </div>
            <br />
            <div
              style={{ display: "flex", gap: "45px", marginRight: "50.5px" }}
            >
              <p>Total Due</p>
              <p>$ 0.00</p>
            </div>
            <br />
            <div
              style={{ display: "flex", gap: "50px", marginRight: "50.5px" }}
            >
              <p>Discount</p>
              <p>$ 0.00</p>
            </div>
            <br />
            <div
              style={{ display: "flex", gap: "29px", marginRight: "50.5px" }}
            >
              <p style={{ fontWeight: 600, fontSize: "17px" }}>Balance</p>
              <p style={{ fontWeight: 600, fontSize: "17px" }}>$ 0.00</p>
            </div>
          </div>
        </div>

        {/* LastDiv */}
        <div className="mt-4" style={{ marginLeft: "28px" }}>
          <div className="form-check">
            <Input
              className="form-check-input"
              type="checkbox"
              defaultValue=""
              id="cardtableCheck"
            />
            <Label className="form-check-label" htmlFor="cardtableCheck">
              Prices Include Excise Tax
            </Label>
            <br />
            <Input
              className="form-check-input"
              type="checkbox"
              defaultValue=""
              id="cardtableCheck"
            />
            <Label className="form-check-label" htmlFor="cardtableCheck">
              Drop Ship
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailScreen;
