import React, { useEffect, useState, useMemo } from "react";

import {
  Container,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  UncontrolledCollapse,
  Row,
  Card,
  CardHeader,
  Col,
  Input,
  CardBody,
  Label,
  Button,
  Form,
  FormFeedback,
  Table,
} from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
// RangeSlider
import "nouislider/distribute/nouislider.css";
import DeleteModal from "../../Components/Common/DeleteModal";
import drag from "../../assets/images/products/drag.svg";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import TableContainer from "../../Components/Common/TableContainer";
import {
  addNewCategory as onAddNewCategory,
  getProductCategory as onGetProductCategory,
} from "../../slices/ecommerce/thunk";
import {
  Rating,
  Published,
  Price,
} from "../Ecommerce/EcommerceProducts/EcommerceProductCol";
//Import data

//Import actions
// import {
//   getProducts as onGetProducts,
//   deleteProducts,
// } from "../../helpers/fakebackend_helper";
import { fromPairs, isEmpty } from "lodash";
import Select from "react-select";

//redux
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { createSelector } from "reselect";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";

const parentCategory = [
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

const ProductCategory = (props) => {
  const dispatch = useDispatch();
  const [thumbnail, setThumbnail] = useState({ preview: "", raw: "" });
  const [icon, setIcon] = useState({ iconPreview: "", icon: "" });
  const [bgImage, setBgImage] = useState({ bgPriview: "", bg: "" });
  const handleChange = (e) => {
    if (e.target.files.length) {
      setThumbnail({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };
  const handleChnage1 = (e) => {
    if (e.target.files.length) {
      setIcon({
        iconPreview: URL.createObjectURL(e.target.files[0]),
        icon: e.target.files[0],
      });
    }
  };
  const handleChnage2 = (e) => {
    if (e.target.files.length) {
      setBgImage({
        bgPriview: URL.createObjectURL(e.target.files[0]),
        bg: e.target.files[0],
      });
    }
  };
  const selectecomproductData = createSelector(
    (state) => state.Ecommerce.category,
    (category) => category
  );
  // Inside your component
  const category = useSelector(selectecomproductData);

  const [categoryList, setCategoryList] = useState([]);
  const [render,setRender] = useState(false)
  const [activeTab, setActiveTab] = useState("1");
  const [selectedMulti, setselectedMulti] = useState(null);
  const [product, setProduct] = useState(null);
  // console.log('product lsit',product)
  // function handleMulti(selectedMulti) {
  //   setselectedMulti(selectedMulti);
  // }

  // console.log("category", categoryList);
  useEffect(() => {
      dispatch(onGetProductCategory());
  }, [dispatch,render]);

  useEffect(() => {
    setCategoryList(category);
  }, [category]);

  // function formatDate(inputDateString) {
  //   const months = [
  //     "Jan",
  //     "Feb",
  //     "Mar",
  //     "Apr",
  //     "May",
  //     "Jun",
  //     "Jul",
  //     "Aug",
  //     "Sep",
  //     "Oct",
  //     "Nov",
  //     "Dec",
  //   ];

  //   try {
  //     const dateObject = new Date(inputDateString);
  //     const year = dateObject.getFullYear();
  //     const month = dateObject.getMonth();
  //     const day = dateObject.getDate();

  //     const formattedDate = `${day} ${months[month]}, ${year}`;
  //     return formattedDate;
  //   } catch (error) {
  //     console.error("Error parsing or formatting date:", error);
  //     return "Invalid Date";
  //   }
  // }

  // useEffect(() => {
  //   if (!isEmpty(products)) setProductList(products);
  // }, [products]);

  // const toggleTab = (tab, type) => {
  //   if (activeTab !== tab) {
  //     setActiveTab(tab);
  //     let filteredProducts = products;
  //     if (type !== "all") {
  //       filteredProducts = products.filter(
  //         (product) => product.status === type
  //       );
  //     }
  //     setProductList(filteredProducts);
  //   }
  // };

  // const [cate, setCate] = useState("all");

  // const categories = (category) => {
  //   let filteredProducts = products;
  //   if (category !== "all") {
  //     filteredProducts = products.filter(
  //       (product) => product.category === category
  //     );
  //   }
  //   setProductList(filteredProducts);
  //   setCate(category);
  // };

  // useEffect(() => {
  //   onUpdate([0, 2000]);
  // }, []);

  // const onUpdate = (value) => {
  //   setProductList(
  //     productsData.filter(
  //       (product) => product.price >= value[0] && product.price <= value[1],
  //       document.getElementById("minCost").value = value[0],
  //       document.getElementById("maxCost").value = value[1],
  //     )
  //   );
  // };

  const [ratingvalues, setRatingvalues] = useState([]);
  /*
  on change rating checkbox method
  */
  // const onChangeRating = value => {
  //   setProductList(productsData.filter(product => product.rating >= value));

  //   var modifiedRating = [...ratingvalues];
  //   modifiedRating.push(value);
  //   setRatingvalues(modifiedRating);
  // };

  // const onUncheckMark = (value) => {
  //   var modifiedRating = [...ratingvalues];
  //   const modifiedData = (modifiedRating || []).filter(x => x !== value);
  //   /*
  //   find min values
  //   */
  //   var filteredProducts = productsData;
  //   if (modifiedData && modifiedData.length && value !== 1) {
  //     var minValue = Math.min(...modifiedData);
  //     if (minValue && minValue !== Infinity) {
  //       filteredProducts = productsData.filter(
  //         product => product.rating >= minValue
  //       );
  //       setRatingvalues(modifiedData);
  //     }
  //   } else {
  //     filteredProducts = productsData;
  //   }
  //   setProductList(filteredProducts);
  // };

  //delete order
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteModalMulti, setDeleteModalMulti] = useState(false);

  const onClickDelete = (product) => {
    setProduct(product);
    setDeleteModal(true);
  };

  const handleDeleteProduct = () => {
    if (product) {
      dispatch(deleteProducts(product._id));
      setDeleteModal(false);
    }
  };

  const [dele, setDele] = useState(0);

  // Displat Delete Button
  const displayDelete = () => {
    const ele = document.querySelectorAll(".productCheckBox:checked");
    const del = document.getElementById("selection-element");
    setDele(ele.length);
    if (ele.length === 0) {
      del.style.display = "none";
    } else {
      del.style.display = "block";
    }
  };

  // Delete Multiple
  const deleteMultiple = () => {
    const ele = document.querySelectorAll(".productCheckBox:checked");
    const del = document.getElementById("selection-element");
    ele.forEach((element) => {
      dispatch(deleteProducts(element.value));
      setTimeout(() => {
        toast.clearWaitingQueue();
      }, 3000);
      del.style.display = "none";
    });
  };

  const columns = useMemo(
    () => [
      {
        Header: "#",
        Cell: (cell) => {
          return (
            <input
              type="checkbox"
              className="productCheckBox form-check-input"
              value={cell.row.original._id}
              onClick={() => displayDelete()}
            />
          );
        },
      },
      {
        Header: "Product",
        Cell: (product) => (
          <>
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0 me-3">
                <div className="avatar-sm bg-light rounded p-1">
                  <img
                    src={
                      process.env.REACT_APP_API_URL +
                      "/images/products/" +
                      product.row.original.image
                    }
                    alt=""
                    className="img-fluid d-block"
                  />
                </div>
              </div>
              <div className="flex-grow-1">
                <h5 className="fs-14 mb-1">
                  <Link
                    to="/apps-ecommerce-product-details"
                    className="text-body"
                  >
                    {" "}
                    {product.row.original.name}
                  </Link>
                </h5>
                <p className="text-muted mb-0">
                  Category :{" "}
                  <span className="fw-medium">
                    {" "}
                    {product.row.original.category}
                  </span>
                </p>
              </div>
            </div>
          </>
        ),
      },
      {
        Header: "Stock",
        accessor: "stock",
        filterable: false,
      },
      {
        Header: "Price",
        accessor: "price",
        filterable: false,
        Cell: (cellProps) => {
          return <Price {...cellProps} />;
        },
      },
      {
        Header: "Orders",
        accessor: "orders",
        filterable: false,
      },
      {
        Header: "Rating",
        accessor: "rating",
        filterable: false,
        Cell: (cellProps) => {
          return <Rating {...cellProps} />;
        },
      },
      {
        Header: "Published",
        accessor: "publishedDate",
        filterable: false,
        Cell: (cellProps) => {
          return <Published {...cellProps} />;
        },
      },
      {
        Header: "Action",
        Cell: (cellProps) => {
          return (
            <UncontrolledDropdown>
              <DropdownToggle
                href="#"
                className="btn btn-soft-secondary btn-sm"
                tag="button"
              >
                <i className="ri-more-fill" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                <DropdownItem href="apps-ecommerce-product-details">
                  <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
                  View
                </DropdownItem>

                <DropdownItem href="apps-ecommerce-add-product">
                  <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                  Edit
                </DropdownItem>

                <DropdownItem divider />
                <DropdownItem
                  href="#"
                  onClick={() => {
                    const productData = cellProps.row.original;
                    onClickDelete(productData);
                  }}
                >
                  <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          );
        },
      },
    ],
    []
  );
  document.title = "Product Category | American Distributors";

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      categoryName: "",
      slug: "",
      // parentCategory : "",
      // displayType : "",
      description: "",
    },
    validationSchema: Yup.object({
      categoryName: Yup.string().required("Please Enter the category name"),
      slug: Yup.string().required("Please Enter the slug name"),
      // parentCategory  : Yup.string().required("Please Select the category"),
      // displayType : Yup.string().required("Please Select the Display type"),
    }),
    onSubmit: (values) => {
      const newCategory = {
        categoryName: values.categoryName,
        slug: values.slug,
        // parentCategory:values.parentCategory,
        // displayType:values.displayType,
        description: values.description,
      };
      // save new product
      // console.log("product data", newCategory);
      dispatch(onAddNewCategory(newCategory)).then(()=>{
        dispatch(onGetProductCategory())
      })
      // history("#");
      validation.resetForm();
      setRender(true)
    },
  });

  return (
    <div className="page-content">
      <ToastContainer closeButton={false} limit={1} />

      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteProduct}
        onCloseClick={() => setDeleteModal(false)}
      />
      <DeleteModal
        show={deleteModalMulti}
        onDeleteClick={() => {
          deleteMultiple();
          setDeleteModalMulti(false);
        }}
        onCloseClick={() => setDeleteModalMulti(false)}
      />
      <Container fluid>
        <BreadCrumb
          title="PRODUCTS CATEGORIES"
          pageTitle="Category"
          belong="Product"
        />
        <Card>
          <CardHeader className="border-0 rounded">
            <Row className="g-2">
              <Col xl={3}>
                <button type="button" className="btn btn-success">
                  <i className="ri-filter-2-fill me-1 align-middle ri-xl"></i>{" "}
                  Filters
                </button>
              </Col>
              <Col xxl={3} className="ms-auto"></Col>
              <div className="col-lg-auto">
                <div className="hstack gap-2">
                  <div className="search-box">
                    <Input
                      type="text"
                      className="form-control search"
                      placeholder="Search Categories"
                    />{" "}
                    <i className="ri-search-line search-icon"></i>
                  </div>
                </div>
              </div>
            </Row>
          </CardHeader>
        </Card>
        <Row className="mt-4">
          <Col xl={3} lg={4}>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                validation.handleSubmit();
                return false;
              }}
            >
              <Card>
                <CardBody>
                  <Label className="mb-3">ADD NEW CATEGORY</Label>
                  <div className="mb-3">
                    <Label
                      htmlFor="choices-publish-status-input"
                      className="form-label"
                    >
                      Name
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="product-title-input"
                      placeholder="Enter Category name"
                      name="categoryName"
                      value={validation.values.categoryName || ""}
                      onBlur={validation.handleBlur}
                      onChange={validation.handleChange}
                      invalid={
                        validation.errors.categoryName &&
                        validation.touched.categoryName
                          ? true
                          : false
                      }
                    />
                    {validation.errors.categoryName &&
                    validation.touched.categoryName ? (
                      <FormFeedback type="invalid">
                        {validation.errors.categoryName}
                      </FormFeedback>
                    ) : null}
                  </div>

                  <div className="mb-3">
                    <Label
                      htmlFor="choices-publish-visibility-input"
                      className="form-label"
                    >
                      Slug
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="product-slug-input"
                      name="slug"
                      value={validation.values.slug || ""}
                      onBlur={validation.handleBlur}
                      onChange={validation.handleChange}
                      invalid={
                        validation.errors.slug && validation.touched.slug
                          ? true
                          : false
                      }
                    />
                    {validation.errors.slug && validation.touched.slug ? (
                      <FormFeedback type="invalid">
                        {validation.errors.slug}
                      </FormFeedback>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <Label htmlFor="VertimeassageInput" className="form-label">
                      Description
                    </Label>
                    <textarea
                      name="description"
                      value={validation.values.description || ""}
                      onBlur={validation.handleBlur}
                      onChange={validation.handleChange}
                      className="form-control"
                      id="VertimeassageInput"
                      rows="4"
                      placeholder="Enter your message"
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <Label
                      htmlFor="choices-publish-visibility-input"
                      className="form-label"
                    >
                      Parent Category
                    </Label>
                    <Input
                      value={validation.values.parentCategory || ""}
                      onBlur={validation.handleBlur}
                      onChange={validation.handleChange}
                      invalid={
                        validation.errors.parentCategory &&
                        validation.touched.parentCategory
                          ? true
                          : false
                      }
                      name="parentCategory"
                      type="select"
                      className="input-field py-2 px-3"
                      id="choices-publish-status-input"
                    >
                      {parentCategory.map((item, key) => (
                        <React.Fragment key={key}>
                          {item.options.map((item, key) => (
                            <option value={item.value} key={key}>
                              {item.label}
                            </option>
                          ))}
                        </React.Fragment>
                      ))}
                    </Input>
                    {validation.touched.parentCategory &&
                    validation.errors.parentCategory ? (
                      <FormFeedback type="invalid">
                        {validation.errors.parentCategory}
                      </FormFeedback>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <Label
                      htmlFor="choices-publish-visibility-input"
                      className="form-label"
                    >
                      Display Type
                    </Label>
                    <Input
                      value={validation.values.displayType || ""}
                      onBlur={validation.handleBlur}
                      onChange={validation.handleChange}
                      invalid={
                        validation.errors.displayType &&
                        validation.touched.displayType
                          ? true
                          : false
                      }
                      name="displayType"
                      type="select"
                      className="input-field py-2 px-3"
                      id="choices-publish-status-input"
                    >
                      {parentCategory.map((item, key) => (
                        <React.Fragment key={key}>
                          {item.options.map((item, key) => (
                            <option value={item.value} key={key}>
                              {item.label}
                            </option>
                          ))}
                        </React.Fragment>
                      ))}
                    </Input>
                    {validation.touched.displayType &&
                    validation.errors.displayType ? (
                      <FormFeedback type="invalid">
                        {validation.errors.displayType}
                      </FormFeedback>
                    ) : null}
                  </div>
                  {/* Image Upload */}
                  <div style={{ display: "flex", columnGap: "10px" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <label htmlFor="">Thumbnail</label>
                      <div
                        style={{ border: "1px dashed gray", width: "105px" }}
                      >
                        <label htmlFor="upload-button">
                          {thumbnail.preview ? (
                            <div style={{ width: "100%", height: "100px" }}>
                              <img
                                src={thumbnail.preview}
                                alt="dummy"
                                width="100"
                                height="100"
                              />
                            </div>
                          ) : (
                            <>
                              <span className="fa-stack fa-2x mt-3 mb-2">
                                <i className="fas fa-circle fa-stack-2x" />
                                <i className="fas fa-store fa-stack-1x fa-inverse" />
                              </span>

                              <div
                                style={{ position: "relative", left: "4rem" }}
                              >
                                <img src={drag} alt="drag" />
                              </div>
                              <div
                                style={{
                                  fontSize: "8px",
                                  textAlign: "center",
                                  position: "relative",
                                  left: "10px",
                                }}
                              >
                                Drag image(s) here
                              </div>
                              <div
                                style={{
                                  fontSize: "8px",
                                  textAlign: "center",
                                  position: "relative",
                                  left: "10px",
                                }}
                              >
                                or
                              </div>
                              <div
                                style={{
                                  fontSize: "8px",
                                  textAlign: "center",
                                  position: "relative",
                                  left: "10px",
                                }}
                              >
                                Browse Images
                              </div>
                            </>
                          )}
                        </label>
                      </div>

                      <input
                        type="file"
                        id="upload-button"
                        style={{ display: "none" }}
                        onChange={handleChange}
                      />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <label htmlFor="">Icon</label>
                      <div
                        style={{ border: "1px dashed gray", width: "105px" }}
                      >
                        <label htmlFor="upload-button-1">
                          {icon.iconPreview ? (
                            <div style={{ width: "100%", height: "100px" }}>
                              <img
                                src={icon.iconPreview}
                                alt="dummy"
                                width="100"
                                height="100"
                              />
                            </div>
                          ) : (
                            <>
                              <span className="fa-stack fa-2x mt-3 mb-2">
                                <i className="fas fa-circle fa-stack-2x" />
                                <i className="fas fa-store fa-stack-1x fa-inverse" />
                              </span>

                              <div
                                style={{ position: "relative", left: "4rem" }}
                              >
                                <img src={drag} alt="drag" />
                              </div>
                              <div
                                style={{
                                  fontSize: "8px",
                                  textAlign: "center",
                                  position: "relative",
                                  left: "10px",
                                }}
                              >
                                Drag image(s) here
                              </div>
                              <div
                                style={{
                                  fontSize: "8px",
                                  textAlign: "center",
                                  position: "relative",
                                  left: "10px",
                                }}
                              >
                                or
                              </div>
                              <div
                                style={{
                                  fontSize: "8px",
                                  textAlign: "center",
                                  position: "relative",
                                  left: "10px",
                                }}
                              >
                                Browse Images
                              </div>
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
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <label htmlFor="">BG Image</label>
                      <div
                        style={{ border: "1px dashed gray", width: "105px" }}
                      >
                        <label htmlFor="upload-button-2">
                          {bgImage.bgPriview ? (
                            <div style={{ width: "100%", height: "100px" }}>
                              <img
                                src={bgImage.bgPriview}
                                alt="dummy"
                                width="100"
                                height="100"
                              />
                            </div>
                          ) : (
                            <>
                              <span className="fa-stack fa-2x mt-3 mb-2">
                                <i className="fas fa-circle fa-stack-2x" />
                                <i className="fas fa-store fa-stack-1x fa-inverse" />
                              </span>

                              <div
                                style={{ position: "relative", left: "4rem" }}
                              >
                                <img src={drag} alt="drag" />
                              </div>
                              <div
                                style={{
                                  fontSize: "8px",
                                  textAlign: "center",
                                  position: "relative",
                                  left: "10px",
                                }}
                              >
                                Drag image(s) here
                              </div>
                              <div
                                style={{
                                  fontSize: "8px",
                                  textAlign: "center",
                                  position: "relative",
                                  left: "10px",
                                }}
                              >
                                or
                              </div>
                              <div
                                style={{
                                  fontSize: "8px",
                                  textAlign: "center",
                                  position: "relative",
                                  left: "10px",
                                }}
                              >
                                Browse Images
                              </div>
                            </>
                          )}
                        </label>
                      </div>

                      <input
                        type="file"
                        id="upload-button-2"
                        style={{ display: "none" }}
                        onChange={handleChnage2}
                      />
                    </div>
                  </div>
                  {/* Image Upload */}
                  <Label className="text-dark mb-3 mt-3">Visibility</Label>
                  <div className="form-check form-radio-primary mb-3">
                    <Input
                      className="form-check-input"
                      type="radio"
                      name="radioGroup"
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
                      name="radioGroup"
                      id="formradioRight6"
                    />
                    <Label className="form-check-label" for="formradioRight6">
                      Protected <FeatherIcon icon="alert-circle" size="10" />
                    </Label>
                  </div>
                  <div className="d-flex justify-content-end">
                    <Button
                      type="submit"
                      className="text-align-right"
                      color="success"
                    >
                      Add New Category
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Form>
          </Col>

          <Col xl={9} lg={8}>
            <div>
              <Card>
                <div className="card-header border-0 py-0">
                  <Row className=" align-items-center">
                    <div className="col-auto">
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
                            onClick={() => setDeleteModalMulti(true)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </Row>
                </div>
                <Table className="align-middle table-nowrap mb-0">
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
                      <th scope="col">IMAGE</th>
                      <th scope="col">CATEGORY</th>
                      <th scope="col">VISIBILITY</th>
                      <th scope="col">SLUG</th>
                      <th scope="col">COUNT</th>
                      <th
                        scope="col"
                        style={{ width: "100px", textAlign: "center" }}
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryList?.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <div className="form-check">
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue=""
                              id="cardtableCheck01"
                            />
                            <Label
                              className="form-check-label"
                              htmlFor="cardtableCheck01"
                            ></Label>
                          </div>
                        </td>
                        <td>
                          <Link to="#" className="fw-medium">
                            <div className="flex-shrink-0 me-3">
                              <div className="avatar-sm bg-light rounded p-1">
                                <img
                                  src={""}
                                  alt=""
                                  className="img-fluid d-block"
                                />
                              </div>
                            </div>
                          </Link>
                        </td>
                        <td>{item?.categoryName}</td>
                        <td>
                          <span className="badge bg_gray text-body fs-12 fw-medium mb-2">
                            {"PUBLIC"}
                          </span>
                        </td>
                        <td>{item?.slug}</td>
                        <td>42</td>
                        <td>
                          <ul
                            className="list-inline hstack gap-2 mb-0"
                            style={{ textAlign: "center" }}
                          >
                            <li className="list-inline-item">
                              <Link
                                to="#"
                                className="text-primary d-inline-block"
                              >
                                <i className="ri-eye-fill fs-16"></i>
                              </Link>
                            </li>
                            <li className="list-inline-item edit">
                              <Link
                                to="/edit-category"
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
                                <i className="ri-delete-bin-5-fill fs-16"></i>
                              </Link>
                            </li>
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                {/* </div> */}
                {/* </div> */}
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductCategory;
