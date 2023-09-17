import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Col, Input, Row, Table } from 'reactstrap'
// edit and delete icons
import editIcon from '../../assets/productIcon/editIcon.svg'
import deleteIcon from '../../assets/productIcon/deleteIcon.svg'
import style from '../../styles/products/ProductVendor.module.css'

import SearchHeaderTab from '../../pages/Products/SearchHeaderTab'

//Imported API Functions
import {
  getProductsVendors as onGetProductsVendors,

} from "../../slices/ecommerce/thunk";
import { useDispatch, useSelector } from 'react-redux'
import { createSelector } from "reselect";
// import { error } from 'console'
const ProductVendors = (props) => {
  console.log('id',props?.id?.id)
  const dispatch = useDispatch();
  

  const selectecomproductvendorsData = createSelector(
    (state) => state.Ecommerce.productsvendors,
    (productsVendors) => productsVendors
  );

  const productsVendors = useSelector(selectecomproductvendorsData);
  console.log("this is my console",productsVendors);

  const filterValue = null;






  // useEffect(() => {
  //   // Check if productsVendors is empty or filterValue is null
  //   if ((!productsVendors || productsVendors.length === 0) && filterValue === null) {
  //     // Dispatch the action to fetch product vendors
  //     dispatch());
  //   }
  //   // Add dependencies as needed (e.g., dispatch, filterValue)
  // }, [dispatch, productsVendors, filterValue]);

useEffect(()=>{
  if(!props?.id?.id==undefined){

    onGetProductsVendors(props?.id?.id)
  }
},[dispatch,props?.id?.id])

  return (
    <div >
      <Row>
        <Col xl={12}>
          <SearchHeaderTab />
          <br />
          <div className="table-responsive mt-4 mt-xl-0" style={{ overflow: "hidden" }}>
            <Table className="table-white   table-nowrap align-middle mb-0 " >
              <thead className="table-light">
                <tr >
                  <th scope="col " style={{ "width": "25px" }}>
                    <div className="form-check row align-items-center">
                      <div className="col-md-2">
                        <Input type="checkbox" id="checkAll" defaultValue="option1" />
                      </div>
                    </div>
                  </th>
                  <th scope="col">Vendor</th>
                  <th scope="col">Vendor Product Code</th>
                  <th scope="col">Vendor Price</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr >
                  <th scope="col" style={{ "width": "15px" }}>
                    <div className="form-check row align-items-center">
                      <div className="col-md-2">
                        <Input type="checkbox" id="checkAll" defaultValue="option2" />
                      </div>
                    </div>
                  </th>
                  <td >Alpha Nine</td>
                  <td>ADPT0195</td>
                  <td >$6.89</td>
                  <td >
                    <div className="hstack gap-3 flex-wrap text-align-center">
                      <li className="list-inline-item edit">
                        <Link
                          to="/edit-category"
                          className="text-primary d-inline-block edit-item-btn"
                        >
                          <i className="ri-pencil-fill fs-17"></i>
                        </Link>
                      </li>
                      <li className="list-inline-item">
                        <Link
                          to="#"
                          className="text-danger d-inline-block remove-item-btn"
                        >
                          <i className="ri-delete-bin-5-fill fs-17"></i>
                        </Link>
                      </li>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="col">
                    <div className="form-check row align-items-center">
                      <div className="col-md-2">
                        <Input type="checkbox" id="checkAll" defaultValue="option1" />

                      </div>
                    </div>
                  </th>
                  <td >Betty Kane</td>
                  <td>ADPT0195</td>
                  <td >$6.89</td>
                  <td >
                    <div className="hstack gap-3 flex-wrap">
                      <li className="list-inline-item edit">
                        <Link
                          to="/edit-category"
                          className="text-primary d-inline-block edit-item-btn"
                        >
                          <i className="ri-pencil-fill fs-17"></i>
                        </Link>
                      </li>
                      <li className="list-inline-item">
                        <Link
                          to="#"
                          className="text-danger d-inline-block remove-item-btn"
                        >
                          <i className="ri-delete-bin-5-fill fs-17"></i>
                        </Link>
                      </li>
                    </div>
                  </td>
                </tr>
                <tr >
                  <th scope="col" >
                    <div className="form-check row align-items-center">
                      <div className="col-md-2">
                        <Input type="checkbox" id="checkAll" defaultValue="option1" />
                      </div>
                    </div>
                  </th>
                  <td >Betty Kane</td>
                  <td>ADPT0195</td>
                  <td >$6.89</td>


                  <td >
                    <div className="hstack gap-3 flex-wrap">
                      <li className="list-inline-item edit">
                        <Link
                          to="/edit-category"
                          className="text-primary d-inline-block edit-item-btn"
                        >
                          <i className="ri-pencil-fill fs-17"></i>
                        </Link>
                      </li>
                      <li className="list-inline-item">
                        <Link
                          to="#"
                          className="text-danger d-inline-block remove-item-btn"
                        >
                          <i className="ri-delete-bin-5-fill fs-17"></i>
                        </Link>
                      </li>
                    </div>
                  </td>
                </tr>
                <tr >
                  <th scope="col" >
                    <div className="form-check row align-items-center">
                      <div className="col-md-2">
                        <Input type="checkbox" id="checkAll" defaultValue="option1" />
                      </div>
                    </div>
                  </th>
                  <td >Betty Kane</td>
                  <td>ADPT0195</td>

                  <td >$6.89</td>

                  <td >
                    <div className="hstack gap-3 flex-wrap">
                      <li className="list-inline-item edit">
                        <Link
                          to="/edit-category"
                          className="text-primary d-inline-block edit-item-btn"
                        >
                          <i className="ri-pencil-fill fs-17"></i>
                        </Link>
                      </li>
                      <li className="list-inline-item">
                        <Link
                          to="#"
                          className="text-danger d-inline-block remove-item-btn"
                        >
                          <i className="ri-delete-bin-5-fill fs-17"></i>
                        </Link>
                      </li>
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </div>

  )
}

export default ProductVendors