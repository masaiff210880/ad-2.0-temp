import React from "react";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import { CardHeader, Input, Label } from "reactstrap";
// import style from "../../../../assets/scss/config/ProductReceipt.module.css";
import style from '../../assets/scss/config/ProductReceipt.module.css'
import { Link } from "react-router-dom";

const PurchaseReceipts = () => {
  return (
    <div>
      <CardHeader className="border-0 rounded">
        <Row className="align-items-center justify-content-between">
          <Col xl={3}>
            <div className="search-box">
              <Input
                type="text"
                className="form-control search"
                placeholder="Search for sellers & owner name or something..."
              />
              <i className="ri-search-line search-icon"></i>
            </div>
          </Col>
          <Col xxl={6} className="d-flex align-items-center">
            <div className="d-flex align-items-center">
              Show
              <select
                className="form-control"
                style={{ margin: "0px 15px" }}
                onChange={(e) => category(e.target.value)}
              >
                <option value="All">Select Categories</option>
                <option value="All">All</option>
                <option value="Retailer">Retailer</option>
                <option value="Health & Medicine">Health & Medicine</option>
                <option value="Manufacturer">Manufacturer</option>
                <option value="Food Service">Food Service</option>
                <option value="Computers & Electronics">
                  Computers & Electronics
                </option>
              </select>
            </div>
            <button
              type="button"
              className="btn btn-success d-flex align-items-center"
            >
              <i className="ri-filter-2-fill me-1 align-middle ri-xl"></i>
              Filter
            </button>
            <div
              className={`${style.commonIconStyle} d-flex align-items-center`}
              style={{ margin: "0px 12px" }}
            >
              <i className="mdi mdi-paperclip" />
            </div>
            <button type="button" className="btn btn-success">
              Post
            </button>
            <div
              className={`${style.commonIconStyle} d-flex align-items-center`}
              style={{ margin: "0px 5px" }}
            >
              <i className="bx bx-printer" style={{ padding: "5px 0px" }} />
            </div>
            <div
              className={`${style.commonIconStyle} d-flex align-items-center`}
            >
              <i className="mdi mdi-email-outline" />
            </div>
          </Col>
          <Col xl={3} style={{ display: "flex", flexDirection: "row-reverse" }}>
            <div className="hstack gap-2">
              <button
                className="btn btn-danger"
                onClick={() => {
                  setModal(true);
                }}
              >
                <i className="ri-add-fill me-1 align-bottom"></i> Add New
              </button>
            </div>
          </Col>
        </Row>
      </CardHeader>
      <br />
      <div className="table-responsive table-card">
        <Table className="align-middle table-nowrap mb-0">
          <thead className="table-light">
            <tr>
              <th scope="col" style={{ width: "46px" }}>
                <div className="form-check">
                  <Input
                    className="form-check-input"
                    type="checkbox"
                    defaultValue=""
                    id="cardtableCheck"
                  />
                  <Label
                    className="form-check-label"
                    htmlFor="cardtableCheck"
                  ></Label>
                </div>
              </th>
              <th scope="col">Trans. ID</th>
              <th scope="col">Trans Date</th>
              <th scope="col">Bill Refrence</th>
              <th scope="col">Payment</th>
              <th scope="col">Due Date</th>
              <th scope="col">Location</th>
              <th scope="col">P.o/P.r</th>
              <th scope="col">Places</th>
              <th scope="col">Total Due</th>
              <th scope="col">Balance</th>
              <th scope="col">Freight Amount</th>
              <th scope="col">Discount</th>
              <th scope="col">Employee</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="form-check">
                  <Input
                    className="form-check-input"
                    type="checkbox"
                    defaultValue=""
                    id="cardtableCheck01"
                  />
                  <Label
                    className="form-check-label"
                    htmlFor="cardtableCheck01"
                  ></Label>
                </div>
              </td>
              <td>
                <Link to="#" className="fw-medium">
                  #VL2110
                </Link>
              </td>
              <td>William Elmore</td>
              <td>07 Oct, 2021</td>
              <td>$24.05</td>
              <td>$24.05</td>
              <td>$24.05</td>
              <td>$24.05</td>
              <td>$24.05</td>
              <td>$24.05</td>
              <td>$24.05</td>
              <td>$24.05</td>
              <td>$24.05</td>
              <td>$24.05</td>
            </tr>
            <tr>
              <td>
                <div className="form-check">
                  <Input
                    className="form-check-input"
                    type="checkbox"
                    defaultValue=""
                    id="cardtableCheck02"
                  />
                  <Label
                    className="form-check-label"
                    htmlFor="cardtableCheck02"
                  ></Label>
                </div>
              </td>
              <td>
                <Link to="#" className="fw-medium">
                  #VL2109
                </Link>
              </td>
              <td>Georgie Winters</td>
              <td>07 Oct, 2021</td>
              <td>$26.15</td>
              <td>$24.05</td>
              <td>$24.05</td>
              <td>$24.05</td>
              <td>$24.05</td>
              <td>$24.05</td>
              <td>$24.05</td>
              <td>$24.05</td>
              <td>$24.05</td>
              <td>$24.05</td>
            </tr>
            <tr>
              <td>
                <div className="form-check">
                  <Input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="cardtableCheck03"
                  />
                  <Label
                    className="form-check-label"
                    htmlFor="cardtableCheck03"
                  ></Label>
                </div>
              </td>
              <td>
                <Link to="#" className="fw-medium">
                  #VL2108
                </Link>
              </td>
              <td>Whitney Meier</td>
              <td>06 Oct, 2021</td>
              <td>$21.25</td>
              <td>$24.05</td>
              <td>$24.05</td>
              <td>$24.05</td>
              <td>$24.05</td>
              <td>$24.05</td>
              <td>$24.05</td>
              <td>$24.05</td>
              <td>$24.05</td>
              <td>$24.05</td>
            </tr>
            <tr>
              <td>
                <div className="form-check">
                  <Input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="cardtableCheck04"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="cardtableCheck04"
                  ></label>
                </div>
              </td>
              <td>
                <Link to="#" className="fw-medium">
                  #VL2107
                </Link>
              </td>
              <td>Justin Maier</td>
              <td>05 Oct, 2021</td>
              <td>$25.03</td>
              <td>$24.05</td>
              <td>$24.05</td>
              <td>$24.05</td>
              <td>$24.05</td>
              <td>$24.05</td>
              <td>$24.05</td>
              <td>$24.05</td>
              <td>$24.05</td>
              <td>$24.05</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default PurchaseReceipts;
