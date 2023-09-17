import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  useFilters,
  useExpanded,
  usePagination,
  useRowSelect,
} from "react-table";
import filterIcon from "../../assets/productIcon/filter.svg";
import columnIcon from "../../assets/productIcon/columnIcon.svg";
import style from "../../assets/scss/config/columnoption.module.css";
// import dummy_img from "../../../src/assets/images/products/small_dummy.svg";
import dummy_img from "../../assets/images/products/small_dummy.svg";
import arrowUp from "../../assets/images/products/arrowUp.svg";
import {
  Table,
  Row,
  Col,
  Button,
  CardBody,
  Modal,
  Input,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { DefaultColumnFilter } from "./filters";
import {
  ProductsGlobalFilter,
  CustomersGlobalFilter,
  OrderGlobalFilter,
  ContactsGlobalFilter,
  CompaniesGlobalFilter,
  LeadsGlobalFilter,
  CryptoOrdersGlobalFilter,
  InvoiceListGlobalSearch,
  TicketsListGlobalFilter,
  NFTRankingGlobalFilter,
  TaskListGlobalFilter,
} from "../../Components/Common/GlobalSearchFilter";
import { Link } from "react-router-dom";
import { useState } from "react";
import { set } from "lodash";
import { display } from "@mui/system";
import { useDispatch } from "react-redux";
import { Stock } from "../../pages/Ecommerce/EcommerceProducts/EcommerceProductCol";
// Define a default UI for filtering
function GlobalFilter({
  globalFilter,
  setGlobalFilter,
  isCustomerFilter,
  isOrderFilter,
  isContactsFilter,
  isCompaniesFilter,
  isCryptoOrdersFilter,
  isInvoiceListFilter,
  isTicketsListFilter,
  isNFTRankingFilter,
  isTaskListFilter,
  isProductsFilter,
  isLeadsFilter,
  SearchPlaceholder,
  filtervalue,
  setFilterValue,
  onColumnChange,
  onLimitChange,
}) {
  const [value, setValue] = React.useState(globalFilter);
  const [modal_grid, setmodal_grid] = useState(false);
  const [productone,setproductone] = useState('')
  const [producttwo,setproducttwo] = useState('')
  const [productthree,setproductthree] = useState('')
  const [productfour,setproductfour] = useState('')
  const [productfive,setproductfive] = useState('')
  const [productsix,setproductsix] = useState('')

  const [dynamicColumn, setDynamicColumn] = useState([]);
  const [error, setError] = useState("");
  const onChange = (value) => {
    if (value.length < 3) {
      setError("Please enter at least 3 characters.");
    } else if (value.length == 0) {
      setFilterValue(value);
    } else {
      setError("");
      setFilterValue(value);
    }
  };

  // console.log('isProductsFilter', isProductsFilter)
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

  // useEffect(() => {
  //   onColumnChange(dynamicColumn);
  // }, [dynamicColumn]);

  // console.log('dynamicColumn',dynamicColumn)

  const [modal_animationZoom, setmodal_animationZoom] = useState(false);
  function tog_animationZoom() {
    setmodal_animationZoom(!modal_animationZoom);
  }
  function tog_grid() {
    setmodal_grid(!modal_grid);
  }
  const handleChangeone = (e)=>{
    const{name,value} = e.target
    setproductone({...productone,[name] : value})
  }
  const handleChangetwo = (e)=>{
    const{name,value} = e.target
    setproducttwo({...producttwo,[name] : value})
  } 
  const handleChangethree = (e)=>{
    const{name,value} = e.target
    setproductthree({...productthree,[name] : value})
  } 
  const handleChangefour = (e)=>{
    const{name,value} = e.target
    setproductfour({...productfour,[name] : value})
  } 
  const handleChangefive = (e)=>{
    const{name,value} = e.target
    setproductfive({...productfive,[name] : value})
  } 
  const handleChangesix = (e)=>{
    const{name,value} = e.target
    setproductsix({...productsix,[name] : value})
  }


  const handleClick =()=>{
 
    // console.log(productone)
    // console.log(producttwo)
    // console.log(productthree)
    // console.log(productfour)
    // console.log(productfive)
    // console.log(productsix)
   
  }
  return (
    <React.Fragment>
      <CardBody className="border border-dashed border-end-0 border-start-0">
        <form>
          <Row>
            <Col sm={5}>
              <div
                className={
                  isProductsFilter ||
                    isContactsFilter ||
                    isCompaniesFilter ||
                    isNFTRankingFilter
                    ? "search-box me-2 mb-2 d-inline-block"
                    : "search-box me-2 mb-2 d-inline-block col-12"
                }
                style={{ width: "50%" }}
              >
                <input
                  onChange={(e) => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                  }}
                  id="search-bar-0"
                  type="text"
                  className={`form-control border-1 search ${error ? "is-invalid" : ""
                    }`}
                  placeholder={SearchPlaceholder}
                  value={value || ""}
                />
                <i className="bx bx-search-alt search-icon"></i>
              </div>


              <Button color="success" style={{
                width: "120px",
                height: "36px",
                position: "relative",
                bottom: "1px",
                right: "1px",
              }} onClick={() => setmodal_grid(true)}>
                <i className="ri-filter-2-fill me-1 align-middle ri-xl"></i>{" "}
                Filters
              </Button>

              <Modal
                isOpen={modal_grid}
                toggle={() => {
                  tog_grid();
                }}
              >
                <ModalHeader>
                  <Button
                    type="button"
                    onClick={() => {
                      setmodal_grid(false);
                    }}
                    className="btn-close d-flex justify-content-end"
                    aria-label="Close"
                  >
                  </Button>
                </ModalHeader>
                <ModalBody>
                  <form action="#">
                    <div className="row g-3">
                      <Col xxl={6}>
                        <div>

                          <select className="form-control" id="firstName" value = {productone.action} name="action"onChange={handleChangeone}>
                            <option value="">Bulk actions <i className="mdi mdi-chevron-down"></i></option>
                            <option value="Actions_01">Actions_01 </option>
                            <option value="Actions_02">Actions_02 </option>
                            <option value="Actions_03">Actions_03 </option>
                            <option value="Actions_04">Actions_04 </option>
                            <option value="Actions_05">Actions_05 </option>
                            <option value="Actions_06">Actions_06 </option>

                          </select>
                        </div>
                      </Col>
                      <Col xxl={6}>
                        <div>

                          <select className="form-control" id="firstName" value = {producttwo.action} name="action" onChange={handleChangetwo}>
                            <option value=""> Filter by Category</option>
                            <option value="Delta">Delta</option>
                            <option value="Disposables">Disposables</option>
                            <option value="E liquid">E liquid</option>
                            <option value="Batteries">Batteries</option>
                            <option value="Cream Charges">Cream Charges</option>
                            <option value="Vape Shop">Vape Shop</option>
                            <option value="Herb & Concentrate">Herb & Concentrate</option>
                            <option value="Smoke Shop">Smoke Shop</option>

                          </select>
                        </div>
                      </Col>


                      <Col xxl={6}>
                        <div>

                          <select className="form-control" id="firstName" value = {productthree.action} name="action"onChange={handleChangethree}>
                            <option value="">All SEO Scores</option>
                            <option value="Score_01">Score_01</option>
                            <option value="Score_02">Score_02</option>
                            <option value="Score_03">Score_03</option>
                            <option value="Score_04">Score_04</option>
                            <option value="Score_05">Score_05</option>
                            <option value="Score_06">Score_06</option>


                          </select>
                        </div>
                      </Col>
                      <Col xxl={6}>
                        <div>

                          <select className="form-control" id="firstName" value = {productfour.action} name="action"onChange={handleChangefour}>
                            <option value="">Filter by Product Type</option>
                            <option value="Gummies">Gummies</option>
                            <option value="Jars">Jars</option>
                            <option value="Glass">Glass</option>
                            <option value="Paper">Paper</option>
                            <option value="Battery">Battery</option>
                            <option value="Cones">Cones</option>


                          </select>
                        </div>
                      </Col>
                      <Col xxl={6}>
                        <div>

                          <select className="form-control" id="firstName" value = {productfive.action} name="action"onChange={handleChangefive}>
                            <option value="">All Readability Scores</option>
                            <option value="SC_A">SC_A</option>
                            <option value="SC_B">SC_B</option>
                            <option value="SC_C">SC_C</option>
                            <option value="SC_D">SC_D</option>
                            <option value="SC_E">SC_E</option>
                            <option value="SC_F">SC_F</option>



                          </select>
                        </div>
                      </Col>
                      <Col xxl={6}>
                        <div class="input-group">
                          <select class="form-control" id="firstName" value = {productsix.action} name="action"onChange={handleChangesix}>
                            <option value="">Filter by Stock Status   </option>
                            <option value="Open">Open</option>
                            <option value="Close">Close</option>
                            <option value="Processing">Processing</option>
                            <option value="Pending">Pending</option>
                            <option value="Cancel">Cancel</option>
                            <option value="Apply">Apply</option>
                          </select>
                         
                        </div>
                      </Col>
                      <div className="col-lg-12 bg-info-subtle" style={{ height: '50px', width: '600px' }}>
                        <div className="d-flex column-gap-2 justify-content-center mt-2">
                          <Button color="primary" className="bg-gradient" onClick={handleClick}>Apply</Button>
                          <Button color="danger" onClick={() => setmodal_grid(false)}>Close</Button>
                        </div>
                      </div>
                    </div>
                  </form>
                </ModalBody>
              </Modal>

              <Button
                type="button"
                className="mb-2 text-white m-1"
                color="primary"
                onClick={() => tog_animationZoom()}
              >
                <div className="d-flex align-items-center">
                  <i className="align-middle me-2">
                    <img src={columnIcon} width={"80%"} alt="columnIcon" />
                  </i>
                  Column Options
                </div>
              </Button>
              <Modal
                size="sm"
                id="flipModal"
                isOpen={modal_animationZoom}
                toggle={() => {
                  tog_animationZoom();
                }}
                modalClassName="zoomIn"
                centered
              >
                <div className="row">
                  <div className={`col-12 ${style.column_option}`}>
                    <div>UPC</div>
                    <div>
                      <Input
                        type="checkbox"
                        value={"UPC"}
                        name="columnoptions"
                        onChange={handleColumnOptions}
                        defaultChecked={dynamicColumn.includes("UPC")}
                      />
                    </div>
                  </div>
                  <div className={`col-12 ${style.column_option}`}>
                    <div>Tags</div>
                    <div>
                      <Input
                        type="checkbox"
                        value={"Tags"}
                        name="columnoptions"
                        onChange={handleColumnOptions}
                        defaultChecked={dynamicColumn.includes("Tags")}
                      />
                    </div>
                  </div>
                  <div className={`col-12 ${style.column_option}`}>
                    <div>Featured</div>
                    <div>
                      <Input
                        type="checkbox"
                        value={"Featured"}
                        name="columnoptions"
                        onChange={handleColumnOptions}
                        defaultChecked={dynamicColumn.includes("Featured")}
                      />
                    </div>
                  </div>
                  <div className={`col-12 ${style.column_option}`}>
                    <div>Date</div>
                    <div>
                      <Input
                        type="checkbox"
                        value={"Date"}
                        name="columnoptions"
                        onChange={handleColumnOptions}
                        defaultChecked={dynamicColumn.includes("Date")}
                      />
                    </div>
                  </div>
                  <div className={`col-12 ${style.column_option}`}>
                    <div>Readability Score</div>
                    <div>
                      <Input
                        type="checkbox"
                        value={"Readability Score"}
                        name="columnoptions"
                        onChange={handleColumnOptions}
                      />
                    </div>
                  </div>
                  <div className={`col-12 ${style.column_option}`}>
                    <div>SEO Title</div>
                    <div>
                      <Input
                        type="checkbox"
                        value={"SEO Title"}
                        name="columnoptions"
                        onChange={handleColumnOptions}
                      />
                    </div>
                  </div>
                  <div className={`col-12 ${style.column_option}`}>
                    <div>Meta Desc.</div>
                    <div>
                      <Input
                        type="checkbox"
                        value={"Meta Desc."}
                        name="columnoptions"
                        onChange={handleColumnOptions}
                      />
                    </div>
                  </div>
                  <div className={`col-12 ${style.column_option}`}>
                    <div>Keyphrase</div>
                    <div>
                      <Input
                        type="checkbox"
                        value={"Keyphrase"}
                        name="columnoptions"
                        onChange={handleColumnOptions}
                      />
                    </div>
                  </div>
                  <div className={`col-12 ${style.column_option}`}>
                    <div>Outgoing internal links</div>
                    <div>
                      <Input
                        type="checkbox"
                        value={"Outgoing internal links"}
                        name="columnoptions"
                        onChange={handleColumnOptions}
                      />
                    </div>
                  </div>
                </div>
              </Modal>
            </Col>
            {isProductsFilter == undefined && <ProductsGlobalFilter />}
            {isCustomerFilter && <CustomersGlobalFilter />}
            {isOrderFilter && <OrderGlobalFilter />}
            {isContactsFilter && <ContactsGlobalFilter />}
            {isCompaniesFilter && <CompaniesGlobalFilter />}
            {isLeadsFilter && <LeadsGlobalFilter />}
            {isCryptoOrdersFilter && <CryptoOrdersGlobalFilter />}
            {isInvoiceListFilter && <InvoiceListGlobalSearch />}
            {isTicketsListFilter && <TicketsListGlobalFilter />}
            {isNFTRankingFilter && <NFTRankingGlobalFilter />}
            {isTaskListFilter && <TaskListGlobalFilter />}
          </Row>
        </form>
        {/* <div>
          All{" "}
          <span className="badge bg-danger-subtle text-danger align-middle rounded-pill ms-1">
            {5}
          </span>
        </div> */}
      </CardBody>
    </React.Fragment>
  );
}

const TableContainer = ({
  columns,
  data,
  isGlobalSearch,
  isGlobalFilter,
  isProductsFilter,
  isCustomerFilter,
  isOrderFilter,
  isContactsFilter,
  isCompaniesFilter,
  isLeadsFilter,
  isCryptoOrdersFilter,
  isInvoiceListFilter,
  isTicketsListFilter,
  isNFTRankingFilter,
  isTaskListFilter,
  isAddOptions,
  isAddUserList,
  handleOrderClicks,
  handleUserClick,
  handleCustomerClick,
  isAddCustList,
  customPageSize,
  tableClass,
  theadClass,
  trClass,
  thClass,
  divClass,
  SearchPlaceholder,
  onGetProducts,
  filterValue,
  setFilterValue,
  onColumnChange,
  onLimitChange,
  totalProducts,
  totalPages,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: {
        pageIndex: 0,
        pageSize: totalPages,
        selectedRowIds: 0,
        sortBy: [
          {
            desc: true,
          },
        ],
      },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect
  );
  // const [currentpage, setCurrentPage] = useState(1);
  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  // };
  // const [custompage,setCustomePage] = useState(1)
  // const handleCustomeGotoPage=(e)=>{
  //   setCustomePage(e.target.value);
  //   gotoPage(custompage)
  // }
  const dispatch = useDispatch();
  const [customPage, setCustomPage] = useState("");
  const [pagerow, setPageRow] = useState("");
  const [val, setValue] = useState("");
  const handleCustomGotoPage = () => {
    const pageNumber = parseInt(customPage);
    if (
      !isNaN(pageNumber) &&
      pageNumber >= 1 &&
      pageNumber <= pageOptions.length
    ) {
      gotoPage(pageNumber - 1); // Subtracting 1 because page numbers are 1-based
    }
  };

  const handlePageRow = (e) => {
    setPageRow(e.target.value);
  };

  const handlePageRowSubmit = (e) => {
    e.preventDefault();
    onLimitChange(pagerow);
  };

  const generateSortingIndicator = (column) => {
    return column.isSorted ? (column.isSortedDesc ? " " : "") : "";
  };

  const onChangeInSelect = (event) => {
    setPageSize(Number(event.target.value));
  };
  const onChangeInInput = (event) => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0;
    gotoPage(page);
  };

  // console.log("data", val);
  useEffect(() => {
    setFilterValue(val);
  }, [val]);

  const [expandedRows, setExpandedRows] = useState({});

  const toggleRowExpanded = (rowId) => {
    const currentExpandedRows = { ...expandedRows };
    currentExpandedRows[rowId] = !currentExpandedRows[rowId];
    setExpandedRows(currentExpandedRows);
  };

  return (
    <Fragment>
      <Row className="mb-3">
        {isGlobalSearch && (
          <Col md={1}>
            <select
              className="form-select"
              value={pageSize}
              onChange={onChangeInSelect}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </Col>
        )}
        {isGlobalFilter && (
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
            isProductsFilter={isProductsFilter}
            isCustomerFilter={isCustomerFilter}
            isOrderFilter={isOrderFilter}
            isContactsFilter={isContactsFilter}
            isCompaniesFilter={isCompaniesFilter}
            isLeadsFilter={isLeadsFilter}
            isCryptoOrdersFilter={isCryptoOrdersFilter}
            isInvoiceListFilter={isInvoiceListFilter}
            isTicketsListFilter={isTicketsListFilter}
            isNFTRankingFilter={isNFTRankingFilter}
            isTaskListFilter={isTaskListFilter}
            SearchPlaceholder={SearchPlaceholder}
            filtervalue={val}
            setFilterValue={setValue}
            onColumnChange={onColumnChange}
            onLimitChange={onLimitChange}
          />
        )}
        {isAddOptions && (
          <Col sm="7">
            <div className="text-sm-end">
              <Button
                type="button"
                color="success"
                className="rounded-pill  mb-2 me-2"
                onClick={handleOrderClicks}
              >
                <i className="mdi mdi-plus me-1" />
                Add New Order
              </Button>
            </div>
          </Col>
        )}
        {isAddUserList && (
          <Col sm="7">
            <div className="text-sm-end">
              <Button
                type="button"
                color="primary"
                className="btn mb-2 me-2"
                onClick={handleUserClick}
              >
                <i className="mdi mdi-plus-circle-outline me-1" />
                Create New User
              </Button>
            </div>
          </Col>
        )}
        {isAddCustList && (
          <Col sm="7">
            <div className="text-sm-end">
              <Button
                type="button"
                color="success"
                className="rounded-pill mb-2 me-2"
                onClick={handleCustomerClick}
              >
                <i className="mdi mdi-plus me-1" />
                New Customers
              </Button>
            </div>
          </Col>
        )}
      </Row>

      <div className={divClass}>
        <Table
          hover
          {...getTableProps()}
          className={`${tableClass} ${"product_list_table"}`}
        >
          <thead className={theadClass}>
            {headerGroups.map((headerGroup) => (
              <tr
                className={trClass}
                key={headerGroup.id}
                {...headerGroup.getHeaderGroupProps()}
                style={{ textAlign: "left" }}
              >
                {headerGroup.headers.map((column) => (
                  <th
                    key={column.id}
                    className={`${thClass} ${"table_header"}`}
                    {...column.getSortByToggleProps()}
                  >
                    {column.render("Header")}
                    {generateSortingIndicator(column)}
                    {/* <Filter column={column} /> */}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page?.map((row) => {
              prepareRow(row);
              return (
                <Fragment key={row.getRowProps().key}>
                  <tr
                    className={row.id % 2 === 0 ? "avtiveRow" : "deActiveRow"}
                    onClick={() => toggleRowExpanded(row.id)}
                  >
                    {row.cells.map((cell) => (
                      <td
                        key={cell.id}
                        {...cell.getCellProps()}
                        className="table_td"
                      >
                        {cell.column.id === "stock" ? (
                          <Stock
                            cell={cell}
                            expandedRows={expandedRows}
                            toggleRowExpanded={toggleRowExpanded}
                          />
                        ) : (
                          cell.render("Cell")
                        )}
                      </td>
                    ))}
                  </tr>
                  {/* style={{backgroundColor:"rgba(114, 205, 255, 0.15)"}} */}
                  {expandedRows[row.id] && (
                    <tr>
                      <td colSpan="100%">
                        <Table className="sub-table">
                          <tbody>
                            <tr
                            // style={{
                            //   backgroundColor: "rgba(114, 205, 255, 0.15)",
                            // }}
                            >
                              {/* Sample data, you should replace this with your actual data */}

                              <th>
                                <Input
                                  className="check-box"
                                  type="checkbox"
                                ></Input>
                              </th>

                              <th scope="row">
                                <div style={{ display: "flex" }}>
                                  <img src={arrowUp} alt="arrowUp" />
                                  <div className="avatar-sm bg-light rounded p-1 me-2">
                                    <img
                                      src={dummy_img}
                                      alt=""
                                      className="img-fluid d-block mx-auto"
                                    />
                                  </div>
                                </div>
                              </th>

                              <th scope="row"></th>

                              <td style={{ position: "relative", left: "-88px" }}>
                                5 INCH GLASS GLOW IN THE DARK HANDPIPE (GP02)
                              </td>

                              <td style={{ position: "relative", right: "247px" }}>123456</td>

                              <td style={{ position: "relative", right: "152px" }}>
                                <span className="badge bg-primary-subtle text-primary">
                                  $ 7.99
                                </span>
                                <br />

                                <span className="badge bg-secondary-subtle text-secondary ">
                                  $ 7.99
                                </span>
                                <br />

                                <span className="badge bg-success-subtle text-success">
                                  $ 7.99
                                </span>
                                <br />


                              </td>

                              <td style={{ position: "relative", right: "109px" }}>
                                <i
                                  className="mdi mdi-cube fs-1"
                                  style={{ color: "#2F4C8F" }}
                                ></i>
                              </td>
                              <td style={{ position: "relative", left: "0px" }}>
                                <div
                                  className="form-check form-switch form-switch-md mb-2 form-switch-success"
                                  dir="ltr"
                                >
                                  <Input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="customSwitchsizelg"
                                    defaultChecked=""
                                  />
                                  {/* <Label className="form-check-label" htmlFor="customSwitchsizelg">Large Size Switch</Label> */}
                                </div>
                              </td>

                              <td style={{ position: "relative", left: "33px" }}>
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
                                        const productData =
                                          cellProps.row.original;
                                        onClickDelete(productData);
                                      }}
                                    >
                                      <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                                      Delete
                                    </DropdownItem>
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                              </td>
                            </tr>
                            <tr
                            // style={{
                            //   backgroundColor: "rgba(114, 205, 255, 0.15)",
                            // }}
                            >
                              {/* Sample data, you should replace this with your actual data */}

                              <th>
                                <Input
                                  className="check-box"
                                  type="checkbox"
                                ></Input>
                              </th>

                              <th scope="row">
                                <div style={{ display: "flex" }}>
                                  <img src={arrowUp} alt="arrowUp" />
                                  <div className="avatar-sm bg-light rounded p-1 me-2">
                                    <img
                                      src={dummy_img}
                                      alt=""
                                      className="img-fluid d-block mx-auto"
                                    />
                                  </div>
                                </div>
                              </th>

                              <th scope="row"></th>

                              <td style={{ position: "relative", left: "-88px" }}>
                                5 INCH GLASS GLOW IN THE DARK HANDPIPE (GP02)
                              </td>

                              <td style={{ position: "relative", right: "247px" }}>123456</td>

                              <td style={{ position: "relative", right: "152px" }}>
                                <span className="badge bg-primary-subtle text-primary">
                                  $ 7.99
                                </span>
                                <br />

                                <span className="badge bg-secondary-subtle text-secondary ">
                                  $ 7.99
                                </span>
                                <br />

                                <span className="badge bg-success-subtle text-success">
                                  $ 7.99
                                </span>
                                <br />


                              </td>

                              <td style={{ position: "relative", right: "109px" }}>
                                <i
                                  className="mdi mdi-cube fs-1"
                                  style={{ color: "#2F4C8F" }}
                                ></i>
                              </td>
                              <td style={{ position: "relative", left: "0px" }}>
                                <div
                                  className="form-check form-switch form-switch-md mb-2 form-switch-success"
                                  dir="ltr"
                                >
                                  <Input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="customSwitchsizelg"
                                    defaultChecked=""
                                  />
                                  {/* <Label className="form-check-label" htmlFor="customSwitchsizelg">Large Size Switch</Label> */}
                                </div>
                              </td>

                              <td style={{ position: "relative", left: "33px" }}>
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
                                        const productData =
                                          cellProps.row.original;
                                        onClickDelete(productData);
                                      }}
                                    >
                                      <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                                      Delete
                                    </DropdownItem>
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                              </td>
                            </tr>

                            {/* Add more rows if needed */}
                          </tbody>
                        </Table>
                      </td>
                    </tr>
                    //   <tr
                    //   className={row.id % 2 === 0 ? "avtiveRow" : "deActiveRow"}
                    //   onClick={() => toggleRowExpanded(row.id)}
                    //   style={{backgroundColor:"rgba(114, 205, 255, 0.15) !important"}}
                    // >
                    //   {row.cells.map((cell) => (
                    //     <td
                    //       key={cell.id}
                    //       {...cell.getCellProps()}
                    //       className="table_td"
                    //     >
                    //       {cell.column.id === "stock" ? (
                    //         <Stock
                    //           cell={cell}
                    //           expandedRows={expandedRows}
                    //           toggleRowExpanded={toggleRowExpanded}
                    //         />
                    //       ) : (
                    //         cell.render("Cell")
                    //       )}
                    //     </td>
                    //   ))}
                    // </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </Table>
      </div>
      <Row className="align-items-center mt-2 g-3 text-center text-sm-start">
        <div className="col-sm">
          <div className="text-muted d-flex align-items-center">
            <span
              className={`fw-semibold ${style.show} ${style.responsiveShow}`}
            >
              Show:
            </span>
            <form onSubmit={handlePageRowSubmit}>
              <Input
                value={pagerow}
                onChange={handlePageRow}
                className={`${style.rows} ${style.responsiveRows}`}
                type="text"
                placeholder="Rows"
              />
            </form>
            <span
              className={`fw-semibold ${style.goto} ${style.responsiveGoto}`}
            >
              Go to
            </span>
            <div
              className={`d-flex align-items-center gap-2 ${style.responsiveContainer}`}
            >
              <Input
                className={`${style.gotoBox} ${style.responsiveGotoBox}`}
                type="text"
                onChange={(e) => setCustomPage(e.target.value)}
                value={customPage}
                placeholder="page"
              />
              <Button
                color="primary"
                placeholder="page"
                className={`${style.customToggle} ${style.responsiveCustomToggle}`}
                onClick={handleCustomGotoPage}
              >
                <span className="icon-on">Go</span>
              </Button>
            </div>
          </div>
        </div>
        <div className="col-sm-auto m-5">
          <ul className="pagination pagination-separated pagination-md justify-content-center justify-content-sm-start mb-0">
            <div className={style.totalPages}>{`${totalProducts} Items`}</div>
            <li
              className={!canPreviousPage ? "page-item disabled" : "page-item"}
            >
              <Link to="#" className="page-link" onClick={previousPage}>
                Previous
              </Link>
            </li>
            {/* First Page */}
            <li className="page-item">
              <Link to="#" className="page-link" onClick={() => gotoPage(0)}>
                1
              </Link>
            </li>
            {/* "..." for pages before current */}
            {pageIndex >= 4 && (
              <li className="page-item disabled">
                <span className="page-link">...</span>
              </li>
            )}
            {/* Pages around the current page */}
            {pageOptions.map((item, key) => {
              // console.log('page option',pageOptions)
              if (key > pageIndex - 2 && key < pageIndex + 2) {
                return (
                  <li className="page-item" key={key}>
                    <Link
                      to="#"
                      className={
                        pageIndex === item ? "page-link active" : "page-link"
                      }
                      onClick={() => gotoPage(key)}
                    >
                      {key + 1}
                    </Link>
                  </li>
                );
              }
              return null;
            })}
            {/* "..." for pages after current */}
            {pageIndex <= pageOptions.length - 5 && (
              <li className="page-item disabled">
                <span className="page-link">...</span>
              </li>
            )}
            {/* Last Page */}
            <li className="page-item">
              <Link
                to="#"
                className="page-link"
                onClick={() => gotoPage(pageOptions.length - 1)}
              >
                {pageOptions.length}
              </Link>
            </li>
            <li className={!canNextPage ? "page-item disabled" : "page-item"}>
              <Link to="#" className="page-link" onClick={nextPage}>
                Next
              </Link>
            </li>
          </ul>
        </div>
      </Row>
    </Fragment>
  );
};

TableContainer.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
};

export default TableContainer;
