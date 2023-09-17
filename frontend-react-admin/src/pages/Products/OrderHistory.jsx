import React from 'react'
import SearchHeaderTab from './SearchHeaderTab'
import { Card, CardBody, Col, Row } from 'reactstrap'
import style from '../../styles/products/OrderHistory.module.css'

const OrderHistory = () => {
  return (
    <div>
      <SearchHeaderTab />


      <Row>
        <Col lg={12}>
          <Card>

            <CardBody>
              <div className="listjs-table" id="customerList">
                < div className={`table-responsive table-card mt-3 mb-1 ${style.responsiveTable}`} style={{ overflowX: "auto" }}>
                  <table className={`table align-middle table-nowrap ${style.table}`} id="customerTable" >
                    <thead className={`table-light `}>
                      <tr >
                        <th scope="col" style={{ width: "50px" }}>
                          <div className="form-check">
                            <input className={`form-check-input `} type="checkbox" id="checkAll" value="option" />
                          </div>
                        </th>
                        <th className="sort" data-sort="order_id fas fa-sort">ORDER ID</th>
                        <th className="sort" data-sort="customer fas fa-sort">CUSTOMER</th>
                        <th className="sort" data-sort="order_date">ORDER DATE</th>
                        <th className="sort" data-sort="sub_total">SUB TOTAL</th>
                        <th className="sort" data-sort="quantity">QUANTITY</th>
                        <th >ORDER STATUS</th>
                      </tr>
                    </thead>
                    <tbody className="list form-check-all">
                      <tr>
                        <th scope="row">
                          <div className="form-check">
                            <input  className={`form-check-input `} type="checkbox" name="chk_child" value="option1" />
                          </div>
                        </th>
                        {/* <td className="id" style={{ display: "none" }}><Link to="#" className="fw-medium link-primary">#VZ2101</Link></td> */}
                        <td >#VZ2101</td>
                        <td >Frank Hook</td>
                        <td>20 Dec, 2021, <span>02:21 AM</span></td>
                        <td >$654</td>
                        <td ><span className="badge bg-info-subtle text-info text-uppercase">50 EA_</span></td>
                        <td>
                          <div className="d-flex gap-2">
                            <td className="status"><span className="badge bg-danger-subtle text-danger text-uppercase">ORDER PENDING</span></td>
                            <td className="status"><span className="badge bg-danger-subtle text-danger text-uppercase">UNPAID</span></td>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <div className="form-check">
                            <input  className={`form-check-input `} type="checkbox" name="checkAll" value="option2" />
                          </div>
                        </th>
                        {/* <td className="id" style={{ display: "none" }}><Link to="#" className="fw-medium link-primary">#VZ2102</Link></td> */}
                        <td>#VZ2102</td>
                        <td >Rickey Teran</td>
                        <td >16 Dec, 2021, <span>03:41 PM</span></td>
                        <td >$354</td>
                        <td className="status"><span className="badge bg-danger-subtle  text-danger text-uppercase">-1 EA_</span></td>
                        <td>
                          <div className="d-flex gap-2">
                            <td className="status"><span className="badge bg-danger-subtle text-danger text-uppercase">ORDER PENDING</span></td>
                            <td className="status"><span className="badge bg-success-subtle text-success text-uppercase">PAID</span></td>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <div className="form-check">
                            <input  className={`form-check-input `} type="checkbox" name="checkAll" value="option3" />
                          </div>
                        </th>
                        {/* <td className="id" style={{ display: "none" }}><Link to="#" className="fw-medium link-primary">#VZ2103</Link></td> */}
                        <td>#VZ2103</td>
                        <td >James Price</td>
                        <td >28 Nov, 2021, <span>11:33 AM</span></td>
                        <td >$829</td>
                        <td className="status"><span className="badge bg-info-subtle text-info text-uppercase">50 EA_</span></td>
                        <td>
                          <div className="d-flex gap-2">
                            <td className="status"><span className="badge bg-info-subtle text-info text-uppercase">ORDER PICKED</span></td>
                            <td className="status"><span className="badge bg-danger-subtle text-danger text-uppercase">PARTIAL</span></td>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <div className="form-check">
                            <input  className={`form-check-input `} type="checkbox" name="checkAll" value="option4" />
                          </div>
                        </th>
                        {/* <td className="id" style={{ display: "none" }}><Link to="#" className="fw-medium link-primary">#VZ2104</Link></td> */}
                        <td >#VZ2104</td>
                        <td >Nettie Deloatch</td>
                        <td >22 Nov, 2021, <span>07:45 PM</span></td>
                        <td >$142</td>
                        <td className="status"><span className="badge bg-info-subtle text-info text-uppercase">200 EA_</span></td>
                        <td>
                          <div className="d-flex gap-2">
                            <td className="status"><span className="badge bg-success-subtle text-success text-uppercase">ORDER FULFILLED</span></td>
                            <td className="status"><span className="badge bg-success-subtle text-success text-uppercase">PAID</span></td>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <div className="form-check">
                            <input  className={`form-check-input`} type="checkbox" name="checkAll" value="option5" />
                          </div>
                        </th>
                        {/* <td className="id" style={{ display: "none" }}><Link to="#" className="fw-medium link-primary">#VZ2105</Link></td> */}
                        <td >#VZ2105</td>
                        <td >Thomas Taylor</td>
                        <td >12 Nov, 2021, <span>10:19 PM</span></td>
                        <td >$408</td>
                        <td className="status"><span className="badge bg-info-subtle text-info text-uppercase">110 EA_</span></td>
                        <td>
                          <div className="d-flex gap-2">
                            <td className="status"><span className="badge bg-info-subtle text-info text-uppercase">ORDER PICKED</span></td>
                            <td className="status"><span className="badge bg-danger-subtle text-danger text-uppercase">UNPAID</span></td>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <div className="form-check">
                            <input  className={`form-check-input `} type="checkbox" name="checkAll" value="option6" />
                          </div>
                        </th>
                        {/* <td className="id" style={{ display: "none" }}><Link to="#" className="fw-medium link-primary">#VZ2106</Link></td> */}
                        <td>#VZ2106</td>
                        <td >James Price</td>
                        <td >05 Nov, 2021,  <span>11:47 AM</span></td>
                        <td >$1240</td>
                        <td className="status"><span className="badge bg-info-subtle text-info text-uppercase">110 EA_</span></td>
                        <td>
                          <div className="d-flex gap-2">
                            <td className="status"><span className="badge bg-success-subtle text-success text-uppercase">ORDER FULFILLED</span></td>
                            <td className="status"><span className="badge bg-danger-subtle text-danger text-uppercase">UNPAID</span></td>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <div className="form-check">
                            <input  className={`form-check-input `} type="checkbox" name="checkAll" value="option7" />
                          </div>
                        </th>
                        {/* <td className="id" style={{ display: "none" }}><Link to="#" className="fw-medium link-primary">#VZ2107</Link></td> */}
                        <td >#VZ2107</td>
                        <td >James Price</td>
                        <td >05 Nov, 2021, <span>11:47 AM</span></td>
                        <td >$1240</td>
                        <td className="status"><span className="badge bg-info-subtle text-info text-uppercase">110 EA_</span></td>
                        <td>
                          <div className="d-flex gap-2">
                            <td className="status"><span className="badge bg-info-subtle text-info text-uppercase">ORDER PICKED</span></td>
                            <td className="status"><span className="badge bg-danger-subtle text-danger text-uppercase">UNPAID</span></td>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <div className="form-check">
                            <input  className={`form-check-input `} type="checkbox" name="checkAll" value="option8" />
                          </div>
                        </th>
                        {/* <td className="id" style={{ display: "none" }}><Link to="#" */}
                        {/* // className="fw-medium link-primary">#VZ2108</Link></td> */}
                        <td >#VZ2107</td>
                        <td >Nancy Martino</td>
                        <td >31 Oct, 2021, <span>08:55 PM</span></td>
                        <td >$180</td>
                        <td className="status"><span className="badge bg-info-subtle text-info text-uppercase">25 EA_</span></td>
                        <td>
                          <div className="d-flex gap-2">
                            <td className="status"><span className="badge bg-success-subtle text-success text-uppercase">ORDER FULFILLED</span></td>
                            <td className="status"><span className="badge bg-success-subtle text-success text-uppercase">PAID</span></td>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <div className="form-check">
                            <input  className={`form-check-input `} type="checkbox" name="checkAll" value="option9" />
                          </div>
                        </th>
                        {/* <td className="id" style={{ display: "none" }}><Link to="#" className="fw-medium link-primary">#VZ2109</Link></td> */}
                        <td >#VZ2108</td>
                        <td >Alexis Clarke</td>
                        <td>25 Oct, 2021, <span>05:33 AM</span></td>
                        <td >$247</td>
                        <td className="status"><span className="badge bg-info-subtle text-info text-uppercase">100 EA_</span></td>
                        <td>
                          <div className="d-flex gap-2">
                            <td className="status"><span className="badge bg-danger-subtle text-danger text-uppercase">ORDER PENDING</span></td>
                            <td className="status"><span className="badge bg-danger-subtle text-danger text-uppercase">UNPAID</span></td>
                          </div>
                        </td>
                      </tr>

                      <div className={style.buttons}>
                        <button className={style.button1}>cancel</button>
                        <button className={style.button2}>submit</button>
                      </div>
                    </tbody>
                  </table>
                  <div className="noresult" style={{ display: "none" }}>
                    <div className="text-center">
                      <lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop"
                        colors="primary:#121331,secondary:#08a88a" style={{ width: "75px", height: "75px" }}>
                      </lord-icon>
                      <h5 className="mt-2">Sorry! No Result Found</h5>
                      <p className="text-muted mb-0">We've searched more than 150+ Orders We did not find any
                        orders for you search.</p>
                    </div>
                  </div>
                </div>

              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default OrderHistory