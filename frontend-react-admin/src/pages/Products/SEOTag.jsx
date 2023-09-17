import React, { useEffect, useState, useMemo } from "react";

import {
  Container,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  // Nav,
  // NavItem,
  // NavLink,
  // UncontrolledCollapse,
  Row,
  Card,
  CardHeader,
  Col,
  Input,
  Table,
  Label,
  // Label,
} from "reactstrap";
// import classnames from "classnames";

// RangeSlider
// import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
// import style from "../../../src/assets/scss/config/Seotag.module.css";
import DeleteModal from "../../Components/Common/DeleteModal";

import BreadCrumb from "../../Components/Common/BreadCrumb";
// import TableContainer from "../../Components/Common/TableContainer";
import {
  Rating,
  Published,
  Price,
} from "../Ecommerce/EcommerceProducts/EcommerceProductCol";
//Import data

import {
  addNewCategory as onAddNewCategory,
  getProductCategory as onGetProductCategory,
} from "../../slices/ecommerce/thunk";

//Import actions
import {
  getProducts as onGetProducts,
  deleteProducts,
} from "../../helpers/fakebackend_helper";
import { isEmpty } from "lodash";
// import Select from "react-select";

//redux
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { createSelector } from "reselect";

// const SingleOptions = [
//   { value: "Watches", label: "Watches" },
//   { value: "Headset", label: "Headset" },
//   { value: "Sweatshirt", label: "Sweatshirt" },
//   { value: "20% off", label: "20% off" },
//   { value: "4 star", label: "4 star" },
// ];

const SEOTag = (props) => {
  const dispatch = useDispatch();

  // const selectecomproductData = createSelector(
  //   (state) => state.Ecommerce.products,
  //   (products) => products
  // );


  const selectecomproductData = createSelector(
    (state) => state.Ecommerce.category,
    (category) => category
  );

  // Inside your component
  const category = useSelector(selectecomproductData);
  // const products = useSelector(selectecomproductData);

  const [categoryList, setCategoryList] = useState([]);

  const [render, setRender] = useState(false)
  const [activeTab, setActiveTab] = useState("1");
  const [selectedMulti, setselectedMulti] = useState(null);
  const [product, setProduct] = useState(null);


  useEffect(() => {
    dispatch(onGetProductCategory());
  }, [dispatch, render]);
  useEffect(() => {
    setCategoryList(category);
  }, [category]);

  // const [productList, setProductList] = useState([]);
  // const [activeTab, setActiveTab] = useState("1");
  // const [selectedMulti, setselectedMulti] = useState(null);
  // const [product, setProduct] = useState(null);
  // console.log('product lsit',product)

  function handleMulti(selectedMulti) {
    setselectedMulti(selectedMulti);
  }

  // useEffect(() => {
  //   if (products && !products.length) {
  //     dispatch(onGetProducts());
  //   }
  // }, [dispatch, products]);

  // useEffect(() => {
  //   setProductList(products);
  // }, [products]);

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

  // const [ratingvalues, setRatingvalues] = useState([]);
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
  document.title = "Products | Seo Tag";

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
        <BreadCrumb title="Products" pageTitle="Ecommerce" />
        <Card>
          <CardHeader className="border-0 rounded">
            <Row className="g-2">
              <Col xl={3}>
                <button type="button" className="btn btn-success">
                  <i className="ri-filter-2-fill me-1 align-middle ri-xl"></i>{" "}
                  Filters
                </button>

              </Col>
              <Col xxl={3} className="ms-auto">
                {/* <div>
                  <select
                    className="form-control"
                    onChange={(e) => category(e.target.value)}
                  >
                    <option value="All">Select Categories</option>
                    <option value="All">All</option>
                    <option value="Retailer">Retailer</option>
                    <option value="Health & Medicine">Health & Medicine</option>
                    <option value="Manufacturer">Manufacturer</option>
                    <option value="Food Service">Food Service</option>
                    <option value="Computers & Electronics">
                      Computers & Electronics
                    </option>
                  </select>
                </div> */}
              </Col>
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
                  {/* <button
                    className="btn btn-success"
                    onClick={() => {
                      setModal(true);
                    }}
                  >
                    <i className="ri-add-fill me-1 align-bottom"></i> Add Seller
                  </button> */}
                </div>
              </div>
            </Row>
          </CardHeader>
        </Card>
        <Row className="mt-4" >
          <Col xl={3} lg={4}>
            <Card style={{ height: "950px", marginBottom: "16px" }}>
              <CardHeader>
                <div className="d-flex mb-3">
                  <div className="flex-grow-1">
                    <h5 className="fs-16" style={{ fontWeight: "bold" }}>ADD NEW TAG</h5>
                  </div>

                </div>

                <div className="filter-choices-input">
                  <p className="fs-16" style={{ fontWeight: 500 }}>Name</p>
                  <Input
                    // value={selectedMulti}
                    // isMulti={true}
                    // onChange={() => {
                    //   handleMulti();
                    // }}
                    // options={SingleOptions}
                    placeholder="Enter Tag name"
                  />
                </div>
                <div className="filter-choices-input">
                  <p className="fs-16 mt-4" style={{ fontWeight: 500 }} >Slug</p>
                  <Input
                  // value={selectedMulti}
                  // isMulti={true}
                  // onChange={() => {
                  //   handleMulti();
                  // }}
                  // options={SingleOptions}

                  />
                </div>

                <div className="filter-choices-input">

                  <div className="mb-3">
                    <p className="fs-16 mt-4" style={{ fontWeight: 500 }} >Description</p>
                    <textarea className="form-control" id="VertimeassageInput" rows="3" ></textarea>
                  </div>
                  <div className="text-end">
                    <button type="submit" className="btn btn-success">Add New SEO Tag</button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Col>

          <Col xl={9} lg={8}>
            <div>
              <Card >
                <div className="card-header border-0">
                  <Row className=" align-items-center">
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
                  </Row>
                </div>
                <div className="card-body pt-0">




                </div>


              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SEOTag;