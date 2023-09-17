import React, { useEffect } from "react";
import { useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  Progress,
  Row,
  TabContent,
  TabPane,
  Table,
  UncontrolledDropdown,
  UncontrolledCollapse,
  Pagination,
  PaginationItem,
  PaginationLink,
  Input,
  Label
} from "reactstrap";
import SwiperCore, { Autoplay } from "swiper";
import classnames from "classnames";
import { Swiper, SwiperSlide } from "swiper/react";
import avatar1 from "../../assets/images/users/avatar-1.jpg";
import avatar2 from "../../assets/images/users/avatar-2.jpg";
import avatar3 from "../../assets/images/users/avatar-3.jpg";
import avatar4 from "../../assets/images/users/avatar-4.jpg";
import avatar5 from "../../assets/images/users/avatar-5.jpg";
import avatar6 from "../../assets/images/users/avatar-6.jpg";
import avatar7 from "../../assets/images/users/avatar-7.jpg";
import avatar8 from "../../assets/images/users/avatar-8.jpg";

import smallImage2 from "../../assets/images/small/img-2.jpg";
import smallImage3 from "../../assets/images/small/img-3.jpg";
import smallImage4 from "../../assets/images/small/img-4.jpg";

import { projects, documents } from "../../Components/Common/pagesData";
// icons
// style
import style from "../../styles/products/VendorFlow.module.css";
const OverView = ({ singleCustomer, salesOrderList, activity }) => {
  console.log("singleCustomer", singleCustomer);
  console.log("activity data", activity);
  document.title = "Customer Overview";
  SwiperCore.use([Autoplay]);
  const [activeTab, setActiveTab] = useState("1");
  const [activityTab, setActivityTab] = useState("1");

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
console.log("customer",singleCustomer)
  const toggleActivityTab = (tab) => {
    if (activityTab !== tab) {
      setActivityTab(tab);
    }
  };

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
      "Dec"
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
      <React.Fragment>
        <TabContent activeTab={activeTab} className="pt-4">
          <TabPane tabId="1">
            <Row>
              <Col xxl={3}>
                <div className={style.card}>
                  <Card>
                    <CardBody>
                      <h5 className="card-title mb-3">Info</h5>
                      <div className="table-responsive">
                        <Table
                          className={`table-borderless mb-0 ${style.table}`}
                        >
                          <tbody>
                            <tr>
                              <th className="ps-0" scope="row">
                                Full Name:
                              </th>
                              <td className="text-muted">{`${singleCustomer?.firstName} ${singleCustomer?.lastName}`}</td>
                            </tr>
                            <tr>
                              <th className="ps-0" scope="row">
                                Company Name:{""}
                              </th>
                              <td className="text-muted">
                              {singleCustomer?.userLicenses[0].businessName }
                              </td>
                            </tr>
                            <tr>
                              <th className="ps-0" scope="row">
                                Account Number:{" "}
                              </th>
                              <td className="text-muted">
                                {singleCustomer?.internalAccountNumber || 1001}
                              </td>
                            </tr>
                           
                          
                            <tr>
                              <th className="ps-0" scope="row">
                                Mobile:{" "}
                              </th>
                              <td className="text-muted">
                                +(1) {singleCustomer?.phoneNumber}
                              </td>
                            </tr>
                            <tr>
                              <th className="ps-0" scope="row">
                                E-mail:{" "}
                              </th>
                              <td className="text-muted">
                                {singleCustomer?.email}
                              </td>
                            </tr>
                            <tr>
                              <th className="ps-0" scope="row">
                                Location:{" "}
                              </th>
                              <td className="text-muted">
                              {singleCustomer?.userLicenses[0].businessAddress  }
                              </td>
                            </tr>
                            <tr>
                              <th className="ps-0" scope="row">
                                Account Created:{" "}
                              </th>
                              <td className="text-muted">
                                {formatDate(singleCustomer?.createdAt)}
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </Col>
              <Col xxl={9}>
                <Row>
                  <Col lg={12}>
                    <Card>
                      <CardHeader className="align-items-center d-flex">
                        <h4 className="card-title mb-0  me-2">
                          Recent Activity
                        </h4>
                        <div className="flex-shrink-0 ms-auto d-flex align-items-center justify-content-between">
                          <Nav
                            className="justify-content-end nav-tabs-custom rounded card-header-tabs border-bottom-0 gap-3"
                            role="tablist"
                          >
                            <NavItem>
                              <NavLink
                                to="#today-tab"
                                className={classnames({
                                  active: activityTab === "1"
                                })}
                                onClick={() => {
                                  purchaseOrder;
                                  toggleActivityTab("1");
                                }}
                              >
                                Today
                              </NavLink>
                            </NavItem>
                            <NavItem>
                              <NavLink
                                to="#weekly-tab"
                                className={classnames({
                                  active: activityTab === "2"
                                })}
                                onClick={() => {
                                  toggleActivityTab("2");
                                }}
                              >
                                Weekly
                              </NavLink>
                            </NavItem>
                            <NavItem className="nav-item">
                              <NavLink
                                to="#monthly-tab"
                                className={classnames({
                                  active: activityTab === "3"
                                })}
                                onClick={() => {
                                  toggleActivityTab("3");
                                }}
                              >
                                Monthly
                              </NavLink>
                            </NavItem>
                          </Nav>
                        </div>
                      </CardHeader>
                      <CardBody>
                        {activity?.map((item) => (
                          <TabContent
                            activeTab={activityTab}
                            className="text-muted"
                          >
                            <TabPane tabId="1">
                              <div className="profile-timeline">
                                <div></div>
                                <div
                                  className="accordion accordion-flush"
                                  id="todayExample"
                                >
                                  <div className="accordion-item border-0">
                                    <div className="accordion-header">
                                      <button
                                        className="accordion-button p-2 shadow-none"
                                        type="button"
                                        id="headingOne"
                                      >
                                        <div className="d-flex">
                                          <div className="flex-shrink-0">
                                            <img
                                              src={
                                                item?.adminId
                                                  ? item?.adminId?.avatar
                                                  : singleCustomer?.avatar
                                              }
                                              alt=""
                                              className="avatar-xs rounded-circle"
                                            />
                                          </div>
                                          <div className="flex-grow-1 ms-3">
                                            <h6 className="fs-14 mb-1">{`${
                                              !item?.adminId ||
                                              item?.adminId === null
                                                ? "Order online"
                                                : item?.adminId?.firstName
                                            } ${
                                              !item?.adminId ||
                                              item?.adminId === null
                                                ? "- By User"
                                                : item?.adminId?.lastName
                                            }`}</h6>
                                            <small className="text-muted">
                                              User submitted on{" "}
                                              {formatDate(item?.createdAt)}
                                            </small>
                                          </div>
                                        </div>
                                      </button>
                                    </div>
                                    <UncontrolledCollapse
                                      className="accordion-collapse"
                                      toggler="#headingOne"
                                      defaultOpen
                                    >
                                      <div className="accordion-body ms-2 ps-5">
                                        {item?.body}
                                      </div>
                                    </UncontrolledCollapse>
                                  </div>
                                  <div className="accordion-item border-0">
                                    <div
                                      className="accordion-header"
                                      id="headingTwo"
                                    >
                                      <Link
                                        to="#"
                                        className="accordion-button p-2 shadow-none"
                                        id="collapseTwo"
                                      >
                                        <div className="d-flex">
                                          <div className="flex-shrink-0 avatar-xs">
                                            <div className="avatar-title bg-light text-success rounded-circle">
                                              {item?.adminId ? item?.adminId?.firstName : "User"}
                                            </div>
                                          </div>
                                          <div className="flex-grow-1 ms-3">
                                            <h6 className="fs-14 mb-1">{`${
                                              !item?.adminId ||
                                              item?.adminId === null
                                                ? "Order online"
                                                : item?.adminId?.firstName
                                            } ${
                                              !item?.adminId ||
                                              item?.adminId === null
                                                ? "- By User"
                                                : item?.adminId?.lastName
                                            }`}</h6>
                                            <small className="text-muted">
                                              {item?.subject} -{" "}
                                              {formatDate(item?.createdAt)}
                                            </small>
                                          </div>
                                        </div>
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </TabPane>
                          </TabContent>
                        ))}
                      </CardBody>
                    </Card>
                  </Col>
                </Row>

                <Card>
                  <CardBody>
                    <div className="d-flex justify-content-between gap-2 mb-2">
                      <h5 className="card-title">Sales Orders</h5>
                      <div className="d-flex gap-2">
                        <div className="slider-button-prev">
                          <div className="avatar-title fs-18 rounded px-1">
                            <i className="ri-arrow-left-s-line"></i>
                          </div>
                        </div>
                        <div className="slider-button-next">
                          <div className="avatar-title fs-18 rounded px-1">
                            <i className="ri-arrow-right-s-line"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Swiper
                      className="project-swiper"
                      slidesPerView={3}
                      spaceBetween={20}
                      autoplay={{ delay: 3000, disableOnInteraction: false }}
                      pagination={{ clickable: true }}
                    >
                      <div className="swiper-wrapper">
                        {salesOrderList?.map((item) => (
                          // console.log("item", item),
                          <SwiperSlide>
                            <Card
                              className={`profile-project-card shadow-none ${
                                item?.orderStatus.toLowerCase() === "open"
                                  ? "profile-project-secondary"
                                  : item?.orderStatus.toLowerCase() === "closed"
                                  ? "profile-project-danger"
                                  : "profile-project-success"
                              } mb-0`}
                            >
                              <CardBody className="p-4">
                                <div className="d-flex">
                                  <div className="flex-grow-1 text-muted overflow-hidden">
                                    <h5 className="fs-14 text-truncate mb-1">
                                      <Link to="#" className="text-body">
                                        PO:{item?.uniqueId}
                                      </Link>
                                    </h5>
                                    <p className="text-muted text-truncate mb-0">
                                      Last Update :{" "}
                                      <span className="fw-semibold text-body">
                                        4 hr Ago
                                      </span>
                                    </p>
                                  </div>
                                  <div className="flex-shrink-0 ms-2">
                                    {
                                      <span
                                        className={
                                          item?.orderStatus?.toLowerCase() ===
                                          "upcoming"
                                            ? "badge bg-secondary-subtle text-secondary"
                                            : item?.orderStatus?.toLowerCase() ===
                                              "closed"
                                            ? "badge bg-danger-subtle text-danger"
                                            : "badge bg-success-subtle text-success"
                                        }
                                      >
                                        {item?.orderStatus}
                                      </span>
                                    }
                                  </div>
                                </div>
                                <div className="d-flex mt-4">
                                  <div className="flex-grow-1">
                                    <div className="d-flex align-items-center gap-2">
                                      <div>
                                        <h5 className="fs-12 text-muted mb-0">
                                          Members :
                                        </h5>
                                      </div>
                                      <div className="avatar-group">
                                        <div className="avatar-group-item">
                                          <div className="avatar-xs">
                                            <img
                                              src={avatar4}
                                              alt=""
                                              className="rounded-circle img-fluid"
                                            />
                                          </div>
                                        </div>
                                        <div className="avatar-group-item">
                                          <div className="avatar-xs">
                                            <img
                                              src={avatar5}
                                              alt=""
                                              className="rounded-circle img-fluid"
                                            />
                                          </div>
                                        </div>
                                        <div className="avatar-group-item">
                                          <div className="avatar-xs">
                                            <div className="avatar-title rounded-circle bg-light text-primary">
                                              A
                                            </div>
                                          </div>
                                        </div>
                                        <div className="avatar-group-item">
                                          <div className="avatar-xs">
                                            <img
                                              src={avatar2}
                                              alt=""
                                              className="rounded-circle img-fluid"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </CardBody>
                            </Card>
                          </SwiperSlide>
                        ))}
                      </div>
                    </Swiper>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Card>
              <CardBody>
                <h5 className="card-title mb-3">Activities</h5>
                <div className="acitivity-timeline">
                  <div className="acitivity-item d-flex">
                    <div className="flex-shrink-0">
                      <img
                        src={avatar1}
                        alt=""
                        className="avatar-xs rounded-circle acitivity-avatar"
                      />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6 className="mb-1">
                        Oliver Phillips{" "}
                        <span className="badge bg-primary-subtle text-primary align-middle">
                          New
                        </span>
                      </h6>
                      <p className="text-muted mb-2">
                        We talked about a project on linkedin.
                      </p>
                      <small className="mb-0 text-muted">Today</small>
                    </div>
                  </div>
                  <div className="acitivity-item py-3 d-flex">
                    <div className="flex-shrink-0 avatar-xs acitivity-avatar">
                      <div className="avatar-title bg-success-subtle text-success rounded-circle">
                        {" "}
                        N{" "}
                      </div>
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6 className="mb-1">
                        Nancy Martino{" "}
                        <span className="badge bg-secondary-subtle text-secondary align-middle">
                          In Progress
                        </span>
                      </h6>
                      <p className="text-muted mb-2">
                        <i className="ri-file-text-line align-middle ms-2"></i>
                        Create new project Buildng product
                      </p>
                      <div className="avatar-group mb-2">
                        <Link
                          to="#"
                          className="avatar-group-item"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title=""
                          data-bs-original-title="Christi"
                        >
                          <img
                            src={avatar4}
                            alt=""
                            className="rounded-circle avatar-xs"
                          />
                        </Link>
                        <Link
                          to="#"
                          className="avatar-group-item"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title=""
                          data-bs-original-title="Frank Hook"
                        >
                          <img
                            src={avatar3}
                            alt=""
                            className="rounded-circle avatar-xs"
                          />
                        </Link>
                        <Link
                          to="#"
                          className="avatar-group-item"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title=""
                          data-bs-original-title=" Ruby"
                        >
                          <div className="avatar-xs">
                            <div className="avatar-title rounded-circle bg-light text-primary">
                              R
                            </div>
                          </div>
                        </Link>
                        <Link
                          to="#"
                          className="avatar-group-item"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title=""
                          data-bs-original-title="more"
                        >
                          <div className="avatar-xs">
                            <div className="avatar-title rounded-circle">
                              2+
                            </div>
                          </div>
                        </Link>
                      </div>
                      <small className="mb-0 text-muted">Yesterday</small>
                    </div>
                  </div>
                  <div className="acitivity-item py-3 d-flex">
                    <div className="flex-shrink-0">
                      <img
                        src={avatar2}
                        alt=""
                        className="avatar-xs rounded-circle acitivity-avatar"
                      />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6 className="mb-1">
                        Natasha Carey{" "}
                        <span className="badge bg-success-subtle text-success align-middle">
                          Completed
                        </span>
                      </h6>
                      <p className="text-muted mb-2">
                        Adding a new event with attachments
                      </p>
                      <Row>
                        <Col xxl={4}>
                          <div className="row border border-dashed gx-2 p-2 mb-2">
                            <div className="col-4">
                              <img
                                src={smallImage2}
                                alt=""
                                className="img-fluid rounded"
                              />
                            </div>

                            <div className="col-4">
                              <img
                                src={smallImage3}
                                alt=""
                                className="img-fluid rounded"
                              />
                            </div>

                            <div className="col-4">
                              <img
                                src={smallImage4}
                                alt=""
                                className="img-fluid rounded"
                              />
                            </div>
                          </div>
                        </Col>
                      </Row>
                      <small className="mb-0 text-muted">25 Nov</small>
                    </div>
                  </div>
                  <div className="acitivity-item py-3 d-flex">
                    <div className="flex-shrink-0">
                      <img
                        src={avatar6}
                        alt=""
                        className="avatar-xs rounded-circle acitivity-avatar"
                      />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6 className="mb-1">Bethany Johnson</h6>
                      <p className="text-muted mb-2">
                        added a new member to velzon dashboard
                      </p>
                      <small className="mb-0 text-muted">19 Nov</small>
                    </div>
                  </div>
                  <div className="acitivity-item py-3 d-flex">
                    <div className="flex-shrink-0">
                      <div className="avatar-xs acitivity-avatar">
                        <div className="avatar-title rounded-circle bg-danger-subtle text-danger">
                          <i className="ri-shopping-bag-line"></i>
                        </div>
                      </div>
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6 className="mb-1">
                        Your order is placed{" "}
                        <span className="badge bg-danger-subtle text-danger align-middle ms-1">
                          Out of Delivery
                        </span>
                      </h6>
                      <p className="text-muted mb-2">
                        These customers can rest assured their order has been
                        placed.
                      </p>
                      <small className="mb-0 text-muted">16 Nov</small>
                    </div>
                  </div>
                  <div className="acitivity-item py-3 d-flex">
                    <div className="flex-shrink-0">
                      <img
                        src={avatar7}
                        alt=""
                        className="avatar-xs rounded-circle acitivity-avatar"
                      />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6 className="mb-1">Lewis Pratt</h6>
                      <p className="text-muted mb-2">
                        They all have something to say beyond the words on the
                        page. They can come across as casual or neutral, exotic
                        or graphic.{" "}
                      </p>
                      <small className="mb-0 text-muted">22 Oct</small>
                    </div>
                  </div>
                  <div className="acitivity-item py-3 d-flex">
                    <div className="flex-shrink-0">
                      <div className="avatar-xs acitivity-avatar">
                        <div className="avatar-title rounded-circle bg-info-subtle text-info">
                          <i className="ri-line-chart-line"></i>
                        </div>
                      </div>
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6 className="mb-1">Monthly sales report</h6>
                      <p className="text-muted mb-2">
                        <span className="text-danger">2 days left</span>{" "}
                        notification to submit the monthly sales report.{" "}
                        <Link
                          to="#"
                          className="link-warning text-decoration-underline"
                        >
                          Reports Builder
                        </Link>
                      </p>
                      <small className="mb-0 text-muted">15 Oct</small>
                    </div>
                  </div>
                  <div className="acitivity-item d-flex">
                    <div className="flex-shrink-0">
                      <img
                        src={avatar8}
                        alt=""
                        className="avatar-xs rounded-circle acitivity-avatar"
                      />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6 className="mb-1">
                        New ticket received{" "}
                        <span className="badge bg-success-subtle text-success align-middle">
                          Completed
                        </span>
                      </h6>
                      <p className="text-muted mb-2">
                        User <span className="text-secondary">Erica245</span>{" "}
                        submitted a ticket.
                      </p>
                      <small className="mb-0 text-muted">26 Aug</small>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </TabPane>

          <TabPane tabId="3">
            <Card>
              <CardBody>
                <Row>
                  {(projects || []).map((item, key) => (
                    <Col xxl={3} sm={6} key={key}>
                      <Card
                        className={`profile-project-card shadow-none profile-project-${item.cardBorderColor}`}
                      >
                        <CardBody className="p-4">
                          <div className="d-flex">
                            <div className="flex-grow-1 text-muted overflow-hidden">
                              <h5 className="fs-14 text-truncate">
                                <Link to="#" className="text-body">
                                  {item.title}
                                </Link>
                              </h5>
                              <p className="text-muted text-truncate mb-0">
                                Last Update :{" "}
                                <span className="fw-semibold text-body">
                                  {item.updatedTime}
                                </span>
                              </p>
                            </div>
                            <div className="flex-shrink-0 ms-2">
                              <div
                                className={`badge bg-${item.badgeClass}-subtle text-${item.badgeClass} fs-10`}
                              >
                                {item.badgeText}
                              </div>
                            </div>
                          </div>

                          <div className="d-flex mt-4">
                            <div className="flex-grow-1">
                              <div className="d-flex align-items-center gap-2">
                                <div>
                                  <h5 className="fs-12 text-muted mb-0">
                                    Members :
                                  </h5>
                                </div>
                                <div className="avatar-group">
                                  {(item.member || []).map((subitem, key) => (
                                    <div
                                      className="avatar-group-item"
                                      key={key}
                                    >
                                      <div className="avatar-xs">
                                        <img
                                          src={subitem.img}
                                          alt=""
                                          className="rounded-circle img-fluid"
                                        />
                                      </div>
                                    </div>
                                  ))}

                                  {(item.memberName || []).map(
                                    (element, key) => (
                                      <div
                                        className="avatar-group-item"
                                        key={key}
                                      >
                                        <div className="avatar-xs">
                                          <div className="avatar-title rounded-circle bg-light text-primary">
                                            {element.memberText}
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  ))}
                  <Col lg={12}>
                    <Pagination
                      listClassName="justify-content-center"
                      className="pagination-separated mb-0"
                    >
                      <PaginationItem disabled>
                        {" "}
                        <PaginationLink to="#">
                          {" "}
                          <i className="mdi mdi-chevron-left" />{" "}
                        </PaginationLink>{" "}
                      </PaginationItem>
                      <PaginationItem active>
                        {" "}
                        <PaginationLink to="#"> 1 </PaginationLink>{" "}
                      </PaginationItem>
                      <PaginationItem>
                        {" "}
                        <PaginationLink to="#"> 2 </PaginationLink>{" "}
                      </PaginationItem>
                      <PaginationItem>
                        {" "}
                        <PaginationLink to="#"> 3 </PaginationLink>{" "}
                      </PaginationItem>
                      <PaginationItem>
                        {" "}
                        <PaginationLink to="#"> 4 </PaginationLink>{" "}
                      </PaginationItem>
                      <PaginationItem>
                        {" "}
                        <PaginationLink to="#"> 5 </PaginationLink>{" "}
                      </PaginationItem>
                      <PaginationItem>
                        {" "}
                        <PaginationLink to="#">
                          {" "}
                          <i className="mdi mdi-chevron-right" />{" "}
                        </PaginationLink>{" "}
                      </PaginationItem>
                    </Pagination>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </TabPane>

          <TabPane tabId="4">
            <Card>
              <CardBody>
                <div className="d-flex align-items-center mb-4">
                  <h5 className="card-title flex-grow-1 mb-0">Documents</h5>
                  <div className="flex-shrink-0">
                    <Input
                      className="form-control d-none"
                      type="file"
                      id="formFile"
                    />
                    <Label htmlFor="formFile" className="btn btn-danger">
                      <i className="ri-upload-2-fill me-1 align-bottom"></i>{" "}
                      Upload File
                    </Label>
                  </div>
                </div>
                <Row>
                  <Col lg={12}>
                    <div className="table-responsive">
                      <Table className="table-borderless align-middle mb-0">
                        <thead className="table-light">
                          <tr>
                            <th scope="col">File Name</th>
                            <th scope="col">Type</th>
                            <th scope="col">Size</th>
                            <th scope="col">Upload Date</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(documents || []).map((item, key) => (
                            <tr key={key}>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div className="avatar-sm">
                                    <div
                                      className={`avatar-title bg-${item.iconBackgroundClass}-subtle text-${item.iconBackgroundClass} rounded fs-20`}
                                    >
                                      <i className={item.icon}></i>
                                    </div>
                                  </div>
                                  <div className="ms-3 flex-grow-1">
                                    <h6 className="fs-15 mb-0">
                                      <Link to="#">{item.fileName}</Link>
                                    </h6>
                                  </div>
                                </div>
                              </td>
                              <td>{item.fileType}</td>
                              <td>{item.fileSize}</td>
                              <td>{item.updatedDate}</td>
                              <td>
                                <UncontrolledDropdown direction="start">
                                  <DropdownToggle
                                    tag="a"
                                    className="btn btn-light btn-icon"
                                    id="dropdownMenuLink15"
                                    role="button"
                                  >
                                    <i className="ri-equalizer-fill"></i>
                                  </DropdownToggle>
                                  <DropdownMenu>
                                    <DropdownItem>
                                      <i className="ri-eye-fill me-2 align-middle text-muted" />
                                      View
                                    </DropdownItem>
                                    <DropdownItem>
                                      <i className="ri-download-2-fill me-2 align-middle text-muted" />
                                      Download
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                      <i className="ri-delete-bin-5-line me-2 align-middle text-muted" />
                                      Delete
                                    </DropdownItem>
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                    <div className="text-center mt-3">
                      <Link to="#" className="text-success ">
                        <i className="mdi mdi-loading mdi-spin fs-20 align-middle me-2"></i>
                        Load more{" "}
                      </Link>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </TabPane>
        </TabContent>
      </React.Fragment>
    </div>
  );
};

export default OverView;
