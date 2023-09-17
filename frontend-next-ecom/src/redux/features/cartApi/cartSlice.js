import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {useGetCartDataQuery} from "./cartApi";

const initialState = {
  cart_data: [],
  user_data: [],
  payments_data: {},
  billing_address: {},
  cartMiniOpen: false,
  loading: false,
  error: null,
};
export const fetchCartData = createAsyncThunk(
  "cart/fetchCartData",
  async (_, {dispatch}) => {
    try {
      const response = await dispatch(useGetCartDataQuery()); // Dispatch the query
      console.log("response", response);
      return response.data; // Assuming your API response contains cart data
    } catch (error) {
      throw error; // Throw the error for the error state to handle
    }
  }
);
export const cartDataSlice = createSlice({
  name: "cart",
  initialState,
  // reducers: {},
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchCartData.pending, (state) => {
  //       state.loading = true;
  //       state.error = null;
  //     })
  //     .addCase(fetchCartData.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.cart_data = action.payload;
  //     })
  //     .addCase(fetchCartData.rejected, (state, action) => {
  //       state.loading = false;
  //       state.error = action.error.message;
  //     });
  // },
  reducers: {
    set_cartdata: (state, {payload}) => {
      state.cart_data = payload.data;
    },
    set_userdata: (state, {payload}) => {
      state.user_data = payload.data;
    },
    set_payment: (state, {payload}) => {
      state.payments_data = payload.data;
    },
    openCartMini: (state, {payload}) => {
      state.cartMiniOpen = true;
    },
    closeCartMini: (state, {payload}) => {
      state.cartMiniOpen = false;
    },
    set_billingaddress: (state, {payload}) => {
      state.billing_address = payload;
    },
  },
});

// export default cartDataSlice.reducer;

export const {
  set_cartdata,
  closeCartMini,
  openCartMini,
  set_userdata,
  set_payment,
  set_billingaddress,
} = cartDataSlice.actions;
export default cartDataSlice.reducer;
