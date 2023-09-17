import { createSlice } from "@reduxjs/toolkit";
import {
  getProducts,
  addNewProduct,
  updateProduct,
  deleteProducts,
  getOrders,
  addNewOrder,
  updateOrder,
  deleteOrder,
  getCustomers,
  addNewCustomer,
  updateCustomer,
  deleteCustomer,
  getSellers,
  getProductsBySearch,
  getProductsVendors,
  getProductCategory,
  getAllVendor,
  getAllVendorPO,
  getSingleVendorData,
  getPurchaseReceiptData,
  getAllDisburshmentData,
  getAllCustomer,
  getSingleCustomer,
  getSalesOrderData,
  getPayments,
  getAllCustomerActivity,
  getAllVendorActivity,
  getCustomerRmasData,
  getSingleProduct,
  getSallerData,
  deleteVendor,
  deleteCustomers,
  getOneSalesData,
  getPurchaseSalesOrderData,
} from "./thunk";
export const initialState = {
  products: [],
  category: [],
  orders: [],
  salesOrder: [],
  vendor: [],
  customers: [],
  purchaseReceipt: [],
  disburshment: [],
  purchaseOrder: [],
  productsVendors: [],
  updatedproducts: [],

  payments: [],
  vendorActivity: [],
  customerActivity: [],
  singleVendor: null,
  singleCustomer: null,
  singleSalesOrder: null,
  singlePurchaseSalesOrder: null,
  singleProduct: null,
  customerOrder: [],
  customerRMAs: [],
  error: {}
};

const EcommerceSlice = createSlice({
  name: "EcommerceSlice",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload.data;
      state.totalPages = action.payload.totalPages;
      state.totalProducts = action.payload.totalProducts;
      state.page = action.payload.page;
    });

    builder.addCase(getProducts.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });

    //Get Single Product
    builder.addCase(getSingleProduct.fulfilled, (state, action) => {
      state.singleProduct = action.payload.products;
    });

    builder.addCase(getSingleProduct.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });
    //Product Category
    builder.addCase(getProductCategory.fulfilled, (state, action) => {
      state.category = action.payload.data;
    });

    builder.addCase(getProductCategory.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });
    //Vendor
    builder.addCase(getAllVendor.fulfilled, (state, action) => {
      state.vendor = action.payload.data;
    });

    builder.addCase(getAllVendor.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });
    builder.addCase(getAllDisburshmentData.fulfilled, (state, action) => {
      state.disburshment = action.payload.data;
    });

    builder.addCase(getAllDisburshmentData.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });
    builder.addCase(getSingleVendorData.fulfilled, (state, action) => {
      state.singleVendor = action.payload.data;
    });

    builder.addCase(getSingleVendorData.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });
    builder.addCase(getPurchaseReceiptData.fulfilled, (state, action) => {
      state.purchaseReceipt = action.payload.data;
    });

    builder.addCase(getPurchaseReceiptData.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });
    builder.addCase(getAllVendorPO.fulfilled, (state, action) => {
      state.purchaseOrder = action.payload.data;
    });

    builder.addCase(getAllVendorPO.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(getAllVendorActivity.fulfilled, (state, action) => {
      state.vendorActivity = action.payload.data;
    });
    builder.addCase(getAllVendorActivity.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(getPurchaseSalesOrderData.fulfilled, (state, action) => {
      state.singlePurchaseSalesOrder = action.payload.data;
    });

    builder.addCase(getPurchaseSalesOrderData.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });
    //Customer
    builder.addCase(getAllCustomer.fulfilled, (state, action) => {
      state.customer = action.payload.data;
    });

    builder.addCase(getAllCustomer.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });
    builder.addCase(getPayments.fulfilled, (state, action) => {
      state.payments = action.payload.data;
    });

    builder.addCase(getPayments.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });
    
    builder.addCase(getSingleCustomer.fulfilled, (state, action) => {
      state.singleCustomer = action.payload.data;
    });

    builder.addCase(getSingleCustomer.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(getSalesOrderData.fulfilled, (state, action) => {
      state.customerOrder = action.payload.data;
    });

    builder.addCase(getSalesOrderData.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });

    // get one salses order data
    builder.addCase(getOneSalesData.fulfilled, (state, action) => {
      state.singleSalesOrder = action.payload.data;
    });

    builder.addCase(getOneSalesData.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(getAllCustomerActivity.fulfilled, (state, action) => {
      state.customerActivity = action.payload.data;
    });
    builder.addCase(getAllCustomerActivity.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });
    builder.addCase(getCustomerRmasData.fulfilled, (state, action) => {
      state.customerRMAs = action.payload.data;
    });
    builder.addCase(getCustomerRmasData.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });
    //Sales order
    builder.addCase(getSallerData.fulfilled, (state, action) => {
      state.salesOrder = action.payload.data;
    });
    builder.addCase(getSallerData.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });
    //Search Product
    builder.addCase(getProductsBySearch.fulfilled, (state, action) => {
      state.updatedproducts = action.payload.data;
    });

    // builder.addCase(getProductDisable.fulfilled, (state, action) => {
    //   state.products = {
    //     ...state.products,
    //     data: state.products.data.map((product) =>
    //       product._id.toString() === action.payload.data._id.toString()
    //         ? { ...product, ...action.payload.data }
    //         : product
    //     ),
    //   };
    // });

    // builder.addCase(getProductDisable.rejected, (state, action) => {
    //   state.error = action.payload.error || null;
    // });

    builder.addCase(getProductsBySearch.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });
    builder.addCase(addNewProduct.fulfilled, (state, action) => {
      state.products.push(action.payload);
    });

    builder.addCase(addNewProduct.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });

    // builder.addCase(addNewCategory.fulfilled, (state, action) => {
    //   state.products.push(action.payload);
    // });

    // builder.addCase(addNewProduct.rejected, (state, action) => {
    //   state.error = action.payload.error || null;
    // });

    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.products = state.products.map((product) =>
        product._id.toString() === action.payload.data._id.toString()
          ? { ...product, ...action.payload.data }
          : product
      );
    });

    builder.addCase(updateProduct.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(deleteProducts.fulfilled, (state, action) => {
      state.products = (state.products || []).filter(
        (product) =>
          product._id.toString() !== action.payload.product.toString()
      );
    });

    builder.addCase(deleteProducts.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(deleteCustomers.fulfilled, (state, action) => {
      state.customers = (state.customers || []).filter(
        (customer) =>
          customer._id.toString() !== action.payload.customer.toString()
      );
    });

    builder.addCase(deleteCustomers.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });

    // builder.addCase(deleteVendor.fulfilled, (state, action) => {
    //   state.vendor = (state.vendor || []).filter(
    //     (vendor) => vendor._id.toString() !== action.payload.vendor.toString()
    //   );
    // });

    // builder.addCase(deleteVendor.rejected, (state, action) => {
    //   state.error = action.payload.error || null;
    // });

    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.orders = action.payload.data;
      state.isOrderCreated = false;
      state.isOrderSuccess = true;
    });

    builder.addCase(getOrders.rejected, (state, action) => {
      state.error = action.payload.error || null;
      state.isOrderCreated = false;
      state.isOrderSuccess = false;
    });

    builder.addCase(addNewOrder.fulfilled, (state, action) => {
      state.orders.push(action.payload.data);
      state.isOrderCreated = true;
    });

    builder.addCase(addNewOrder.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(updateOrder.fulfilled, (state, action) => {
      state.orders = state.orders.map((order) =>
        order._id.toString() === action.payload.data._id.toString()
          ? { ...order, ...action.payload.data }
          : order
      );
    });

    builder.addCase(updateOrder.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(deleteOrder.fulfilled, (state, action) => {
      state.orders = state.orders.filter(
        (order) => order._id.toString() !== action.payload.order.toString()
      );
    });

    builder.addCase(deleteOrder.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(getSellers.fulfilled, (state, action) => {
      state.sellers = action.payload;
    });

    builder.addCase(getSellers.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });

    // builder.addCase(getCustomers.fulfilled, (state, action) => {
    //   state.customers = action.payload.data;
    //   state.isCustomerCreated = false;
    //   state.isCustomerSuccess = true;
    // });

    // builder.addCase(getCustomers.rejected, (state, action) => {
    //   state.error = action.payload.error || null;
    //   state.isCustomerCreated = false;
    //   state.isCustomerSuccess = false;
    // });

    // builder.addCase(addNewCustomer.fulfilled, (state, action) => {
    //   state.customers.push(action.payload.data);
    //   state.isCustomerCreated = true;
    // });
    // builder.addCase(addNewCustomer.rejected, (state, action) => {
    //   state.error = action.payload.error || null;
    // });

    // builder.addCase(updateCustomer.fulfilled, (state, action) => {
    //   state.customers = state.customers.map((customer) =>
    //     customer._id.toString() === action.payload.data._id.toString()
    //       ? {...customer, ...action.payload.data}
    //       : customer
    //   );
    // });
    // builder.addCase(updateCustomer.rejected, (state, action) => {
    //   state.error = action.payload.error || null;
    // });

    // builder.addCase(deleteCustomer.fulfilled, (state, action) => {
    //   state.customers = state.customers.filter(
    //     (customer) =>
    //       customer._id.toString() !== action.payload.customer.toString()
    //   );
    // });
    // builder.addCase(deleteCustomer.rejected, (state, action) => {
    //   state.error = action.payload.error || null;
    // });
    builder.addCase(getProductsVendors.fulfilled, (state, action) => {
      state.productsVendors = action.payload.data;
    });

    builder.addCase(getProductsVendors.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });
  }
});

export default EcommerceSlice.reducer;
