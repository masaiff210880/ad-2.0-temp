import React, { useState } from 'react'
import style from "../../styles/vendor/PurchaseOrder.module.css"
import SearchOption from "../../Components/Common/SearchOption";
import { Link, NavLink } from "react-router-dom";
import { Badge, Button, Card, CardBody, CardHeader, Col, Container, Input, Label, Nav, NavItem, Row } from "reactstrap";
import calender from "../../../src/assets/images/products/calender.svg"
import cart from "../../../src/assets/images/flags/cart.svg"
import Profilelogo from "../../../src/assets/images/flags/Profilelogo.svg";
import Logo from "../../../src/assets/images/flags/Logo.svg"
import classnames from 'classnames';
import dummy_img from "../../../src/assets/images/products/small_dummy.svg"
import { Table } from "react-bootstrap";
import PurchaseList from '../Vendors/PurchaseList';
import ProgressTabChange from './ProgressTabChange';
import BreadCrumb from '../../Components/Common/BreadCrumb';

const ShipmentPDF = () => {
    const handleInvoice = () => {
        window.print();
    }
    const [selectedRowData, setSelectedRowData] = useState(null);
    const onRowClick = (rowData) => {
        setSelectedRowData(rowData)

    }


    const [activeTab, setactiveTab] = useState(1);
    function toggleTab(tab) {
        if (activeTab !== tab) {
            var modifiedSteps = [...passedSteps, tab];

            if (tab >= 1 && tab <= 4) {
                setactiveTab(tab);
                setPassedSteps(modifiedSteps);
            }
        }
    }
    return (

        <div className='page-content'>
            <Container fluid>
                <BreadCrumb title="SALES ORDER" pageTitle="Manage Sales   >   Shipment" className="mt-4" />


                <div className='page-content' style={{ paddingBottom: "150px", marginRight: "10px", backgroundColor: "#FFFFFF" }}>
                    <div>
                        {/* <div className="layout-width">
        <>
          {selectedRowData ? <SplitData rowData={selectedRowData} /> : <PurchaseList  onRowClick={onRowClick} />}
        </>
      </div> */}


                        <Row>
                            <Col lg={4}>
                                <Card>
                                    <CardHeader>
                                        <div className="navbar-header " style={{ display: "flex", gap: "15px" }}>
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

                                            <div className="col-sm-auto ms-auto" >
                                                <div>
                                                    <Link
                                                        to="#"
                                                        className="btn btn-success bg_add_product"
                                                    >
                                                        <i
                                                            className="ri-add-line align-bottom me-1"
                                                            style={{}}
                                                        ></i>
                                                        Add New
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </CardHeader>
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
                                                    {/* <thead className={`table-light ${style.head}`}>
                                                    <tr className={style.row1}>
                                                        <th scope="col" style={{ width: "50px" }}>
                                                            <div className="form-check">

                                                            </div>
                                                        </th>
                                                        <th
                                                            className={style.sort}
                                                            data-sort="order_id fas fa-sort"
                                                        >

                                                        </th>
                                                        <th
                                                            className={style.sort}
                                                            data-sort="customer fas fa-sort"
                                                        >

                                                        </th>
                                                        <th className={style.sort} data-sort="order_date">

                                                        </th>
                                                        <th className={style.sort} data-sort="sub_total">

                                                        </th>
                                                        <th className={style.sort} data-sort="quantity">

                                                        </th>
                                                        <th className={style.sort} data-sort="quantity">

                                                        </th>
                                                        <th className={style.sort} data-sort="quantity">

                                                        </th>
                                                        <th className={style.sort} data-sort="quantity">

                                                        </th>
                                                    </tr>
                                                </thead> */}
                                                    <tbody className="list form-check-all" style={{ height: '70px' }}>
                                                        <tr >
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
                                                            <td className={style.customer}>

                                                                <h1>PO-00001</h1>
                                                                <div className={style.cal_div}>
                                                                    <div className={style.cal}>
                                                                        <img src={calender} alt="calender" width={'100%'} />
                                                                        <h1>02nd Jan</h1>
                                                                    </div>
                                                                    <div className={style.cal}>
                                                                        <img src={calender} alt="calender" width={'100%'} />
                                                                        <h1>5.00 pm</h1>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className={style.ordertext}></td>
                                                            <td>

                                                            </td>
                                                            <td className={style.money}>
                                                                <h1>$ 600.00</h1>
                                                                <span className="badge bg-info-subtle text-info text-uppercase">
                                                                    open
                                                                </span>
                                                            </td>

                                                        </tr>
                                                    </tbody>

                                                    <tbody className="list form-check-all" style={{ height: '70px' }}>
                                                        <tr >
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
                                                            <td className={style.customer}>

                                                                <h1>PO-00001</h1>
                                                                <div className={style.cal_div}>
                                                                    <div className={style.cal}>
                                                                        <img src={calender} alt="calender" width={'100%'} />
                                                                        <h1>02nd Jan</h1>
                                                                    </div>
                                                                    <div className={style.cal}>
                                                                        <img src={calender} alt="calender" width={'100%'} />
                                                                        <h1>5.00 pm</h1>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className={style.ordertext}></td>
                                                            <td>

                                                            </td>
                                                            <td className={style.money}>
                                                                <h1>$ 600.00</h1>
                                                                <span className="badge bg-info-subtle text-info text-uppercase">
                                                                    open
                                                                </span>
                                                            </td>

                                                        </tr>
                                                    </tbody>

                                                    <tbody className="list form-check-all" style={{ height: '70px' }}>
                                                        <tr >
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
                                                            <td className={style.customer}>

                                                                <h1>PO-00001</h1>
                                                                <div className={style.cal_div}>
                                                                    <div className={style.cal}>
                                                                        <img src={calender} alt="calender" width={'100%'} />
                                                                        <h1>02nd Jan</h1>
                                                                    </div>
                                                                    <div className={style.cal}>
                                                                        <img src={calender} alt="calender" width={'100%'} />
                                                                        <h1>5.00 pm</h1>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className={style.ordertext}></td>
                                                            <td>

                                                            </td>
                                                            <td className={style.money}>
                                                                <h1>$ 600.00</h1>
                                                                <span className="badge bg-info-subtle text-info text-uppercase">
                                                                    open
                                                                </span>
                                                            </td>

                                                        </tr>
                                                    </tbody>

                                                    <tbody className="list form-check-all" style={{ height: '70px' }}>
                                                        <tr >
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
                                                            <td className={style.customer}>

                                                                <h1>PO-00001</h1>
                                                                <div className={style.cal_div}>
                                                                    <div className={style.cal}>
                                                                        <img src={calender} alt="calender" width={'100%'} />
                                                                        <h1>02nd Jan</h1>
                                                                    </div>
                                                                    <div className={style.cal}>
                                                                        <img src={calender} alt="calender" width={'100%'} />
                                                                        <h1>5.00 pm</h1>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className={style.ordertext}></td>
                                                            <td>

                                                            </td>
                                                            <td className={style.money}>
                                                                <h1>$ 600.00</h1>
                                                                <span className="badge bg-info-subtle text-info text-uppercase">
                                                                    open
                                                                </span>
                                                            </td>

                                                        </tr>
                                                    </tbody>

                                                </table>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>

                            <Col lg={8} >
                                <Card>
                                    <CardHeader style={{ display: "flex", justifyContent: "space-between", justifyItems: "center", marginTop: "13.5px" }}>
                                        <div>
                                            <h3 className={style.saleHeadingfirst}>SHP-001</h3>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <div style={{ marginRight: "6px" }}>
                                                <div className="col-sm-auto ms-auto">

                                                    <div className={style.commonImgStyle}>
                                                        <i className='mdi mdi-pencil' style={{ fontSize: "23px", padding: "1.5px 9px 1.5px 9px" }} />
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

                                                <i className='mdi mdi-paperclip' style={{ fontSize: "23px", padding: "1.5px 9px 1.5px 9px" }} />
                                            </div>




                                            <div className="d-flex align-items-center">
                                                <button className={style.btnSaveStyle} style={{ width: "84px", height: "40px" }}>
                                                    Save
                                                </button>
                                            </div>


                                            {/* <ProductsGlobalFilter /> */}
                                        </div>
                                    </CardHeader>

                                    <CardBody>
                                        <Row >
                                            <div className="border p-3 rounded-20">
                                                <Col lg={12}>

                                                    <CardBody className="p-4">
                                                        <Row className="g-3">
                                                            {/* <Col lg={5} xs={6}>
                                                            <p className=" fs-24 text-muted mb-2 text-uppercase fw-semibold">
                                                                Purchase Order
                                                            </p>
                                                            <h5 className="fs-14 mb-0">#VL<span id="invoice-no">Purchase Order# PO - 0001</span></h5>
                                                        </Col> */}
                                                            <Row className='mt-3'>
                                                                <Col lg={12}>
                                                                    <Card className="mt-n4 mx-n4">
                                                                        <div style={{ backgroundColor: "#F6F8F7", borderRadius: "4px" ,marginLeft:"14px"}}>
                                                                            <CardBody className="pb-0 px-4">
                                                                                <Row className="mb-3">
                                                                                    <div className="col-md">
                                                                                        <Row className="align-items-center g-3">
                                                                                            <div className="col-md-auto">
                                                                                                {/* <div className="avatar-md">
                                                                                                    <div className="avatar-title bg-white rounded-circle custom-box-shadow">
                                                                                                        <img src={cart} alt="" className="avatar-xs" style={{ width: "37.179px", height: "36.5px" }} />
                                                                                                    </div>
                                                                                                </div> */}
                                                                                            </div>
                                                                                            <div className="col-md" style={{ display: "flex", gap: "120px" }}>
                                                                                                <div>
                                                                                                    <p style={{ fontWeight: 600 }}>Date of Shipment</p>
                                                                                                    <p style={{ fontWeight: 600 }}>Carrier</p>
                                                                                                    <p style={{ fontWeight: 600 }}>Tracking Status</p>
                                                                                                </div>
                                                                                                <div>
                                                                                                    <p >24/05/2023</p>
                                                                                                    <p>2</p>
                                                                                                    <p style={{ fontWeight: 600 }}>Shipped</p>
                                                                                                </div>
                                                                                            </div>
                                                                                        </Row>
                                                                                    </div>

                                                                                </Row>


                                                                            </CardBody>
                                                                        </div>

                                                                    </Card>
                                                                </Col>
                                                            </Row>
                                                        </Row>



                                                        {/* <ProgressTabChange /> */}


                                                    </CardBody>

                                                </Col>

                                                <hr style={{ marginRight: "30.5px",marginLeft:"15px" }} />
                                                <p style={{ fontWeight: 600, color: "#878A99",marginLeft:"15px" }}>Shipment Notes (ADD NOTES)</p>
                                                <div style={{ backgroundColor: "#BFE1F4", borderRadius: "4px", height: "70px", width: "96%",marginLeft:"15px",  }}>

                                                </div>
                                                <div className='mt-3' style={{ display: "flex", justifyContent: "flex-end", marginRight: "30.5px" }}>
                                                    <Button className="btn-soft-danger"> Convert to Packages </Button>
                                                </div>
                                                <div className="d-flex align-items-center" style={{ display: "flex", justifyContent: "flex-end", marginRight: "19.5px" }}>
                                                    <p className=" fs-14 text-muted mb-2 fw-semibold p-3" style={{ fontStyle: "italic" }}>
                                                        Show PDF View
                                                    </p>

                                                    <div
                                                        className="form-check form-switch form-switch-lg mb-2 form-switch-success"
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
                                                <div className={style.splitScreenDiv}>
                                                    <div className='mt-4' style={{ marginLeft: "28px" }}>
                                                        <img src={Logo} alt="logo" />
                                                    </div>
                                                    <div className='mt-4' style={{ marginLeft: "28px", display: "flex", justifyContent: "space-between" }}>
                                                        <div>
                                                            <p style={{ fontWeight: 500 }}>Anna Adame</p>
                                                            <p className={style.commontextP}>1049 Industrial Dr, Bensenville,</p>
                                                            <p className={style.commontextP}>IL 60106, United States</p>
                                                            <p className={style.commontextP}>Phone: +1 630-422-1915</p>
                                                        </div>
                                                        <div style={{ marginRight: "60px" }}>
                                                            <h3 style={{ fontSize: "30px" }}>Shipment Order</h3>
                                                            <h6 style={{ display: "flex", justifyContent: "flex-end" }}>Shipment Order# SHP-001</h6>
                                                        </div>
                                                    </div>

                                                    <div className='mt-5' style={{ marginLeft: "28px", display:"flex", justifyContent:"space-between", marginRight:"36px" }}>
                                                        <div>
                                                            <h5>Bill To</h5>
                                                            <h4 style={{ color: "#119AD5" }}>Smith Novak</h4>
                                                        </div>
                                                        <div  style={{ marginLeft: "48px", }}>
                                                            <h5>Sales Order#:</h5>
                                                           

                                                            <h6 >Order Date:</h6>
                                                         
                                                            </div>   
                                                        <div  style={{ marginLeft: "48px", }}>
                                                        
                                                            <h5>SO-001</h5>
                                                            
                                                            <h6 >24/05/2023</h6>
                                                        </div>

                                                    </div>

                                                    <div className='mt-4'>
                                                        <div className="table-responsive">
                                                            <Table className="caption-top table-nowrap mb-0 ml-2 mr-2">
                                                                {/* <caption>List of users</caption> */}
                                                                <thead className="table-light">
                                                                    <tr>
                                                                        <th scope="col" style={{ color: "#2F4C8F", fontSize: "15.5px", fontWeight: 600 }}>#</th>
                                                                        <th scope="col" style={{ color: "#2F4C8F", fontSize: "15.5px", fontWeight: 600 }}>Item & Description</th>
                                                                        <th scope="col" style={{ color: "#2F4C8F", fontSize: "15.5px", fontWeight: 600 }}>Qty</th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td className="fw-medium">1</td>
                                                                        <td style={{ fontWeight: 600 }}>D8 Flight Gummy
                                                                            <br />
                                                                            <span style={{ color: "#2F4C8F", fontSize: "13px", fontWeight: 400 }}>SKU : FGU506932</span>
                                                                        </td>
                                                                        <td>10.00</td>

                                                                    </tr>

                                                                </tbody>
                                                            </Table>
                                                        </div>
                                                    </div>
                                                </div>


                                            </div>

                                        </Row >
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>


                        <Link to="/sale-order-list" className="btn btn-primary mt-4">
                            Back
                        </Link>
                    </div>
                </div>
            </Container>
        </div>


    )
}

export default ShipmentPDF;