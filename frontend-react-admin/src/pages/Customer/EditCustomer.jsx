import React, { useEffect, useState } from "react";
import LiImage from "../../assets/images/flags//LiImage.svg";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import ukFlag from "../../assets/images/flags/ukFlag.svg";
import ImageUploader from "./ImageUploader";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import UploadComponent from "../Products/Upload";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCustomerData as onUpdateCustomerData,
  getSingleCustomer as onGetSingleCustomer,
  getCustomerRmasData,
} from "../../slices/ecommerce/thunk";
import { createSelector } from "reselect";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const CreateCustomer = () => {
  const { id } = useParams();
  // console.log('id',id)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [uploadedImage1, setUploadedImage1] = useState(null);
  const handleImageChange1 = (imageData) => {
    setUploadedImage1(imageData);
  };
  const [uploadedImage2, setUploadedImage2] = useState(null);
  const handleImageChange2 = (imageData) => {
    setUploadedImage2(imageData);
  };
  const [uploadedImage3, setUploadedImage3] = useState(null);
  const handleImageChange3 = (imageData) => {
    setUploadedImage3(imageData);
    // Your custom logic for the second div
  };

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  document.title = "Create Customer ";

  const [customActiveTab, setcustomActiveTab] = useState("1");
  const toggleCustom = (tab) => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };

  const [uploadState, setUploadState] = useState({
    pictures: [],
    // maxFileSize: 5242880,
    imgExtension: [".jpg", ".png", ".jpeg"],
  });

  const handleChange = (files) => {
    const { pictures } = uploadState;
    console.warn({ pictures, files });

    const defaultDimensions = { width: 300, height: 200 }; // Change these values to your desired default dimensions

    const imagesWithDefaultDimensions = files.map((file) => ({
      file,
      dimensions: defaultDimensions,
    }));

    setUploadState((prevState) => ({
      ...prevState,
      pictures: [...pictures, ...imagesWithDefaultDimensions],
    }));
  };

  const [thumbnail, setThumbnail] = useState({ preview: "", raw: "" });
  // const [icon, setIcon] = useState({ iconPreview: "", icon: "" });
  // const [bgImage, setBgImage] = useState({ bgPriview: "", bg: "" });
  const handleChangeone = (e) => {
    if (e.target.files.length) {
      setThumbnail({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const singleCustomerData = createSelector(
    (state) => state.Ecommerce.singleCustomer,
    (singleCustomer) => singleCustomer
  );

  const singleCustomer = useSelector(singleCustomerData);
  const [newCustomerData, setNewCustomerData] = useState({});
  console.log('singleCustomer', singleCustomer)

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      firstName: singleCustomer?.firstName || "",
      lastName: singleCustomer?.lastName || "",
      email: singleCustomer?.email || "",
      phoneNumber: singleCustomer?.phoneNumber || "",
      storeType: singleCustomer?.storeType || "",
      otpNumber: singleCustomer?.otpNumber || "",
      businessName: singleCustomer?.userLicenses?.[0]?.businessName || "",
      businessAddress: singleCustomer?.userLicenses?.[0]?.businessAddress || "",
      city: singleCustomer?.userLicenses?.[0]?.city || "",
      state: singleCustomer?.userLicenses?.[0]?.state || "",
      country: singleCustomer?.userLicenses?.[0]?.country || "",
      pinCode: singleCustomer?.userLicenses?.[0]?.pinCode || "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Please Enter the First Name"),
      lastName: Yup.string().required("Please Enter the Last Name"),
      email: Yup.string().required("Please Enter Business the Email"),
      phoneNumber: Yup.string().required("Please Enter the Phone"),
      storeType: Yup.string().required("Please Select the Store Type"),
      otpNumber: Yup.string().required("Enter the OTP Number License"),
      businessName: Yup.string().required("Enter the Business Name"),
      businessAddress: Yup.string().required("Enter the Business Address"),
      city: Yup.string().required("Enter the City"),
      state: Yup.string().required("Enter the State"),
      country: Yup.string().required("Enter the Country"),
      pinCode: Yup.string().required("Enter the zip"),
    }),
    onSubmit: (values) => {
      const newCustomer = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        storeType: values.storeType,
        otpNumber: values.otpNumber,
        businessName: values.businessName,
        businessAddress: values.businessAddress,
        city: values.city,
        state: values.state,
        country: values.country,
        pinCode: values.pinCode,
        user: {
          role: "admin",
        },
      };
      setNewCustomerData({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        storeType: values.storeType,
        otpNumber: values.otpNumber,
        businessName: values.businessName,
        businessAddress: values.businessAddress,
        city: values.city,
        state: values.state,
        country: values.country,
        pinCode: values.pinCode,
        user: {
          role: "admin",
        },
        id: id,
      });
      // console.log('updated customer', newCustomerData)
      console.log('updated customer', newCustomer)

      // dispatch(onUpdateCustomerData(id, newCustomer));
      validation.resetForm();
    },
  });

  useEffect(() => {
    dispatch(onGetSingleCustomer(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (Object.keys(newCustomerData).length != 0) {

      dispatch(onUpdateCustomerData(newCustomerData)).then(() => {
        console.log("edit customer data", newCustomerData)
        toast.success("Customer Updateded Successfully", { autoClose: 3000 });
          setTimeout(() => {
            navigate('/customer-list')
        }, 3000);
        // dispatch(getCustomerRmasData())

      }).catch(() => {
        toast.error("Customer Updateded Failed", { autoClose: 3000 });
      })
    }
  }, [dispatch, newCustomerData]);

  useEffect(()=>{
console.log("customer Update",newCustomerData)
  })
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Customer details" pageTitle="Edit Customer" />
          <Row>
            <Col lg={8}>
              {/* start here */}
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();

                  //  dispatch(onUpdateCustomerData(id)).then(()=>{
                 
                  //   navigate("/customer-list")
                  // })
                  return false;
                }}
              >
                <Card>
                  <CardBody>
                    <h5>Customer Details</h5>
                    <TabContent activeTab={customActiveTab} className="mt-4">
                      <TabPane id="addproduct-general-info" tabId="1">
                        <Row>
                          <Col lg={6}>
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="manufacturer-name-input"
                              >
                                First Name
                              </label>
                              <Input
                                type="text"
                                className="form-control"
                                id="product-title-input"
                                placeholder="Enter First Name"
                                name="firstName"
                                value={validation.values.firstName || ""}
                                onBlur={validation.handleBlur}
                                onChange={validation.handleChange}
                                invalid={
                                  validation.errors.firstName &&
                                    validation.touched.firstName
                                    ? true
                                    : false
                                }
                              />
                              {validation.errors.firstName &&
                                validation.touched.firstName ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.firstName}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="manufacturer-brand-input"
                              >
                                Last Name
                              </label>
                              <Input
                                type="text"
                                className="form-control"
                                id="manufacturer-brand-input"
                                name="lastName"
                                placeholder="Enter Last Name"
                                value={validation.values.lastName || ""}
                                onBlur={validation.handleBlur}
                                onChange={validation.handleChange}
                                invalid={
                                  validation.errors.lastName &&
                                    validation.touched.lastName
                                    ? true
                                    : false
                                }
                              />
                              {validation.errors.lastName &&
                                validation.touched.lastName ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.lastName}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={6}>
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="product-stock-input"
                              >
                                Business Email
                              </label>
                              <div className="input-group mb-3">
                                <Input
                                  type="email"
                                  className="form-control"
                                  id="product-stock-input"
                                  placeholder="marycousar@gmail.com"
                                  name="email"
                                  value={validation.values.email || ""}
                                  onBlur={validation.handleBlur}
                                  onChange={validation.handleChange}
                                  invalid={
                                    validation.errors.email &&
                                      validation.touched.email
                                      ? true
                                      : false
                                  }
                                />
                                {validation.errors.email &&
                                  validation.touched.email ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.email}
                                  </FormFeedback>
                                ) : null}
                              </div>
                            </div>
                          </Col>

                          <Col sm={6}>
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="product-price-input"
                              >
                                Phone
                              </label>
                              <div className="input-group mb-3">
                                <span
                                  className="input-group-text"
                                  id="product-price-addon"
                                >
                                  <img src={ukFlag} alt="ukFlag" />
                                </span>
                                <Input
                                  type="number"
                                  className="form-control"
                                  id="product-price-input"
                                  placeholder="580-464-4694"
                                  name="phoneNumber"
                                  aria-label="Price"
                                  aria-describedby="product-phoneNumber-addon"
                                  value={validation.values.phoneNumber || ""}
                                  onBlur={validation.handleBlur}
                                  onChange={validation.handleChange}
                                  invalid={
                                    validation.errors.phoneNumber &&
                                      validation.touched.phoneNumber
                                      ? true
                                      : false
                                  }
                                />
                                {validation.errors.phoneNumber &&
                                  validation.touched.phoneNumber ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.phoneNumber}
                                  </FormFeedback>
                                ) : null}
                              </div>
                            </div>
                          </Col>

                          <div style={{ display: "flex" }}>
                            <Col>
                              <div className="">
                                <div className="input-group  mt-4">
                                  <Card>
                                    <h5 className="card-title mb-0">
                                      Government issued ID (Driver’s License,
                                      State ID etc)
                                    </h5>
                                    <CardBody>
                                      <UploadComponent
                                        {...uploadState}
                                        handleChange={handleChange}
                                      />
                                    </CardBody>
                                  </Card>
                                </div>
                              </div>
                            </Col>
                            <div style={{ width: "49%", marginTop: "50px" }}>
                              <Col sm={12}>
                                <div className="mb-3">
                                  <label
                                    className="form-label"
                                    htmlFor="product-orders-input"
                                  >
                                    Store type
                                  </label>
                                  <div className="input-group mb-3">
                                    <Input
                                      type="select"
                                      className={`form-control ${validation.errors.storeType &&
                                          validation.touched.storeType
                                          ? "is-invalid"
                                          : ""
                                        }`}
                                      id="product-store-input"
                                      placeholder="Distributor"
                                      name="storeType"
                                      aria-label="storeType"
                                      aria-describedby="product-store-addon"
                                      value={validation.values.storeType || ""}
                                      onBlur={validation.handleBlur}
                                      onChange={validation.handleChange}
                                    >
                                      <option value="">
                                        Select Store type
                                      </option>
                                      <option value="Distributor">
                                        Distributor
                                      </option>
                                      <option value="Smoke/Vape">
                                        Smoke/Vape
                                      </option>
                                      <option value="Chain">Chain</option>
                                      <option value="C-Store/Gas/Liq">
                                        C-Store/Gas/Liq
                                      </option>
                                      <option value="Dispensary">
                                        Dispensary
                                      </option>
                                      <option value="Other">Other</option>
                                    </Input>
                                    {validation.errors.storeType &&
                                      validation.touched.storeType ? (
                                      <div className="invalid-feedback">
                                        {validation.errors.storeType}
                                      </div>
                                    ) : null}
                                  </div>
                                </div>
                              </Col>
                              <br />
                              <Col sm={12}>
                                <div className="mb-3">
                                  <label
                                    className="form-label"
                                    htmlFor="product-orders-input"
                                  >
                                    Which Tobacco vapour or OTP License
                                  </label>
                                  <div className="input-group mb-3">
                                    <Input
                                      type="number"
                                      className="form-control"
                                      id="product-orders-input"
                                      placeholder="Retailer"
                                      name="otpNumber"
                                      aria-label="otpNumber"
                                      aria-describedby="product-orders-addon"
                                      value={validation.values.otpNumber || ""}
                                      onBlur={validation.handleBlur}
                                      onChange={validation.handleChange}
                                      invalid={
                                        validation.errors.otpNumber &&
                                          validation.touched.otpNumber
                                          ? true
                                          : false
                                      }
                                    />
                                    {validation.errors.otpNumber &&
                                      validation.touched.otpNumber ? (
                                      <FormFeedback type="invalid">
                                        {validation.errors.otpNumber}
                                      </FormFeedback>
                                    ) : null}
                                  </div>
                                </div>
                              </Col>
                            </div>
                          </div>
                        </Row>
                      </TabPane>
                    </TabContent>
                  </CardBody>
                </Card>

                {/* end here */}

                <Card className="mt-4">
                  <CardBody>
                    <TabContent activeTab={customActiveTab} className="mt-4">
                      <TabPane id="addproduct-general-info" tabId="1">
                        <Row>
                          <Col lg={6}>
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="manufacturer-name-input"
                              >
                                Business Name
                              </label>
                              <Input
                                type="text"
                                className={`form-control ${validation.errors.businessName &&
                                    validation.touched.businessName
                                    ? "is-invalid"
                                    : ""
                                  }`}
                                id="product-bussinessname-input"
                                placeholder="Enter Business Name"
                                name="businessName"
                                // aria-label="businessName"
                                // aria-describedby="product-businessName-addon"
                                value={validation.values.businessName || ""}
                                onBlur={validation.handleBlur}
                                onChange={validation.handleChange}
                              ></Input>
                              {validation.errors.businessName &&
                                validation.touched.businessName ? (
                                <div className="invalid-feedback">
                                  {validation.errors.businessName}
                                </div>
                              ) : null}
                            </div>
                            {/* <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="manufacturer-name-input"
                              >
                                 Business Name
                              </label>
                              <Input
                                type="text"
                                className="form-control"
                                id="product-orders-input"
                                placeholder="Enter Business Name"
                                name="businessName"
                                value={validation.values.businessName || ""}
                                onBlur={validation.handleBlur}
                                onChange={validation.handleChange}
                                invalid={
                                  validation.errors.businessName &&
                                  validation.touched.businessName
                                    ? true
                                    : false
                                }
                              />
                              {validation.errors.businessName &&
                              validation.touched.businessName ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.businessName}
                                </FormFeedback>
                              ) : null}
                            </div> */}
                          </Col>
                          <Col lg={6}>
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="manufacturer-businessaddress-input"
                              >
                                Business Address
                              </label>
                              <Input
                                type="type"
                                className={`form-control ${validation.errors.businessAddress &&
                                    validation.touched.businessAddress
                                    ? "is-invalid"
                                    : ""
                                  }`}
                                id="product-orders-input"
                                placeholder="Enter Business Address"
                                name="businessAddress"
                                aria-label="businessAddress"
                                aria-describedby="product-businessAddress-addon"
                                value={validation.values.businessAddress || ""}
                                onBlur={validation.handleBlur}
                                onChange={validation.handleChange}
                              ></Input>
                              {validation.errors.businessAddress &&
                                validation.touched.businessAddress ? (
                                <div className="invalid-feedback">
                                  {validation.errors.businessAddress}
                                </div>
                              ) : null}
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={6}>
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="product-stock-input"
                              >
                                City
                              </label>
                              <div className="input-group mb-3">
                                <Input
                                  type="text"
                                  className="form-control"
                                  id="product-city-input"
                                  placeholder="Illinois"
                                  name="city"
                                  value={validation.values.city || ""}
                                  onBlur={validation.handleBlur}
                                  onChange={validation.handleChange}
                                  invalid={
                                    validation.errors.city &&
                                      validation.touched.city
                                      ? true
                                      : false
                                  }
                                />
                                {validation.errors.city &&
                                  validation.touched.city ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.city}
                                  </FormFeedback>
                                ) : null}
                              </div>
                            </div>
                          </Col>

                          <Col sm={6}>
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="product-price-input"
                              >
                                State
                              </label>
                              <div className="input-group mb-3">
                                <Input
                                  type="text"
                                  className="form-control"
                                  id="product-state-input"
                                  placeholder="Chicago"
                                  name="state"
                                  value={
                                    validation.values.state ||
                                    singleCustomer?.state ||
                                    ""
                                  }
                                  onBlur={validation.handleBlur}
                                  onChange={validation.handleChange}
                                  invalid={
                                    validation.errors.state &&
                                      validation.touched.state
                                      ? true
                                      : false
                                  }
                                />
                                {validation.errors.state &&
                                  validation.touched.state ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.state}
                                  </FormFeedback>
                                ) : null}
                              </div>
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="product-stock-input"
                              >
                                Country
                              </label>
                              <div className="input-group mb-3">
                                <Input
                                  type="text"
                                  className="form-control"
                                  id="product-country-input"
                                  placeholder="United States"
                                  name="country"
                                  value={validation.values.country || ""}
                                  onBlur={validation.handleBlur}
                                  onChange={validation.handleChange}
                                  invalid={
                                    validation.errors.country &&
                                      validation.touched.country
                                      ? true
                                      : false
                                  }
                                />
                                {validation.errors.country &&
                                  validation.touched.country ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.country}
                                  </FormFeedback>
                                ) : null}
                              </div>
                            </div>
                          </Col>

                          <Col sm={6}>
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="product-price-input"
                              >
                                Post Code Zip
                              </label>
                              <div className="input-group mb-3">
                                <Input
                                  type="number"
                                  className="form-control"
                                  id="product-postcode-input"
                                  placeholder="294069302"
                                  name="pinCode"
                                  value={validation.values.pinCode || ""}
                                  onBlur={validation.handleBlur}
                                  onChange={validation.handleChange}
                                  invalid={
                                    validation.errors.pinCode &&
                                      validation.touched.pinCode
                                      ? true
                                      : false
                                  }
                                />
                                {validation.errors.pinCode &&
                                  validation.touched.pinCode ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.pinCode}
                                  </FormFeedback>
                                ) : null}
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </TabPane>
                    </TabContent>
                  </CardBody>
                </Card>

                <div
                  style={{
                    marginBottom: "40px",
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", gap: "5px" }}>
                    {/* <button className='btn btn-success'>Active</button>
                    <button className='btn btn-danger'>Inactive</button>
                    <button className='btn btn-danger'>Block</button> */}
                  </div>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    {/* <button className='btn btn-danger'>Disapprove</button> */}
                    <Button type="submit" className="btn btn-success">
                      Approve
                    </Button>
                    <Link to={`/customer-list`}> </Link>
                  </div>
                </div>
                {/* <Button type='submit'>Submit */}
              </Form>
            </Col>

            {/*end here  */}

            <Col lg={4}>
              <div className="card">
                <div className="card-header">
                  <h5 className="float-end fs-11">580-464-4694</h5>
                  <h5 className="card-title mb-0">
                    {" "}
                    FEIN License <span style={{ color: "red" }}>*</span>
                    <FeatherIcon
                      icon="alert-circle"
                      style={{
                        width: "12px",
                        height: "12 px",
                        marginLeft: "5px",
                      }}
                    />
                  </h5>
                </div>
                <CardBody>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <img src={LiImage} alt="" className="img-fluid " />
                  </div>
                </CardBody>
              </div>

              <div className="card mt-4">
                <div className="card-header">
                  <h5 className="card-title mb-0">
                    {" "}
                    Tobacco License
                    <FeatherIcon
                      icon="alert-circle"
                      style={{
                        width: "12px",
                        height: "12 px",
                        marginLeft: "5px",
                      }}
                    />
                  </h5>
                </div>
                <CardBody>
                  <div
                    className="mb-3"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "111.361px",
                        backgroundColor: "#E9EBEC",
                        height: "111.360px",
                        borderRadius: "5px",
                      }}
                    >
                      <ImageUploader
                        initialImage={uploadedImage2}
                        onImageChange={handleImageChange2}
                      />
                    </div>
                    <div
                      style={{
                        width: "111.361px",
                        backgroundColor: "#E9EBEC",
                        height: "111.360px",
                        borderRadius: "5px",
                      }}
                    ></div>
                    <div
                      style={{
                        width: "111.361px",
                        backgroundColor: "#E9EBEC",
                        height: "111.360px",
                        borderRadius: "5px",
                      }}
                    ></div>
                    <div
                      style={{
                        width: "111.361px",
                        backgroundColor: "#E9EBEC",
                        height: "111.360px",
                        borderRadius: "5px",
                      }}
                    ></div>
                  </div>
                </CardBody>
              </div>

              <Card className="mt-4">
                <div className="card-header">
                  <h5 className="card-title mb-0">
                    {" "}
                    State Tax ID/ Business License
                  </h5>
                </div>
                <CardBody>
                  <div
                    className="mb-3"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "111.361px",
                        backgroundColor: "#E9EBEC",
                        height: "111.360px",
                        borderRadius: "5px",
                      }}
                    >
                      <ImageUploader
                        initialImage={uploadedImage1}
                        onImageChange={handleImageChange1}
                      />
                    </div>
                    <div
                      style={{
                        width: "111.361px",
                        backgroundColor: "#E9EBEC",
                        height: "111.360px",
                        borderRadius: "5px",
                      }}
                    ></div>
                    <div
                      style={{
                        width: "111.361px",
                        backgroundColor: "#E9EBEC",
                        height: "111.360px",
                        borderRadius: "5px",
                      }}
                    ></div>
                    <div
                      style={{
                        width: "111.361px",
                        backgroundColor: "#E9EBEC",
                        height: "111.360px",
                        borderRadius: "5px",
                      }}
                    ></div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {/* </form> */}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CreateCustomer;
