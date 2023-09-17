import { apiSlice } from "../api/apiSlice";

export const productApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (page) => `api/product/all?page=${page}`,
      providesTags:['Products']
    }),
    getAdminLevel: builder.query({
      query: () => `api/admin/get-level`,
      providesTags:['Admin Level']
    }),
    getProductType: builder.query({
      query: () => `api/product/all`,
      providesTags:['ProductType']
    }),
    getOfferProducts: builder.query({
      query: () => `api/product/all`,
      providesTags:['OfferProducts']
    }),
    getPopularProductByType: builder.query({
      query: (type) => `api/product/popular/${type}`,
      providesTags:['PopularProducts']
    }),
    getTopRatedProducts: builder.query({
      query: () => `api/product/top-rated`,
      providesTags:['TopRatedProducts']
    }),
    // get single product
    getProduct: builder.query({
      query: (id) => `api/product/one/${id}`,
      providesTags: ["SingleProduct"],
    }),
    // get related products
    getRelatedProducts: builder.query({
      query: (id) => `api/product/related-product/${id}`,
      providesTags: (result, error, arg) => [
        { type: "RelatedProducts", id: arg },
      ],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductTypeQuery,
  useGetOfferProductsQuery,
  useGetPopularProductByTypeQuery,
  useGetTopRatedProductsQuery,
  useGetProductQuery,
  useGetRelatedProductsQuery,
  useGetAdminLevelQuery,
} = productApi;
