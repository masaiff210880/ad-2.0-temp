import React from 'react'
import style from "../../../../styles/vendor/PurchaseOrder.module.css";
import SearchHeaderTab from "../../../Products/SearchHeaderTab";
import SearchOption from "../../../../Components/Common/SearchOption";
import { ProductsGlobalFilter } from "../../../../Components/Common/GlobalSearchFilter";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, Col, Input, Label, Row } from "reactstrap";
import Revenue from "./Revenue";
import calender from "../../../../assets/images/products/calender.svg"
import dummy_img from "../../../../assets/images/products/small_dummy.svg"
import ad_logo from "../../../../assets/images/products/ad_logo.svg"


import CardHeader from "react-bootstrap/esm/CardHeader";
import { Table } from "react-bootstrap";
import { blue } from "@material-ui/core/colors";

const VendorInvoice = () => {
  document.title = "Vendor List | American Distributors";
  return (
    <div>
        
      <div>
      <div className="navbar-header">
        <div className="d-flex">
          <SearchOption />
          <button
            type="button"
            className="btn btn-success"
            style={{
              width: "120px",
              height: "45px",
              position: "relative",
              top: "13px",
              left: "8px",
            }}
          >
            <i className="ri-filter-2-fill me-1 align-middle ri-xl"></i>{" "}
            Filters
          </button>
        </div>

        <div className="d-flex align-items-center">
          <div style={{ marginRight: "6px" }}>
            <div className="col-sm-auto ms-auto">
              <div>
                <Button
                  // to="/add-product"
                  className="btn btn-success "
                >
                  {/* <i className="ri-add-line align-bottom me-1" style={{}}></i> */}
                  Post
                </Button>
              </div>
            </div>
          </div>
          <div className={style.commonImgStyle}>
            <i
              className="bx bxs-file-pdf"
              style={{ fontSize: "20px", padding: "9px 9px 9px 9px" }}
            />
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


          <div className={style.commonImgStyle}>
            <i className='mdi mdi-pencil' style={{ fontSize: "23px", padding: "1.5px 9px 1.5px 9px" }} />
          </div>

          <div className="d-flex align-items-center">
            <p className=" fs-14 text-muted mb-2 fw-semibold p-3">
              Show PDF View
            </p>

            <div className="form-check form-switch form-switch-lg mb-2" dir="ltr">
              <Input type="checkbox" className="form-check-input" id="customSwitchsizelg" defaultChecked="" />
              {/* <Label className="form-check-label" htmlFor="customSwitchsizelg">Large Size Switch</Label> */}
            </div>
          </div>

          {/* <div>
            <div className="col-sm-auto ms-auto">
              <div>
                <Link
                  to="/add-product"
                  className="btn btn-success bg_add_product"
                >
                  <i className="ri-add-line align-bottom me-1" style={{}}></i>
                  Add New
                </Link>
              </div>
            </div>
          </div> */}
          {/* <ProductsGlobalFilter /> */}
        </div>
      </div>

      <Row>
        <Col lg={4}>
          <Card>
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
                    <thead className={`table-light ${style.head}`}>
                      <tr className={style.row1}>
                        <th scope="col">
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
                    </thead>
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

        <Col lg={8}>
          <Card>
            <CardBody>
              <Row className="justify-content-center">
                {/* <Col xxl={9}> */}
                {/* <Card id="demo"> */}
                {/* <Row> */}

                <div className="border p-3 rounded-20">
                  {/* <Col lg={12}>

                    <CardBody className="p-4">
                      <Row className="g-3">
                        <Col lg={5} xs={6}>
                          <p className=" fs-24 text-muted mb-2 text-uppercase fw-semibold">
                            Purchase Order
                          </p>
                          <h5 className="fs-14 mb-0">#VL<span id="invoice-no">Purchase Order# PO - 0001</span></h5>
                        </Col>
        
                      </Row>
                    </CardBody>
                  </Col> */}


                  <Card>
                    <CardBody className="p-4">
                      <Row>
                        <Col md={6}>
                        <div className="address-div d-flex justify-content-start">
                            <div className="d-flex flex-column align-items-start">
                              <div>
                              <img src={ad_logo} alt="" width={"100%"}/>


                                {/* <h6 className="text-muted text-uppercase fw-semibold mb-3">
                                  Billing Address
                                </h6>
                                <p className="fw-medium mb-2" id="billing-name">xxxxxxxxx</p>
                                <p className="fw-medium mb-2" id="billing-address-line-1">xxxxxxxxxxxxx</p>
                                <p className="fw-medium mb-2"><span id="billing-phone-no">xxxxxxxxxxxxxxxxxxxxx</span></p>
                                <p className="fw-medium mb-2"><span id="billing-tax-no">xxxxxx Add New</span></p> */}
                              </div>

                              <div>
                                <h6 className="text-muted text-uppercase fw-semibold mb-3 mt-3">
                                  
                                </h6>
                                <p className="fw-medium mb-2" id="shipping-name">xxxxxxxxx</p>
                                <p className="fw-medium mb-2" id="shipping-address-line-1">xxxxxxxxxxxxx</p>
                                <p className="fw-medium mb-2"><span id="shipping-phone-no">xxxxxxxxxxxxxxxxxxxxx</span></p>
                                <p className="fw-medium mb-2"><span id="billing-tax-no">xxxxxx</span></p>
                              </div>
                              <div>
                                <div >
                                  <h1 className=" fs-15 text-muted mb-2  fw-bold">Bill To</h1>
                                  <h2 className=" fs-18 text-muted mb-2  fw-bold" style={{ color: '#119AD5'}}>Large Scale </h2>
                                </div>
                                <h1 className=" fs-15 text-muted mb-2  fw-bold" style={{position:'relative', left:'770px', bottom:'25px'}}>Order Date: 13/01/2023</h1>
                              </div>
                            </div>
                          </div>
                          {/* <div className="order-div">
                            <div className="d-flex align-items-center mb-2">
                              <div className="flex-shrink-0">
                                <p className="text-muted mb-0 fs-14">Reference#</p>
                              </div>
                              <div className="flex-grow-1 ms-2 ml-20">
                                <h6 className="mb-0 fs-14 ">Ref - PO - 0001</h6>
                              </div>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                              <div className="flex-shrink-0">
                                <p className="text-muted mb-0 fs-14">Order Date</p>
                              </div>
                              <div className="flex-grow-1 ms-2">
                                <h6 className="mb-0 fs-14">12 JUL 2021</h6>
                              </div>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                              <div className="flex-shrink-0">
                                <p className="text-muted mb-0 fs-14">Expected Shipment Date</p>
                              </div>
                              <div className="flex-grow-1 ms-2">
                                <h6 className="mb-0 fs-14">12 AUG 2021</h6>
                              </div>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                              <div className="flex-shrink-0">
                                <p className="text-muted mb-0 fs-14">Delivery Method</p>
                              </div>
                              <div className="flex-grow-1 ms-2">
                                <h6 className="mb-0 fs-14">Bike</h6>
                              </div>
                            </div>
                            <div className="d-flex align-items-center">
                              <div className="flex-shrink-0">
                                <p className="text-muted mb-0 fs-14">Sales Person</p>
                              </div>
                              <div className="flex-grow-1 ms-2">
                                <h6 className="mb-0"></h6>
                              </div>
                            </div>
                          </div> */}
                        </Col>

                        <Col md={6}>
                          <div className="address-div d-flex justify-content-end">
                            <div className="d-flex flex-column align-items-end">
                            <p className=" fs-24 text-muted mb-2 text-uppercase fw-semibold">
                            Purchase Order
                          </p>
                          <h5 className="fs-14 mb-0">#VL<span id="invoice-no">Purchase Order# PO - 0001</span></h5>

 
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>

                  <Col lg={12}>
                    <CardBody className="p-4">
                      <div className="table-responsive">
                        <Table className="table-borderless text-center table-nowrap align-middle mb-0">
                          <thead>
                            <tr className="table-active">
                              <th scope="col" style={{ width: "50px" }}>
                                #
                              </th>
                              <th scope="col" className="text-start">Product</th>
                              <th scope="col">Vendor Name</th>
                              <th scope="col">Qty</th>
                              <th scope="col">Rate</th>
                              <th scope="col" className="text-end">
                                Amount
                              </th>
                            </tr>
                          </thead>
                          <tbody id="products-list" >
                            <tr className=" border-bottom">
                              <th scope="row">1
                              </th>
                              <td className="text-start">
                                <span className="fw-medium">
                                  D8 Flight Gummy
                                </span>
                              </td>
                              <td>Patrick</td>
                              <td>100</td>
                              <td>$ 20.00</td>
                              <td className="text-end"> $ 4,620</td>

                            </tr>
                            <tr className=" border-bottom">
                              <th scope="row">2
                              </th>
                              <td className="text-start">
                                <span className="fw-medium">
                                Hidden Hills
                                </span>
                               </td>
                              <td>Patrick</td>
                              <td>01</td>
                              <td>$ 20.00</td>
                              <td className="text-end">$94.99</td>
                            </tr>
                            <tr className=" border-bottom">
                              <th scope="row">3
                              </th>
                              <td className="text-start">
                                <span className="fw-medium">
                                  Hidden hills
                                </span>
                              </td>
                              <td>Patrick</td>
                              <td>01</td>
                              <td>$ 20.00</td>
                              <td className="text-end">$24.99</td>
                            </tr>
                            <tr className=" border-bottom">
                              <th scope="row">4
                              </th>
                              <td className="text-start">
                                <span className="fw-medium">Funky Republic</span>
                              </td>
                              <td>Patrick</td>
                              <td>01</td>
                              <td>$ 20.00</td>
                              <td className="text-end">$340.00</td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>

                      <div className="mt-5">
                        <Table className=" table-borderless align-middle mb-0 ms-auto" style={{ width: "250px" }}>
                          <tbody>
                            <tr>
                              <td>Sub Total</td>
                              <td className="text-end ">$ 43370.00</td>
                            </tr>
                            
                    
                            <tr className="border-top border-top-dashed fs-15">
                              <th scope="row">Total</th>
                              <th className="text-end">$ 43370.00</th>
                            </tr>
                          </tbody>
                        </Table>
                      </div>         
                    </CardBody>
                  </Col>
                </div>
            
              </Row >
            </CardBody>
          </Card>
        </Col>
      </Row>
      </div>
    </div>
  )
}

export default VendorInvoice