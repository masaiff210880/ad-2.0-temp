

// Default COde below here

import React, { useEffect, useState } from "react";
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
import style from "../../styles/products/Addproduct.module.css";
// import { addNewProduct as onAddNewProduct } from "../../slices/thunks";


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
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import plus_circle from "../../assets/images/products/plus_circle.svg";
import red_cross from "../../assets/images/products/red_cross.svg";
import silver from "../../assets/images/silver.svg";
import gold from "../../assets/images/gold.svg";
import platinum from "../../assets/images/platinum.svg";
import Sort from "../../assets/images/Sort.svg";
import dummy_img from "../../assets/images/products/dummy_img.svg";
import ReactFileReader from "react-file-reader";
import { Button, TextField } from "@material-ui/core";
import { styled } from "styled-components";
import UploadComponent from "./Upload";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
import { getProducts, addNewProduct as onAddNewProduct } from "../../slices/ecommerce/thunk";

const Addproduct = (props) => {
  document.title = "Create Product | American Distributors";
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [editorData, setEditorData] = useState("");
  const history = useNavigate();
  const dispatch = useDispatch();

  const dummy_img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqxR12Ogzj6PU2rQQhgbOwmCMzSmPB5XghtA&usqp=CAU";
  const dummy_text = "D8 FLIGHT DELTA 8 HEAVY HITTERS 3000MG GUMMIES SINGLE";
  const dummy_sku = "ASDCF1234Q";

  const [customActiveTab, setcustomActiveTab] = useState("1");
  const toggleCustom = (tab) => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };
  const [selectedFiles, setselectedFiles] = useState([]);
  const [selectedVisibility, setselectedVisibility] = useState(null);
  const [taxable, setTaxable] = useState("");
  const [url, setUrl] = useState("");
  const [showBrowseButton, setShowBrowseButton] = useState(true);
  const [productName, setProductName] = useState("");
  const [updateSku, setUpdateSku] = useState("");

  const handleInputChange = (event) => {
    setProductName(event.target.value);
  };

  const handleSkuChange = (event) => {
    setUpdateSku(event.target.value);
  };

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
      pictures: [...pictures, ...imagesWithDefaultDimensions],
    }));
  };

  function handleSelectVisibility(selectedVisibility) {
    setselectedVisibility(selectedVisibility);
  }

  const handleTaxable = (e) => {
    setTaxable(e.target.value);
  };

  const getPlainText = (htmlString) => {
    const parser = new DOMParser();
    const parsedDoc = parser.parseFromString(htmlString, "text/html");
    return parsedDoc.body.textContent || "";
  };

  const handleFiles = (files) => {
    if (files && files.fileList.length > 0) {
      const reader = new FileReader();

      reader.onload = (e) => {
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

  // const [selectedMulti, setSelectedMulti] = useState([]);

  // const handleMulti = (selectedMulti, newValue) => {
  //   setSelectedMulti(selectedMulti);
  //   console.log("selected data", selectedMulti);
  // };

  const [sku, setSku] = useState([]);



  const SingleOptions = [
    { value: "apple", label: "apple" },
    { value: "kiwi", label: "kiwi" },
    { value: "avacado", label: "avacado" },
    { value: "banana", label: "banana" },
    { value: "green", label: "green" },
  ];

  const ColorOptions = [
    { value: "red", label: "red" },
    { value: "black", label: "black" },
    { value: "blue", label: "blue" },
    { value: "orange", label: "orange" },
    { value: "white", label: "white" },
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

  const NotOptions = [
    { value: "", label: "Not Option" },
  ];

  // Delete row
  const deleteRow = (index) => {
    const updatedSelectedMulti = [...selectedMulti];
    console.log("selected row", updatedSelectedMulti)
    updatedSelectedMulti.splice(index, 1);
    setSelectedMulti(updatedSelectedMulti);
  };

  // const [variantMulti, setVariantMulti] = useState([])
  const [attributeCombinations, setAttributeCombinations] = useState([]);


  // Delete Variant Row
  // const deleteVariantRow = (index) => {
  //   const updatedVariantSelectedMulti = [...attributeCombinations];
  //   console.log("selected variant", updatedVariantSelectedMulti)
  //   updatedVariantSelectedMulti.splice(index, 1);
  //   setAttributeCombinations(attributeCombinations);
  // };

  // const handleMulti = (selectedMulti, newValue) => {
  //   setSelectedMulti(selectedMulti);
  //   console.log("selected data", selectedMulti);
  // };

  // Add more attributes

  const handleAddCombination = () => {
    const newCombination = {
      attributes: "Flavours", // Default value
      options: [
        // { value: 'apple', label: 'apple' },
        // { value: 'kiwi', label: 'kiwi' },
        // { value: 'avacado', label: 'avacado' },
        // { value: 'banana', label: 'banana' },
        // { value: 'green', label: 'green' },
      ],
    };
    setAttributeCombinations([...attributeCombinations, newCombination]);
    // setAttributeCombinations(attributeCombinations);
    console.log("selected attribute", newCombination)
  };

  const handleAttributeChange = (index, selectedOption) => {
    const updatedCombinations = [...attributeCombinations];
    updatedCombinations[index].attributes = selectedOption.value;
    setAttributeCombinations(updatedCombinations);
    console.log("attribvute color", updatedCombinations);
  };

  const handleOptionChange = (index, selectedOptions) => {
    const updatedCombinations = [...attributeCombinations];
    updatedCombinations[index].options = selectedOptions;
    setAttributeCombinations(updatedCombinations);
  };

  // Saveing Attributes
  // const [selectedAttribute, setSelectedAttribute] = useState(""); 

  const handleAttributes = (event) => {
    setSelectedAttribute(event.target.value);
    console.log("variant data", event.target.value)
    setSelectedMulti([]); // Clear selected options when attribute changes
  };
  // console.log("attributes", selectedAttribute);

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

  //Editor Values
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorData(data);
  };

  let description = getPlainText(editorData);

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: "",
      description: "",
      category: "",
      brand: "",
      sku: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter a Product Title"),
      description: Yup.string().required("Please Enter a Product Description"),
      category: Yup.string().required("Please select the category"),
      brand: Yup.string().required("Please select the brand"),
      sku: Yup.string().required("Please Enter the sku"),
    }),

    onSubmit: (values) => {
      const newProduct = {
        name: values.name,
        description: values.description,
        category: values.category,
        brand: values.brand,
        sku: values.sku,
        price: {
          levelOne: 0,
          levelTwo: 0,
          levelThree: 0,
        },
      };
      console.log("product data", newProduct);
      dispatch(onAddNewProduct(newProduct)).then(() => {
        toast.success("Crteate Product Successfully", { autoClose: 3000 });
        // setEditorData(" ")
        setTimeout(() => {
          history("/product-list");
        }, 3000);
        validation.resetForm()
        dispatch(getProducts())
      })
    },

  });

  // console.log("new values",productName )

  useEffect(() => {
    setProductName(validation.values.name)
    setUpdateSku(validation.values.sku)
  }, [validation.values.name, validation.values.sku])

  const dateFormat = () => {
    let d = new Date(),
      months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
    let h = d.getHours() % 12 || 12;
    let ampm = d.getHours() < 12 ? "AM" : "PM";
    return (
      d.getDate() +
      " " +
      months[d.getMonth()] +
      ", " +
      d.getFullYear() +
      ", " +
      h +
      ":" +
      d.getMinutes() +
      " " +
      ampm
    ).toString();
  };

  const [date, setDate] = useState(dateFormat());

  const dateformate = (e) => {
    const dateString = e.toString().split(" ");
    let time = dateString[4];
    let H = +time.substr(0, 2);
    let h = H % 12 || 12;
    h = h <= 9 ? (h = "0" + h) : h;
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

  const variantChange = (event) => {
    console.log("sku value", event.target.value);
  };

  // const [nameValue, setNameValue] = useState('');
  // const [skuValue, setSkuValue] = useState('');
  // const [costPriceValue, setCostPriceValue] = useState('');
  // const [silverPriceValue, setSilverPriceValue] = useState('');
  // const [goldPriceValue, setGoldPriceValue] = useState('');
  // const [platinumPriceValue, setPlatinumPriceValue] = useState('');
  // const [stockinHand, setStockinHand] = useState('')
  // const [stockinAvailable, setStockinAvailable] = useState('')



  const [formValues, setFormValues] = useState({
    name: '',
    sku: '',
    costPrice: '',
    silverPrice: '',
    goldPrice: '',
    platinumPrice: '',
    stochinHand: '',
    stockinAvailable: '',
  });

  const variantvalidation = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: '',
      sku: '',
      costPrice: '',
      silverPrice: '',
      goldPrice: '',
      platinumPrice: '',
      stochinHand: '',
      stockinAvailable: '',
    },
    variantvalidationSchema: Yup.object({
      name: Yup.string().required("Please Enter a Product Title"),
      sku: Yup.string().required("Please Enter a Product Price"),
      costPrice: Yup.string().required("Please Enter a Product stock"),
      silverPrice: Yup.string().required("Please Enter a Product orders"),
      goldPrice: Yup.string().required("Please Enter a Product category"),
      platinumPrice: Yup.string().required("Please Enter a Product status"),
      stochinHand: Yup.string().required("Please Enter a Manufacturer Name"),
      stockinAvailable: Yup.string().required("Please Enter a Manufacturer Brand"),
    }),
    onSubmit: (values) => {
      const newProduct = {
        _id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
        name: values.name,
        sku: values.sku,
        costPrice: values.costPrice,
        silverPrice: values.silverPrice,
        goldPrice: values.goldPrice,
        platinumPrice: values.platinumPricel,
        stochinHand: values.stochinHand,
        stockinAvailable: values.stockinAvailable,
      };
      // save new product
      // dispatch(onAddNewProduct(newProduct));
      // console.log('add product', newProduct)
      console.log('formValues', formValues);
      // history("/apps-ecommerce-products");
      validation.resetForm();
    }
  });
  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Create Product" pageTitle="Ecommerce" />

        <Row>
          <Col lg={8}>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                validation.handleSubmit();
                return false;
              }}
            >
              <Card>
                <CardBody>
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="product-title-input">
                      Product Title
                      <FeatherIcon
                        icon="alert-circle"
                        style={{
                          width: "12px",
                          height: "12 px",
                          marginLeft: "5px",
                        }}
                      />
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="product-title-input"
                      placeholder="Enter product title"
                      name="name"
                      value={validation.values.name || ""}
                      // value={validation.values.name}
                      // onChange={handleInputChange}
                      onBlur={validation.handleBlur}
                      onChange={validation.handleChange}
                      invalid={
                        validation.errors.name && validation.touched.name
                          ? true
                          : false
                      }
                    />
                    {validation.errors.name && validation.touched.name ? (
                      <FormFeedback type="invalid">
                        {validation.errors.name}
                      </FormFeedback>
                    ) : null}
                  </div>
                  <div>
                    <Label>
                      Product Description
                      <FeatherIcon
                        icon="alert-circle"
                        style={{
                          width: "12px",
                          height: "12 px",
                          marginLeft: "5px",
                        }}
                      />
                    </Label>
                    <textarea
                      className="form-control"
                      id="billinginfo-address"
                      placeholder="Enter description of the product"
                      rows="12"
                      type="text"
                      name="description"
                      value={validation.values.description || ""}
                      onBlur={validation.handleBlur}
                      onChange={validation.handleChange}
                      invalid={
                        validation.errors.description && validation.touched.description
                          ? true
                          : false
                      }
                    ></textarea>

                    {validation.errors.description && validation.touched.description ? (
                      <FormFeedback type="invalid">
                        {validation.errors.description}
                      </FormFeedback>
                    ) : null}

                    {/* <CKEditor
                      editor={ClassicEditor}
                      onChange={handleEditorChange}
                      invalid={
                        validation.errors.description &&
                          validation.touched.description
                          ? true
                          : false
                      }
                    /> */}
                  </div>
                </CardBody>
              </Card>

              <Card style={{ marginTop: "40px" }}>
                <CardBody>
                  <Row>
                    <Col md={6}>
                      <div>
                        <Label for="category-field" className="form-label">
                          Category
                          <FeatherIcon
                            icon="alert-circle"
                            style={{
                              width: "12px",
                              height: "12 px",
                              marginLeft: "5px",
                            }}
                          />
                        </Label>
                        <Input
                          type="select"
                          className={`form-control ${validation.errors.category &&
                            validation.touched.category
                            ? "is-invalid"
                            : ""
                            }`}
                          id="product-store-input"
                          placeholder="Distributor"
                          name="category"
                          aria-label="category"
                          aria-describedby="product-store-addon"
                          value={validation.values.category || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                        >
                          <option value="">Select the Category</option>
                          <option value="E-LIQUIDS">E-LIQUIDS</option>
                          <option value="SALT NIC">SALT NIC</option>
                          <option value="Disposable">Disposable</option>
                          <option value="VAPE SHOP">VAPE SHOP</option>
                          <option value="HERB CONCENTRATE">
                            HERB CONCENTRATE
                          </option>
                          <option value="Glass">Glass</option>
                          <option value="Smoke Shop">Smoke Shop</option>
                          <option value="Battries">Battries</option>
                          <option value="Cream Charges">Cream Charges</option>
                        </Input>
                        {validation.errors.category &&
                          validation.touched.category ? (
                          <div className="invalid-feedback">
                            {validation.errors.category}
                          </div>
                        ) : null}
                      </div>
                    </Col>
                    <Col md={6}>
                      <div>
                        <Label for="brand-field" className="form-label">
                          Brand
                          <FeatherIcon
                            icon="alert-circle"
                            style={{
                              width: "12px",
                              height: "12 px",
                              marginLeft: "5px",
                            }}
                          />
                        </Label>

                        <Input
                          type="select"
                          className={`form-control ${validation.errors.brand && validation.touched.brand
                            ? "is-invalid"
                            : ""
                            }`}
                          id="product-store-input"
                          name="brand"
                          aria-label="category"
                          aria-describedby="product-store-addon"
                          value={validation.values.brand || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                        >
                          <option value="">Select the Brand</option>
                          <option value="AQUA">AQUA</option>
                          <option value="AREON">AREON</option>
                          <option value="AWS">AWS</option>
                          <option value="BECO">BECO</option>
                          <option value="BLLGO">BLLGO</option>
                          <option value="BLOW">BLOW</option>
                          <option value="BIC">BIC</option>
                          <option value="CAKE">CAKE</option>
                          <option value="CALI">CALI</option>
                          <option value="AIR BAR">AIR BAR</option>
                          <option value="CAMO">CAMO</option>
                          <option value="CHUBBY">CHUBBY</option>
                          <option value="CLIPPER">CLIPPER</option>
                        </Input>
                        {validation.errors.brand && validation.touched.brand ? (
                          <div className="invalid-feedback">
                            {validation.errors.brand}
                          </div>
                        ) : null}
                      </div>
                    </Col>
                    <Col md={6}>
                      <div>
                        <Label for="sku-field" className="form-label">
                          SKU
                          <FeatherIcon
                            icon="alert-circle"
                            style={{
                              width: "12px",
                              height: "12 px",
                              marginLeft: "5px",
                            }}
                          />
                        </Label>
                        <Input
                          className="form-control"
                          placeholder="Enter SKU"
                          type="text"
                          name="sku"
                          // value={validation.values.sku}
                          // onChange={handleSkuChange}
                          value={validation.values.sku || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={
                            validation.errors.sku && validation.touched.sku
                              ? true
                              : false
                          }
                        />
                        {validation.errors.sku && validation.touched.sku ? (
                          <FormFeedback type="invalid">
                            {validation.errors.sku}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col md={6}>
                      <Label
                        for="validationDefault03"
                        className="form-label"
                        style={{ marginTop: "20px" }}
                      >
                        Tax Preferences
                      </Label>
                      <div style={{ display: "flex" }}>
                        <div
                          className="form-check mb-2"
                          style={{ marginRight: "10px" }}
                        >
                          <Input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                            value="true"
                            // checked={taxable === true}
                            onChange={handleTaxable}
                          />
                          <Label
                            className="form-check-label"
                            for="flexRadioDefault1"
                          >
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
                          <Label
                            className="form-check-label"
                            for="flexRadioDefault2"
                          >
                            Non - Taxable
                          </Label>
                        </div>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div></div>
                    </Col>
                    <Col md={6} style={{ position: "relative", right: "10px" }}>
                      {taxable === "true" ? (
                        <div className="d-flex gap-3">
                          <div className="col-md-6 py-2 px-3">
                            {/* <> */}
                            <Label for="sku-field" className="form-label">
                              Classification
                            </Label>
                            <Input
                              className="form-control "
                              placeholder="Select or type to add"
                              type="select"
                              name="classification"
                              id="classification-field"
                              value={validation.values.classification || ""}
                              onBlur={validation.handleBlur}
                              onChange={validation.handleChange}
                            >
                              {classification.map((item, key) => (
                                <React.Fragment key={key}>
                                  {item.options.map((item, key) => (
                                    <option value={item.value} key={key}>
                                      {item.label}
                                    </option>
                                  ))}
                                </React.Fragment>
                              ))}
                            </Input>
                            {validation.errors.classification &&
                              validation.touched.classification ? (
                              <FormFeedback type="invalid">
                                {validation.errors.classification}
                              </FormFeedback>
                            ) : null}
                            {/* </Col> */}
                          </div>
                          <div className="col-md-6 py-2 px-3">
                            {/* <Col md={12}> */}
                            <Label for="sku-field" className="form-label">
                              Indirect Taxable Rate
                            </Label>
                            <Input
                              className="form-control"
                              id="indirect-field"
                              placeholder="Select or type to add"
                              type="select"
                              name="indirect_taxable"
                              value={validation.values.indirect_taxable || ""}
                              onBlur={validation.handleBlur}
                              onChange={validation.handleChange}
                            >
                              {indirect.map((item, key) => (
                                <React.Fragment key={key}>
                                  {item.options.map((item, key) => (
                                    <option value={item.value} key={key}>
                                      {item.label}
                                    </option>
                                  ))}
                                </React.Fragment>
                              ))}
                            </Input>
                            {validation.errors.indirect_taxable &&
                              validation.touched.indirect_taxable ? (
                              <FormFeedback type="invalid">
                                {validation.errors.indirect_taxable}
                              </FormFeedback>
                            ) : null}
                            {/* </Col> */}
                          </div>
                        </div>
                      ) : null}
                    </Col>
                  </Row>
                </CardBody>
              </Card>
              <div
                className="text-end m-3 "
                style={{
                  display: "flex",
                  gap: "5px",
                  justifyContent: "flex-end",
                }}
              >
                <button type="submit" className="btn btn-success w-sm" name="product">
                  Create Product
                </button>
              </div>
            </Form>
            {/* </Col> */}
            {/* Variant Code  */}
            {/* <Col lg={8} > */}
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                variantvalidation.handleSubmit();
                return false;
              }}
            >
              <Card
                className={style.card_css}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <CardHeader>Variant Products</CardHeader>
                <CardBody
                  style={{ flex: 1, overflow: "auto", overflowX: "hidden" }}
                >
                  <Row>
                    {/* variant options */}
                    <Col md={6}>
                      <div className="mb-3">
                        <Label
                          htmlFor="choices-categories-input"
                          className="form-label"
                        >
                          Attributes
                        </Label>
                        <select
                          className="form-select h-80 py-2 px-3"
                          data-choices
                          data-choices-search-false
                          id="choices-categories-input"
                          onChange={handleAttributes}
                          value={selectedAttribute}
                          // console code
                          // value={variantvalidation.values.name || ""}
                          // value={validation.values.name}
                          // onChange={handleInputChange}
                          onBlur={variantvalidation.handleBlur}
                          // onChange={variantvalidation.handleChange}
                          invalid={
                            variantvalidation.errors.name && variantvalidation.touched.name
                              ? true
                              : false
                          }
                        >
                          <option value="">Select Attributes</option>
                          <option value="colors">Colors</option>
                          <option value="flavours">Flavours</option>
                        </select>
                        {variantvalidation.errors.name && variantvalidation.touched.name ? (
                          <FormFeedback type="invalid">
                            {variantvalidation.errors.name}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col md={6}>
                      <div>
                        <Label
                          htmlFor="choices-text-input"
                          className="form-label"
                        >
                          Options
                        </Label>
                        <Select
                          id="multile-input"
                          value={selectedMulti}
                          isMulti={true}
                          // value={()=>handleChange(newValue)}

                          // onChange={() => {
                          //     handleMulti();
                          // }}
                          onChange={handleMulti}
                          options={selectedAttribute == "flavours" ? SingleOptions : selectedAttribute == "colors" ? ColorOptions : NotOptions}
                          renderInput={(params) => {
                            return <TextField {...params} />;
                          }}
                        ></Select>
                      </div>
                    </Col>
                    {/* <button onClick={handleAddRow}>Add Row</button> */}

                    {/* variant end */}
                    <div>
                      {attributeCombinations.map((combination, index) => (
                        <div key={index} style={{ display: "flex" }}>
                          <Col md={6}>
                            <div
                              className="mb-3"
                              style={{ marginRight: "10px" }}
                            >
                              <Label
                                htmlFor={`choices-categories-input-${index}`}
                                className="form-label"
                              >
                                Attributes
                              </Label>
                              <select
                                className="form-select h-80 py-2 px-3"
                                data-choices
                                data-choices-search-false
                                id={`choices-categories-input-${index}`}
                                onChange={(e) =>
                                  handleAttributeChange(index, e.target.value)
                                }
                              >
                                <option value="Flavours">Flavours</option>
                                <option value="Colors">Colors</option>
                              </select>
                            </div>
                          </Col>
                          <Col md={6}>
                            <div style={{ marginLeft: "10px" }}>
                              <Label
                                htmlFor={`choices-text-input-${index}`}
                                className="form-label"
                              >
                                Options
                              </Label>
                              <Select
                                id={`multile-input-${index}`}
                                value={combination.options}
                                isMulti={true}
                                onChange={handleMulti}
                                options={selectedAttribute == "flavours" ? SingleOptions : selectedAttribute == "colors" ? ColorOptions : NotOptions}
                              />
                            </div>

                          </Col>
                          {/* <Col md={2}>
                          <div className="" style={{cursor:'pointer'}}>
                              <img
                                src={red_cross}
                                alt="red_cross"
                                onClick={() => deleteVariantRow(index)}
                              />
                            </div>
                          </Col> */}
                        </div>
                      ))}

                      <Col md={6} className={style.plus_circle}>
                        <img
                          src={plus_circle}
                          alt="plus_circle"
                          width={"100%"}
                          onClick={handleAddCombination}
                        />
                        <Label
                          htmlFor="choices-text-input"
                          className={style.form_label}
                        >
                          Add more Attributes
                        </Label>
                      </Col>
                    </div>
                    <div >
                      {/* style={{ display: "flex", justifyContent: "space-around" }} */}
                      <div className={style.item_bar}>
                        <h6>Select your Item type:</h6>
                        <div style={{ display: "flex", }} >
                          <div
                            className="form-check mb-2"
                            style={{ marginRight: "10px" }}
                          >
                            <Input
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefault1"
                              value="true"
                            // checked={taxable === true}
                            />
                            <Label>Inventory</Label>
                          </div>
                          <div className="form-check">
                            <Input
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefault2"
                              value="false"
                            // checked={taxable === true}
                            />
                            <Label>Non - Inventory</Label>
                          </div>
                        </div>

                        <div style={{ display: "flex", gap: "5px" }} >
                          <Input className="form-check-input" type="checkbox" />
                          <h6>Include Opening Stock</h6>
                        </div>

                      </div>
                      <div className="table-responsive table-card">

                        <table className="table align-middle table-nowrap table-striped-columns mb-0">
                          <thead className="table-light">
                            <tr>
                              <th scope="col" style={{ width: "46px" }}>


                                <div className="form-check">
                                  {/* Checkbox for "Select All" */}
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="selectAllCheckbox"
                                  // checked={props.products && selectedItems.length === props.products.length}
                                  // onChange={handleSelectAll}
                                  />

                    <td
                      style={{
                        marginLeft: "20px",
                        paddingLeft: "15px",
                        position: "relative",
                        top: "20px",
                      }}
                    >
                      <div>
                        {selectedMulti?.map((el, index) => (
                          <div
                            key={index}
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              position: "relative",
                              top: "60px",
                              left: "10px",
                              height: "100%",
                            }}
                          >
                            <div style={{ marginBottom: "10px" }}>
                              <div style={{ display: "flex" }}>
                                <div>
                                  <Col md={8}>
                                    <Input
                                      name="name"
                                      type="text"
                                      className="form-control"
                                      id="inputtwo"
                                      // value={el.value}
                                      value={formValues.name}
                                      // value={nameValue}
                                      // onBlur={variantvalidation.handleBlur}
                                      // onChange={(e) => {
                                      //   setNameValue(e.target.value);
                                      // }}
                                      onChange={(e) => {
                                        setFormValues({
                                          ...formValues,
                                          name: e.target.value,
                                        });
                                      }}
                                      // value={variantvalidation.el.values.name || ''}
                                      // onChange={variantvalidation.handleChange}
                                    // invalid={validation.errors.name && validation.touched.name ? true : false}
                                    />
                                    {/* {validation.errors.name && validation.touched.name ? (
                                        <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                                    ) : null} */}
                                  </Col>
                                </div>
                                <div>
                                  <Col md={8}>
                                    <Input
                                      name="sku"
                                      type="text"
                                      className="form-control"
                                      id="inputthree"
                                      // value={sku[el]}
                                      // onChange={variantChange}
                                      value={formValues.sku}
                                      // value={skuValue}
                                      // onChange={(e) => {
                                      //   setSkuValue(e.target.value);
                                      // }}
                                      onChange={(e) => {
                                        setFormValues({
                                          ...formValues,
                                          sku: e.target.value,
                                        });
                                      }}
                                      // value={validation.values.sku || ''}
                                      onBlur={validation.handleBlur}
                                    // onChange={validation.handleChange}
                                    // invalid={validation.errors.sku && validation.touched.sku ? true : false}
                                    />
                                    {/* {validation.errors.sku && validation.touched.sku ? (
                                        <FormFeedback type="invalid">{validation.errors.sku}</FormFeedback>
                                    ) : null} */}
                                  </Col>
                                </div>
                                <div
                                  style={{ position: "relative", left: "20px" }}
                                >
                                  <Col md={8}>
                                    <Input
                                      name="costPrice"
                                      type="text"
                                      className="form-control"
                                      id="inputfour"
                                      // value={costPriceValue}
                                      // onChange={(e) => {
                                      //   setCostPriceValue(e.target.value);
                                      // }}
                                      value={formValues.costPrice}
                                      onChange={(e) => {
                                        setFormValues({
                                          ...formValues,
                                          costPrice: e.target.value,
                                        });
                                      }}
                                      // value={validation.values.costPrice}
                                      // value={costPrice[el]}
                                      onBlur={validation.handleBlur}
                                      // onChange={variantChange}
                                    // invalid={validation.errors.costPrice && validation.touched.costPrice ? true : false}
                                    />
                                    {/* {validation.errors.costPrice && validation.touched.costPrice ? (
                                      <FormFeedback type="invalid">{validation.errors.costPrice}</FormFeedback>
                                    ) : null} */}
                                  </Col>
                                </div>

                            <div
                              style={{ display: "flex", marginLeft: "50px" }}
                            >
                              <div>
                                <Col md={8}>
                                  <Input
                                    name="silverPrice"
                                    type="text"
                                    className="form-control"
                                    id="inputfive"
                                    // value={silverPriceValue}
                                    // onChange={(e) => {
                                    //   setSilverPriceValue(e.target.value);
                                    // }}
                                    value={formValues.silverPrice}
                                    onChange={(e) => {
                                      setFormValues({
                                        ...formValues,
                                        silverPrice: e.target.value,
                                      });
                                    }}
                                    // value={validation.values.silverPrice}
                                    onBlur={validation.handleBlur}
                                    // onChange={variantChange}
                                  // invalid={validation.errors.silverPrice && validation.touched.silverPrice ? true : false}
                                  />
                                  {/* {validation.errors.silverPrice && validation.touched.silverPrice ? (
                                                                    <FormFeedback type="invalid">{validation.errors.silverPrice}</FormFeedback>
                                                                ) : null} */}
                                </Col>
                              </div>
                              <div>
                                <Col md={8}>
                                  <Input
                                    name="goldPrice"
                                    type="text"
                                    className="form-control"
                                    id="inputsix"
                                    // value={goldPriceValue}
                                    // onChange={(e) => {
                                    //   setGoldPriceValue(e.target.value);
                                    // }}
                                    value={formValues.goldPrice}
                                    onChange={(e) => {
                                      setFormValues({
                                        ...formValues,
                                        goldPrice: e.target.value,
                                      });
                                    }}
                                    // value={validation.values.goldPrice}
                                    onBlur={validation.handleBlur}
                                    // onChange={variantChange}
                                  // invalid={validation.errors.goldPrice && validation.touched.goldPrice ? true : false}
                                  />

                                  {/* {validation.errors.goldPrice && validation.touched.goldPrice ? (
                                                                    <FormFeedback type="invalid">{validation.errors.goldPrice}</FormFeedback>
                                                                ) : null} */}
                                </Col>
                              </div>
                              <div>
                                <Col md={8}>
                                  <Input
                                    name="platinumPrice"
                                    type="text"
                                    className="form-control"
                                    id="inputsix"
                                    // value={platinumPriceValue}
                                    // onChange={(e) => {
                                    //   setPlatinumPriceValue(e.target.value);
                                    // }}
                                    value={formValues.platinumPrice}
                                    onChange={(e) => {
                                      setFormValues({
                                        ...formValues,
                                        platinumPrice: e.target.value,
                                      });
                                    }}
                                    // value={validation.values.platinumPrice}
                                    onBlur={validation.handleBlur}
                                    // onChange={variantChange}
                                  // invalid={validation.errors.platinumPrice && validation.touched.platinumPrice ? true : false}
                                  />
                                  {/* {validation.errors.platinumPrice && validation.touched.platinumPrice ? (
                                                                    <FormFeedback type="invalid">{validation.errors.platinumPrice}</FormFeedback>
                                                                ) : null} */}
                                </Col>
                              </div>
                            </div>
                            <div>
                              <Col md={8}>
                                <Input
                                  name="stochinHand"
                                  type="text"
                                  className="form-control"
                                  id="inputsix"
                                  // value={stockinHand}
                                  // onChange={(e) => {
                                  //   setStockinHand(e.target.value);
                                  // }}
                                  value={formValues.stochinHand}
                                  onChange={(e) => {
                                    setFormValues({
                                      ...formValues,
                                      stochinHand: e.target.value,
                                    });
                                  }}
                                  // value={validation.values.stochinHand}
                                  onBlur={validation.handleBlur}
                                  // onChange={variantChange}
                                // invalid={validation.errors.stochinHand && validation.touched.stochinHand ? true : false}
                                />
                                {/* {validation.errors.stochinHand && validation.touched.stochinHand ? (
                                                                    <FormFeedback type="invalid">{validation.errors.stochinHand}</FormFeedback>
                                                                ) : null} */}
                              </Col>
                            </div>
                            <div>
                              <Col md={8}>
                                <Input
                                  name="stockinAvailable"
                                  type="text"
                                  className="form-control"
                                  id="inputsix"
                                  // value={stockinAvailable}
                                  // onChange={(e) => {
                                  //   setStockinAvailable(e.target.value);
                                  // }}
                                  value={formValues.stockinAvailable}
                                  onChange={(e) => {
                                    setFormValues({
                                      ...formValues,
                                      stockinAvailable: e.target.value,
                                    });
                                  }}
                                  // value={validation.values.stockinAvailable}
                                  onBlur={validation.handleBlur}
                                  // onChange={variantChange}
                                // invalid={validation.errors.stockinAvailable && validation.touched.stockinAvailable ? true : false}
                                />
                                {/* {validation.errors.stockinAvailable && validation.touched.stockinAvailable ? (
                                                                    <FormFeedback type="invalid">{validation.errors.stockinAvailable}</FormFeedback>
                                                                ) : null} */}
                              </Col>
                            </div>
                            <div className={style.del_btn}>
                              <img
                                src={red_cross}
                                alt="red_cross"
                                onClick={() => deleteRow(index)}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>




                  </Row>
                </CardBody>
              </Card>
              <div
                className="text-end m-3 "
                style={{
                  display: "flex",
                  gap: "5px",
                  justifyContent: "flex-end",
                }}
              >
                <button type="submit" className="btn btn-danger w-sm">
                  Cancel
                </button>
                <button type="submit" className="btn btn-success w-sm" name="variant" onClick={variantvalidation.handleSubmit}>
                  Create Variant
                </button>

              </div>
            </Form>
          </Col>

          <Col lg={4}>
            <Card>
              <CardHeader>
                <h5 className="card-title mb-0">
                  Product Image
                  <FeatherIcon
                    icon="alert-circle"
                    style={{
                      width: "12px",
                      height: "12 px",
                      marginLeft: "5px",
                    }}
                  />
                </h5>
              </CardHeader>
              <CardBody>
                <div className="mb-3">
                  <>
                    <ReactFileReader
                      fileTypes={[".png", ".jpg"]}
                      base64={true}
                      handleFiles={handleFiles}
                    >
                      <h1 as={Button} className={style.product_img}>
                        Browse image
                      </h1>
                    </ReactFileReader>
                  </>
                  {url && (
                    <button
                      onClick={handleCancel}
                      style={{
                        position: "relative",
                        left: "42.5%",
                        right: "50%",
                        alignItems: "center",
                        borderRadius: "25px",
                        border: "none",
                        marginBottom: "15px",
                      }}
                    >
                      <span className="text-danger">Remove</span>
                    </button>
                  )}
                  <AvatarInput>

                    {url && (
                      <img
                        src={url}
                        alt="Avatar Placeholder"
                        width={"100%"}
                        height={"100%"}
                      />
                    )}
                  </AvatarInput>
                </div>
              </CardBody>
            </Card>

            <Card style={{ marginTop: "40px" }}>
              <CardHeader>
                <h5 className="card-title mb-0">
                  Gallery Images
                  <FeatherIcon
                    icon="alert-circle"
                    style={{
                      width: "12px",
                      height: "12 px",
                      marginLeft: "5px",
                    }}
                  />
                </h5>
              </CardHeader>

              <CardBody>
                <div>
                  <UploadComponent
                    {...uploadState}
                    handleChange={handleChange}
                  />
                </div>
              </CardBody>
            </Card>

            <Card style={{ marginTop: "40px" }}>
              <CardHeader>
                <h5 className="card-title mb-0">Product Preview</h5>
              </CardHeader>
              <CardBody style={{display:"flex", justifyContent:"center"}}>
                <div className={style.preview}>
                  <img
                    src={url ? url : dummy_img}
                    alt="dummy_img"
                    className={style.cardImage}
                  />
                  <h1 className={style.cardTitle}>
                    {productName ? productName : dummy_text}
                  </h1>
                  <h2 className={style.cardSubtitle}>
                    {updateSku ? updateSku : dummy_sku}
                  </h2>
                </div>
              </CardBody>

            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Addproduct;

export const AvatarInput = styled.div`
  margin-bottom: 32px;
  position: relative;
  align-self: center;
  img {
    width:80%;
    height: auto;
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
