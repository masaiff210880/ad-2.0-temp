// import { apiSlice } from "@/redux/api/apiSlice";

// export const cartApi = apiSlice.injectEndpoints({
//   overrideExisting: true,
//   endpoints: (builder) => ({
//     addProduct: builder.mutation({
//       query: (data) => ({
//         url: "/api/cart/add-cart",
//         method: "POST",
//         body: data,
//       }),
//     }),
//     deletecartItem: builder.mutation({
//       query: (data) => ({
//         url: "/api/cart/delete-item",
//         method: "PATCH", 
//         body: data, 
//       }),
//     }),
//     getCartData: builder.query({
//       query: () => `/api/cart/cart`,
//       providesTags: ["CartItems"],
//     }),
//   }),
// });

// export const { useAddProductMutation, useGetCartDataQuery , useDeletecartItemMutation, } = cartApi;

import { apiSlice } from "@/redux/api/apiSlice";

export const cartApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (data) => ({
        url: "/api/cart/add-cart",
        method: "POST",
        body: data,
      }),
    }),
    addSalesOrder: builder.mutation({
      query: (data) => ({
        url: "/api/order/create-order",
        method: "POST",
        body: data,
      }),
    }),
    deleteCartItem: builder.mutation({
      query: (data) => ({
        url: "/api/cart/delete-item",
        method: "PATCH", 
        body: data, 
      }),
    }),
    getCartData: builder.query({
      query: () => `/api/cart/cart`,
      providesTags: ["CartItems"],
    }),
    getUserData: builder.query({
      query: () => `/api/license/user`,
      providesTags: ["UsersData"],
    }),
    updatecartQuantity: builder.mutation({
      query: (data) => ({
        url: `/api/cart/update`,
        method: "PATCH",
        body: data,
      }),
    }),
    clearCart: builder.mutation({
      query: (id) => ({
        url: `/api/cart/empty-cart/${id}`,
        method: "DELETE",
      }),
    }),
    getCartItemDetails: builder.query({
      query: (itemId) => `/api/cart/item/${itemId}`,
    }),
  }),
});

export const { 
  useAddProductMutation, 
  useDeleteCartItemMutation,
  useGetCartDataQuery,
  useUpdatecartQuantityMutation,
  useClearCartMutation,
  useGetCartItemDetailsQuery,
  useGetUserDataQuery,
  useAddSalesOrderMutation, 
} = cartApi;
