import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Input,
  Label,
  Table,
  Nav,
  NavItem,
  NavLink,
  Col,
  Row,
} from "reactstrap";
import classnames from "classnames";
import {
  getAllCustomer as onGeAllCustomer,
  deleteCustomers,
} from "../../slices/ecommerce/thunk";
import DeleteModal from "../../Components/Common/DeleteModal";

import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import SearchOption from "../../Components/Common/SearchOption";
import style from "../../styles/vendor/PurchaseOrder.module.css";
import BreadCrumb from "../../Components/Common/BreadCrumb";

const VendorList = () => {
  document.title = "Customer List | American Distributors";
  const dispatch = useDispatch();
  const [customerList, setCustomerList] = useState([]);
  const [activeTab, setActiveTab] = useState("1");
  const [dele, setDele] = useState(0);
  const [custDelete, setCustDelete] = useState("");
  // const [custDelete, setCustDelete] = useState([]);

  // console.log(custDelete);

  const selectCustomerData = createSelector(
    (state) => state.Ecommerce.customer,
    (customer) => customer
  );

  const handleVendorDelete = () => {
    // console.log("custom", customerId);
    dispatch(deleteCustomers(custDelete)).then(() => {
      setDeleteModal(false);
      dispatch(onGeAllCustomer())
      // console.log("total customer", onGeAllCustomer)
    })
    // if(customerList){
    //   console.log("customerList", customerList);
    // }

    // dispatch()
    //api funtion
  };
  const [deleteModal, setDeleteModal] = useState(false);
  // Display Delete Button
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

  const customerData = useSelector(selectCustomerData);
  // console.log("first", customerList);
  // const toggleTab = (tab, type) => {
  //   if (activeTab !== tab) {
  //     setActiveTab(tab);
  //     let filteredProducts = customerData;
  //     if (type !== "all") {
  //       filteredProducts = customerData.filter(
  //         (customerData) => customerData.status === type
  //       );
  //     }
  //     setCustomerList(filteredProducts);
  //   }
  // };
  const toggleTab = (tab, type) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
      let filteredProducts = customerData;

      switch (type) {
        case "Active":
          filteredProducts = customerData.filter(
            (customer) => customer.status === "Active"
          );
          break;
        case "Pending":
          filteredProducts = customerData.filter(
            (customer) => customer.status === "Pending"
          );
          break;
        case "Blocked":
        case "Rejected":
          filteredProducts = customerData.filter(
            (customer) =>
              customer.status === "Blocked" || customer.status === "Rejected"
          );
          break;
        case "Inactive":
          filteredProducts = customerData.filter(
            (customer) => customer.status === "Inactive"
          );
          break;
        default:
          // For the "All" tab and any other unexpected type, no specific filter condition
          break;
      }

      setCustomerList(filteredProducts);
    }
  };
  useEffect(() => {
    dispatch(onGeAllCustomer());
  }, [dispatch]);

  useEffect(() => {
    setCustomerList(customerData);
  }, [customerData]);

  return (
    <div className="page-content">
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleVendorDelete}
        onCloseClick={() => setDeleteModal(false)}
      />
      <Container fluid>
        <BreadCrumb
          title="All Customer"
          pageTitle="All Customer"
          belong="Customer"
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
                onClick={() => setDeleteModal(true)}
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
          </div>

          <div className="d-flex align-items-center">
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
                    to="/add-customer"
                    className="btn btn-success bg_add_product"
                  >
                    <i className="ri-add-line align-bottom me-1" style={{}}></i>
                    Add Customer
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex bg-white">
          <Row className=" align-items-center">
            <Col>
              <Nav
                className="nav-tabs-custom card-header-tabs border-bottom-0"
                role="tablist"
              >
                <NavItem>
                  <NavLink
                    className={classnames(
                      { active: activeTab === "1" },
                      "fw-semibold"
                    )}
                    onClick={() => {
                      toggleTab("1", "all");
                    }}
                    href="#"
                  >
                    All{" "}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames(
                      { active: activeTab === "2" },
                      "fw-semibold"
                    )}
                    onClick={() => {
                      toggleTab("2", "Active");
                    }}
                    href="#"
                  >
                    Active{" "}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames(
                      { active: activeTab === "3" },
                      "fw-semibold"
                    )}
                    onClick={() => {
                      toggleTab("3", "Pending");
                    }}
                    href="#"
                  >
                    Pending
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames(
                      { active: activeTab === "4" },
                      "fw-semibold"
                    )}
                    onClick={() => {
                      toggleTab("4", "Blocked");
                    }}
                    href="#"
                  >
                    Blocked
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames(
                      { active: activeTab === "5" },
                      "fw-semibold"
                    )}
                    onClick={() => {
                      toggleTab("5", "Inactive");
                    }}
                    href="#"
                  >
                    Inactive
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
            {/* remove button */}

            {/*  */}
          </Row>
          {/* <div style={{ paddingLeft: "66%", fontWeight: "600" }}>
            <span className="">{`Total Customer : ${customerList?.length}`}</span>
          </div> */}
        </div>
        <Table className="align-middle table-nowrap mb-0 bg-white">
          <thead className="table-light">
            <tr>
              <th scope="col" style={{ width: "46px" }}>
                <div className="form-check">
                  <Input
                    className="vendorCheckbox form-check-input"
                    type="checkbox"
                    defaultValue=""
                  // id="cardtableCheck"
                  // onClick={() => displayDelete()}
                  />
                  <Label
                    className="form-check-label"
                    htmlFor="cardtableCheck"
                  ></Label>
                </div>
              </th>
              <th scope="col">Name</th>
              <th scope="col">Company Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Payables</th>
              <th scope="col">Status</th>
              <th scope="col" style={{ width: "100px", textAlign: "center" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {customerList?.map((item) => (
              <tr>
                <td>
                  <div className="form-check">
                    <Input
                      className="vendorCheckbox form-check-input"
                      type="checkbox"
                      value={item._id}
                      id="cardtableCheck01"
                      onClick={() => displayDelete()}
                    />
                    <Label
                      className="form-check-label"
                      htmlFor="cardtableCheck01"
                    ></Label>
                  </div>
                </td>
                <td>
                  <Link
                    to={`/customer-overview/${item?._id}`}
                    className="clickMouseHover"
                  >{`${item?.firstName} ${item?.lastName}`}</Link>
                </td>
                <td>
                  <Link
                    to={`/customer-overview/${item?._id}`}
                    className="clickMouseHover"
                  >
                    {item?.userLicenses?.[0]?.businessName  || "Cartoon World"}
                  </Link>
                </td>
                <td>
                  <Link
                    to={`/customer-overview/${item?._id}`}
                    className="clickMouseHover"
                  >
                    {item?.email}
                  </Link>
                </td>
                <td>{item?.phoneNumber}</td>
                <td>{item?.creditAmount}</td>
                <td>
                  {" "}
                  {
                    <span
                      className={
                        item?.status.toLowerCase() === "inactive"
                          ? "badge bg-secondary-subtle text-secondary"
                          : item?.status.toLowerCase() === "blocked"
                            ? "badge bg-danger-subtle text-danger"
                            : item?.status.toLowerCase() === "pending"
                              ? "badge bg-danger-subtle text-warning"
                              : item?.status.toLowerCase() === "rejected"
                                ? "badge bg-danger-subtle text-danger"
                                : "badge bg-success-subtle text-success"
                      }
                    >
                      {item?.status}
                    </span>
                  }
                </td>
                <td>
                  <ul
                    className="list-inline hstack gap-2 mb-0"
                    style={{ textAlign: "center" }}
                  >
                    <li className="list-inline-item">
                      <Link to="#" className="text-primary d-inline-block">
                        <i className="ri-eye-fill fs-16"></i>
                      </Link>
                    </li>
                    <li className="list-inline-item edit">
                      <Link
                        to={`/edit-customer/${item?._id}`}
                        className="text-primary d-inline-block edit-item-btn"
                      >
                        <i className="ri-pencil-fill fs-16"></i>
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link
                        to="#"
                        className="text-danger d-inline-block remove-item-btn"
                      >
                        <i className="ri-delete-bin-5-fill fs-16" onClick={() => setDeleteModal(true)}></i>
                      </Link>
                    </li>
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default VendorList;
