import React from 'react'
import dummy_img from "../../../src/assets/images/products/small_dummy.svg"
import { Card, CardBody, Col, Input, Row, Table } from 'reactstrap'

const Picking = () => {
    return (
      

            <React.Fragment>
                <Row>
                    <Col>
                        <Card>
                            <div className="d-flex align-items-center" style={{ display: "flex", justifyContent: "flex-end" }}>
                                <p className=" fs-14 text-muted mb-2 fw-semibold p-3 italic">
                                    Show PDF View
                                </p>

                                <div className="form-check form-switch form-switch-lg mb-2" dir="ltr">
                                    <Input type="checkbox" className="form-check-input" id="customSwitchsizelg" defaultChecked="" />
                                    {/* <Label className="form-check-label" htmlFor="customSwitchsizelg">Large Size Switch</Label> */}
                                </div>
                            </div>

                            <CardBody className="p-4 border-top border-top-dashed">

                                <Row>
                                    <Col md={6}>
                                        <div className="table-responsive">
                                            <tbody>
                                                <tr className="mb-5">
                                                    <td>Reference#</td>
                                                    <td className="" id="cart-subtotal">
                                                        Ref - PO - 0001
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        Order Date{" "}

                                                    </td>
                                                    <td className="" id="cart-discount">
                                                        12 JUL 2021
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Expected Shipment Date</td>
                                                    <td className="" id="cart-shipping">
                                                        12 AUG 2021
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Delivery Method </td>
                                                    <td className="" id="cart-tax">
                                                        Bike
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Sales Person</td>
                                                    <td className="" id="cart-tax">

                                                    </td>
                                                </tr>

                                            </tbody>
                                        </div>
                                    </Col>

                                    <Col md={6}>
                                        <div className="address-div d-flex justify-content-end">
                                            <div className="d-flex flex-column align-items-end">
                                                <div>

                                                    <h6 className="text-muted text-uppercase fw-semibold mb-3">
                                                        Billing Address
                                                    </h6>
                                                    <p className="fw-medium mb-2" id="billing-name">xxxxxxxxx</p>
                                                    <p className="fw-medium mb-2" id="billing-address-line-1">xxxxxxxxxxxxx</p>
                                                    <p className="fw-medium mb-2"><span id="billing-phone-no">xxxxxxxxxxxxxxxxxxxxx</span></p>
                                                    <p className="fw-medium mb-2"><span id="billing-tax-no">xxxxxx Add New</span></p>
                                                </div>

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

                                                </th>
                                                <th scope="col" className="text-start">Item & Description</th>
                                                <th scope="col">Ordered</th>
                                                <th scope="col">Received</th>
                                                <th scope="col">Rate</th>
                                                <th scope="col" className="text-end">
                                                    Amount
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody id="products-list">
                                            <tr>
                                                <th scope="row">
                                                    <div className="avatar-sm bg-light rounded p-1 me-2">
                                                        <img src={dummy_img} alt="" className="img-fluid d-block mx-auto" />
                                                    </div>
                                                </th>
                                                <td className="text-start">
                                                    <span className="fw-medium">
                                                        D8 Flight Gummy
                                                    </span>
                                                    <p className="text-muted mb-0">
                                                        SKU : FGU506932
                                                    </p>
                                                </td>
                                                <td>$119.99</td>
                                                <td>100</td>
                                                <td>$ 20.00</td>
                                                <td className="text-end"> $ 4,620</td>

                                            </tr>
                                            <tr>
                                                <th scope="row">
                                                    <div className="avatar-sm bg-light rounded p-1 me-2">
                                                        <img src={dummy_img} alt="" className="img-fluid d-block mx-auto" />
                                                    </div>
                                                </th>
                                                <td className="text-start">
                                                    <span className="fw-medium">
                                                        Funky Republic
                                                    </span>
                                                    <p className="text-muted mb-0">
                                                        SKU : FGU506932
                                                    </p>
                                                </td>
                                                <td>$94.99</td>
                                                <td>01</td>
                                                <td>$ 20.00</td>
                                                <td className="text-end">$94.99</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">
                                                    <div className="avatar-sm bg-light rounded p-1 me-2">
                                                        <img src={dummy_img} alt="" className="img-fluid d-block mx-auto" />
                                                    </div>
                                                </th>
                                                <td className="text-start">
                                                    <span className="fw-medium">
                                                        Hidden hills
                                                    </span>
                                                    <p className="text-muted mb-0">
                                                        SKU : FGU506932
                                                    </p>
                                                </td>
                                                <td>$24.99</td>
                                                <td>01</td>
                                                <td>$ 20.00</td>
                                                <td className="text-end">$24.99</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">
                                                    <div className="avatar-sm bg-light rounded p-1 me-2">
                                                        <img src={dummy_img} alt="" className="img-fluid d-block mx-auto" />
                                                    </div>
                                                </th>
                                                <td className="text-start">
                                                    <span className="fw-medium">Modus 200 mg</span>
                                                    <p className="text-muted mb-0">SKU : FGU506932</p>
                                                </td>
                                                <td>$340.00</td>
                                                <td>01</td>
                                                <td>$ 20.00</td>
                                                <td className="text-end">$340.00</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>

                                <div className=" mt-2">
                                    <Table className=" table-borderless align-middle mb-0 ms-auto" style={{ width: "250px" }}>
                                        <tbody>
                                            <tr>
                                                <td>Sub Total</td>
                                                <td className="text-end">$ 43370.00</td>
                                            </tr>
                                            <tr>
                                                <td>Shipping Charges</td>
                                                <td className="text-end">$ 370400.00</td>
                                            </tr>
                                            <tr>
                                                <td>Adjustment <small className="text-muted"></small></td>
                                                <td className="text-end">$ 100.00</td>
                                            </tr>

                                            <tr className="border-top border-top-dashed fs-15">
                                                <th scope="row">Total Amount</th>
                                                <th className="text-end">$ 43370.00</th>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>

                                <div className="mb-5">
                                    <h6 className="text-muted text-uppercase fw-semibold mb-3">
                                        NOTES
                                    </h6>
                                    <h6 className="text-muted text-uppercase fw-semibold mb-3">
                                        Customer Notes
                                    </h6>
                                    <h6 className="text-muted text-uppercase fw-semibold mb-3">
                                        TERMS & CONDITIONS
                                    </h6>

                                </div>

                            </CardBody>
                        </Col>
                    </Col>
                </Row>
            </React.Fragment>

        
    )
}

export default Picking