import React from "react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Nav,
  NavItem,
  TabContent,
  TabPane,
  UncontrolledCollapse
} from "reactstrap";
import SwiperCore, { Autoplay } from "swiper";
import classnames from "classnames";
const Activity = ({ activity }) => {
  // console.log("Activity", activity);
  document.title = "Customer Activity";

  SwiperCore.use([Autoplay]);

  const [activeTab, setActiveTab] = useState("1");
  const [activityTab, setActivityTab] = useState("1");

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

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
      <Col lg={12}>
        <Card>
          <CardHeader className="align-items-center d-flex">
            <h4 className="card-title mb-0  me-2">Recent Activity</h4>
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
                      activity;
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
            {activity?.map((item, index) => (
              <TabContent
                activeTab={activityTab}
                className="text-muted"
                key={index + 1}
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
                                  src={item?.adminId?.avatar}
                                  alt=""
                                  className="avatar-xs rounded-circle"
                                />
                              </div>
                              <div className="flex-grow-1 ms-3">
                                <h6 className="fs-14 mb-1">{`${
                                  !item?.adminId || item?.adminId === null
                                    ? "Order online"
                                    : item?.adminId?.firstName
                                } ${
                                  !item?.adminId || item?.adminId === null
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
                        <div className="accordion-header" id="headingTwo">
                          <Link
                            to="#"
                            className="accordion-button p-2 shadow-none"
                            id="collapseTwo"
                          >
                            <div className="d-flex">
                              <div className="flex-shrink-0 avatar-xs">
                                <div className="avatar-title bg-light text-success rounded-circle">
                                  {item?.adminId
                                    ? item?.adminId?.firstName
                                    : "User"}
                                </div>
                              </div>
                              <div className="flex-grow-1 ms-3">
                                <h6 className="fs-14 mb-1">{`${
                                  !item?.adminId || item?.adminId === null
                                    ? "Order online"
                                    : item?.adminId?.firstName
                                } ${
                                  !item?.adminId || item?.adminId === null
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
    </div>
  );
};

export default Activity;
