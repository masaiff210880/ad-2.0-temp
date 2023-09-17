import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dashboard from '../assets/menuIcons/dashboardIcon.svg'
import product from '../assets/menuIcons/productIcon.svg'
import customers from '../assets/menuIcons/customerIcon.svg'
import multichannel from '../assets/menuIcons/multichannelIcon.svg'
import shipping from '../assets/menuIcons/shippingIcon.svg'
import markerting  from '../assets/menuIcons/marketingIcon.svg'
import reports  from '../assets/menuIcons/reportsIcon.svg'
import vendor from '../assets/menuIcons/vendorIcon.svg'
import salesorder from '../assets/menuIcons/salesorederIcon.svg'
import packages from '../assets/menuIcons/packagesIcon.svg'
import delivery from '../assets/menuIcons/deliveryIcon.svg'
import customercare from '../assets/menuIcons/customercareIcon.svg'
import invoices  from '../assets/menuIcons/invoicesIcon.svg'

const Navdata = () => {
    const history = useNavigate();
    //state data
    const [isDashboard, setIsDashboard] = useState(false);
    const [isApps, setIsApps] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [isPages, setIsPages] = useState(false);
    const [isBaseUi, setIsBaseUi] = useState(false);
    const [isAdvanceUi, setIsAdvanceUi] = useState(false);
    const [isForms, setIsForms] = useState(false);
    const [isTables, setIsTables] = useState(false);
    const [isCharts, setIsCharts] = useState(false);
    const [isIcons, setIsIcons] = useState(false);
    const [isMaps, setIsMaps] = useState(false);
    const [isMultiLevel, setIsMultiLevel] = useState(false);
    const [isCustomer,setCustomer] = useState(false)
    const [isSaleOrder,setSaleOrder] = useState(false)


    // Apps
    const [isEmail, setEmail] = useState(false);
    const [isSubEmail, setSubEmail] = useState(false);
    const [isEcommerce, setIsEcommerce] = useState(false);
    const [isProjects, setIsProjects] = useState(false);
    const [isTasks, setIsTasks] = useState(false);
    const [isCRM, setIsCRM] = useState(false);
    const [isCrypto, setIsCrypto] = useState(false);
    const [isInvoices, setIsInvoices] = useState(false);
    const [isSupportTickets, setIsSupportTickets] = useState(false);
    const [isNFTMarketplace, setIsNFTMarketplace] = useState(false);
    const [isJobs, setIsJobs] = useState(false);
    const [isJobList, setIsJobList] = useState(false);
    const [isCandidateList, setIsCandidateList] = useState(false);


    // Authentication
    const [isSignIn, setIsSignIn] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [isPasswordReset, setIsPasswordReset] = useState(false);
    const [isPasswordCreate, setIsPasswordCreate] = useState(false);
    const [isLockScreen, setIsLockScreen] = useState(false);
    const [isLogout, setIsLogout] = useState(false);
    const [isSuccessMessage, setIsSuccessMessage] = useState(false);
    const [isVerification, setIsVerification] = useState(false);
    const [isError, setIsError] = useState(false);

    // Pages
    const [isProfile, setIsProfile] = useState(false);
    const [isLanding, setIsLanding] = useState(false);


    // Charts
    const [isApex, setIsApex] = useState(false);

    // Multi Level
    const [isLevel1, setIsLevel1] = useState(false);
    const [isLevel2, setIsLevel2] = useState(false);

    const [iscurrentState, setIscurrentState] = useState('Dashboard');

    function updateIconSidebar(e) {
        if (e && e.target && e.target.getAttribute("subitems")) {
            const ul = document.getElementById("two-column-menu");
            const iconItems = ul.querySelectorAll(".nav-icon.active");
            let activeIconItems = [...iconItems];
            activeIconItems.forEach((item) => {
                item.classList.remove("active");
                var id = item.getAttribute("subitems");
                if (document.getElementById(id))
                    document.getElementById(id).classList.remove("show");
            });
        }
    }

    useEffect(() => {
        document.body.classList.remove('twocolumn-panel');
        if (iscurrentState !== 'Dashboard') {
            setIsDashboard(false);
        }
        if (iscurrentState !== 'Apps') {
            setIsApps(false);
        }
        if (iscurrentState !== 'Auth') {
            setIsAuth(false);
        }
        if (iscurrentState !== 'Pages') {
            setIsPages(false);
        }
        if (iscurrentState !== 'BaseUi') {
            setIsBaseUi(false);
        }
        if (iscurrentState !== 'AdvanceUi') {
            setIsAdvanceUi(false);
        }
        if (iscurrentState !== 'Forms') {
            setIsForms(false);
        }
        if (iscurrentState !== 'Tables') {
            setIsTables(false);
        }
        if (iscurrentState !== 'Charts') {
            setIsCharts(false);
        }
        if (iscurrentState !== 'Icons') {
            setIsIcons(false);
        }
        if (iscurrentState !== 'Maps') {
            setIsMaps(false);
        }
        if (iscurrentState !== 'MuliLevel') {
            setIsMultiLevel(false);
        }
        if (iscurrentState === 'Widgets') {
            history("/widgets");
            document.body.classList.add('twocolumn-panel');
        }
        if (iscurrentState !== 'Landing') {
            setIsLanding(false);
        }
    }, [
        history,
        iscurrentState,
        isDashboard,
        isApps,
        isAuth,
        isPages,
        isBaseUi,
        isAdvanceUi,
        isForms,
        isTables,
        isCharts,
        isIcons,
        isMaps,
        isMultiLevel
    ]);

    const menuItems = [
        {
            label: "Menu",
            isHeader: true,
        },
        {
            id: "dashboard",
            label: "Dashboards",
            icon:  dashboard,
            link: "/#",
            stateVariables: isDashboard,
            click: function (e) {
                e.preventDefault();
                setIsDashboard(!isDashboard);
                setIscurrentState('Dashboard');
                updateIconSidebar(e);
            },
            subItems: [
                // {
                //     id: "items",
                //     label: "Items",
                //     link: "#",
                //     parentId: "apps",
                // },
                // {
                //     id: "item-group",
                //     label: "Item Group",
                //     link: "#",
                //     parentId: "apps",
                // },
                //  {
                //     id: "product-inventory",
                //     label: "Product Inventory",
                //     link: "#",
                //     parentId: "apps",
                // },
          
            ],
        },
        {
            
            id: "products",
            label: "Products",
            icon: product,
            link: "/#",
            click: function (e) {
                e.preventDefault();
                setIsApps(!isApps);
                setIscurrentState('Apps');
                updateIconSidebar(e);
            },
            stateVariables: isApps,
            subItems: [
                {
                    id: "product-inventory",
                    label: "Product Inventory",
                    link: "/product-list",
                    parentId: "apps",
                },
                {
                    id: "add-product",
                    label:"Add New Product",
                    link: "/add-product",
                    parentId: "apps",
                },
                {
                    id: "category",
                    label: "Category",
                    link: "/product-category",
                    parentId: "apps",
                },
                {
                    id: "brands",
                    label: "Brands",
                    link: "",
                    parentId: "apps",
                },
                {
                    id: "seo-tags",
                    label:"SEO Tags",
                    link: "/seo-tags",
                    parentId: "apps",
               
          
                },
                // {
                //     id: "edit-category",
                //     label:"Edit Category",
                //     link: "/edit-category",
                //     parentId: "apps",
               
          
                // },
            ],
        },
        // {
        //     label: "pages",
        //     isHeader: true,
        // },
        // {
        //     id: "customers",
        //     label: "Customers",
        //     icon: customers,
        //     link: "/#",
        //     click: function (e) {
        //         e.preventDefault();
        //         setIsAuth(!isApps);
        //         setIscurrentState('Auth');
        //         updateIconSidebar(e);
        //     },
        //     stateVariables: isApps,
        //     subItems: [
        //         {
        //             id: "customer-list",
        //             label: "Customer List",
        //             link: "/customer-list",
        //             parentId: "apps",
        //         },
        //     ],
        // },
        {
            id: "customers",
            label: "Customers",
            icon: customers,
            link: "/#",
            click: function (e) {
                e.preventDefault();
                setCustomer(!isCustomer);
                setIscurrentState('isCustomer');
                updateIconSidebar(e);
            },
            stateVariables: isCustomer,
            subItems: [
                {
                    id: "customer-list",
                    label: "Customer List",
                    link: "/customer-list",
                    parentId: "apps",
                },
            ],
        },
        {
            id: "multichanel",
            label: "Multi Channel",
            icon: multichannel,
            link: "/#",
            click: function (e) {
                e.preventDefault();
                setIsPages(!isPages);
                setIscurrentState('Pages');
                updateIconSidebar(e);
            },
            stateVariables: isPages,
            subItems: [
                // {
                //     id: "starter",
                //     label: "Starter",
                //     link: "#",
                //     parentId: "pages",
                // },
                // {
                //     id: "profile",
                //     label: "Profile",
                //     link: "/#",
                //     isChildItem: true,
                //     click: function (e) {
                //         e.preventDefault();
                //         setIsProfile(!isProfile);
                //     },
                //     parentId: "pages",
                //     stateVariables: isProfile,
                //     childItems: [
                //         { id: 1, label: "Simple Page", link: "#", parentId: "pages" },
                //         { id: 2, label: "Settings", link: "#", parentId: "pages" },
                //     ]
                // },
                // { id: "team", label: "Team", link: "#", parentId: "pages" },
                // { id: "timeline", label: "Timeline", link: "#", parentId: "pages" },
                // { id: "faqs", label: "FAQs", link: "#", parentId: "pages" },
                // { id: "pricing", label: "Pricing", link: "#", parentId: "pages" },
                // { id: "gallery", label: "Gallery", link: "#", parentId: "pages" },
                // { id: "maintenance", label: "Maintenance", link: "/pages-maintenance", parentId: "pages" },
                // { id: "comingSoon", label: "Coming Soon", link: "/pages-coming-soon", parentId: "pages" },
                // { id: "sitemap", label: "Sitemap", link: "#", parentId: "pages" },
                // { id: "searchResults", label: "Search Results", link: "#", parentId: "pages" },
                // {
                //     id: "PrivecyPolicy", label: "Privacy Policy", link: "#", parentId: "pages",
                //     // badgeColor: "success", badgeName: "New", 
                // },
                // {
                //     id: "TermsCondition", label: "Terms Condition", link: "#", parentId: "pages",
                //     // badgeColor: "success", badgeName: "New", 
                // },
            ],
        },
        {
            id: "shiping",
            label: "Shipping",
            icon:shipping,
            link: "/#",
            stateVariables: isLanding,
            click: function (e) {
                e.preventDefault();
                setIsLanding(!isLanding);
                setIscurrentState('Landing');
                updateIconSidebar(e);
            },
            subItems: [
                // { id: "onePage", label: "One Page", link: "#", parentId: "landing" },
                // { id: "nftLanding", label: "NFT Landing", link: "#", parentId: "landing" },
                // {
                //     id: "jobLanding", label: "Job", link: "#", parentId: "landing",
                //     // badgeColor: "success", badgeName: "New"
                // },
            ],
        },
        
        {
            id: "marketing",
            label: "Marketing",
            icon: markerting,
            link: "/#",
            click: function (e) {
                e.preventDefault();
                setIsBaseUi(!isBaseUi);
                setIscurrentState('BaseUi');
                updateIconSidebar(e);
            },
            stateVariables: isBaseUi,
            subItems: [
                // { id: "alerts", label: "Alerts", link: "#", parentId: "baseUi" },
                // { id: "badges", label: "Badges", link: "#", parentId: "baseUi" },
                // { id: "buttons", label: "Buttons", link: "#", parentId: "baseUi" },
                // { id: "colors", label: "Colors", link: "#", parentId: "baseUi" },
                // { id: "cards", label: "Cards", link: "#", parentId: "baseUi" },
                // { id: "carousel", label: "Carousel", link: "#", parentId: "baseUi" },
                // { id: "dropdowns", label: "Dropdowns", link: "#", parentId: "baseUi" },
                // { id: "grid", label: "Grid", link: "#", parentId: "baseUi" },
                // { id: "images", label: "Images", link: "#", parentId: "baseUi" },
                // { id: "tabs", label: "Tabs", link: "#", parentId: "baseUi" },
                // { id: "accordions", label: "Accordion & Collapse", link: "#", parentId: "baseUi" },
                // { id: "modals", label: "Modals", link: "#", parentId: "baseUi" },
                // { id: "offcanvas", label: "Offcanvas", link: "#", parentId: "baseUi" },
                // { id: "placeholders", label: "Placeholders", link: "#", parentId: "baseUi" },
                // { id: "progress", label: "Progress", link: "#", parentId: "baseUi" },
                // { id: "notifications", label: "Notifications", link: "#", parentId: "baseUi" },
                // { id: "media", label: "Media object", link: "#", parentId: "baseUi" },
                // { id: "embedvideo", label: "Embed Video", link: "#", parentId: "baseUi" },
                // { id: "typography", label: "Typography", link: "#", parentId: "baseUi" },
                // { id: "lists", label: "Lists", link: "#", parentId: "baseUi" },
                // { id: "links", label: "Links", link: "#", parentId: "baseUi", badgeColor: "success", badgeName: "New" },
                // { id: "general", label: "General", link: "#", parentId: "baseUi" },
                // { id: "ribbons", label: "Ribbons", link: "#", parentId: "baseUi" },
                // { id: "utilities", label: "Utilities", link: "#", parentId: "baseUi" },
            ],
        },
        {
            id: "reports",
            label: "Reports",
            icon: reports,
            link: "/#",
            click: function (e) {
                e.preventDefault();
                setIsAdvanceUi(!isAdvanceUi);
                setIscurrentState('AdvanceUi');
                updateIconSidebar(e);
            },
            stateVariables: isAdvanceUi,
            subItems: [
                // { id: "nestablelist", label: "Nestable List", link: "#", parentId: "advanceUi" },
                // { id: "scrollbar", label: "Scrollbar", link: "#", parentId: "advanceUi" },
                // { id: "animation", label: "Animation", link: "#", parentId: "advanceUi" },
                // { id: "tour", label: "Tour", link: "#", parentId: "advanceUi" },
                // { id: "swiperslider", label: "Swiper Slider", link: "#", parentId: "advanceUi" },
                // { id: "ratings", label: "Ratings", link: "#", parentId: "advanceUi" },
                // { id: "highlight", label: "Highlight", link: "#", parentId: "advanceUi" },
            ],
        },
        {
            id: "vendor",
            label: "Vendor",
            icon: vendor,
            link: "/vendor",
            click: function (e) {
                e.preventDefault();
                setIsForms(!isForms);
                setIscurrentState('Forms');
                updateIconSidebar(e);
            },
            stateVariables: isForms,
            subItems: [
                {
                    id: "vendor-list",
                    label: "Vendor List",
                    link: "/vendor-list",
                    parentId: "apps",
                }
            ],
        },
        {
            id: "sales-order",
            label: "Sales Order",
            icon:salesorder,
            link: "/sale-order",
            click: function (e) {
                e.preventDefault();
                setSaleOrder(!isSaleOrder);
                setIscurrentState('Forms');
                updateIconSidebar(e);
            },
            stateVariables: isSaleOrder,
            subItems: [

                {
                    id: "ordersales-list",
                    label: "OrderSale List",
                    link: "/sale-order-list",
                    parentId: "apps",
                },

                {
                    id: "ordersale-Pdf",
                    label: "OrderSale Pdf",
                    link: "/sale-order-pdf-show",
                    parentId: "apps",
                },
                {
                    id: "shipment-pdf",
                    label: "shipment-pdf",
                    link: "/shipment-pdf",
                    parentId: "apps",
                },
                {
                    id: "sales-order-invoice",
                    label: "sales-order-invoice",
                    link: "/sales-order-invoice",
                    parentId: "apps",
                },
                {
                    id: "sales-newpacking-list",
                    label: "Sales Newpicking ",
                    link: "/new-picking",
                    parentId: "apps",
                },
                {
                    id: "sales-newpacking-list",
                    label: "Update Sales-List",
                    link: "/update-list",
                    parentId: "apps",
                },
                {
                    id: "sales-newpacking-list",
                    label: "Sales Final screen",
                    link: "/final-screen",
                    parentId: "apps",
                },
                {
                    id: "sales-newpacking-list",
                    label: "Sales Newpicking Manual",
                    link: "/manual-picking",
                    parentId: "apps",
                }

                // { id: "basicelements", label: "Basic Elements", link: "#", parentId: "forms" },
                // { id: "formselect", label: "Form Select", link: "#", parentId: "forms" },
                // { id: "checkboxsradios", label: "Checkboxs & Radios", link: "#", parentId: "forms" },
                // { id: "pickers", label: "Pickers", link: "#", parentId: "forms" },
                // { id: "inputmasks", label: "Input Masks", link: "#", parentId: "forms" },
                // { id: "advanced", label: "Advanced", link: "#", parentId: "forms" },
                // { id: "rangeslider", label: "Range Slider", link: "#", parentId: "forms" },
                // { id: "validation", label: "Validation", link: "#", parentId: "forms" },
                // { id: "wizard", label: "Wizard", link: "#", parentId: "forms" },
                // { id: "editors", label: "Editors", link: "#", parentId: "forms" },
                // { id: "fileuploads", label: "File Uploads", link: "#", parentId: "forms" },
                // { id: "formlayouts", label: "Form Layouts", link: "#", parentId: "forms" },
                // { id: "select2", label: "Select2", link: "#", parentId: "forms" },
            ],
        },
        {
            id: "packages",
            label: "Packages",
            icon: packages,
            link: "/#",
            click: function (e) {
                e.preventDefault();
                setIsTables(!isTables);
                setIscurrentState('Tables');
                updateIconSidebar(e);
            },
            stateVariables: isTables,
            subItems: [
                // { id: "basictables", label: "Basic Tables", link: "#", parentId: "tables" },
                // { id: "listjs", label: "List Js", link: "#", parentId: "tables" },
                // { id: "reactdatatables", label: "React Datatables", link: "#", parentId: "tables" },
            ],
        },
        {
            id: "delivery",
            label: "Delivery",
            icon:delivery,
            link: "/#",
            click: function (e) {
                e.preventDefault();
                setIsCharts(!isCharts);
                setIscurrentState('Charts');
                updateIconSidebar(e);
            },
            stateVariables: isCharts,
            subItems: [
                // {
                //     id: "apexcharts",
                //     label: "Apexcharts",
                //     link: "/#",
                //     isChildItem: true,
                //     click: function (e) {
                //         e.preventDefault();
                //         setIsApex(!isApex);
                //     },
                //     stateVariables: isApex,
                //     childItems: [
                //         { id: 1, label: "Line", link: "#" },
                //         { id: 2, label: "Area", link: "#" },
                //         { id: 3, label: "Column", link: "#" },
                //         { id: 4, label: "Bar", link: "#" },
                //         { id: 5, label: "Mixed", link: "#" },
                //         { id: 6, label: "Timeline", link: "#" },
                //         { id: 7, label: "Range Area", link: "#", parentId: "apexcharts", badgeColor: "success", badgeName: "New" },
                //         { id: 8, label: "Funnel", link: "#", parentId: "apexcharts", badgeColor: "success", badgeName: "New" },
                //         { id: 9, label: "Candlstick", link: "#" },
                //         { id: 10, label: "Boxplot", link: "#" },
                //         { id: 11, label: "Bubble", link: "#" },
                //         { id: 12, label: "Scatter", link: "#" },
                //         { id: 13, label: "Heatmap", link: "#" },
                //         { id: 14, label: "Treemap", link: "#" },
                //         { id: 15, label: "Pie", link: "#" },
                //         { id: 16, label: "Radialbar", link: "#" },
                //         { id: 17, label: "Radar", link: "#" },
                //         { id: 18, label: "Polar Area", link: "#" },
                //     ]
                // },
                // { id: "chartjs", label: "Chartjs", link: "#", parentId: "charts" },
                // { id: "echarts", label: "Echarts", link: "#", parentId: "charts" },

            ],
        },
        {
            id: "customer-care",
            label: "Customer Care",
            icon: customercare,
            link: "/#",
            click: function (e) {
                e.preventDefault();
                setIsIcons(!isIcons);
                setIscurrentState('Icons');
                updateIconSidebar(e);
            },
            stateVariables: isIcons,
            subItems: [
                // { id: "remix", label: "Remix", link: "#", parentId: "icons" },
                // { id: "boxicons", label: "Boxicons", link: "#", parentId: "icons" },
                // { id: "materialdesign", label: "Material Design", link: "#", parentId: "icons" },
                // { id: "lineawesome", label: "Line Awesome", link: "#", parentId: "icons" },
                // { id: "feather", label: "Feather", link: "#", parentId: "icons" },
                // { id: "crypto", label: "Crypto SVG", link: "#", parentId: "icons" },
            ],
        },
        {
            id: "invoices",
            label: "Invoices",
            icon:invoices,
            link: "/#",
            click: function (e) {
                e.preventDefault();
                setIsMaps(!isMaps);
                setIscurrentState('Maps');
                updateIconSidebar(e);
            },
            stateVariables: isMaps,
            subItems: [
                // { id: "google", label: "Google", link: "#", parentId: "maps" },
                // { id: "vector", label: "Vector", link: "#", parentId: "maps" },
                // { id: "leaflet", label: "Leaflet", link: "#", parentId: "maps" },
            ],
        },
    ];
    return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
