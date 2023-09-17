import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  createproductError: null,
  message: null,
  loading: false,
  product: null,
  success: false,
  error: false
};

const productcreateSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    productCreateSuccessful(state, action) {
      state.user = action.payload;
      state.loading = false;
      state.success = true;
      state.createproduct = null;
    },
    productCreateFailed(state, action) {
      state.user = null;
      state.loading = false;
      state.createproduct = action.payload;
      state.error = true;
    },
    resetProductFlagChange(state) {
      state.success = false;
      state.error = false;
    },
    apiErrorChange(state, action){
      state.error = action.payload;
      state.loading = false;
    //   state.isUserLogout = false;
    }
  }
});

export const {
    productCreateSuccessful,
    productCreateFailed,
    resetProductFlagChange,
    apiErrorChange
} = productcreateSlice.actions;

export default productcreateSlice.reducer;