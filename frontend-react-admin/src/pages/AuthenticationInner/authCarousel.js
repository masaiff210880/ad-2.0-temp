import React from "react";
import { Col } from "reactstrap";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";

// Import Images
import logoLight from "../../assets/images/logo-light.png";
import logo from "../../assets/auth-bg-img/AD-Logo.svg";
import line from "../../assets/auth-bg-img/Line.svg";


const AuthSlider = () => {
    return (
        <React.Fragment>

            <Col lg={6}>
                <div className="p-lg-5 p-4 auth-one-bg h-100">
                    {/* <div></div> */}
                    <div className="position-relative h-100 d-flex flex-column">
                        <div className="mb-4">
                            <Link to="/dashboard" className="d-block">
                                <img src={logo} alt="" height="170" />
                            </Link>
                            <div>
                                <h1 className="custom-Logo-heading">Streamline.</h1>
                                <h1 className="custom-Logo-heading">Simplify.</h1>
                                <h1 className="custom-Logo-heading">Succeed.</h1>
                                <div>
                                <img src={line} alt="" height="1.5" className="line-style"/>
                                </div>
                                <h1 className="custom-logo-heading-2">Unleash the Power of Efficient <br/> Inventory Management.</h1>
                            </div>
                        </div>
                        <div className="mt-auto">
                            {/* <div className="mb-3">
                                <i className="ri-double-quotes-l display-4 text-success"></i>
                            </div> */}

                            {/* <Carousel showThumbs={false} autoPlay={true} showArrows={false} showStatus={false} infiniteLoop={true} className="slide" id="qoutescarouselIndicators">
                                <div className="carousel-inner text-center text-white-50 pb-5">
                                    <div className="item" style={{color :"black"}}>
                                        <p className="fs-15 fst-italic">" Great! Clean code, clean design, easy for customization. Thanks very much! "</p>
                                    </div>
                                </div>
                                <div className="carousel-inner text-center text-white-50 pb-5">
                                    <div className="item">
                                        <p className="fs-15 fst-italic">" The theme is really great with an amazing customer support."</p>
                                    </div>
                                </div>
                                <div className="carousel-inner text-center text-white-50 pb-5">
                                    <div className="item">
                                        <p className="fs-15 fst-italic">" Great! Clean code, clean design, easy for customization. Thanks very much! "</p>
                                    </div>
                                </div>
                            </Carousel> */}

                        </div>
                    </div>
                </div>
            </Col>
        </React.Fragment >
    );
};

export default AuthSlider;