import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Input, Label, Table } from "reactstrap";
import {  getAllVendor as onGetAllVendor } from "../../slices/ecommerce/thunk";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import SearchOption from "../../Components/Common/SearchOption";
import style from "../../styles/vendor/PurchaseOrder.module.css";
import {
  getAllCustomer as getAllCustomer,
  deleteVendor,
} from "../../slices/ecommerce/thunk";
import DeleteModal from "../../Components/Common/DeleteModal";

const VendorList = () => {
  document.title = "Vendor List | American Distributors";
  const dispatch = useDispatch();
  const [vendorList, setVendorList] = useState([]);
  const [dele, setDele] = useState(0);
  const [deleteModal, setDeleteModal] = useState(false);
  const [custDelete, setCustDelete] = useState("");

  const selectedVendorData = createSelector(
    (state) => state.Ecommerce.vendor,
    (vendor) => vendor
  );
  const vendorData = useSelector(selectedVendorData);
  // console.log(vendorList);
  const handleVendorDelete = () => {
    // console.log(custDelete)
    // console.log("custom", customerId);
    dispatch(deleteVendor(custDelete)).then(() => {
      setDeleteModal(false);
      dispatch(getAllCustomer())
      // console.log("total customer", onGeAllCustomer)
    })
    // if(customerList){
    //   console.log("customerList", customerList);
    // }

   

  };
  useEffect(() => {
    dispatch(onGetAllVendor());
  }, [dispatch]);

  useEffect(() => {
    setVendorList(vendorData);
  }, [vendorData]);
  const [del, setDelete] = useState(0)
  //Delete One Vendor through checkbox
  // const deleteOneVendor = () => {
  //   const ele = document.querySelectorAll(".vendorCheckbox:checked");
  //   const del = document.getElementById("selection-element");
  //   ele.forEach((element) => setDelete((element.value)))
  //   // console.log("vendor id", del)

  //   setDele(ele.length);
  //   if (ele.length === 0) {
  //     del.style.display = "none";
  //   } else {
  //     del.style.display = "block";
  //   }
  // }
  // const handleVendorDelete=(del)=>{
  //   //api funtion 
  //   dispatch(deleteProducts(del[0]));
  // }
  const deleteOneVendor = () => {
    const ele = document.querySelectorAll(".vendorCheckbox:checked");
    const del = document.getElementById("selection-element");
    // ele.forEach((element) =>console.log((element.value)))

    // console.log("Delete",ele[0].value);
    setCustDelete(ele[0]?.value)
    // setCustDelete(ele?.value)
    setDele(ele.length);
    if (ele.length === 0) {
      del.style.display = "none";
    } else {
      del.style.display = "block";
    }
  };

  const handleOneVendorDelete = (vendorid) => { }
  return (
    <div className="page-content">
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleVendorDelete}
        onCloseClick={() => setDeleteModal(false)}
      />
      <Container fluid>
        <BreadCrumb title="All Vendor" pageTitle="All Vendor" belong="Vendor" />
        <div className="col-auto d-flex justify-content-end bg-white" style={{ paddingRight: '25px', paddingTop: '10px' }}>
          <div id="selection-element">
            <div className="my-n1 d-flex align-items-center text-muted">
              Select{" "}
              <div
                id="select-content"
                className="text-body fw-semibold px-1"
              >
                {dele}
              </div>{" "}
              Result{" "}
              <button
                type="button"
                className="btn btn-link link-danger p-0 ms-3"
                // onClick={handleVendorDelete}
                onClick={() => setDeleteModal(true)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
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

            <div>
              <div className="col-sm-auto ms-auto">
                <div>
                  <Link
                    to="#"
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
              <th scope="col">Name</th>
              <th scope="col">Company Name</th>
              <th scope="col">Email</th>
              <th scope="col">Payables</th>
              <th scope="col">Status</th>
              <th scope="col" style={{ width: "100px", textAlign: "center" }}>
                View Details
              </th>
            </tr>
          </thead>
          <tbody>
            {vendorList?.map((item) => (
              <tr>
                <td>
                  <div className="form-check">
                    <Input
                      type="checkbox"
                      className="vendorCheckbox form-check-input"
                      value={item._id}
                      onClick={() => deleteOneVendor()}
                    />
                    <Label
                      className="form-check-label"
                      htmlFor="cardtableCheck01"
                    ></Label>
                  </div>
                </td>
                <td><Link to={`/vendor/${item._id}`} className="clickMouseHover">{`${item?.firstName} ${item?.lastName}`}</Link></td>
                <td><Link to={`/vendor/${item._id}`} className="clickMouseHover">{item?.companyName}</Link></td>
                <td><Link to={`/vendor/${item._id}`} className="clickMouseHover">{item?.vendorEmail}</Link></td>
                <td>{!item?.balance ? "$5487" : "0"}</td>
                <td>
                  <div
                    className="form-check form-switch form-switch-md mb-3 form-switch-success"
                    dir="ltr"
                  >
                    <Input
                      type="checkbox"
                      className="form-check-input"
                      id="customSwitchsizemd"
                     
                    />
                  </div>
                </td>
                <td>
                  <ul
                    className="list-inline hstack gap-2 mb-0"
                    style={{ textAlign: "center" }}
                  >
                    <li className="list-inline-item">
                      <Link to="#" className="text-primary d-inline-block">
                        <i className="ri-eye-fill fs-16"></i>
                      </Link>
                    </li>
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
                        <i className="ri-delete-bin-5-fill fs-16"  onClick={() => setDeleteModal(true)}></i>
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

export default VendorList;
