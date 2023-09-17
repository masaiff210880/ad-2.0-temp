import {createAsyncThunk} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Include Both Helper File with needed methods
import {
  getProducts as getProductsApi,
  deleteProducts as deleteProductsApi,
  getProductsBySearch as getProductsBySearchApi,
  getProductsVendors as getProductsVendorsApi,
  addNewCategory as addNewCategoryApi,
  getProductCategory as getProductCategoryApi,
  getAllVendor as getAllVendorApi,
  getAllVendorPO as getAllVendorPOApi,
  getSingleVendorData as getSingleVendorDataApi,
  addNewProduct as addNewProductApi,
  getPurchaseReceiptData as getPurchaseReceiptDataApi,
  getAllDisburshmentData as getAllDisburshmentDataApi,
  getAllCustomer as getAllCustomerApi,
  getSingleCustomer as getSingleCustomerApi,
  getSalesOrderData as getSalesOrderDataApi,
  getPayments as getPaymentsApi,
  addNewCustomer as addNewCustomerApi,
  updateCustomerData as updateCustomerDataApi,
  updateProductData as updateProductDataApi,
  getAllVendorActivity as getAllVendorActivityApi,
  getAllCustomerActivity as getAllCustomerActivityApi,
  getCustomerRmasData as getCustomerRmasDataApi,
  getSingleProduct as getSingleProductApi,
  getSallerData as getSallerDataApi,
  deleteSingleVendor as deleteSingleVendorApi,
  deleteCustomers as deleteCustomersApi,
  getOneSalesData as getOneSalesDataApi,
  getPurchaseSalesOrderData as getPurchaseSalesOrderDataApi,
} from "../../helpers/fakebackend_helper";

export const getProducts = createAsyncThunk(
  "ecommerce/getProducts",
  async (limit) => {
    // console.log('api limit',limit)
    try {
      const response = getProductsApi(limit);
      return response;
    } catch (error) {
      return error;
    }
  }
);
//Get Single Product
export const getSingleProduct = createAsyncThunk(
  "ecommerce/getSingleProduct",
  async (id) => {
    try {
      const response = getSingleProductApi(id);
      return response;
    } catch (error) {
      return error;
    }
  }
);
export const getProductsBySearch = createAsyncThunk(
  "ecommerce/getProductsBySearch",
  async (name) => {
    try {
      const response = await getProductsBySearchApi(name);
      return response;
    } catch (error) {
      return error;
    }
  }
);
export const getProductDisable = createAsyncThunk(
  "ecommerce/getProductDisable",
  async (id, disable) => {
    try {
      const response = getProductDisableApi(id, disable);
      return response;
    } catch (error) {
      return error;
    }
  }
);
//Category
export const addNewCategory = createAsyncThunk(
  "ecommerce/addNewCategory",
  async (category) => {
    try {
      const response = addNewCategoryApi(category);
      const data = await response;
      toast.success("Category Added Successfully", {autoClose: 3000});
      return data;
    } catch (error) {
      toast.error("Category Added Failed", {autoClose: 3000});
      return error;
    }
  }
);
export const getProductCategory = createAsyncThunk(
  "ecommerce/getProductCategory",
  async () => {
    try {
      const response = getProductCategoryApi();
      return response;
    } catch (error) {
      return error;
    }
  }
);
//VENDOR
export const getAllVendor = createAsyncThunk(
  "ecommerce/getAllVendor",
  async () => {
    try {
      const response = getAllVendorApi();
      return response;
    } catch (error) {
      return error;
    }
  }
);
export const getAllVendorPO = createAsyncThunk(
  "ecommerce/getAllVendorPO",
  async (id) => {
    try {
      const response = getAllVendorPOApi(id);
      return response;
    } catch (error) {
      return error;
    }
  }
);
export const getSingleVendorData = createAsyncThunk(
  "ecommerce/getSingleVendorData",
  async (id) => {
    try {
      const response = getSingleVendorDataApi(id);
      return response;
    } catch (error) {
      return error;
    }
  }
);
export const getPurchaseReceiptData = createAsyncThunk(
  "ecommerce/getPurchaseReceiptData",
  async (id) => {
    try {
      const response = getPurchaseReceiptDataApi(id);
      return response;
    } catch (error) {
      return error;
    }
  }
);
export const getAllDisburshmentData = createAsyncThunk(
  "ecommerce/getAllDisburshmentData",
  async (id) => {
    try {
      const response = getAllDisburshmentDataApi(id);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getAllVendorActivity = createAsyncThunk(
  "ecommerce/getAllVendorActivity",
  async (id) => {
    try {
      const response = getAllVendorActivityApi(id);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getPurchaseSalesOrderData = createAsyncThunk(
  "ecommerce/getPurchaseSalesOrderData",
  async (vendorSalesId) => {
    try {
      const response = getPurchaseSalesOrderDataApi(vendorSalesId);
      return response;
    } catch (error) {
      return error;
    }
  }
);


//CUSTOMERS
export const getAllCustomer = createAsyncThunk(
  "ecommerce/getAllCustomer",
  async () => {
    try {
      const response = getAllCustomerApi();
      return response;
    } catch (error) {
      return error;
    }
  }
);
export const getSingleCustomer = createAsyncThunk(
  "ecommerce/getSingleCustomer",
  async (id) => {
    try {
      const response = getSingleCustomerApi(id);
      return response;
    } catch (error) {
      return error;
    }
  }
);
export const getSalesOrderData = createAsyncThunk(
  "ecommerce/getSalesOrderData",
  async (id) => {
    try {
      const response = getSalesOrderDataApi(id);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getOneSalesData = createAsyncThunk(
  "ecommerce/getOneSalesData",
  async (salesId) => {
    try {
      const response = getOneSalesDataApi(salesId);
      return response;
    } catch (error) {
      return error;
    }
  }
);


export const getOrders = createAsyncThunk("ecommerce/getOrders", async () => {
  try {
    const response = getOrdersApi();
    return response;
  } catch (error) {
    return error;
  }
});

export const getSellers = createAsyncThunk("ecommerce/getSellers", async () => {
  try {
    const response = getSellersApi();
    return response;
  } catch (error) {
    return error;
  }
});

export const getCustomers = createAsyncThunk(
  "ecommerce/getCustomers",
  async () => {
    try {
      const response = getCustomersApi();
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getPayments = createAsyncThunk(
  "ecommerce/getPayments",
  async (id) => {
    try {
      const response = getPaymentsApi(id);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getAllCustomerActivity = createAsyncThunk(
  "ecommerce/getAllCustomerActivity",
  async (id) => {
    try {
      const response = getAllCustomerActivityApi(id);
      return response;
    } catch (error) {
      return error;
    }
  }
);
//Add New Customer
export const addNewCustomer = createAsyncThunk(
  "ecommerce/addNewCustomer",
  async (customer) => {
    try {
      const response = addNewCustomerApi(customer);
      const data = await response;
      toast.success("Customer Updateded Successfully", {autoClose: 3000});
      return data;
    } catch (error) {
      toast.error("Customer Updateded Failed", {autoClose: 3000});
      return error;
    }
  }
);
//Get Customer RMAs
export const getCustomerRmasData = createAsyncThunk(
  "ecommerce/getCustomerRmasData",
  async (id) => {
    try {
      const response = getCustomerRmasDataApi(id);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const updateCustomerData = createAsyncThunk(
  "ecommerce/updateCustomerData",
  async (customer) => {
    try {
      console.log("______", customer);
      const id = customer?.id;
      const response = updateCustomerDataApi(id, customer);
      const data = await response;
      // toast.success("Customer Updateded Successfully", {autoClose: 3000});
      return data;
    } catch (error) {
      // toast.error("Customer Updateded Failed", {autoClose: 3000});
      return error;
    }
  }
);

export const updateProductData = createAsyncThunk(
  "ecommerce/updateProductData",
  async (product) => {
    try {
      console.log("______", product);
      const id = product?.id;
      console.log("update id", id)
      const response = updateProductDataApi(id, product);
      const data = await response;
      // toast.success("product Updateded Successfully", {autoClose: 3000});
      return data;
    } catch (error) {
      // toast.error("product Updateded Failed", {autoClose: 3000});
      return error;
    }
  }
);

//Sales Order
export const getSallerData = createAsyncThunk(
  "ecommerce/getSallerData",
  async () => {
    try {
      const response = getSallerDataApi();
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const deleteProducts = createAsyncThunk(
  "ecommerce/deleteProducts",
  async (product) => {
    try {
      const response = deleteProductsApi(product);
      toast.success("Product Deleted Successfully", {autoClose: 3000});
      return {product, ...response};
    } catch (error) {
      toast.error("Product Delete Failed", {autoClose: 3000});
      return error;
    }
  }
);

export const deleteCustomers = createAsyncThunk(
  "ecommerce/deleteCustomers",
  async (product) => {
    try {
      const response = deleteCustomersApi(product);
      toast.success("Product Deleted Successfully", {autoClose: 3000});
      return {product, ...response};
    } catch (error) {
      toast.error("Product Delete Failed", {autoClose: 3000});
      return error;
    }
  }
);

export const deleteVendor = createAsyncThunk(
  "ecommerce/deleteVendor",
  async (vendorId) => {
    try {
      const response = deleteSingleVendorApi(vendorId);
      toast.success("Vendor Deleted Successfully", {autoClose: 3000});
      return {product, ...response};
    } catch (error) {
      toast.error("Product Delete Failed", {autoClose: 3000});
      return error;
    }
  }
);

export const updateOrder = createAsyncThunk(
  "ecommerce/updateOrder",
  async (order) => {
    try {
      const response = updateOrderApi(order);
      const data = await response;
      toast.success("Order Updateded Successfully", {autoClose: 3000});
      return data;
    } catch (error) {
      toast.error("Order Updateded Failed", {autoClose: 3000});
      return error;
    }
  }
);

export const addNewProduct = createAsyncThunk(
  "ecommerce/addNewProduct",
  async (product) => {
    try {
      const response = addNewProductApi(product);
      const data = await response;
      // toast.success("Product Added Successfully", {autoClose: 1000});
      return data;
    } catch (error) {
      // toast.error("Product Added Failed", {autoClose: 1000});
      return error;
    }
  }
);

export const updateProduct = createAsyncThunk(
  "ecommerce/updateProduct",
  async (product) => {
    try {
      const response = updateProductApi(product);
      const data = await response;
      toast.success("Product Updateded Successfully", {autoClose: 3000});
      return data;
    } catch (error) {
      toast.error("Product Updateded Failed", {autoClose: 3000});
      return error;
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "ecommerce/deleteOrder",
  async (order) => {
    try {
      const response = deleteOrderApi(order);
      toast.success("Order Deleted Successfully", {autoClose: 3000});
      return {order, ...response};
    } catch (error) {
      toast.error("Order Deleted Failed", {autoClose: 3000});
      return error;
    }
  }
);

export const addNewOrder = createAsyncThunk(
  "ecommerce/addNewOrder",
  async (order) => {
    try {
      const response = addNewOrderApi(order);
      const data = await response;
      toast.success("Order Added Successfully", {autoClose: 3000});
      return data;
    } catch (error) {
      toast.error("Order Added Failed", {autoClose: 3000});
      return error;
    }
  }
);

export const deleteCustomer = createAsyncThunk(
  "ecommerce/deleteCustomer",
  async (customer) => {
    try {
      const response = deleteCustomerApi(customer);
      toast.success("Customer Deleted Successfully", {autoClose: 3000});
      return {customer, ...response};
    } catch (error) {
      toast.error("Customer Deleted Failed", {autoClose: 3000});
      return error;
    }
  }
);

export const getProductsVendors = createAsyncThunk(
  "ecommerce/getProductsVendors",
  async (productId) => {
    // console.log('api limit',limit)
    try {
      const response = getProductsVendorsApi(productId);
      return response;
    } catch (error) {
      return error;
    }
  }
);
