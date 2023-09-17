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
import style from "../../styles/products/Addproduct.module.css"
// import {toast} from "react-toastify";

// Redux
import { useDispatch } from "react-redux";
import { getProducts, addNewProduct as onAddNewProduct } from "../../slices/ecommerce/thunk";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

//formik
import { useFormik } from "formik";
import * as Yup from "yup";

// Import React FilePond
import { registerPlugin } from "react-filepond";
import Select from "react-select";
import red_cross from "../../assets/images/products/red_cross.svg";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import styled from "styled-components";
import ReactFileReader from "react-file-reader";
import { Button, TextField } from "@material-ui/core";
import plus_circle from '../../assets/images/products/plus_circle.svg'
import silver from "../../assets/images/silver.svg";
import gold from "../../assets/images/gold.svg";
import platinum from "../../assets/images/platinum.svg";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { values } from "lodash";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleProduct as onGetSingleProduct, updateProductData as onUpdateProductData } from "../../slices/ecommerce/thunk";
// import { co } from "@fullcalendar/core/internal-common";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const Editproduct = (props) => {
    const { id } = useParams();
    console.log("params id", id)
    const navigate = useNavigate();
    const [taxable, setTaxable] = useState("")
    document.title = "Create Product | Velzon - React Admin & Dashboard Template";
    const dispatch = useDispatch();
    const products = useSelector((state) => state.Ecommerce.singleProduct);
    const [customActiveTab, setcustomActiveTab] = useState("1");
    const toggleCustom = (tab) => {
        if (customActiveTab !== tab) {
            setcustomActiveTab(tab);
        }
    };
    const [selectedFiles, setselectedFiles] = useState([]);
    const [selectedVisibility, setselectedVisibility] = useState(null);

    const [newProductData, setNewProductData] = useState({})

    const handleTaxable = (e) => {
        setTaxable(e.target.value)
    }
    const [editorData, setEditorData] = useState(products?.description);

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setEditorData(data)
    };

    const getPlainText = (htmlString) => {
        const parser = new DOMParser();
        const parsedDoc = parser.parseFromString(htmlString, 'text/html');
        return parsedDoc.body.textContent || '';
    };

    const [url, setUrl] = useState("");
    const [imgurl, setimgUrl] = useState('');
    const [showBrowseButton, setShowBrowseButton] = useState(true);
    const [selectedOptions, setSelectedOptions] = useState([]);

    // const handleOptionChange = (event, newValue) => {
    //     setSelectedOptions(newValue);
    // }

    const [selectedMulti, setSelectedMulti] = useState([]);
    const [selectedAttribute, setSelectedAttribute] = useState('');

    const handleAttributes = (e) => {
        setSelectedAttribute(e.target.value);
    }

    // const handleDeleteRow = (index) => {
    //     const newData = [...tableData];
    //     newData.splice(index, 1);
    //     setTableData(newData);
    // }


    const handleMulti = (selectedOptions) => {
        console.log("selected options", selectedOptions);
        setSelectedMulti(selectedOptions);
        if (selectedOptions && selectedOptions.length) {
            const newRow = selectedOptions.map(option => option.label);
            setTableData([...newRow]);
        } else {
            setTableData([])
        }
    }

    // Add more attributes
    const [attributeCombinations, setAttributeCombinations] = useState([]);
    const [tableData, setTableData] = useState([]);

    console.log('table data', tableData)

    // const handleAttributes = (e) => {
    //   setSelectedAttribute(e.target.value);
    // }

    const handleDeleteRow = (index) => {
        const newData = [...tableData];
        newData.splice(index, 1);
        setTableData(newData);
    }
    // Delete row
    const deleteRow = (index) => {
        const updatedSelectedMulti = [...selectedMulti];
        updatedSelectedMulti.splice(index, 1);
        setSelectedMulti(updatedSelectedMulti);
    };

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



    // const handleMulti = (event, newValue ) => {
    //     setSelectedMulti(newValue);
    //     console.log("selected data", newValue)
    // }

    const reader = new FileReader();

    const NotOptions = [
        { value: "", label: "Not Option" },
    ];
    const SingleOptions = [
        { value: 'apple', label: 'apple' },
        { value: 'kiwi', label: 'kiwi' },
        { value: 'avacado', label: 'avacado' },
        { value: 'banana', label: 'banana' },
        { value: 'green', label: 'green' },
    ];

    const ColorOptions = [
        { value: "red", label: "red" },
        { value: "black", label: "black" },
        { value: "blue", label: "blue" },
        { value: "orange", label: "orange" },
        { value: "white", label: "white" },
    ];

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


    function handleSelectVisibility(selectedVisibility) {
        setselectedVisibility(selectedVisibility);
    }

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

    const singleProductData = createSelector(
        (state) => state.Ecommerce.singleProduct,
        (singleProduct) => singleProduct
    );

    const singleProduct = useSelector(singleProductData);

    console.log("product single", singleProduct)







    // PRODUCT CODE
    const productvali = useFormik({
        enableReinitialize: true,

        initialValues: {
            name: singleProduct?.name || "",
            description: singleProduct?.description || "",
            category: singleProduct?.category || "",
            brand: singleProduct?.brand || "",
            sku: singleProduct?.sku || "",
        },
        productvaliSchema: Yup.object({
            name: Yup.string().required("Please Enter a Product Title"),
            description: Yup.string().required("Please Enter the Product Description"),
            category: Yup.string().required("Please select the category"),
            brand: Yup.string().required("Please select the brand"),
            sku: Yup.string().required("Please Enter the sku"),
        }),

        onSubmit: (values) => {
            // const newProduct = {
            //     name: values.name,
            //     description,
            //     category: values.category,
            //     brand: values.brand,
            //     product_sku: values.product_sku,
            // price: {
            //     levelOne: 0,
            //     levelTwo: 0,
            //     levelThree: 0,
            // },
            // };
            // console.log('addProduct', newProduct)
            // dispatch(onAddNewProduct(newProduct));
            // setShowSuccessMessage(true);
            // history("/apps-ecommerce-products");
            // validation.resetForm();
            setNewProductData({
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
                id: id,
            })
            console.log("update product", newProductData)
        },

    })
    //varant code
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: "",
            sku: "",
            costPrice: "",
            silverPrice: "",
            goldPrice: "",
            platinumPrice: "",
            stochinHand: "",
            stockinAvailable: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Please Enter a Product Title"),
            sku: Yup.string().required("Please select the category"),
            costPrice: Yup.string().required("Please select the brand"),
            silverPrice: Yup.string().required("Please Enter the sku"),
            goldPrice: Yup.string().required("Please Enter the sku"),
            platinumPrice: Yup.string().required("Please Enter the sku"),
            stochinHand: Yup.string().required("Please Enter the sku"),
            stockinAvailable: Yup.string().required("Please Enter the sku"),

        }),


        onSubmit: (values) => {
            const variant = {
                name: values.itemName,
                sku: values.sku,
                costPrice: values.costPrice,
                silverPrice: values.silverPrice,
                goldPrice: values.goldPrice,
                platinumPrice: values.platinumPrice,
                stochinHand: values.stochinHand,
                stockinAvailable: values.stockinAvailable
            };
            console.log('add variant', variant)
            // dispatch(onAddNewProduct(variant));
        },
    });
    // console.log('taxable',plainTextContent)

    // const productDetailsCreate = createSelector(
    //     (state) => state.Ecommerce.products,
    //     (products) => products
    // );

    // const productDetails = useSelector(productDetailsCreate);

    // console.log("edit details",productDetails);


    // useEffect(() => {
    //     if (productDetails && !productDetails.length) {
    //         dispatch(getProducts());
    //     }

    // }, [dispatch, productDetails])

    // const [data, setData] = useState("")


    // console.log("edit  id ", id)

    // useEffect(() => {
    //     const data = productDetails.find((el) => el._id === id);
    //     setData(data);
    // }, [])

    // console.log('edit single data', data)





    // console.log('single Products',products)

    useEffect(() => {
        if (id) {
            dispatch(onGetSingleProduct(id))
        }
    }, [dispatch, id])

    useEffect(() => {
        if (Object.keys(newProductData).length != 0) {

            dispatch(onUpdateProductData(newProductData)).then(() => {
                toast.success("Product Updateded Successfully", { autoClose: 3000 });
                setTimeout(() => {
                    navigate('/product-list')
                }, 3000);
                dispatch(getProducts())

            }).catch(() => {
                toast.error("Product Updateded Failed", { autoClose: 3000 });
            })

        }
    }, [dispatch, newProductData]);

    return (
        <div className="page-content">
            <Container fluid>
                <BreadCrumb title="Edit Product" pageTitle="Products" />

                <Row>
                    <Col lg={8}>
                        <Form
                            onSubmit={(e) => {
                                e.preventDefault();
                                productvali.handleSubmit();
                                return false;
                            }}>

                            <Card>
                                <CardBody>
                                    <div className="mb-3">
                                        <Label className="form-label" htmlFor="product-title-input">
                                            Product Title
                                            <FeatherIcon icon="alert-circle" style={{ width: '12px', height: '12 px', marginLeft: '5px' }} />
                                        </Label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            id="product-title-input"
                                            placeholder="Enter product title"
                                            name="name"
                                            value={productvali.values.name || ""}
                                            // value={productvali.values.name || ""}
                                            onBlur={productvali.handleBlur}
                                            onChange={productvali.handleChange}
                                            invalid={productvali.errors.name && productvali.touched.name ? true : false}
                                        />
                                        {productvali.errors.name && productvali.touched.name ? (
                                            <FormFeedback type="invalid">{productvali.errors.name}</FormFeedback>
                                        ) : null}
                                    </div>
                                    <div>
                                        <Label>Product Description
                                            <FeatherIcon icon="alert-circle" style={{ width: '12px', height: '12 px', marginLeft: '5px' }} />
                                        </Label>
                                        <textarea
                                            className="form-control"
                                            id="billinginfo-address"
                                            placeholder="Enter description of the product"
                                            rows="12"
                                            type="text"
                                            name="description"
                                            value={productvali.values.description || ""}
                                            onBlur={productvali.handleBlur}
                                            onChange={productvali.handleChange}
                                            invalid={
                                                productvali.errors.description && productvali.touched.description
                                                    ? true
                                                    : false
                                            }
                                        ></textarea>

                                        {productvali.errors.description && productvali.touched.description ? (
                                            <FormFeedback type="invalid">
                                                {productvali.errors.description}
                                            </FormFeedback>
                                        ) : null}

                                        {/* <CKEditor
                                            editor={ClassicEditor}
                                            onChange={handleEditorChange}
                                            // value={products?.description}
                                            value={editorData}

                                        /> */}

                                    </div>
                                </CardBody>
                            </Card>

                            <Card>
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
                                                // value={data?.categories}

                                                >
                                                    {productCategory.map((item, key) => (
                                                        <React.Fragment key={key}>
                                                            {products?.categories.map((item, key) => (<option value={item.value} key={key}>{item}</option>))}
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
                                                    type="text"
                                                    className="form-text h-80 py-2 px-3"
                                                    id="brand-field"
                                                    onChange={productvali.handleChange}
                                                    onBlur={productvali.handleBlur}
                                                    // value={products?.brand}
                                                    value={
                                                        productvali.values.brand || ""
                                                    }
                                                />


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
                                                <Label for="sku-field" className="form-label">SKU
                                                    <FeatherIcon icon="alert-circle" style={{ width: '12px', height: '12 px', marginLeft: '5px' }} />
                                                </Label>
                                                <Input
                                                    className="form-control"
                                                    placeholder="Enter SKU"
                                                    type="text"
                                                    name="sku"
                                                    // value={products?.sku}
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
                                            <Label for="validationDefault03" className="form-label" style={{ marginTop: '20px' }}>
                                                Tax Preferences</Label>
                                            <div style={{ display: 'flex' }}>

                                                <div className="form-check mb-2" style={{ marginRight: '10px' }}>
                                                    <Input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="flexRadioDefault"
                                                        id="flexRadioDefault1"
                                                        value="true"
                                                        // value={products?.tax_status}
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
                                            {/* <div style={{ display: 'flex', }}>
                                                <div className="form-check mb-2">
                                                    <Input 
                                                        className="form-check-input"
                                                        type="radio"
                                                        id="flexRadioDefault1"
                                                        name="flexRadioDefault"
                                                        value="true"
                                                        checked={taxable === true}
                                                        onChange={handleTaxable} />
                                                    <Label className="form-check-label" for="flexRadioDefault1">
                                                        Taxable
                                                    </Label>
                                                </div>
                                                <div className="form-check" style={{ marginLeft: '15px' }}>
                                                    <Input 
                                                        className="form-check-input"
                                                        name="flexRadioDefault"
                                                        id="flexRadioDefault2"
                                                        type="radio"
                                                        value="false"
                                                        checked={taxable === true}
                                                        onChange={handleTaxable} />
                                                    <Label className="form-check-label" for="flexRadioDefault2">
                                                        Non - Taxable
                                                    </Label>
                                                </div>
                                            </div> */}
                                        </Col>
                                        <Col md={6}>
                                            <div>

                                            </div>
                                        </Col>
                                        <Col md={6} style={{ position: "relative", right: "10px" }}>
                                            {taxable === "true" ? <div className="d-flex gap-3">

                                                <div className="col-md-6 py-2 px-3">

                                                    {/* <Col > */}
                                                    <Label for="sku-field" className="form-label">Classification</Label>
                                                    <Input
                                                        className="form-control"
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
                                                </div>
                                            </div> : null}
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                            <div className="text-end m-3">
                                {/* <button type="submit" className="btn btn-secondary w-sm me-1">Cancel</button> */}
                                <button type="submit" className="btn btn-success w-sm">
                                    Edit Product
                                </button>
                            </div>

                        </Form>
                    </Col>

                    {/* image upload */}

                    <Col lg={4}>
                        <Card>
                            <CardHeader>Product Image
                                <FeatherIcon icon="alert-circle" style={{ width: '12px', height: '12 px', marginLeft: '5px' }} />
                            </CardHeader>
                            <Card>
                                <div>
                                    <div >
                                        <>
                                            <ReactFileReader
                                                fileTypes={[".png", ".jpg"]}
                                                base64={true}
                                                handleFiles={handleFiles}
                                            >
                                                {showBrowseButton && (
                                                    <h1 as={Button} className={style.product_img}>Browse image</h1>
                                                )}

                                            </ReactFileReader>
                                        </>
                                        <AvatarInput>
                                            {/* <img src={url} alt="Avatar Placeholder" /> */}
                                            {url && <img src={data?.featuredImage?.src} alt="Avatar Placeholder" />}

                                        </AvatarInput>
                                    </div>
                                </div>
                            </Card>
                        </Card>
                    </Col>

                    {/* VARIANT CODE */}

                    <Col lg={8}>

                        <Form
                            onSubmit={(e) => {
                                e.preventDefault();
                                validation.handleSubmit();
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
                                                >
                                                    <option value="">Select Attributes</option>
                                                    <option value="colors">Colors</option>
                                                    <option value="flavours">Flavours</option>
                                                </select>
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

                                                                </div>


                                                            </th>
                                                            <th scope="col" style={{ color: "#1D73AC" }}>Item Name <span style={{ color: "red" }}>* </span></th>
                                                            <th scope="col" style={{ color: "#1D73AC" }}>SKU </th>
                                                            {/* <th scope="col" style={{ color: "#1D73AC" }}>UPC <img src={Sort} alt="" /> </th> */}
                                                            <th scope="col" style={{ color: "#1D73AC" }}>Cost Price <span style={{ color: "red" }}>*</span><span style={{ color: "gray", fontSize: "11px" }}>Per Unit</span></th>
                                                            <th scope="col" style={{ textAlign: "center", marginBottom: "15px", color: "#1D73AC" }}> Selling Price <span style={{ color: "red" }}>*
                                                            </span>
                                                                <span style={{ color: "gray", fontSize: "11px" }}> Per Unit</span>

                                                                <div style={{ display: "flex", justifyContent: "center", gap: "50px", margin: '5px 0px 5px 11px', color: "black" }}>
                                                                    <td> <img src={silver} alt="" /> Silver</td>
                                                                    <td> <img src={gold} alt="" /> Gold</td>
                                                                    <td> <img src={platinum} alt="" /> Platinum</td>
                                                                </div>

                                                            </th>
                                                            <th scope="col" style={{ width: "150px", color: "#1D73AC" }}>Stock in hand</th>
                                                            <th scope="col" style={{ width: "150px", color: "#1D73AC" }}>Stock
                                                                Available</th>
                                                            <th scope="col" style={{ width: "150px", color: "#1D73AC" }}>Remove</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {tableData.map((row, index) => (
                                                            console.log("myData", row),
                                                            <tr key={index}>
                                                                <td>
                                                                    <div className="form-check">

                                                                        <input
                                                                            className="form-check-input"
                                                                            type="checkbox"
                                                                            value=""
                                                                            id="selectAllCheckbox"
                                                                        />

                                                                    </div>
                                                                </td>
                                                                <td>{row}</td>
                                                                <td style={{ textAlign: "center" }}>SUORINISHAREP01</td>
                                                                <td style={{ textAlign: "center" }}>$250</td>
                                                                <td>
                                                                    <tr style={{ display: "flex", justifyContent: "space-around", }}>
                                                                        <td><span className="badge bg-primary-subtle text-dark fs-6"><img src={silver} alt="" /> $250</span></td>
                                                                        <td><span className="badge bg-warning-subtle text-dark fs-6" ><img src={gold} alt="" /> $250</span></td>
                                                                        <td><span className="badge bg-info-subtle text-dark fs-6"><img src={platinum} alt="" /> $250</span></td>
                                                                    </tr>
                                                                </td>
                                                                <td style={{ textAlign: "center" }}>25830</td>
                                                                <td style={{ textAlign: "center" }}>25830</td>
                                                                <td style={{ textAlign: "center" }}>

                                                                    <div onClick={() => handleDeleteRow(index)} >
                                                                        <img src={red_cross} style={{ cursor: "pointer" }} alt="red_cross"
                                                                            onClick={() => deleteRow(index)}
                                                                        /></div>
                                                                </td>
                                                                {/* ... Other table columns */}
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>




                                    </Row>
                                </CardBody>
                            </Card>
                            <div className="text-end mb-3 mt-3 ">
                                <button type="submit" className="btn btn-secondary w-sm me-1">Cancel</button>
                                <button type="submit" className="btn btn-success w-sm">
                                    variant Add
                                </button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
            <ToastContainer />
        </div>

    );
};

export default Editproduct;


export const AvatarInput = styled.div`
                margin-bottom: 32px;
                position: relative;
                align-self: center;
                img {
                    width: 186px;
                height: 186px;
                object-fit: cover;
                // align-items: center;
                position: relative;
                left: 150px;
    // alignItems: center;
    /* border-radius: 50%; */
  }
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
  }
                `;
