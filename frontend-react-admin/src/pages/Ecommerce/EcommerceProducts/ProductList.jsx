import React, { useEffect, useState, useMemo } from "react";

import {
  Container,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Nav,
  NavItem,
  NavLink,
  Row,
  Card,
  Col,
} from "reactstrap";
import classnames from "classnames";
import "nouislider/distribute/nouislider.css";
import DeleteModal from "../../../Components/Common/DeleteModal";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import TableContainer from "../../../Components/Common/TableContainer";
import { Published, Price, Stock } from "./EcommerceProductCol";

//Imported API Functions
import {
  getProducts as onGetProducts,
  getProductsBySearch as onGetProductsBySearchs,
  // getProductDisable as onGetProductsDisable,
  deleteProducts,
} from "../../../slices/ecommerce/thunk";
// import { isEmpty } from "lodash";

//redux
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { createSelector } from "reselect";

const EcommerceProducts = (props) => {
  const dispatch = useDispatch();
  const [limit,setLimit] = useState("")

  const handleLimits=(limitValue)=>{
    setLimit(limitValue)
  }

  const selectecomupdatedproductData = createSelector(
    (state) => state.Ecommerce.updatedproducts,
    (updatedproducts) => updatedproducts
  );

  const selectecomproductData = createSelector(
    (state) => state.Ecommerce.products,
    (products) => products
  );


  const totalProductsData = createSelector(
    (state) => state.Ecommerce.totalProducts,
    (totalProducts) => totalProducts
  );

  const totalPagesSelector = createSelector(
    (state) => state.Ecommerce.totalPages,
    (totalPages) => totalPages
  );



  const products = useSelector(selectecomproductData);
  const totalProducts = useSelector(totalProductsData);
  const totalPages = useSelector(totalPagesSelector);


  // console.log('testing purpose',products)
  // console.log("toatalP ", totalProducts);

  const updatedproducts = useSelector(selectecomupdatedproductData);

  // console.log("productData", updatedproducts);
  const [productList, setProductList] = useState([]);
  const [activeTab, setActiveTab] = useState("1");

  const [product, setProduct] = useState(null);
  const [filtervalue, setFilterValue] = useState(null);
  const [filtercolumn, setFilterColumn] = useState([]);
  // const [disable, setDisable] = useState("");

  // const handleDisableChange = (newDisableValue) => {
    // setDisable(newDisableValue);
    // console.log('disable', disable)
    // dispatch(onGetProductsDisable(!disable))
  // };
// console.log('search value',filtervalue)

  const handleColumnChange = (newColumns) => {
    setFilterColumn(newColumns);
  };


  useEffect(() => {
    // console.log('function limit',limit)
    if (products && !products.length && filtervalue == null) {
      dispatch(onGetProducts(limit));
    }else if(limit){
      dispatch(onGetProducts(limit))
    }
  }, [dispatch, products,limit]);


 
  useEffect(() => {
    if (filtervalue != null) {
      dispatch(onGetProductsBySearchs(filtervalue.trim()));
    }
  }, [dispatch, filtervalue]);

  useEffect(() => {
    if(updatedproducts?.length>0){
      setProductList(updatedproducts)
    }else{
      setProductList(products)
    }
  }, [products,updatedproducts]);

  // useEffect(() => {
  //   if (!isEmpty(products)) setProductList(products);
  // }, [products]);

  const toggleTab = (tab, type) => {
    console.log("tab",tab,type)
    if (activeTab !== tab) {
      setActiveTab(tab);
      let filteredProducts = products;
      if (type !== "all") {
        filteredProducts = products.filter(
          (product) => product.status === type
        );
      }
      setProductList(filteredProducts);
    }
  };

  //delete order
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteModalMulti, setDeleteModalMulti] = useState(false);

  const onClickDelete = (product) => {
    setProduct(product);
    setDeleteModal(true);
  };
  // Delete API Request
  const handleDeleteProduct = () => {
    if (product) {
      dispatch(deleteProducts(product._id));
      setDeleteModal(false);
    }
  };

  const [dele, setDele] = useState(0);

  // Display Delete Button
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
        Header: "Image",
        Cell: (products) => (
          // console.log("products", products),
          <>
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0 me-3">
                <div className="avatar-sm bg_light rounded">
                  <Link to={`/product-details/${products.row.original._id}`}>
                    <img
                      src={products?.row?.original?.featuredImage?.src}
                      alt=""
                      className="img-fluid d-block"
                    />
                  </Link>
                </div>
              </div>
              <div className="flex-grow-1">
                <h5 className="fs-14 mb-1">
                  <Link
                    to="/apps-ecommerce-product-details"
                    className="text-body"
                  >
                    {" "}
                    {""}
                  </Link>
                </h5>
              </div>
            </div>
          </>
        ),
      },

      {
        Header: "Name",
        Cell: (products) => (
          // console.log('products',products.row.original.categories),
          <>
            <div className="d-flex flex-column align-items-left">
              <h5 className="fs-14 mb-1 title_multiline">
                <Link
                  to={`/product-details/${products.row.original._id}`}
                  className="text-body proudct_title"
                  data-toggle="tooltip"
                  title={products.row.original.name}
                >
                  {products.row.original.name}
                </Link>
              </h5>
              <p className="text-muted mb-0">
                {products?.row?.original?.categories?.map((item)=>(
                  <Link to={'/product-category'}><span className="fw-medium">{item.categoryName}</span></Link>
                ))}
              </p>
            </div>
          </>
        ),
      },

      {
        Header: "SKU",
        Cell: (products) => (
          <>
            <div className="d-flex align-items-center">
              <Link to="/apps-ecommerce-product-details" className="text-body">
                <h5 className="fs-14 mb-1 text-gray">
                  {" "}
                  {products.row.original.sku}
                </h5>
              </Link>
            </div>
          </>
        ),
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
        Header: "Stock",
        accessor: "stock",
        filterable: false,
        Cell: (cellProps) => {
          return <Stock {...cellProps} />;
        },
      },
      // {
      //   Header: "Rating",
      //   accessor: "rating",
      //   filterable: false,
      //   // Cell: (cellProps) => {
      //   //   return <Rating {...cellProps} />;
      //   // },
      // },
      {
        Header: "VISIBLE ONLINE",
        accessor: "publishedDate",
        filterable: false,
        Cell: (cellProps) => {
          return <Published {...cellProps} />;
        },
      },
      {
        Header: "Action",
        Cell: (cellProps) => {
          console.log("cell", cellProps)
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
                <DropdownItem>
                  <Link to={`/product-details/${cellProps?.row?.original?._id}`}>
                    <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
                    View
                  </Link>
                </DropdownItem>

                <DropdownItem href="apps-ecommerce-add-product">
                  <Link to={`/edit-product/${cellProps?.row?.original?._id}`}>
                  <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                  Edit
                  </Link>
                </DropdownItem>

                <DropdownItem divider />
                <DropdownItem
                  href="#"
                  onClick={() => {
                    const productData = cellProps.row.original;
                    console.log("delete", productData._id);
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
  document.title = "Products List | American Distributors";

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

        <Col xl={12} lg={8}>
          <div>
            <Card>
              <div className="card-header border-0">
                <Row className=" align-items-center">
                  <Col>
                    <Nav
                      className="nav-tabs-custom card-header-tabs border-bottom-0"
                      role="tablist"
                    >
                      <NavItem>
                        <NavLink
                          className={classnames(
                            { active: activeTab === "1" },
                            "fw-semibold"
                          )}
                          onClick={() => {
                            toggleTab("1", "all");
                          }}
                          href="#"
                        >
                          All{" "}
                          <span className="badge bg-danger-subtle text-danger align-middle rounded-pill ms-1">
                            {totalProducts||""}
                          </span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames(
                            { active: activeTab === "2" },
                            "fw-semibold"
                          )}
                          onClick={() => {
                            toggleTab("2", "published");
                          }}
                          href="#"
                        >
                          Published{" "}
                          <span className="badge bg-danger-subtle text-danger align-middle rounded-pill ms-1">
                            
                          </span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames(
                            { active: activeTab === "3" },
                            "fw-semibold"
                          )}
                          onClick={() => {
                            toggleTab("3", "draft");
                          }}
                          href="#"
                        >
                          Draft
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames(
                            { active: activeTab === "4" },
                            "fw-semibold"
                          )}
                          onClick={() => {
                            toggleTab("4", "discontinue");
                          }}
                          href="#"
                        >
                          Discontinue
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames(
                            { active: activeTab === "5" },
                            "fw-semibold"
                          )}
                          onClick={() => {
                            toggleTab("5", "trash");
                          }}
                          href="#"
                        >
                          Trash
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </Col>
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
              <div className="card-body pt-0">
                {productList && productList.length > 0 ? (
                  <TableContainer
                    columns={columns}
                    data={productList || []}
                    isGlobalFilter={true}
                    isAddUserList={false}
                    customPageSize={10}
                    divClass="table-responsive mb-1"
                    tableClass="mb-0 align-middle table-borderless"
                    theadClass="table-light text-muted"
                    // isProductsFilter={true}
                    SearchPlaceholder="Search Products..."
                    onGetProducts={onGetProducts}
                    filterValue={filtervalue}
                    setFilterValue={setFilterValue}
                    onColumnChange={handleColumnChange}
                    onLimitChange={handleLimits}
                    totalProducts={totalProducts}
                    totalPages={totalPages}
                  />
                ) : (
                  <div className="py-4 text-center">
                    <div>
                      <lord-icon
                        src="https://cdn.lordicon.com/msoeawqm.json"
                        trigger="loop"
                        colors="primary:#405189,secondary:#0ab39c"
                        style={{ width: "72px", height: "72px" }}
                      ></lord-icon>
                    </div>

                    <div className="mt-4">
                      <h5>Sorry! No Result Found</h5>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </Col>
      </Container>
    </div>
  );
};

export default EcommerceProducts;
