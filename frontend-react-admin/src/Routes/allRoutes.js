import React from "react";
import { Navigate } from "react-router-dom";

//Dashboard
import DashboardEcommerce from "../pages/DashboardEcommerce";

//login
import Login from "../pages/Authentication/Login";
import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";

//pages
import Starter from "../pages/Pages/Starter/Starter";
import Maintenance from "../pages/Pages/Maintenance/Maintenance";
import ComingSoon from "../pages/Pages/ComingSoon/ComingSoon";

// Ecommerce Products
import ProductList from "../pages/Ecommerce/EcommerceProducts/ProductList";

// User Profile
import UserProfile from "../pages/Authentication/user-profile";
import BasicSignIn from "../pages/AuthenticationInner/Login/BasicSignIn";
import BasicSignUp from "../pages/AuthenticationInner/Register/BasicSignUp";

// Products
import Addproduct from "../pages/Products/Addproduct";
import ProductDetails from "../pages/Products/ProductDetails";
import Editproduct from "../pages/Products/Editproduct";
import SEOTag from "../pages/Products/SEOTag";
import EditCategory from "../pages/Products/EditCategory";
// import VendorFlow from "../pages/Pages/profile/Vendors/VendorFlow";
import VendorFlow from "../pages/Vendors/VendorFlow";
import ProductCategory from "../pages/Products/ProductCategory";
// import OverView from "../pages/Pages/profile/OverView";
// import PurchaseOrder from "../pages/Pages/profile/Vendors/PurchaseOrder";
// import PurchaseReceipts from "../pages/Pages/profile/Vendors/PurchaseReceipts";
// import Disbursements from "../pages/Pages/profile/Vendors/Disbursements";
// import RMas from "../pages/Pages/profile/Vendors/RMas";
// import Activity from "../pages/Pages/profile/Vendors/Activity";
import OverView from "../pages/Pages/profile/OverView";
import PurchaseOrder from "../pages/Vendors/PurchaseOrder";
import PurchaseReceipts from "../pages/Vendors/PurchaseReceipts";
import Disbursements from "../pages/Vendors/Disbursements";
import RMas from "../pages/Vendors/RMas";
import Activity from "../pages/Vendors/Activity";
import VendorList from "../pages/Vendors/VendorList";
import CustomerList from "../pages/Customer/CustomerList";
import Customer from "../pages/Customer/Customer";
import SplitData from "../pages/Vendors/SplitData";
import CustomerOverView from "../pages/Customer/CustomerOverView";
import CreateCustomer from "../pages/Customer/CreateCustomer";
import EditCustomer from "../pages/Customer/EditCustomer";
import SalesOrderList from "../pages/Salesorder/SalesOrderList";
import SalesSplitScreen from "../pages/Salesorder/SalesSplitScreen";
import Splitpicking from "../pages/Salesorder/Splitpicking";
import ShowPDF from "../pages/Salesorder/ShowPDF";
import ShipmentPDF from "../pages/Salesorder/ShipmentPDF";
import SalesorderInvoice from "../pages/Salesorder/SalesorderInvoice";
import SalesNewPicking from "../pages/Salesorder/SalesNewPicking";
import SalesFinalScreen from "../pages/Salesorder/SalesFinalScreen";
import SalesPickingManual from "../pages/Salesorder/SalesPickingManual";
import SalesUpdateList from "../pages/Salesorder/SalesUpdateList";
// import OverView from "../pages/Pages/profile/OverView";
// import PurchaseOrder from "../pages/Vendors/PurchaseOrder";
// import PurchaseReceipts from "../pages/Vendors/PurchaseReceipts";
// import Disbursements from "../pages/Vendors/Disbursements";
// import RMas from "../pages/Vendors/RMas";
// import Activity from "../pages/Vendors/Activity";

const authProtectedRoutes = [
  { path: "/dashboard", component: <DashboardEcommerce /> },
  { path: "/index", component: <DashboardEcommerce /> },

  // Ecommerce Products
  { path: "/product-list", component: <ProductList /> },
  //User Profile
  { path: "/profile", component: <UserProfile /> },
  { path: "/add-product", component: <Addproduct /> },

  //Pages
  { path: "/pages-starter", component: <Starter /> },

  // Products
  { path: "/product-details/:id", component: <ProductDetails /> },
  { path: "/edit-product/:id", component: <Editproduct /> },
  { path: "/seo-tags", component: <SEOTag /> },
  { path: "/edit-category", component: <EditCategory /> },
  { path: "/product-category", component: <ProductCategory /> },

  // Vendor
  { path: "/vendor/:id", component: <VendorFlow /> },
  { path: "/vendor-list", component: <VendorList /> },
  { path: "/vendor-split", component: <SplitData /> },

  //SalesOrders
  { path: "/sale-order-list", component: <SalesOrderList /> },
  { path: "/sale-split-screen", component: <SalesSplitScreen /> },
  { path: "/split-picking", component: <Splitpicking /> },
  {path:"/sale-order-pdf-show", component: <ShowPDF/>},
  { path:"/shipment-pdf", component:<ShipmentPDF/>},
  {path:"/sales-order-invoice", component: <SalesorderInvoice/>},
  { path: "/new-picking", component: <SalesNewPicking /> },
  { path: "/final-screen", component: <SalesFinalScreen /> },
  { path: "/manual-picking", component: <SalesPickingManual /> },

  { path: "/update-list", component: <SalesUpdateList /> },






  //Customer
  { path: "/customer-list", component: <CustomerList /> },
  { path: "/customer", component: <Customer /> },
  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
  { path: "*", component: <Navigate to="/dashboard" /> },
  { path: "/customer-overview/:id", component: <CustomerOverView /> },
  { path: "/add-customer", component: <CreateCustomer /> },
  { path: "/edit-customer/:id" , component: <EditCustomer /> },
];

const publicRoutes = [
  // Authentication Page
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/auth-signin-basic", component: <BasicSignIn /> },
  // { path: "/auth-signin-cover", component: < /> },
  { path: "/auth-signup-basic", component: <BasicSignUp /> },
  // { path: "/auth-signup-cover", component: </> },
  { path: "/forgot-password", component: <ForgetPasswordPage /> },
  { path: "/register", component: <Register /> },

  //AuthenticationInner pages
  { path: "/pages-maintenance", component: <Maintenance /> },
  { path: "/pages-coming-soon", component: <ComingSoon /> },
];

export { authProtectedRoutes, publicRoutes };
