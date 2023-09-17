import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Input, Label, Table } from "reactstrap";
// import { getAllVendor as onGetAllVendor } from "../../slices/ecommerce/thunk";
import { getAllVendor as onGetAllVendor } from "../../slices/ecommerce/thunk";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import SearchOption from "../../Components/Common/SearchOption";
import style from "../../styles/vendor/PurchaseOrder.module.css";
const SalesOrderList = () => {
    document.title = "Sales Order | American Distributors";
    const dispatch = useDispatch();
    const [vendorList, setVendorList] = useState([]);
    const selectedVendorData = createSelector(
        (state) => state.Ecommerce.vendor,
        (vendor) => vendor
    );
    const vendorData = useSelector(selectedVendorData);
    console.log(vendorList);

    useEffect(() => {
        dispatch(onGetAllVendor());
    }, [dispatch]);

    useEffect(() => {
        setVendorList(vendorData);
    }, [vendorData]);

    return (
        <div className="page-content">
            <Container fluid>
                <BreadCrumb title="SalesOrder" pageTitle="Salesorder List" belong="Salesorder" />
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
                        Filter
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
                                        to="/split-picking"
                                        className="btn btn-success bg_add_product"
                                    >
                                        <i className="ri-add-line align-bottom me-1" style={{}}></i>
                                        Add New
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Table className="align-middle table-nowrap mb-0 bg-white">
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
                            <th scope="col">Date</th>
                            <th scope="col">Sales Order</th>
                            <th scope="col">Reference</th>
                            <th scope="col">Name</th>
                            <th scope="col">Status</th>
                            <th scope="col">Invoice</th>
                            <th scope="col">Payment</th>
                            <th scope="col">Packed</th>
                            <th scope="col">Shipped</th>
                            <th scope="col">Amount</th>
                            <th scope="col" style={{ width: "100px", textAlign: "center" }}>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {vendorList?.map((item) => (
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

                                {/* <Link to={`/vendor/${item._id}`} className="clickMouseHover">{`${item?.firstName} ${item?.lastName}`}</Link> */}
                                <td><Link to={'/sale-split-screen'} className="clickMouseHover">13 Jan 2023</Link></td>
                                <td><Link to={'/sale-split-screen'} className="clickMouseHover">SO-00001</Link></td>
                                <td><Link to={'/sale-split-screen'} className="clickMouseHover">26495</Link></td>
                                <td>Mary Cousar</td>
                                <td>
                                    <span className="badge bg-info-subtle text-info text-uppercase">
                                        Open
                                    </span>

                                </td>

                                <td>
                                    <span className="badge bg-info-subtle text-info text-uppercase">
                                        Invoiced
                                    </span>

                                </td>

                                <td>$654      <span className="badge bg-info-subtle text-info text-uppercase">
                                    open
                                </span></td>

                                <td></td>
                                <td></td>



                                <td>$35228

                                </td>
                                <td>
                                    <ul
                                        className="list-inline hstack gap-2 mb-0"
                                        style={{ textAlign: "center" }}
                                    >
                                        {/* <li className="list-inline-item">
                      <Link to="#" className="text-primary d-inline-block">
                        <i className="ri-eye-fill fs-16"></i>
                      </Link>
                    </li> */}
                                        <li className="list-inline-item edit">
                                            <Link
                                                to="#"
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
                                                <i className="ri-delete-bin-5-fill fs-16"></i>
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

export default SalesOrderList;