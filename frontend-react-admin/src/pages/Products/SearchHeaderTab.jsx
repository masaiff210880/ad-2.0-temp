import { Link } from 'react-router-dom';

//import images
import logoSm from "../../assets/images/logo-sm.png";
import logoLight from "../../assets/images/ad-logo.png";
import EditSvg from "../../assets/productIcon/EditSvg.svg";
import Pdf from "../../assets/productIcon/Pdf.svg";
import Print from "../../assets/productIcon/Print.svg";
import Mail from "../../assets/productIcon/Mail.svg";
import link from "../../assets/productIcon/Link.svg";



import style from "../../../src/assets/scss/config/ProductDetails.module.css";
import SearchOption from '../../Components/Common/SearchOption';
import { Dropdown, DropdownMenu, DropdownToggle, Form } from 'reactstrap';
import { useState } from 'react';
// import WebAppsDropdown from '../../Components/Common/WebAppsDropdown';
// import MyCartDropdown from '../../Components/Common/MyCartDropdown';
// import FullScreenDropdown from '../../Components/Common/FullScreenDropdown';
// import LightDark from '../../Components/Common/LightDark';
// import NotificationDropdown from '../../Components/Common/NotificationDropdown';
// import ProfileDropdown from '../../Components/Common/ProfileDropdown';
// import { layoutModeTypes } from '../../Components/constants/layout';

const SearchHeaderTab = () => {


    const [search, setSearch] = useState(false);
    const toogleSearch = () => {
        setSearch(!search);
    };



    return (
        <div>
            <div className="layout-width">
                <div className="navbar-header">
                    <div className="d-flex">

                        <div className="navbar-brand-box horizontal-logo">
                            <Link to="/" className="logo logo-dark">
                                <span className="logo-sm">
                                    <img src={logoSm} alt="" height="" />
                                </span>
                                <span className="logo-lg mt-7">
                                    <img src={logoLight} alt="" height="22" />
                                </span>
                            </Link>

                            <Link to="/" className="logo logo-light">
                                <span className="logo-sm">
                                    <img src={logoSm} alt="" height="22" />
                                </span>
                                <span className="logo-lg">
                                    <img src={logoLight} alt="" height="17" />
                                </span>
                            </Link>
                        </div>




                        <SearchOption />
                    </div>

                    <div className="d-flex align-items-center">

                        <Dropdown isOpen={search} toggle={toogleSearch} className="d-md-none topbar-head-dropdown header-item">
                            <DropdownToggle type="button" tag="button" className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle">
                                <i className="bx bx-search fs-22"></i>
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-lg dropdown-menu-end p-0">
                                <Form className="p-3">
                                    <div className="form-group m-0">
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Search ..."
                                                aria-label="Recipient's username" />
                                            <button className="btn btn-primary" type="submit"><i
                                                className="mdi mdi-magnify"></i></button>
                                        </div>
                                    </div>
                                </Form>
                            </DropdownMenu>
                        </Dropdown>

                        {/* LanguageDropdown */}
                        {/* <LanguageDropdown /> */}

                        {/* WebAppsDropdown */}
                        <div className={style.commonImgStyle}>

                            <i className='mdi mdi-pencil' style={{ fontSize: "24.5px" , padding:"5.5px 9px 5.5px 9px" }} />

                        </div>

                        <div className={style.commonImgStyle}>
                            <i className='bx bxs-file-pdf' style={{ fontSize: "24px" , padding:"9px 9px 9px 9px" }} />

                        </div>

                        <div className={style.commonImgStyle}>
                            <i className='bx bx-printer' style={{ fontSize: "24px" , padding:"9px 9px 9px 9px" }} />

                        </div>

                        <div className={style.commonImgStyle}>

                            <i className='mdi mdi-email-outline' style={{ fontSize: "24.5px" , padding:"5.5px 9px 5.5px 9px" }} />
                        </div>

                        <div className={style.commonImgStyle}>

                            <i className='mdi mdi-paperclip' style={{ fontSize: "24.5px" , padding:"5.5px 9px 5.5px 9px" }} />
                        </div>


                        <button className={style.btnSaveStyle}>
                            Save
                        </button>





                    </div>
                </div>
            </div>

        </div>
    )
}

export default SearchHeaderTab