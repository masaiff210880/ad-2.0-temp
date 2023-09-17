import React, { useState } from 'react'
import style from "../../styles/vendor/PurchaseOrder.module.css"
import SearchOption from "../../Components/Common/SearchOption";
import { Link, NavLink } from "react-router-dom";
import { Badge, Button, ButtonGroup, Card, CardBody, CardHeader, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Nav, NavItem, Row, UncontrolledButtonDropdown, UncontrolledDropdown } from "reactstrap";
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
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import { useFormik } from 'formik';
import * as Yup from "yup";


const SalesorderInvoice = () => {
    const handleInvoice = () => {
        window.print();
    }
    const [selectedRowData, setSelectedRowData] = useState(null);
    const onRowClick = (rowData) => {
        setSelectedRowData(rowData)

    }





    // modal code here 
    const [modal_large, setmodal_large] = useState(false);

    function tog_large() {
        setmodal_large(!modal_large);
    }


    const productBrand = [
        {
            options: [
                { label: "All", value: "All" },
                { label: "90 Days", value: "90 Days" },
                { label: "6 Months", value: "6 Months" },
                { label: "1 Year", value: "1 Year" },
                { label: "2 Year", value: "2 Year" },
                { label: "5 Year", value: "5 Year" },
                { label: "All", value: "All" }
            ],
        },
    ];
    const productvali = useFormik({
        enableReinitialize: true,

        initialValues: {
            name: "",
            category: "",
            brand: "",
            sku: "",
        },
        productvaliSchema: Yup.object({
            name: Yup.string().required("Please Enter a Product Title"),
            category: Yup.string().required("Please select the category"),
            brand: Yup.string().required("Please select the brand"),
            sku: Yup.string().required("Please Enter the sku"),
        }),

        onSubmit: (values, { resetForm }) => {
            const newProduct = {
                name: values.name,
                description,
                category: values.category,
                brand: values.brand,
                sku: values.sku,
                price: {
                    levelOne: 0,
                    levelTwo: 0,
                    levelThree: 0,
                },
            };
            console.log('addProduct', newProduct)
            // dispatch(onAddNewProduct(newProduct));
            // setShowSuccessMessage(true);
            // dispatch(onAddNewProduct(initialValues));
            // resetForm();
            // history("/apps-ecommerce-products");
            // validation.resetForm();
        },

    })




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
                                <Card >
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

                            <Col lg={8}  >
                                <Card >
                                    <CardHeader style={{ display: "flex", justifyContent: "space-between", justifyItems: "center", marginTop: "13.5px" }}>
                                        <div>
                                            <h3 className={style.saleHeadingfirst}>INV-001</h3>
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

                                    <CardBody >
                                        <Row  >
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
                                                                        <div style={{ backgroundColor: "#DFF0FA", borderRadius: "4px", marginLeft: "15px" }}>
                                                                            <CardBody className="pb-0 px-4">
                                                                                <Row className="mb-3">
                                                                                    <div className="col-md">
                                                                                        <Row className="align-items-center g-3">
                                                                                            <div className="col-md-auto">
                                                                                                <div className="avatar-md">
                                                                                                    <div className="avatar-title bg-white rounded-circle custom-box-shadow">
                                                                                                        <img src={cart} alt="" className="avatar-xs" style={{ width: "37.179px", height: "36.5px" }} />
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="col-md">
                                                                                                <div>

                                                                                                    <div className="hstack gap-3 flex-wrap">
                                                                                                        <div style={{ color: "#1F75A4", fontWeight: 400 }}>
                                                                                                            You can create packages, shipments or invoices <br />(in any sequence) to complete this sales order.
                                                                                                        </div>

                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </Row>
                                                                                    </div>
                                                                                    <div className="col-md-auto mt-3">
                                                                                        <Button color="danger" className="btn-label left rounded-pill">
                                                                                            <i className=" label-icon  rounded-pill fs-16 ">4
                                                                                            </i> Invoice
                                                                                        </Button>
                                                                                    </div>
                                                                                    {/* <div className="col-md-auto mt-3" style={{ marginRight: "10px", }}>
                                                                                        <Button className="btn-soft-secondary" style={{ marginRight: "10px", }}>Convert <i className='ri-arrow-down-s-fill'></i>
                                                                                        </Button>
                                                                                        <Button className="btn-soft-warning"> Start Shipment </Button>
                                                                                    </div> */}
                                                                                </Row>


                                                                            </CardBody>
                                                                        </div>
                                                                    </Card>
                                                                </Col>
                                                            </Row>
                                                        </Row>
                                                        <div className='mt-4' style={{ display: "flex", justifyContent: "space-between", marginRight: "50px", width: "100%" }}>
                                                            <div style={{ display: "flex", gap: "10px", marginLeft: "26.5px" }}>
                                                                <p className='mt-2' style={{ color: "#979797", fontSize: "14px", fontWeight: 500 }}>Submitted by</p>
                                                                <Button style={{ backgroundColor: "#5CCFFE", border: "none" }}>
                                                                    <img src={Profilelogo} alt="" /> MD Suhail
                                                                </Button>
                                                                <p className='mt-2' style={{ color: "#979797", fontSize: "14px", fontWeight: 500 }}>Processsing by</p>
                                                                <Button style={{ backgroundColor: "#5CCFFE", border: "none" }}>
                                                                    <img src={Profilelogo} alt="" /> Shaik
                                                                </Button>
                                                                <p className='mt-2' style={{ color: "#299CDB", fontSize: "14px", fontWeight: 500 }}>View Processing Details</p>
                                                            </div>

                                                            {/* <div style={{ marginLeft: "10px", marginRight: "10px" }}>
                                                                <span className="badge bg-success-subtle text-success fs-14" >Processing</span>
                                                            </div> */}
                                                        </div>

                                                        <div className='mt-4' style={{ display: "flex", justifyContent: "flex-end", marginRight: "10px" }}>
                                                            <Button className="btn-soft-danger"> Submit for Approval </Button>
                                                        </div>

                                                        {/* <ProgressTabChange /> */}


                                                    </CardBody>

                                                </Col>

                                                <div className="d-flex align-items-center" style={{ display: "flex", justifyContent: "flex-end", marginRight: "20px" }}>
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
                                                            <p style={{ color: "#0C26B7", fontWeight: 600 }}>AmericanDistributersllc.com <br />
                                                                1049 Industrial Drive <br />
                                                                Bensenville, IL 60106 <br />
                                                                Tel. (630) 422-1915</p>
                                                        </div>
                                                        <div style={{ marginRight: "60px" }}>
                                                            <h3 style={{ fontSize: "30px" }}>INVOICE</h3>

                                                        </div>
                                                    </div>
                                                    <hr />

                                                    <div className='mt-4' style={{ marginLeft: "28px", display: "flex", gap: "50px" }}>
                                                        <div>
                                                            <p style={{ fontWeight: 500, color: "#212529" }}>#</p>
                                                            <p className={style.commontextP1}>Invoice Date</p>
                                                            <p className={style.commontextP1}>Terms</p>
                                                            <p className={style.commontextP1}>Due Date</p>
                                                            <p className={style.commontextP1}>P.O.#</p>
                                                        </div>
                                                        <div>
                                                            <p style={{ fontWeight: 500, color: "#212529" }}>: INV-001</p>
                                                            <p className={style.commontextP1}>: 24/05/2023</p>
                                                            <p className={style.commontextP1}>: Due on Receipt</p>
                                                            <p className={style.commontextP1}>: 06/05/2023</p>
                                                            <p className={style.commontextP1}>: SO-001</p>
                                                        </div>

                                                    </div>


                                                    <div className='mt-5' style={{ marginLeft: "28px" }}>
                                                        <h5>Bill To</h5>
                                                        <h4 style={{ color: "#119AD5" }}>Smith Novak</h4>
                                                    </div>

                                                    <div className='mt-4'>
                                                        <div className="table-responsive">
                                                            <Table className="caption-top table-nowrap mb-0 ml-2 mr-2">
                                                                {/* <caption>List of users</caption> */}
                                                                <thead className="table-light">
                                                                    <tr>
                                                                        <th scope="col" style={{ color: "#2F4C8F", fontSize: "15.5px", fontWeight: 600 }}>Item & Description</th>
                                                                        <th scope="col" style={{ color: "#2F4C8F", fontSize: "15.5px", fontWeight: 600 }}>Ordered</th>
                                                                        <th scope="col" style={{ color: "#2F4C8F", fontSize: "15.5px", fontWeight: 600 }}>Rate</th>
                                                                        <th scope="col" style={{ color: "#2F4C8F", fontSize: "15.5px", fontWeight: 600 }}>Amount</th>


                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td className="fw-medium">
                                                                            <div className="avatar-sm bg_light rounded">
                                                                                <Link to={``}>
                                                                                    <img
                                                                                        src={""}
                                                                                        alt=""
                                                                                        className="img-fluid d-block"

                                                                                    />
                                                                                </Link>
                                                                                <div style={{ marginLeft: "65px" }}>
                                                                                    D8 Flight Gummy
                                                                                    <br />
                                                                                    <span style={{ color: "#2F4C8F", fontSize: "13px", fontWeight: 400 }}>SKU : FGU506932</span>

                                                                                </div>
                                                                            </div>


                                                                        </td>


                                                                        <td style={{ fontWeight: 600 }}>1000</td>
                                                                        <td style={{ fontWeight: 600 }}>$ 20.00</td>
                                                                        <td style={{ fontWeight: 600 }}>$ 45000</td>

                                                                    </tr>
                                                                    <tr>
                                                                        <td className="fw-medium">
                                                                            <div className="avatar-sm bg_light rounded">
                                                                                <Link to={``}>
                                                                                    <img
                                                                                        src={""}
                                                                                        alt=""
                                                                                        className="img-fluid d-block"

                                                                                    />
                                                                                </Link>
                                                                                <div style={{ marginLeft: "65px" }}>
                                                                                    D8 Flight Gummy
                                                                                    <br />
                                                                                    <span style={{ color: "#2F4C8F", fontSize: "13px", fontWeight: 400 }}>SKU : FGU506932</span>

                                                                                </div>
                                                                            </div>


                                                                        </td>


                                                                        <td style={{ fontWeight: 600 }}>1000</td>
                                                                        <td style={{ fontWeight: 600 }}>$ 20.00</td>
                                                                        <td style={{ fontWeight: 600 }}>$ 45000</td>

                                                                    </tr>
                                                                    <tr>
                                                                        <td className="fw-medium">
                                                                            <div className="avatar-sm bg_light rounded">
                                                                                <Link to={``}>
                                                                                    <img
                                                                                        src={""}
                                                                                        alt=""
                                                                                        className="img-fluid d-block"

                                                                                    />
                                                                                </Link>
                                                                                <div style={{ marginLeft: "65px" }}>
                                                                                    D8 Flight Gummy
                                                                                    <br />
                                                                                    <span style={{ color: "#2F4C8F", fontSize: "13px", fontWeight: 400 }}>SKU : FGU506932</span>

                                                                                </div>
                                                                            </div>


                                                                        </td>


                                                                        <td style={{ fontWeight: 600 }}>1000</td>
                                                                        <td style={{ fontWeight: 600 }}>$ 20.00</td>
                                                                        <td style={{ fontWeight: 600 }}>$ 45000</td>

                                                                    </tr>

                                                                </tbody>
                                                            </Table>

                                                            {/* <div style={{ display: "flex" }}>
                                                              
                                                                <div className={style.TotalInvoiceDiv}>
                                                                    
                                                                 <p className={style.paraTotal}>Total in Words</p>
                                                                        <p className={style.paraTotal1}>One Hundred Dollars Only</p>
                                                                        <p className={style.paraTotal2}>Thanks for your business.</p>
                                                                </div>
                                                                <hr style={{height:"5px", borderWidth:"0", color:"red", backgroundColor:"red"}} />
                                                             
                                                                    <div className='mt-4' style={{ marginLeft: "90px", display: "flex", gap: "50px", paddingTop:"14.5px" }}>
                                                                        <div>
                                                                          
                                                                            <p className={style.commontextP1}>Sub Total</p>
                                                                            <p className={style.commontextP1}>Total</p>
                                                                            <p className={style.commontextP1}>Balance Due</p>
                                                                         
                                                                        </div>
                                                                        <div>
                                                                            
                                                                            <p className={style.commontextP1}>$ 100.00</p>
                                                                            <p className={style.commontextP1}>$ 105.00</p>
                                                                            <p className={style.commontextP1}>$ 60.00</p>
                                                                           
                                                                        </div>

                                                                    </div>
                                                                    
                                                               
                                                            </div> */}
                                                            <hr className='mt-0 mb-0' />

                                                            <Row className="g-0  position-relative mt-0" >
                                                                <Col md={5} className={style.FirstColSaleOrder} >
                                                                    <p className={style.paraTotal}>Total in Words</p>
                                                                    <p className={style.paraTotal1}>One Hundred Dollars Only</p>
                                                                    <p className={style.paraTotal2}>Thanks for your business.</p>
                                                                </Col>
                                                                <Col md={5} style={{ display: "flex", justifyContent: "space-around", paddingTop: "32px", paddingLeft: "40px" }} >
                                                                    <div>

                                                                        <p className={style.commontextP1}>Sub Total</p>
                                                                        <p className={style.commontextP1}>Total</p>
                                                                        <p className={style.commontextP1}>Balance Due</p>

                                                                    </div>
                                                                    <div>

                                                                        <p className={style.commontextP1}>$ 100.00</p>
                                                                        <p className={style.commontextP1}>$ 105.00</p>
                                                                        <p className={style.commontextP1}>$ 60.00</p>

                                                                    </div>

                                                                </Col>
                                                                <hr className={style.lastHr} />
                                                                <Col className={style.lastColSaleOrder}>
                                                                    <p className={style.lastTextSaleOrder}>Authorized Signature</p>
                                                                </Col>
                                                                <hr />
                                                            </Row>


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
                        {/* large Modals for other screen start here */}
                        <div className='mt-4'>
                            <Button color="success" onClick={() => tog_large()}>Large Modal</Button>

                            <Modal
                                size="xl"
                                height="658px"
                                width="900px"
                                isOpen={modal_large}
                                toggle={() => {
                                    tog_large();
                                }}
                            >
                                <ModalHeader style={{ backgroundColor: "rgba(10, 179, 156, 0.18)", paddingBottom: "5px" }}>
                                    <h5
                                        className="modal-title"
                                        id="myModalLabel"
                                    >
                                        Create Item History
                                    </h5>
                                </ModalHeader>
                                <ModalBody>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <div><SearchOption /></div>
                                        <p className={style.ModalStyleOrderSale}>Search Finished. 71 transactions reviewed</p>
                                    </div>
                                    <p className={style.ModalStyleOrderSale}>TUNDRA SMOKE SHOP 4 INC</p>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <p className={style.ModalStyleOrderSale1}>SPECIAL BLUE 9X BUTANE FUEL 300ML 12CT/BOX</p>
                                        <div style={{ display: "flex", whiteSpace: "nowrap", gap: "10px" }}>
                                            <Label for="brand-field" className="form-label" />Time Frame : <Input
                                                name="brand"
                                                type="select"
                                                className="form-select  h-52 py-2 px-5"
                                                id="brand-field"
                                                onChange={productvali.handleChange}
                                                onBlur={productvali.handleBlur}
                                                value={
                                                    productvali.values.brand || ""
                                                }
                                            >
                                                {productBrand.map((item, key) => (
                                                    <React.Fragment key={key}>
                                                        {item.options.map((item, key) => (<option value={item.value} key={key}>{item.label}</option>))}
                                                    </React.Fragment>
                                                ))}
                                            </Input>
                                            {productvali.touched.brand &&
                                                productvali.errors.brand ? (
                                                <FormFeedback type="invalid">
                                                    {productvali.errors.brand}
                                                </FormFeedback>
                                            ) : null}
                                        </div>
                                    </div>

                                    <div style={{ display: "flex", gap: "16px" }} className='mt-4'>
                                        <div className="table-responsive" style={{ width: "55%" }}>
                                            <Table className="caption-top table-nowrap mb-0">
                                                <thead className="table-light">
                                                    <tr>
                                                        <th scope="col">Date</th>
                                                        <th scope="col">Trans No.</th>
                                                        <th scope="col">Loc</th>
                                                        <th scope="col">Quantity</th>
                                                        <th scope="col">UM</th>
                                                        <th scope="col">Original Price</th>
                                                        <th scope="col">Unit Price</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="fw-medium">06/09/2023</td>
                                                        <td>06/09/2023</td>
                                                        <td>101</td>
                                                        <td>1</td>
                                                        <td>EA</td>
                                                        <td>26.49</td>
                                                        <td>26.49</td>
                                                    </tr>

                                                </tbody>
                                            </Table>
                                        </div>
                                        <div style={{ width: "50%", border: "1px solid #F3F6F9", height: "608px", display: "flex", gap: "10px" }}>
                                            <div style={{ width: "40%", border: "1px solid #F3F6F9", height: "150px", backgroundColor: "#F3F6F9", marginTop: "8px", marginLeft: "14px" }}>
                                                <img src={""} alt="" />
                                            </div>
                                            <div style={{ width: "72%", border: "1px solid #F3F6F9", height: "420px", marginTop: "8px", marginRight: "10px", paddingRight: "5px" }}>
                                                <div>

                                                    <div className='mt-4' style={{ marginLeft: "28px", display: "flex", gap: "50px", whiteSpace: "nowrap" }}>
                                                        <div>

                                                            <p className={style.commontextP1}>SKU:</p>
                                                            <p className={style.commontextP1}>UPC:</p>
                                                            <p className={style.commontextP1}>Last Sold</p>
                                                            <p className={style.commontextP1}>Qty on Hand:</p>
                                                            <p className={style.commontextP1}>Qty on Order:</p>
                                                            <p className={style.commontextP1}>Qty Committed:</p>
                                                            <p className={style.commontextP1}>Lowest Sell Price:</p>
                                                            <p className={style.commontextP1}>last Cost:</p>
                                                            <p className={style.commontextP1}>Last Purchased:</p>
                                                            <p className={style.commontextP1}>Lowest Price in 78 days</p>


                                                        </div>
                                                        <div>
                                                            <p className={style.commontextP1}>Sb9XBUT300ML</p>
                                                            <p className={style.commontextP1}>811490903111</p>
                                                            <p className={style.commontextP1}>08/22/2023</p>
                                                            <p className={style.commontextP1}>122</p>
                                                            <p className={style.commontextP1}>0</p>
                                                            <p className={style.commontextP1}>2</p>
                                                            <p className={style.commontextP1}>14.75</p>
                                                            <p className={style.commontextP1}>14.63</p>
                                                            <p className={style.commontextP1}>05/15/2023</p>
                                                            <p className={style.commontextP1}>26.49 <span className="badge bg-danger-subtle text-danger">Danger</span> </p>

                                                        </div>


                                                    </div>


                                                </div>


                                            </div>
    
                                        </div>


                                    </div>
                                </ModalBody>
                                <ModalFooter style={{ display: "flex", justifyContent: "space-between", gap: "5px" }}>
                                    <div style={{ display: "flex", gap: "5px" }}>
                                        <Button className="btn-soft-secondary" > Select </Button>
                                        <Button className="btn-soft-secondary"> <i className='las la-angle-double-left '></i>Back</Button>
                                        <Button className="btn-soft-secondary"> More  <i className='las la-angle-double-right'></i> </Button>
                                    </div>

                                    <div>
                                        <Button
                                            className="btn-soft-danger"
                                            onClick={() => {
                                                tog_large();
                                            }}
                                        >
                                            Close
                                        </Button>
                                    </div>
                                </ModalFooter>
                            </Modal>
                        </div>
                        {/* End here */}


                    </div>
                </div>
            </Container>
        </div>
    )
}

export default SalesorderInvoice