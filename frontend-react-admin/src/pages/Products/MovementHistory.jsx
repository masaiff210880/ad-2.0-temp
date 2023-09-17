import React, { useState } from 'react'
import SearchHeaderTab from './SearchHeaderTab';

import { Button, ButtonGroup, CardBody, DropdownItem, DropdownMenu, DropdownToggle, Input, Modal, UncontrolledButtonDropdown, UncontrolledDropdown } from 'reactstrap';
import { Link } from 'react-router-dom';
import style from "../../../src/assets/scss/config/ProductDetails.module.css";
// import hamIcon from "../../assets/productIcon/hamIcon2.svg";
import Dropupdown from "../../assets/productIcon/Dropupdown.svg";

// import columnIcon from "../../assets/productIcon/columnIcon.svg";
import SearchOption from '../../Components/Common/SearchOption';
import { useDispatch } from 'react-redux';

const MovementHistory = () => {

  const [modal_animationZoom, setmodal_animationZoom] = useState(false);
  const [dynamicColumn, setDynamicColumn] = useState([]);
  const [modal_scroll, setmodal_scroll] = useState(false);

  function tog_scroll() {
    setmodal_scroll(!modal_scroll);
  }
  function tog_animationZoom() {
    setmodal_animationZoom(!modal_animationZoom);
  }

  const handleColumnOptions = (e) => {
    let newColumns = [...dynamicColumn];
    const value = e.target.value;
    if (newColumns.includes(value)) {
      newColumns = newColumns.filter((el) => el !== value);
    } else {
      newColumns.push(value);
    }
    setDynamicColumn(newColumns);
  };

  // // get details request

  // const[data,setdata] = useState("");
  // const dispatch = useDispatch();

  




  return (
    <>
      {/* SearchHeaderTab */}
      <SearchHeaderTab />

      <div>
        <CardBody>
          <div className="listjs-table" id="customerList">
            {/* <Row className="g-4 mb-3">
              <Col className="col-sm-auto">
                <div>
                  <Button color="success" className="add-btn me-1" onClick={() => tog_list()} id="create-btn"><i className="ri-add-line align-bottom me-1"></i> Add</Button>
                  <Button className="btn btn-soft-danger"
                  // onClick="deleteMultiple()"
                  ><i className="ri-delete-bin-2-line"></i></Button>
                </div>
              </Col>
              <Col className="col-sm">
                <div className="d-flex justify-content-sm-end">
                  <div className="search-box ms-2">
                    <input type="text" className="form-control search" placeholder="Search..." />
                    <i className="ri-search-line search-icon"></i>
                  </div>
                </div>
              </Col>
            </Row> */}

            <div className="table-responsive table-card mt-3 mb-1">
              <table className="table align-middle table-nowrap" id="customerTable">
                <thead className="table-light">
                  <tr>
                    <th scope="col" style={{ width: "50px" }}>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="checkAll" value="option" />
                      </div>
                    </th>
                    <th className={style.move_his_style} data-sort="customer_name" style={{ color: "#2F4C8F" }}>MOVEMENT TYPE
                      {/* <img src={Dropupdown} alt="" className={style.DropupdownStyle} /> */}
                      {/* <img src={hamIcon} alt="" className={style.hamIconStyle} /> */}




                      <Button color="primary" className={style.equalIconBtn} onClick={() => setmodal_scroll(true)}>
                            <i className=" ri-equalizer-line" style={{ color: "white" }} ></i>
                      </Button>

                      <Modal
                        isOpen={modal_scroll}
                        toggle={() => {
                          tog_scroll();
                        }}
                        scrollable={true}
                        id="exampleModalScrollable"
                      >
                        <div className={style.modalfirst}>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                             Stock Adjustment
                          </div>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                            Count Sheet Adjustment
                          </div>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                            Stock Transfer Send
                          </div>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                            Stock Transfer Receive
                          </div>
                          <hr />
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                            Work Order Picking
                          </div>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                            Work Order Put Away
                          </div>
                          <hr />
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                            Purchase Order Receive
                          </div>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                            Purchase Order Unstock
                          </div>
                          <hr />
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                            Sales Order Picking
                          </div>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                            Sales Order Fulfilment
                          </div>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                            Sales Order Restock
                          </div>
                          <div className={style.btndivStyle}>
                              <button className={style.btnModal}>Clear</button>
                              <button className={style.btnModalB}>Apply</button>
                            </div>
                          
                        </div>
                      </Modal>




                      {/* <ButtonGroup >
                        <UncontrolledButtonDropdown >
                          <DropdownToggle className={style.equalIconStyle}>
                            <i className=" ri-equalizer-line" style={{ color: "white" }}></i>
                          </DropdownToggle>
                          <DropdownMenu >
                            <DropdownItem style={{ display: "flex", gap: "5px" }}>
                              <div className="form-check">
                                <input className="form-check-input" type="checkbox" />
                              </div>
                              Stock Adjustment
                            </DropdownItem>
                            <DropdownItem style={{ display: "flex", gap: "5px" }}>
                              <div className="form-check">
                                <input className="form-check-input" type="checkbox" />
                              </div>
                              Count Sheet Adjustment</DropdownItem>
                            <DropdownItem style={{ display: "flex", gap: "5px" }}>
                              <div className="form-check">
                                <input className="form-check-input" type="checkbox" />
                              </div>
                              Stock Transfer Send</DropdownItem>
                            <DropdownItem style={{ display: "flex", gap: "5px" }}>
                              <div className="form-check">
                                <input className="form-check-input" type="checkbox" />
                              </div>
                              Stock Transfer Receive</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem style={{ display: "flex", gap: "5px" }}>
                              <div className="form-check">
                                <input className="form-check-input" type="checkbox" />
                              </div>Work Order Picking</DropdownItem>
                            <DropdownItem style={{ display: "flex", gap: "5px" }}>
                              <div className="form-check">
                                <input className="form-check-input" type="checkbox" />
                              </div>Work Order Put Away</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem style={{ display: "flex", gap: "5px" }}>
                              <div className="form-check">
                                <input className="form-check-input" type="checkbox" />
                              </div>Purchase Order Receive</DropdownItem>
                            <DropdownItem style={{ display: "flex", gap: "5px" }}>
                              <div className="form-check">
                                <input className="form-check-input" type="checkbox" />
                              </div>Purchase Order Unstock</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem style={{ display: "flex", gap: "5px" }}>
                              <div className="form-check">
                                <input className="form-check-input" type="checkbox" />
                              </div>Sales Order Picking</DropdownItem>
                            <DropdownItem style={{ display: "flex", gap: "5px" }}>
                              <div className="form-check">
                                <input className="form-check-input" type="checkbox" />
                              </div>Sales Order Fulfilment</DropdownItem>
                            <DropdownItem style={{ display: "flex", gap: "5px" }}>
                              <div className="form-check">
                                <input className="form-check-input" type="checkbox" />
                              </div>Sales Order Restock</DropdownItem>
                            <div className={style.btndivStyle}>
                              <button className={style.btnModal}>Clear</button>
                              <button className={style.btnModalB}>Apply</button>
                            </div>
                          </DropdownMenu>
                        </UncontrolledButtonDropdown>
                      </ButtonGroup> */}
                    </th>
                    <th className={style.move_his_style} data-sort="customer_name" style={{ color: "#2F4C8F" }}>MOVEMENT DATE
                      <img src={Dropupdown} alt="" className={style.DropupdownStyle} />

                      <ButtonGroup >
                        <UncontrolledDropdown >
                          <DropdownToggle className={style.equalIconStyle1}>
                            <i className=" ri-equalizer-line" style={{ color: "white" }}></i>
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-md p-2" style={{ width: "400px" }}>
                            <div className={style.btndivStyle2}>
                              <button className={style.btnModal2}>Last 30 days</button>
                              <button className={style.btnModal2}>Last 90 days</button>
                              <button className={style.btnModal2}>Custom</button>

                            </div>
                            <form >
                              <div className="mb-2" style={{ display: "flex", gap: "10px", marginBottom: "5px", marginLeft:"23px" , marginRight:"23px"}}>
                                <label className="form-label" htmlFor="exampleDropdownFormEmail">From date</label>
                                <Input type="date" style={{ width: "80%" }} className="form-control" id="exampleDropdownFormEmail" placeholder="" />
                              </div>
                              <div className="mb-2" style={{ display: "flex", gap: "10px", marginBottom: "5px", marginLeft:"23px" , marginRight:"23px"}}>
                                <label className="form-label" htmlFor="exampleDropdownFormEmail">To date</label>
                                <Input type="date" style={{ width: "80%", marginLeft: "18px" }} className="form-control" id="exampleDropdownFormEmail" placeholder="MM,DD,YYYY" />
                              </div>
                              <div className={style.btndivStyle}>
                                <button className={style.btnModal}>Clear</button>
                                <button className={style.btnModalB}>Apply</button>
                              </div>

                            </form>


                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </ButtonGroup>

                    </th>
                    <th className={style.move_his_style} data-sort="customer_name" style={{ color: "#2F4C8F" }}>LOCATION

                      <ButtonGroup >
                        <UncontrolledButtonDropdown >
                          <DropdownToggle className={style.equalIconStyle}>
                            <i className=" ri-equalizer-line" style={{ color: "white" }}></i>
                          </DropdownToggle>
                          <DropdownMenu >
                            <div className={style.searchTabStyle}>
                              <SearchOption />
                            </div>

                            <DropdownItem className={style.xStyle}>
                              <i className="ri-map-pin-fill"> XXXXXXXX</i>
                            </DropdownItem>
                            <div className={style.subTextModal}>
                              <DropdownItem className={style.noStyleloc}>

                                No sublocation</DropdownItem>
                              <DropdownItem className={style.noStyleloc}>

                                X-1</DropdownItem>
                              <DropdownItem className={style.noStyleloc}>

                                X-2</DropdownItem>

                              <DropdownItem className={style.noStyleloc}>
                                X-3</DropdownItem>
                              <DropdownItem className={style.noStyleloc}>
                                X-4</DropdownItem>
                            </div>
                            <DropdownItem style={{ display: "flex", fontSize: "14px" }}>

                              <i className="ri-map-pin-fill"> XXXXXXXX</i> </DropdownItem>
                            <div className={style.subTextModal}>
                              <DropdownItem className={style.noStyleloc}>

                                No sublocation</DropdownItem>
                              <DropdownItem className={style.noStyleloc}>

                                X-1</DropdownItem>
                              <DropdownItem className={style.noStyleloc}>

                                X-2</DropdownItem>

                              <DropdownItem className={style.noStyleloc}>
                                X-3</DropdownItem>
                              <DropdownItem className={style.noStyleloc}>
                                X-4</DropdownItem>
                            </div>
                            <div className={style.btndivStyle}>
                              <button className={style.btnModal}>Clear</button>
                            </div>
                          </DropdownMenu>
                        </UncontrolledButtonDropdown>
                      </ButtonGroup>
                    </th>
                    <th className={style.move_his_style} data-sort="customer_name" style={{ color: "#2F4C8F" }}>QUANTITY
                      <img src={Dropupdown} alt="" className={style.DropupdownStyle} />
                    </th>

                  </tr>
                </thead>
                <tbody className="list form-check-all">
                  <tr>
                    <th scope="row">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" name="chk_child" value="option1" />
                      </div>
                    </th>
                    <td className="id" style={{ display: "none" }}><Link to="#" className="fw-medium link-primary">#VZ2101</Link></td>
                    <td className="customer_name" style={{ color: "#119AD5" }}>GD6934
                      <span style={{ color: "#212529", marginLeft: "15px" }} > Frank Hook</span>
                    </td>
                    <td style={{ color: "#212529" }}>20 Dec, 2021, <span style={{ color: "#9599AD", fontWeight: "250" }}>02:21 AM</span></td>
                    <td>XXXXXXXXXXXXXXX...</td>
                    <td className="status"><span className="badge bg-success-subtle text-success text-uppercase">50 EA_</span></td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" name="chk_child" value="option1" />
                      </div>
                    </th>
                    <td className="id" style={{ display: "none" }}><Link to="#" className="fw-medium link-primary">#VZ2101</Link></td>
                    <td className="customer_name" style={{ color: "#119AD5" }}>GD6934
                      <span style={{ color: "#212529", marginLeft: "15px" }} > Frank Hook</span>
                    </td>
                    <td style={{ color: "#212529" }}>20 Dec, 2021, <span style={{ color: "#9599AD", fontWeight: "250" }}>02:21 AM</span></td>
                    <td>XXXXXXXXXXXXXXX...</td>
                    <td className="status"><span className="badge bg-success-subtle text-success text-uppercase">50 EA_</span></td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" name="chk_child" value="option1" />
                      </div>
                    </th>
                    <td className="id" style={{ display: "none" }}><Link to="#" className="fw-medium link-primary">#VZ2101</Link></td>
                    <td className="customer_name" style={{ color: "#119AD5" }}>GD6934
                      <span style={{ color: "#212529", marginLeft: "15px" }} > Frank Hook</span>
                    </td>
                    <td style={{ color: "#212529" }}>20 Dec, 2021, <span style={{ color: "#9599AD", fontWeight: "250" }}>02:21 AM</span></td>
                    <td>XXXXXXXXXXXXXXX...</td>
                    <td className="status"><span className="badge bg-success-subtle text-success text-uppercase">50 EA_</span></td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" name="chk_child" value="option1" />
                      </div>
                    </th>
                    <td className="id" style={{ display: "none" }}><Link to="#" className="fw-medium link-primary">#VZ2101</Link></td>
                    <td className="customer_name" style={{ color: "#119AD5" }}>GD6934
                      <span style={{ color: "#212529", marginLeft: "15px" }} > Frank Hook</span>
                    </td>
                    <td style={{ color: "#212529" }}>20 Dec, 2021, <span style={{ color: "#9599AD", fontWeight: "250" }}>02:21 AM</span></td>
                    <td>XXXXXXXXXXXXXXX...</td>
                    <td className="status"><span className="badge bg-success-subtle text-success text-uppercase">50 EA_</span></td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" name="chk_child" value="option1" />
                      </div>
                    </th>
                    <td className="id" style={{ display: "none" }}><Link to="#" className="fw-medium link-primary">#VZ2101</Link></td>
                    <td className="customer_name" style={{ color: "#119AD5" }}>GD6934
                      <span style={{ color: "#212529", marginLeft: "15px" }} > Frank Hook</span>
                    </td>
                    <td style={{ color: "#212529" }}>20 Dec, 2021, <span style={{ color: "#9599AD", fontWeight: "250" }}>02:21 AM</span></td>
                    <td>XXXXXXXXXXXXXXX...</td>
                    <td className="status"><span className="badge bg-success-subtle text-success text-uppercase">50 EA_</span></td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" name="chk_child" value="option1" />
                      </div>
                    </th>
                    <td className="id" style={{ display: "none" }}><Link to="#" className="fw-medium link-primary">#VZ2101</Link></td>
                    <td className="customer_name" style={{ color: "#119AD5" }}>GD6934
                      <span style={{ color: "#212529", marginLeft: "15px" }} > Frank Hook</span>
                    </td>
                    <td style={{ color: "#212529" }}>20 Dec, 2021, <span style={{ color: "#9599AD", fontWeight: "250" }}>02:21 AM</span></td>
                    <td>XXXXXXXXXXXXXXX...</td>
                    <td className="status"><span className="badge bg-success-subtle text-success text-uppercase">50 EA_</span></td>
                  </tr><tr>
                    <th scope="row">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" name="chk_child" value="option1" />
                      </div>
                    </th>
                    <td className="id" style={{ display: "none" }}><Link to="#" className="fw-medium link-primary">#VZ2101</Link></td>
                    <td className="customer_name" style={{ color: "#119AD5" }}>GD6934
                      <span style={{ color: "#212529", marginLeft: "15px" }} > Frank Hook</span>
                    </td>
                    <td style={{ color: "#212529" }}>20 Dec, 2021, <span style={{ color: "#9599AD", fontWeight: "250" }}>02:21 AM</span></td>
                    <td>XXXXXXXXXXXXXXX...</td>
                    <td className="status"><span className="badge bg-success-subtle text-success text-uppercase">50 EA_</span></td>
                  </tr><tr>
                    <th scope="row">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" name="chk_child" value="option1" />
                      </div>
                    </th>
                    <td className="id" style={{ display: "none" }}><Link to="#" className="fw-medium link-primary">#VZ2101</Link></td>
                    <td className="customer_name" style={{ color: "#119AD5" }}>GD6934
                      <span style={{ color: "#212529", marginLeft: "15px" }} > Frank Hook</span>
                    </td>
                    <td style={{ color: "#212529" }}>20 Dec, 2021, <span style={{ color: "#9599AD", fontWeight: "250" }}>02:21 AM</span></td>
                    <td>XXXXXXXXXXXXXXX...</td>
                    <td className="status"><span className="badge bg-success-subtle text-success text-uppercase">50 EA_</span></td>
                  </tr>

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

            <div className="d-flex justify-content-end">
              <div className="pagination-wrap hstack gap-2">
                <Link className={style.tableMH}>
                  Cancel
                </Link>
                <ul className="pagination listjs-pagination mb-0"></ul>
                <Link className={style.tableMHG}>
                  Submit
                </Link>
              </div>
            </div>
          </div>
        </CardBody>
      </div>




    </>
  )
}

export default MovementHistory