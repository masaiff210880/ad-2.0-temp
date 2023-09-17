import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Tooltip,
  Row,
  Button,
  UncontrolledTooltip,
} from "reactstrap";
//Simple bar
// import SimpleBar from "simplebar-react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { useParams } from "react-router-dom";
import style from "../../../src/assets/scss/config/ProductDetails.module.css";
import dollar from "../../assets/productIcon/dollarIcon.svg";
import stock1 from "../../assets/productIcon/stock1Icon.svg";
import stock2 from "../../assets/productIcon/stock2Icon.svg";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import SwiperCore, { FreeMode, Navigation, Thumbs } from "swiper";
import { Link } from "react-router-dom";
import TabChange from "./TabChange";
import { getSingleProduct as onGetSingleProduct } from "../../slices/ecommerce/thunk";
SwiperCore.use([FreeMode, Navigation, Thumbs]);

function ProductDetails(props) {
  const { id } = useParams();
  console.log('id',id)
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [ttop, setttop] = useState(false);
  const dispatch = useDispatch();

  const products = useSelector((state) => state.Ecommerce.singleProduct);

  console.log('single Products',products)

  useEffect(()=>{
    if(id){
      dispatch(onGetSingleProduct(id))
    }
  },[dispatch,id])
 

  // useEffect(()=>{
  //   setData(products)
  // },[products])

  // Justify Tabs
  const [justifyTab, setjustifyTab] = useState("2");
  const justifyToggle = (tab) => {
    if (justifyTab !== tab) {
      setjustifyTab(tab);
    }
  };

  // Arrow Nav tabs
  const [arrowNavTab, setarrowNavTab] = useState("1");
  const arrowNavToggle = (tab) => {
    if (arrowNavTab !== tab) {
      setarrowNavTab(tab);
    }
  };

  const [customActiveTab, setcustomActiveTab] = useState("1");
  const toggleCustom = (tab) => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };

  document.title = "Product Details | American Distributors";

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Product Details" pageTitle="Items" />
        <Row>
          <Col lg={12}>
            <Card>
              <CardBody>
                <Row className="gx-lg-5 h-100">
                  <Col xl={4} md={8} className="mx-auto">
                    <div className="product-img-slider sticky-side-div">
                      <div className="product-nav-slider mt-2">
                        <Swiper
                          navigation={true}
                          thumbs={{ swiper: thumbsSwiper }}
                          className="swiper product-nav-slider mt-2 overflow-hidden"
                        >
                          <div className="swiper-wrapper">
                            {products?.galleryImage?.map((item, index) => (
                              // console.log('item', item),
                              <SwiperSlide key={index} className="rounded">
                                <div className="nav-slide-item">
                                  <img
                                    src={item?.src}
                                    alt=""
                                    className="img-fluid d-block rounded"
                                  />
                                </div>
                              </SwiperSlide>
                            ))}
                          </div>
                        </Swiper>
                      </div>
                      <div
                        className="product-nav-slider mt-2"
                        style={{ width: "100%" }}
                      >
                        <Swiper
                          onSwiper={setThumbsSwiper}
                          slidesPerView={4} // Set this to 4 to display at least four images
                          freeMode={true}
                          watchSlidesProgress={true}
                          spaceBetween={8}
                          className="swiper product-nav-slider mt-2 overflow-hidden"
                        >
                          <div className="swiper-wrapper">
                            {products?.galleryImage?.map((item, index) => (
                              <SwiperSlide key={index} className="rounded">
                                <div className="nav-slide-item">
                                  <img
                                    src={item?.src}
                                    alt=""
                                    className="img-fluid d-block rounded"
                                  />
                                </div>
                              </SwiperSlide>
                            ))}
                          </div>
                        </Swiper>
                      </div>
                    </div>
                  </Col>

                  <Col xl={8}>
                    <div className="mt-xl-0 mt-5">
                      <div className="d-flex">
                        <div className="flex-grow-1">
                          <h4>{products?.name}</h4>
                          <div className="hstack gap-3 flex-wrap">
                            <div>
                              <Link to="#" className="text-primary d-block">
                                D8 Gummies, New Arrival
                              </Link>
                            </div>

                            <div className="vr"></div>
                            <div className="text-muted">
                              Published :{" "}
                              <span className="text-body fw-medium">
                                {products?.createdDate}
                              </span>
                            </div>
                          </div>
                          <br />

                          <div className="hstack flex-wrap gap-2">
                            <Button color="light" id="tooltipTop">
                              SKU : {products?.sku}
                            </Button>
                            <UncontrolledTooltip
                              placement="bottom"
                              target="tooltipTop"
                            >
                              {" "}
                              {products?.sku}{" "}
                            </UncontrolledTooltip>

                            <Button color="light" id="tooltipRight">
                              Barcode : {products?.productUPC}
                            </Button>
                            <UncontrolledTooltip
                              placement="bottom"
                              target="tooltipRight"
                            >
                              {" "}
                              {products?.productUPC}{" "}
                            </UncontrolledTooltip>

                            <Button color="light" id="tooltipBottom">
                              Brand : {products?.brand}
                            </Button>
                            <UncontrolledTooltip
                              placement="bottom"
                              target="tooltipBottom"
                            >
                              {" "}
                              {products?.brand}{" "}
                            </UncontrolledTooltip>

                            <Button color="light" id="tooltipLeft">
                              {products?.shipping_taxable
                                ? `Taxable : Yes`
                                : `Taxable : No`}
                            </Button>
                            <UncontrolledTooltip
                              placement="bottom"
                              target="tooltipLeft"
                            >
                              {" "}
                              {products?.shipping_taxable
                                ? "Taxable"
                                : "Non taxable"}{" "}
                            </UncontrolledTooltip>
                          </div>
                        </div>
                        <div
                          className="flex-shrink-0"
                          style={{ display: "flex" }}
                        >
                          <Button color="warning" className={style.btnStyle}>
                            <i className="ri-settings-5-fill label-icon align-middle fs-16 me-2"></i>
                            Manage
                          </Button>

                          {/* {data?.map((item, index) => ( */}

                          <div>
                            <Tooltip
                              placement="top"
                              isOpen={ttop}
                              target="TooltipTop"
                              toggle={() => {
                                setttop(!ttop);
                              }}
                            >
                              Edit
                            </Tooltip>
                            <a
                              href={`/edit-product/${id}`}
                              
                              id="TooltipTop"
                              className="btn btn-light"
                            >
                              <i className="ri-pencil-fill align-bottom"></i>
                            </a>
                          </div>
                          {/* ))} */}
                        </div>
                      </div>

                      <Row className="mt-4">
                        <Col lg={6}  >
                          <div
                            className="p-2 border border-dashed rounded"
                            style={{ width: "100%" , }}
                          >
                            <div className="d-flex align-items-center" >
                              <div className="avatar-sm me-2">
                                <div></div>
                                <div className="avatar-title rounded bg-transparent text-success fs-20">
                                  <i className={""}>
                                    <img src={dollar} alt="" />
                                  </i>
                                </div>
                                <Col >
                                  <div style={{ display: "flex", width:"100%" }}>
                                    <h1 className={style.textWeb}>
                                      Web Price{" "}
                                    </h1>
                                    <p className={style.dollar}>${products?.regular_price||"249"}</p>
                                    <div className={style.stext}>
                                      <p className={style.textsm}>Silver</p>
                                      <span className="badge bg_gray text-body fs-12 fw-medium mb-4">
                                        <i className="mdi mdi-star text-warning me-1 gray_icon ml-4"></i>
                                        {`$ ${products?.price?.levelOne}`}
                                      </span>
                                      <p className={style.textsm1}>Gold</p>
                                      <span className="badge bg_yellow text-body fs-12 fw-medium mb-4">
                                        <i className="mdi mdi-star text-warning me-1"></i>
                                        {`$ ${products?.price?.levelTwo}`}
                                      </span>
                                      <p className={style.textsm2}>Platinium</p>
                                      <span className="badge bg_primary text-body fs-12 fw-medium mb-4" style={{marginRight:"20px"}}>
                                        <i className="mdi mdi-star text-warning me-1 primary_icon"></i>
                                        {`$ ${products?.price?.levelThree}`}
                                      </span>
                                    </div>
                                  </div>
                                </Col>
                                <div className="flex-grow-1">
                                  <h5 className="mb-0">{""}</h5>
                                  <p className="text-muted mb-1">{""}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Col>

                        <Col lg={3}  >
                          <div
                            className="p-2 border border-dashed rounded"
                            
                          >
                            <div className="d-flex align-items-center">
                              <div className="avatar-sm me-2">
                                <div></div>
                                <div
                                  className="avatar-title rounded bg-transparent text-success fs-24"
                                  style={{ display: "flex", gap: "15px" }}
                                >
                                  <i className={""}>
                                    <img
                                      src={stock1}
                                      alt=""
                                      className={style.iconStyle}
                                    />
                                  </i>
                                  <div>
                                    <p className={style.smallTextPrice}>
                                      {products?.stock_quantity}{" "}
                                    </p>
                                    <p className={style.smallText}>
                                      Stock Available
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Col>

                        <Col lg={3} >
                          <div
                            className="p-2 border border-dashed rounded"
                           
                          >
                            <div className="d-flex align-items-center">
                              <div className="avatar-sm me-2">
                                <div></div>
                                <div
                                  className="avatar-title rounded bg-transparent text-success fs-24"
                                  style={{ display: "flex", gap: "15px" }}
                                >
                                  <i className={""}>
                                    <img
                                      src={stock2}
                                      alt=""
                                      className={style.iconStyle}
                                    />
                                  </i>
                                  <div>
                                    <p className={style.smallTextPrice}>
                                      {products?.handsOnQuantity || 1230}
                                    </p>
                                    <p className={style.smallText}>
                                      Stock on hand
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="flex-grow-1">
                                <h5 className="mb-0">{""}</h5>
                                <p className="text-muted mb-1">{""}</p>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>

                      <Row>
                        <br />
                      </Row>

                      <div className="mt-4 text-muted">
                        <h5 className="fs-14">Description :</h5>
                        <p>
                          {products?.description}
                          {/* Tommy Hilfiger men striped pink sweatshirt. Crafted with cotton. Material composition is 100% organic cotton. This is one of the world’s leading designer lifestyle brands and is internationally recognized for celebrating the essence of classic American cool style, featuring preppy with a twist designs. */}
                        </p>
                      </div>

                      <Row>
                        <Col sm={7}>
                          <div className="mt-3">
                            <h5 className="fs-14">Flavors </h5>
                            <div className="hstack gap-2 flex-wrap">
                              <Button color="primary">Green</Button>
                              <Button color="primary">Apple</Button>
                              <Button color="primary">Kiwi</Button>
                              <Button color="primary">Fig</Button>
                              <Button color="primary">Avacado</Button>
                              <Button color="primary">vvvv</Button>
                              <Button color="primary">Banana</Button>
                            </div>
                          </div>
                        </Col>
                        <Col sm={5}>
                          <div className="mt-3">
                            <h5 className="fs-14">Quantity</h5>
                            <div>
                              <div className="hstack gap-2 flex-wrap">
                                <Button color="primary">3000mg</Button>
                                <Button color="primary">300mg</Button>
                                <Button color="primary">100mg</Button>
                                <Button color="primary">30mg</Button>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <TabChange products={products} id={id} />
    </div>
  );
}

export default ProductDetails;
