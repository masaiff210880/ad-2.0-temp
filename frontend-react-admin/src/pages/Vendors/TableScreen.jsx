import React, { useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { CardHeader, Input, Label } from "reactstrap";
import style from "../../assets/scss/config/ProductReceipt.module.css";
import { Link } from "react-router-dom";
const TableScreen = ({ onRowClick, data }) => {
  document.title = "Vendor List | American Distributors";
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
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  const toggleCheckbox = (id) => {
    if (selectedCheckboxes.includes(id)) {
      setSelectedCheckboxes(
        selectedCheckboxes.filter((checkboxId) => checkboxId !== id)
      );
    } else {
      setSelectedCheckboxes([...selectedCheckboxes, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selectAllChecked) {
      setSelectedCheckboxes([]);
    } else {
      const allCheckboxIds = Array.from(
        document.querySelectorAll('input[type="checkbox"]')
      )
        .map((checkbox) => checkbox.id)
        .filter((id) => id.startsWith("cardtableCheck"));
      setSelectedCheckboxes(allCheckboxIds);
    }
    setSelectAllChecked(!selectAllChecked);
  };

  return (
    <>
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
                <select className="form-control" style={{ margin: "0px 15px" }}>
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
            <Col
              xl={3}
              style={{ display: "flex", flexDirection: "row-reverse" }}
            >
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
            <thead style={{ backgroundColor: "#4DAFE633" }}>
              <tr>
                <th scope="col" style={{ width: "46px" }}>
                  <div className="form-check">
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue=""
                      id="cardtableCheck"
                      checked={selectAllChecked}
                      onChange={toggleSelectAll}
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
            <tbody className={style.tableBodyHover}>
              {data?.map((item) => (
                <tr>
                  <td>
                    <div className="form-check">
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                        id="cardtableCheck01"
                        checked={selectedCheckboxes.includes(
                          "cardtableCheck01"
                        )}
                        onChange={() => toggleCheckbox("cardtableCheck01")}
                      />
                      <Label
                        className="form-check-label"
                        htmlFor="cardtableCheck01"
                      ></Label>
                    </div>
                  </td>
                  <td onClick={() => onRowClick(item)} className="clickMouseHover">
                      {item?.transactionId}
                  </td>
                  <td>{formatDate(item?.transactionDate)}</td>
                  <td>{item?.billReference}</td>
                  <td>${item?.depositeAmount}</td>
                  <td>{item?.dueDate}</td>
                  <td>{item?.location}</td>
                  <td>{item?.refPoPr}</td>
                  <td>{item?.pieces}</td>
                  <td>${item?.totalAmount}</td>
                  <td>${item?.balanceAmount}</td>
                  <td>${item?.freightAmount}</td>
                  <td>${item?.discountAmount}</td>
                  <td>{item?.employee}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default TableScreen;
