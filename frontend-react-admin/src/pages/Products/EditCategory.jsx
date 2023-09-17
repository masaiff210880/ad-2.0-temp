


// Default COde below here


import React, { useState } from "react";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import {
  Card,
  CardBody,
  Col,
  Container,
  CardHeader,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Input,
  Label,
  FormFeedback,
  Form,
} from "reactstrap";

// Redux
import { useDispatch } from "react-redux";
import style from "../../styles/products/Addproduct.module.css"
import { addNewProduct as onAddNewProduct } from "../../slices/thunks";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import classnames from "classnames";
import Dropzone from "react-dropzone";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { Link, useNavigate } from "react-router-dom";

//formik
import { useFormik } from "formik";
import * as Yup from "yup";

// Import React FilePond
import { registerPlugin } from "react-filepond";
import Flatpickr from "react-flatpickr";
import Select from "react-select";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import drag from '../../assets/images/products/drag.svg'
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

import { styled } from "styled-components";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const EditCategory = (props) => {
  document.title = "Create Product | American Distributors";

  const history = useNavigate();
  const dispatch = useDispatch();

  const [customActiveTab, setcustomActiveTab] = useState("1");
  const [thumbnail, setThumbnail] = useState({ preview: "", raw: "" });
  const [icon, setIcon] = useState({ iconPreview: "", icon: "" });
  const [icon3, setIcon3] = useState({ iconPreview3: "", icon3: "" });

  const [bgImage, setBgImage] = useState({ bgPriview: "", bg: "" })
  const toggleCustom = (tab) => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };


  const handleChnage1 = (e) => {
    if (e.target.files.length) {
      setIcon({
        iconPreview: URL.createObjectURL(e.target.files[0]),
        icon: e.target.files[0],
      });
    }
  }


  const handleChnage3 = (e) => {
    if (e.target.files.length) {
      setIcon3({
        iconPreview3: URL.createObjectURL(e.target.files[0]),
        icon3: e.target.files[0],
      });
    }
  }
  const [selectedFiles, setselectedFiles] = useState([]);
  const [selectedVisibility, setselectedVisibility] = useState(null);
  const [taxable, setTaxable] = useState("");
  const [editorData, setEditorData] = useState('');
  const [url, setUrl] = useState("");
  const [showBrowseButton, setShowBrowseButton] = useState(true);


  function handleAcceptedFiles(files) {
    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );
    setselectedFiles(files);
  }

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
      pictures: [...pictures, ...imagesWithDefaultDimensions]
    }));
  };


  const handleChange3 = (files) => {
    const { pictures } = uploadState;
    console.warn({ pictures, files });

    const defaultDimensions = { width: 300, height: 200 }; // Change these values to your desired default dimensions

    const imagesWithDefaultDimensions = files.map((file) => ({
      file,
      dimensions: defaultDimensions,
    }));

    setUploadState((prevState) => ({
      ...prevState,
      pictures: [...pictures, ...imagesWithDefaultDimensions]
    }));
  };

  function handleSelectVisibility(selectedVisibility) {
    setselectedVisibility(selectedVisibility);
  }

  const handleTaxable = (e) => {
    setTaxable(e.target.value)
  }

  const getPlainText = (htmlString) => {
    const parser = new DOMParser();
    const parsedDoc = parser.parseFromString(htmlString, 'text/html');
    return parsedDoc.body.textContent || '';
  };

  const handleFiles = files => {
    if (files && files.fileList.length > 0) {
      const reader = new FileReader();

      reader.onload = e => {
        setUrl(e.target.result);
      };

      reader.readAsDataURL(files.fileList[0]);
      setShowBrowseButton(false);
    }
  };

  const handleuploadFiles = (files) => {
    console.log(files);
    setUrl(files.base64);
  };

  let description = getPlainText(editorData);


  function handleAcceptedFiles(files) {
    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );
    setselectedFiles(files);
  }

  const handleCancel = () => {
    setUrl(null);
  };


  const [selectedMulti, setSelectedMulti] = useState([]);

  const handleMulti = (selectedMulti, newValue) => {
    setSelectedMulti(selectedMulti);
    console.log("selected data", selectedMulti)
  }

  const [sku, setSku] = useState([]);
  const variantChange = (event) => {
    console.log("sku value", event.target.value)
  }

  const SingleOptions = [
    { value: 'apple', label: 'apple' },
    { value: 'kiwi', label: 'kiwi' },
    { value: 'avacado', label: 'avacado' },
    { value: 'banana', label: 'banana' },
    { value: 'green', label: 'green' },
  ];

  const ColorOptions = [
    { value: 'red', label: 'red' },
    { value: 'black', label: 'black' },
    { value: 'blue', label: 'blue' },
    { value: 'orange', label: 'orange' },
    { value: 'white', label: 'white' },
  ]


  // Delete row
  const deleteRow = (index) => {
    const updatedSelectedMulti = [...selectedMulti];
    updatedSelectedMulti.splice(index, 1);
    setSelectedMulti(updatedSelectedMulti);
  };

  // Add more attributes
  const [attributeCombinations, setAttributeCombinations] = useState([]);

  const handleAddCombination = () => {
    const newCombination = {
      attributes: 'Flavours', // Default value
      options: [
        // { value: 'apple', label: 'apple' },
        // { value: 'kiwi', label: 'kiwi' },
        // { value: 'avacado', label: 'avacado' },
        // { value: 'banana', label: 'banana' },
        // { value: 'green', label: 'green' },
      ]
    };
    setAttributeCombinations([...attributeCombinations, newCombination]);
  };

  const handleAttributeChange = (index, selectedOption) => {
    const updatedCombinations = [...attributeCombinations];
    updatedCombinations[index].attributes = selectedOption.value;
    setAttributeCombinations(updatedCombinations);
    console.log("attribvute color", updatedCombinations)
  };

  const handleOptionChange = (index, selectedOptions) => {
    const updatedCombinations = [...attributeCombinations];
    updatedCombinations[index].options = selectedOptions;
    setAttributeCombinations(updatedCombinations);
  };

  // Saveing Attributes
  const [selectedAttribute, setSelectedAttribute] = useState(''); // State for selected attribute

  const handleAttributes = (event) => {
    setSelectedAttribute(event.target.value);
    setSelectedMulti([]);  // Clear selected options when attribute changes
    console.log("attributes", selectedAttribute)
  };

  /**
   * Formats the size
   */
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }



  const productCategory = [
    {
      options: [
        { label: "All", value: "All" },
        { label: "Appliances", value: "Kitchen Storage & Containers" },
        { label: "Fashion", value: "Clothes" },
        { label: "Electronics", value: "Electronics" },
        { label: "Grocery", value: "Grocery" },
        { label: "Home & Furniture", value: "Furniture" },
        { label: "Kids", value: "Kids" },
        { label: "Mobiles", value: "Mobiles" },
      ],
    },
  ];
  const productBrand = [
    {
      options: [
        { label: "All", value: "All" },
        { label: "Smoke", value: "Smoke" },
        { label: "Vibes", value: "Vibes" },
        { label: "E-liquids", value: "E-liquids" },
      ],
    },
  ];
  const classification = [
    {
      options: [
        { label: "All", value: "All" },
        { label: "Classification1", value: "Classification1" },
        { label: "Classification2", value: "Classification2" },
        { label: "Classification3", value: "Classification3" },
      ],
    },
  ];
  const indirect = [
    {
      options: [
        { label: "All", value: "All" },
        { label: "indirect1", value: "indirect1" },
        { label: "indirect2", value: "indirect2" },
        { label: "indirect3", value: "indirect3" },
      ],
    },
  ];

  const handleChnage2 = (e) => {
    if (e.target.files.length) {
      setBgImage({
        bgPriview: URL.createObjectURL(e.target.files[0]),
        bg: e.target.files[0],
      });
    }
  }

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



  const dateFormat = () => {
    let d = new Date(),
      months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let h = (d.getHours() % 12) || 12;
    let ampm = d.getHours() < 12 ? "AM" : "PM";
    return ((d.getDate() + ' ' + months[d.getMonth()] + ', ' + d.getFullYear() + ", " + h + ":" + d.getMinutes() + " " + ampm).toString());
  };

  const [date, setDate] = useState(dateFormat());

  const dateformate = (e) => {
    const dateString = e.toString().split(" ");
    let time = dateString[4];
    let H = +time.substr(0, 2);
    let h = (H % 12) || 12;
    h = (h <= 9) ? h = ("0" + h) : h;
    let ampm = H < 12 ? "AM" : "PM";
    time = h + time.substr(2, 3) + " " + ampm;

    const date = dateString[2] + " " + dateString[1] + ", " + dateString[3];
    const orderDate = (date + ", " + time).toString();
    setDate(orderDate);
  };

  const productStatus = [
    {
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
        { label: "Scheduled", value: "scheduled" },
      ],
    },
  ];

  const productVisibility = [
    {
      options: [
        { label: "Hidden", value: "Hidden" },
        { label: "Public", value: "Public" },
      ],
    },
  ];

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: "",
      slug: "",
      stock: "",
      orders: "",
      category: "",
      publishedDate: "",
      status: "",
      rating: 4.5,
      manufacturer_name: "",
      manufacturer_brand: "",
      product_discount: "",
      meta_title: "",
      meta_keyword: "",
      product_tags: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter a Product Title"),
      slug: Yup.string().required("Please Enter a Product Slug"),
      stock: Yup.string().required("Please Enter a Product stock"),
      orders: Yup.string().required("Please Enter a Product orders"),
      category: Yup.string().required("Please Enter a Product category"),
      status: Yup.string().required("Please Enter a Product status"),
      manufacturer_name: Yup.string().required("Please Enter a Manufacturer Name"),
      manufacturer_brand: Yup.string().required("Please Enter a Manufacturer Brand"),
      product_discount: Yup.string().required("Please Enter a Product Discount"),
      meta_title: Yup.string().required("Please Enter a Meta Title"),
      meta_keyword: Yup.string().required("Please Enter a Meta Keyword"),
      product_tags: Yup.string().required("Please Enter a Product Tags"),
    }),
    onSubmit: (values) => {
      const newProduct = {
        _id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
        name: values.name,
        slug: values.slug,
        stock: values.stock,
        orders: values.orders,
        category: values.category,
        publishedDate: date,
        status: values.status,
        rating: 4.5,
      };
      // save new product
      // dispatch(onAddNewProduct(newProduct));
      console.log('add product', newProduct)
      history("/apps-ecommerce-products");
      validation.resetForm();
    }
  });
  return (
    <div className="page-content">
      <Container fluid style={{ paddingBottom: "150px" }} >
        <BreadCrumb title="PRODUCT CATEGORIES" pageTitle="Edit Category" />

        <Row>
          <Col lg={8} >
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                validation.handleSubmit();
                return false;
              }}>
              <Card style={{ height: "730px" }}>
                <CardBody>
                  <div className="mb-3" >
                    <Label className="form-label" htmlFor="product-title-input">
                      Name
                      {/* <FeatherIcon icon="alert-circle" style={{ width: '12px', height: '12 px', marginLeft: '5px' }} /> */}

                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="product-title-input"
                      placeholder="ALL NECTAR COLLECTORS"
                      name="name"
                      value={validation.values.name || ""}
                      onBlur={validation.handleBlur}
                      onChange={validation.handleChange}
                      invalid={validation.errors.name && validation.touched.name ? true : false}
                    />
                    {validation.errors.name && validation.touched.name ? (
                      <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="product-title-input">
                      Slug
                      {/* <FeatherIcon icon="alert-circle" style={{ width: '12px', height: '12 px', marginLeft: '5px' }} /> */}

                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="product-title-input"
                      placeholder="all-nectar-collectors"
                      name="name"
                      value={validation.values.slug || ""}
                      onBlur={validation.handleBlur}
                      onChange={validation.handleChange}
                      invalid={validation.errors.slug && validation.touched.slug ? true : false}
                    />
                    {validation.errors.slug && validation.touched.slug ? (
                      <FormFeedback type="invalid">{validation.errors.slug}</FormFeedback>
                    ) : null}
                  </div>


                  <div className="mb-3 mt-4">
                    <Label className="form-label" htmlFor="product-title-input">
                      Name
                      {/* <FeatherIcon icon="alert-circle" style={{ width: '12px', height: '12 px', marginLeft: '5px' }} /> */}

                    </Label>
                    <Input
                      type="select"
                      style={{
                        width: "100%", height: "37px",
                        padding: "8px 0px 8px 16px"

                      }}

                    // className="form-select"
                    // id="category-field"
                    // onChange={validation.handleChange}
                    // onBlur={validation.handleBlur}
                    // value={
                    //   validation.values.category || ""
                    // }
                    >
                      {productCategory.map((item, key) => (
                        <React.Fragment key={key}>
                          {item.options.map((item, key) => (<option value={item.value} key={key}>{item.label}</option>))}
                        </React.Fragment>
                      ))}
                    </Input>
                  </div>

                  <div className="filter-choices-input">

                    <div className="mb-3">
                      <p className="fs-16 mt-4" style={{ fontWeight: 500, }} >Description</p>
                      <textarea className="form-control" id="VertimeassageInput" rows="3" ></textarea>
                    </div>
                  </div>

                </CardBody>
              </Card>

              <Card className="mt-2">
                <CardBody>
                  <Row>
                    <Col md={6}>
                      <div>
                        <Label for="category-field" className="form-label">Category
                          <FeatherIcon icon="alert-circle" style={{ width: '12px', height: '12 px', marginLeft: '5px' }} />
                        </Label>
                        <Input
                          name="category"
                          type="select"
                          className="form-select h-80 py-2 px-3"
                          id="category-field"
                          onChange={productvali.handleChange}
                          onBlur={productvali.handleBlur}
                          value={
                            productvali.values.category || ""
                          }
                        >
                          {productCategory.map((item, key) => (
                            <React.Fragment key={key}>
                              {item.options.map((item, key) => (<option value={item.value} key={key}>{item.label}</option>))}
                            </React.Fragment>
                          ))}
                        </Input>
                        {productvali.touched.category &&
                          productvali.errors.category ? (
                          <FormFeedback type="invalid">
                            {productvali.errors.category}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col md={6}>
                      <div>
                        <Label for="brand-field" className="form-label">Brand
                          <FeatherIcon icon="alert-circle" style={{ width: '12px', height: '12 px', marginLeft: '5px' }} />
                        </Label>

                        <Input
                          name="brand"
                          type="select"
                          className="form-select h-80 py-2 px-3"
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
                    </Col>
                    <Col md={6}>
                      <div>
                        <Label for="sku-field" className="form-label mt-2" >SKU
                          <FeatherIcon icon="alert-circle" style={{ width: '12px', height: '12 px', marginLeft: '5px' }} />
                        </Label>
                        <Input
                          className="form-control"
                          placeholder="Enter SKU"
                          type="text"
                          name="sku"
                          value={productvali.values.sku || ""}
                          onBlur={productvali.handleBlur}
                          onChange={productvali.handleChange}
                          invalid={productvali.errors.sku && productvali.touched.sku ? true : false}
                        />
                        {productvali.errors.sku && productvali.touched.sku ? (
                          <FormFeedback type="invalid">{productvali.errors.sku}</FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col md={6} >
                      <Label for="validationDefault03" className="form-label" style={{ marginTop: '20px' }}>Tax Preferences</Label>
                      <div style={{ display: 'flex', }}>

                        <div className="form-check mb-2" style={{ marginRight: '10px' }}>
                          <Input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                            value="true"
                            // checked={taxable === true}
                            onChange={handleTaxable}
                          />
                          <Label className="form-check-label" for="flexRadioDefault1">
                            Taxable
                          </Label>
                        </div>
                        <div className="form-check">
                          <Input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault2"
                            defaultChecked
                            value="false"
                            // checked={taxable === true}
                            onChange={handleTaxable}
                          />
                          <Label className="form-check-label" for="flexRadioDefault2">
                            Non - Taxable
                          </Label>
                        </div>

                      </div>

                    </Col>
                    <Col md={6}>
                      <div>

                      </div>
                    </Col>
                    <Col md={6}>
                      {taxable === "true" ? <div className="d-flex gap-3">

                        <div className="col-md-6 py-2 px-3">

                          {/* <> */}
                          <Label for="sku-field" className="form-label">Classification</Label>
                          <Input
                            className="form-control "
                            placeholder="Select or type to add"
                            type="select"
                            name="classification"
                            id="classification-field"
                            value={productvali.values.classification || ""}
                            onBlur={productvali.handleBlur}
                            onChange={productvali.handleChange}
                          >
                            {classification.map((item, key) => (
                              <React.Fragment key={key}>
                                {item.options.map((item, key) => (<option value={item.value} key={key}>{item.label}</option>))}
                              </React.Fragment>
                            ))}
                          </Input>
                          {productvali.errors.classification && productvali.touched.classification ? (
                            <FormFeedback type="invalid">{productvali.errors.classification}</FormFeedback>
                          ) : null}
                          {/* </Col> */}

                        </div>
                        <div className="col-md-6 py-2 px-3">
                          {/* <Col md={12}> */}
                          <Label for="sku-field" className="form-label">Indirect Taxable Rate</Label>
                          <Input
                            className="form-control"
                            id="indirect-field"
                            placeholder="Select or type to add"
                            type="select"
                            name="indirect_taxable"
                            value={productvali.values.indirect_taxable || ""}
                            onBlur={productvali.handleBlur}
                            onChange={productvali.handleChange}
                          >
                            {indirect.map((item, key) => (
                              <React.Fragment key={key}>
                                {item.options.map((item, key) => (<option value={item.value} key={key}>{item.label}</option>))}
                              </React.Fragment>
                            ))}
                          </Input>
                          {productvali.errors.indirect_taxable && productvali.touched.indirect_taxable ? (
                            <FormFeedback type="invalid">{productvali.errors.indirect_taxable}</FormFeedback>
                          ) : null}
                          {/* </Col> */}
                        </div>
                      </div> : null}
                    </Col>
                  </Row>
                </CardBody>
              </Card>

            </Form>

            {/* Variant Code  */}




          </Col>

          <Col lg={4}>
            <Card style={{ width: "100%", height: '40%' }}>





              {/* width: 524px;
height: 230px; */}

              <CardBody  >
                <h5 className="card-title mb-0" style={{ fontSize: "16px", fontWeight: 500 }}>Thumbnail
                </h5>
                <div className="mb-3 mt-2" style={{ display: "flex", justifyContent: "space-around" }}>



                  <div >
                    <input
                      type="file"
                      id="upload-button"
                      style={{ display: "none" }}
                      onChange={handleChange}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {/* <label htmlFor="">Icon</label> */}
                    <div style={{ border: '1px dashed gray', width: "209.105px", height: "179.111px", cursor: "pointer" }}>
                      <label htmlFor="upload-button-1">
                        {icon.iconPreview ? (
                          <div style={{ width: '100%', height: '100px' }}>
                            <img
                              src={icon.iconPreview}
                              alt="dummy"
                              style={{
                                display: "flex",
                                width: "100%",
                                height: "176px",
                                justifyContent: "center"
                              }}

                            />
                          </div>
                        ) : (
                          <>
                            <span className="fa-stack fa-2x mt-3 mb-2">
                              <i className="fas fa-circle fa-stack-2x" />
                              <i className="fas fa-store fa-stack-1x fa-inverse" />
                            </span>

                            <div style={{ position: 'relative', left: '4rem' }}><img src={drag} alt="drag" align="right" style={{ marginTop: "10px" }} /></div>
                            <div style={{ textAlign: 'center', position: 'relative', left: '35px', fontSize: "13.5px", top: "70px", whiteSpace: "nowrap", color: "gray", fontWeight: 600 }}>Drag image(s) here</div>
                            <div style={{ fontSize: '13.5px', textAlign: 'center', position: 'relative', left: '47.5px', top: "70px" }}>or</div>
                            <div style={{ fontSize: '13.5px', textAlign: 'center', position: 'relative', left: '50px', color: "#1027C3", top: "70px", whiteSpace: "nowrap" }}>Browse Images</div>

                          </>
                        )}
                      </label>
                    </div>

                    <input
                      type="file"
                      id="upload-button-1"
                      style={{ display: "none" }}
                      onChange={handleChnage1}
                    />
                  </div>

                </div>
              </CardBody>
            </Card>

            <div style={{ display: "flex", gap: "10px" }}>
              <Col lg={6} xl={6}>
                <Card className="mt-2" style={{ width: "100%", height: "100%" }}>
                  <CardHeader>
                    <h5 className="card-title mb-0">Icon</h5>
                  </CardHeader>
                  <CardBody>
                    <div style={{ border: '1px dashed gray', width: "209.105px", height: "179.111px", cursor: "pointer" }}>
                      <label htmlFor="upload-button-1">
                        {icon.iconPreview ? (
                          <div style={{ width: '100%', height: '100px' }}>
                            <img
                              src={icon.iconPreview}
                              alt="dummy"
                              style={{
                                display: "flex",
                                width: "100%",
                                height: "176px",
                                justifyContent: "center"
                              }}

                            />
                          </div>
                        ) : (
                          <>
                            <span className="fa-stack fa-2x mt-3 mb-2">
                              <i className="fas fa-circle fa-stack-2x" />
                              <i className="fas fa-store fa-stack-1x fa-inverse" />
                            </span>

                            <div style={{ position: 'relative', left: '4rem' }}><img src={drag} alt="drag" align="right" style={{ marginTop: "10px" }} /></div>
                            <div style={{ textAlign: 'center', position: 'relative', left: '35px', fontSize: "13.5px", top: "70px", whiteSpace: "nowrap", color: "gray", fontWeight: 600 }}>Drag image(s) here</div>
                            <div style={{ fontSize: '13.5px', textAlign: 'center', position: 'relative', left: '47.5px', top: "70px" }}>or</div>
                            <div style={{ fontSize: '13.5px', textAlign: 'center', position: 'relative', left: '50px', color: "#1027C3", top: "70px", whiteSpace: "nowrap" }}>Browse Images</div>

                          </>
                        )}
                      </label>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col>
                <Card className="mt-2" style={{ width: "100%", height: "100%" }}>
                  <CardHeader>
                    <h5 className="card-title mb-0">Breadcrumbs <br />
                      Background Image

                    </h5>
                  </CardHeader>

                  <CardBody>
                    <div style={{ border: '1px dashed gray', width: "209.105px", height: "179.111px", cursor: "pointer" }}>
                      <label htmlFor="upload-button-1">
                        {icon.iconPreview ? (
                          <div style={{ width: '100%', height: '100px' }}>
                            <img
                              src={icon.iconPreview}
                              alt="dummy"
                              style={{
                                display: "flex",
                                width: "100%",
                                height: "176px",
                                justifyContent: "center"
                              }}

                            />
                          </div>
                        ) : (
                          <>
                            <span className="fa-stack fa-2x mt-3 mb-2">
                              <i className="fas fa-circle fa-stack-2x" />
                              <i className="fas fa-store fa-stack-1x fa-inverse" />
                            </span>

                            <div style={{ position: 'relative', left: '4rem' }}><img src={drag} alt="drag" align="right" style={{ marginTop: "10px" }} /></div>
                            <div style={{ textAlign: 'center', position: 'relative', left: '35px', fontSize: "13.5px", top: "70px", whiteSpace: "nowrap", color: "gray", fontWeight: 600 }}>Drag image(s) here</div>
                            <div style={{ fontSize: '13.5px', textAlign: 'center', position: 'relative', left: '47.5px', top: "70px" }}>or</div>
                            <div style={{ fontSize: '13.5px', textAlign: 'center', position: 'relative', left: '50px', color: "#1027C3", top: "70px", whiteSpace: "nowrap" }}>Browse Images</div>

                          </>
                        )}
                      </label>
                    </div>
                  </CardBody>
                </Card>
              </Col>

            </div>
            <Col lg={12} className="mt-4">
              <Card >
                <CardBody>
                  <h5 className="card-title mb-0">Visibility</h5>
                  <div style={{ marginLeft: "250px" }}>
                    <div className="form-check form-radio-primary mb-3">
                      <Input
                        className="form-check-input"
                        type="radio"
                        name="formradiocolor1"
                        id="formradioRight5"
                      />
                      <Label className="form-check-label" for="formradioRight5">
                        Public
                      </Label>
                    </div>
                    <div className="form-check form-radio-primary mb-3">
                      <Input
                        className="form-check-input"
                        type="radio"
                        name="formradiocolor1"
                        id="formradioRight5"
                      />
                      <Label className="form-check-label" for="formradioRight5">
                        Protected <FeatherIcon icon="alert-circle" size="10" />
                      </Label>
                    </div>
                  </div>

                </CardBody>
              </Card>
            </Col>
          </Col>
          <div style={{ marginTop: "25px", display: "flex", gap: "5px", justifyContent: "flex-end", padding: "20px" }}>
            <button type="submit" className="btn btn-success">Update</button>
            <button type="submit" className="btn " style={{ backgroundColor: "#EE4652", color: "white" }}>Delete</button>
          </div>
        </Row>



      </Container>
    </div >
  );
};

export default EditCategory;


export const AvatarInput = styled.div`
                margin-bottom: 32px;
                position: relative;
                align-self: center;
                img {
                    width: 186px;
                    height: 186px;
                    object-fit: cover;
                    position: relative;
                    left: 50%;
                    transform: translateX(-50%); /* Center horizontally */
                    top: 50%;
                    // transform: translateY(-50%); /* Center vertically */
                  }
                // img {
                //     width: 586px;
                // height: 186px;
                // object-fit: cover;
                // // align-items: center;
                // position: relative;
                // left: 150px;
                // // alignItems: center;
                // /* border-radius: 50%; */
                //     }
                 /* .circle {
                    width: 186px;
                height: 186px;
                border-radius: 50%;
                } */
                label {
                    right: 23em !important;
                position: absolute;
                width: 48px;
                height: 48px;
                background: #312e38;
                border-radius: 50%;
                right: 0;
                bottom: 0;
                border: 0;
                cursor: pointer;
                transition: background-color 0.2s;
                display: flex;
                align-items: center;
                justify-content: center;
                input {
                    display: none;
                }
                svg {
                    width: 20px;
                height: 20px;
                color: #f4ede8;
                }
                &:hover {
                    background: blue;
                }

                img {
                    width: 100%;
                    height: 186px;
                    object-fit: cover;
                    position: relative;
                    left: 50%;
                    transform: translateX(-50%);
                    top: 50%;
                }

                /* New styles for cancel button */
                .cancel_button {
                    display: block;
                    margin-top: 10px;
                    background-color: red;
                    color: white;
                    border: none;
                    cursor: pointer;
                    width: 50px;
                    height: 30px;
                    position: relative;
                    top: 50px;
                }
                }             
                `;