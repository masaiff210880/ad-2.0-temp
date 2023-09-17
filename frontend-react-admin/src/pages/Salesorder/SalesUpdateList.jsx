import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Col,
  Container,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  PopoverBody,
  PopoverHeader,
  Row,
  Table,
  UncontrolledPopover,
  UncontrolledTooltip
} from "reactstrap";
import { getAllVendor as onGetAllVendor } from "../../slices/ecommerce/thunk";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import SearchOption from "../../Components/Common/SearchOption";
import style from "../../styles//sales/SalesUpdateList.module.css";

// icons
import lockIcon from "../../assets/SalesOrderIcons/lock 1.svg";
import alerticon from "../../assets/images/products/add-line.svg";
import SalesOrderButtons from "./SalesOrderButtons";
// import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { getSallerData as onGetSalesOrder } from "../../slices/ecommerce/thunk";

const SalesUpdateList = () => {
  const [modal_standard, setmodal_standard] = useState(false);
  const [modal_tooltip, setmodal_tooltip] = useState(false);
  const [dele, setDele] = useState(0);
  const [deleteModal, setDeleteModal] = useState(false);
  const [custDelete, setCustDelete] = useState("");
  const dispatch = useDispatch();
  const [salesOrderList, setOrderList] = useState([]);
  const selectedSalesOrderData = createSelector(
    (state) => state.Ecommerce.salesOrder,
    (salesOrder) => salesOrder
  );
  const salesOrder = useSelector(selectedSalesOrderData);
  console.log("---------------", salesOrderList);

  useEffect(() => {
    dispatch(onGetSalesOrder());
  }, [dispatch]);

  useEffect(() => {
    setOrderList(salesOrder);
  }, [salesOrder]);

  // OrderView button
  function tog_standard() {
    setmodal_standard(!modal_standard);
  }
  function tog_tooltip() {
    setmodal_tooltip(!modal_tooltip);
  }

  function formatShortMonthDate(inputDateStr) {
    const inputDate = new Date(inputDateStr);

    const monthNamesShort = [
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

    const day = inputDate.getUTCDate();
    const month = monthNamesShort[inputDate.getUTCMonth()];
    const year = inputDate.getUTCFullYear();
    const hours = inputDate.getUTCHours();
    const minutes = inputDate.getUTCMinutes();

    function addLeadingZero(number) {
      return number < 10 ? "0" + number : number;
    }

    const amOrPm = hours < 12 ? "AM" : "PM";

    const formattedDateStr = `${day} ${month}, ${year}, ${addLeadingZero(
      hours % 12
    )}:${addLeadingZero(minutes)} ${amOrPm}`;

    return formattedDateStr;
  }

  const formatTimeAgo = (date) => {
    if (!date) {
      return "";
    }
    const currentDate = new Date();
    const assignedDate = new Date(date);

    const timeDifference = currentDate - assignedDate;
    const secondsDifference = Math.floor(timeDifference / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = Math.floor(minutesDifference / 60);
    const daysDifference = Math.floor(hoursDifference / 24);

    if (secondsDifference < 60) {
      return `${secondsDifference} second${secondsDifference !== 1 ? "s" : ""
        } ago`;
    } else if (minutesDifference < 60) {
      return `${minutesDifference} minute${minutesDifference !== 1 ? "s" : ""
        } ago`;
    } else if (hoursDifference < 24) {
      return `${hoursDifference} hour${hoursDifference !== 1 ? "s" : ""} ago`;
    } else {
      return `${daysDifference} day${daysDifference !== 1 ? "s" : ""} ago`;
    }
  };

  const pickPercentCalculation = (pickedQty, totalQty) => {
    // console.log("qqqttyy", pickedQty, totalQty);

    let percent = (Number(pickedQty) / Number(totalQty)) * 100;
    return `${percent}% Complete`;
  };
  // const handleVendorDelete = () => {
  //   // console.log("custom", customerId);
  //   dispatch(deleteCustomers(custDelete)).then(() => {
  //     setDeleteModal(false);
  //     dispatch(onGeAllCustomer())
  //     // console.log("total customer", onGeAllCustomer)
  //   })
  const displayDelete = () => {
    const ele = document.querySelectorAll(".vendorCheckbox:checked");
    const del = document.getElementById("selection-element");
    // ele.forEach((element) =>console.log((element.value)))

    // console.log("Delete",ele[0].value);
    setCustDelete(ele[0]?.value)
    // setCustDelete(ele?.value)
    setDele(ele.length);
    if (ele.length === 0) {
      del.style.display = "none";
    } else {
      del.style.display = "block";
    }
   
  };
  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb
          title="SALES ORDER"
          pageTitle="Sales Order"
          belong="Manage Sales"
        />
          <div className="col-auto d-flex justify-content-end bg-white" style={{ paddingRight: '25px', paddingTop: '10px' }}>
          <div id="selection-element">
            <div className="my-n1 d-flex align-items-center text-muted">
              Select{" "}
              <div id="select-content" className="text-body fw-semibold px-1">
                {dele}
              </div>{" "}
              Result{" "}
              <button
                type="button"
                className="btn btn-link link-danger p-0 ms-3"
                >
                Remove
              </button>
            </div>
          </div>
        </div>
        <div className={`navbar-header ${style.topHeader}`}>
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

            {/* <div>
            <p className= {`me-4 ms-4 align-middle  mt-4  ${style.assigntext}` }>Assigned to</p>
            <Button style={{ backgroundColor: "#5CCFFE", border: "none" ,height:"40px",marginTop:"15px"}}>
              <img src={Profilelogo} alt="" /> MD Suhail
            </Button>
            </div> */}
          </div>
          <SalesOrderButtons />

          <div className="d-flex align-items-center">
            <div style={{ marginRight: "6px" }}>
              <div className="col-sm-auto ms-auto"></div>
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
          </div>
        </div>
        <Table className="align-middle  mb-0 bg-white table table-bordered ">
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
              <th scope="col">Phase</th>
              <th scope="col">Stock Status</th>
              <th scope="col">Assigned</th>
              {/* <th scope="col">Trans No.</th> */}
              <th scope="col">Orig Order</th>
              <th scope="col">Bill to</th>
              <th scope="col">Account No.</th>
              <th scope="col">Received</th>
              <th scope="col">Fill by</th>
              <th scope="col">Terms</th>
              <th scope="col">Order Total</th>
              <th scope="col">Deposit/CR</th>
              <th scope="col">Order Balance</th>
            </tr>
          </thead>
          {salesOrderList?.map((item) => (
            <tbody>
              <tr>
                <th scope="row">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="chk_child"
                      value="option1"
                    
                      onClick={() => displayDelete()}
                    />
                  </div>
                </th>
                <td className="text-center align-middle ">
                  {" "}
                  <img src={lockIcon} /> {item?.phase}
                </td>
                <td
                  className="status"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    columnGap: "10px"
                  }}
                  >
                  {item?.isPickedAllItems ? (
                    <span className="badge bg-success-subtle text-success text-uppercase me-1">
                      Verified
                    </span>
                  ) : item.assignedTo !== "none" && !item.isPickingStarted ? (
                    <span className="badge bg-warning-subtle text-warning text-uppercase me-1">
                      Queued
                    </span>
                  ) : item.isPickingStarted ? (
                    <span className="badge bg-light text-primary text-uppercase me-1">
                      Pick
                    </span>
                  ) : (
                   
                    <span></span>
                  )}
                  <span>
                    <div style={{ flex: 1 }}>{item?.stockStatus}</div>
                    {!item?.isPickedAllItems && (
                      <div
                        style={{ flex: 1, textAlign: "right", color: "gray" }}
                      >
                        {item.isPickingStarted
                          ? // hard code -> need to change it
                          pickPercentCalculation(
                            item?.pickedPieces,
                            item?.pieces
                          )
                          : formatTimeAgo(item?.assignedAt)}
                      </div>
                    )}
                  </span>
                </td>

                <td className="id">
                  {item?.assignedTo === "none" ? "" : item?.assignedTo}
                </td>
                {/* <td className="id">10225933</td> */}
                <td className="id">{item?.uniqueId}</td>
                <td className="id">{item?.billTo}</td>
                <td className="id">{item?.accountNo}</td>
                <td className="id">
                  {formatShortMonthDate(item?.orderReceivedDate)}
                </td>
                <td className="id">
                  {formatShortMonthDate(item?.orderFilledDate) || ""}
                </td>
                {/* <td className="id">28 July, 2023, 06.00 AM</td> */}
                <td className="id">{item?.paymentTerms}</td>
                <td className="id">${item?.totalAmount}</td>
                <td className="id">{`${item?.depositAmount}.00`}</td>
                <td className="id">${item?.balanceAmount}</td>
              </tr>
            </tbody>
          ))}
        </Table>
        <br />

        {/* <Button color="primary" onClick={() => tog_standard()}>
          {" "}
          OrderList
        </Button> */}
        <Modal
          id="myModal"
          isOpen={modal_standard}
          toggle={() => {
            tog_standard();
          }}
        >
          <ModalHeader>
            <div
              className={`modal-title bg-success-subtle w-200 ${style.greencard}`}
            >
              <p style={{ left: "15px", position: "relative", top: "15px" }}>
                View Order Only
              </p>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="d-flex">
              <img src={alerticon} alt="" />
              {/* <FeatherIcon icon="alert-triangle" style={{width:"50px"}}/> */}
              <p
                className="fs-15 me-4"
                style={{ position: "relative", left: "10px" }}
              >
                This Order is already being processed for Shipment No changes to
                this Order can be made at this time.
              </p>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              className="mx-auto"
              color="success"
              onClick={() => {
                tog_standard();
              }}
            >
              Ok
            </Button>
          </ModalFooter>
        </Modal>

        {/* <Button color="primary" onClick={() => tog_tooltip(true)}>
          Launch Demo Modal
        </Button> */}

        <Modal
          size="lg"
          isOpen={modal_tooltip}
          toggle={() => {
            tog_tooltip();
          }}
        >
          <ModalHeader>
            <div className="text-center">
              <img src={alerticon} alt="" width={"60px"} />
              {/* <FeatherIcon icon="alert-triangle" style={{width:"200px"}}/> */}
              <h5 className="modal-title" style={{ textAlign: "center" }}>
                You are requesting to release this sales order from its locked
                status.
              </h5>
            </div>

            <div className={style.popuptext} style={{ paddingTop: "10px" }}>
              <p>
                This will reset the pick/verify/label status and relinquish the
                quantities <br /> picked from this order.
              </p>
            </div>
          </ModalHeader>
          <ModalBody>
            <ModalBody>
              <hr />
            </ModalBody>
            <form action="#">
              {/* <h5 className="fs-16" style={{ fontSize:"16px"}}></h5> */}
              {/* <br /> */}
              <div className="row g-3">
                <Row>
                  <Col>
                    <Label
                      htmlFor="leaveemails"
                      className="form-label"
                      style={{ fontSize: "18px" }}
                    >
                      Locked Order Status
                    </Label>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={3}>
                    <Label
                      htmlFor="leaveemails"
                      className="form-label"
                      style={{ color: "#878A99", fontSize: "15px" }}
                    >
                      Transaction No.
                    </Label>
                  </Col>
                  <Col lg={2}>
                    <Input
                      type="email"
                      className="form-control"
                      id="leaveemails"
                      placeholder="10226377"
                      style={{ backgroundColor: "rgba(41, 156, 219, 0.10)" }}
                    />
                  </Col>
                  <Col lg={2}>
                    <Label
                      htmlFor="leaveemails"
                      className="form-label"
                      style={{
                        color: "#878A99",
                        fontSize: "15px",
                        marginTop: "6px",
                        marginLeft: "30px"
                      }}
                    >
                      From
                    </Label>
                  </Col>
                  <Col lg={3}>
                    <Input
                      type="email"
                      className="form-control"
                      id="leaveemails"
                      placeholder="08/26/2023"
                      style={{ backgroundColor: "rgba(41, 156, 219, 0.10)" }}
                    />
                  </Col>
                  <Col lg={2}>
                    <Label
                      htmlFor="leaveemails"
                      className="form-label"
                      style={{
                        color: "#201D33",
                        fontSize: "15px",
                        marginTop: "6px"
                      }}
                    >
                      LOCKED
                    </Label>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col lg={3}>
                    <Label
                      htmlFor="leaveemails"
                      className="form-label"
                      style={{ color: "#878A99", fontSize: "13px" }}
                    >
                      Pick Status:
                    </Label>
                  </Col>
                  <Col lg={9}>
                    <Input
                      type="email"
                      className="form-control"
                      id="leaveemails"
                      placeholder="Pick/Verification Complete. ( 8 Pieces Picked )"
                      style={{ backgroundColor: "rgba(41, 156, 219, 0.10)" }}
                    />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col lg={3}>
                    <Label
                      htmlFor="leaveemails"
                      className="form-label"
                      style={{ color: "#878A99", fontSize: "13px" }}
                    >
                      Picked By
                    </Label>
                  </Col>
                  <Col lg={6}>
                    <Input
                      type="email"
                      className="form-control"
                      id="leaveemails"
                      placeholder="IFI"
                      style={{ backgroundColor: "rgba(41, 156, 219, 0.10)" }}
                    />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col lg={6}>
                    <Label
                      htmlFor="leaveemails"
                      className="form-label"
                      style={{ color: "#878A99", fontSize: "13px" }}
                    >
                      Type{" "}
                      <span
                        style={{
                          color: "#17142A",
                          fontSize: "16px",
                          fontWeight: "600"
                        }}
                      >
                        "YES"
                      </span>{" "}
                      to confirm release of order
                    </Label>
                  </Col>
                  <Col lg={6}>
                    <Input
                      type="email"
                      className="form-control"
                      id="leaveemails"
                      style={{ backgroundColor: "rgba(41, 156, 219, 0.10)" }}
                    />
                  </Col>
                </Row>

                <div className="col-lg-12">
                  <div className="hstack gap-2 justify-content-end">
                    <Button
                      color="light bg-success text-white"
                      onClick={() => tog_tooltip(false)}
                    >
                      OK
                    </Button>
                    <Button color=" bg-danger text-white">Cancel</Button>
                  </div>
                </div>
                <br />
                <br />
                <div className="d-flex">
                  <div>
                    <p className={style.remotetext}>Remote Assistance</p>
                  </div>
                  <div className={style.serialtext}>
                    <p>
                      Serial No. <span> 26301961</span>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </ModalBody>
        </Modal>
      </Container>
    </div>
  );
};

export default SalesUpdateList;
