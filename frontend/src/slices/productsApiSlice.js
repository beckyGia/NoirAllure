import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";
import generateQueryParams from "../utilis/generateQueryParams";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFilteredProductsByCategory: builder.query({
      query: ({ linkName, pageNumber, filters }) => {
        const params = generateQueryParams(filters);

        return `${PRODUCTS_URL}/filters/${linkName}?pageNumber=${pageNumber}&${params.toString()}`;
      },
      keepUnusedDataFor: 10,
    }),
    getProductRatingCountsByCategory: builder.query({
      query: ({ linkName, filters }) => {
        const params = generateQueryParams(filters);

        return `${PRODUCTS_URL}/${linkName}/rating-count?${params.toString()}`;
      },
      keepUnusedDataFor: 10,
    }),
    getDeliveryTypeByCategory: builder.query({
      query: ({ linkName, filters }) => {
        const params = generateQueryParams(filters);
        return `${PRODUCTS_URL}/${linkName}/delivery?${params.toString()}`;
      },
      keepUnusedDataFor: 10,
    }),
    getShippingPreferenceByCategory: builder.query({
      query: ({ linkName, filters }) => {
        const params = generateQueryParams(filters);
        return `${PRODUCTS_URL}/${linkName}/shipping?${params.toString()}`;
      },
      keepUnusedDataFor: 10,
    }),
    getNewlyArrivedProductsByCategory: builder.query({
      query: ({ linkName, filters }) => {
        const params = generateQueryParams(filters);
        return `${PRODUCTS_URL}/${linkName}/new?${params.toString()}`;
      },
      keepUnusedDataFor: 10,
    }),
    getSaleByCategory: builder.query({
      query: ({ linkName, filters }) => {
        const params = generateQueryParams(filters);
        return `${PRODUCTS_URL}/${linkName}/sale?${params.toString()}`;
      },
      keepUnusedDataFor: 10,
    }),
    getBrandsByCategory: builder.query({
      query: ({ linkName, filters }) => {
        const params = generateQueryParams(filters);
        return `${PRODUCTS_URL}/${linkName}/brands?${params.toString()}`;
      },
      keepUnusedDataFor: 10,
    }),
    getProductById: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    getSimilarProductsOfASingleProduct: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}/similar`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    getFeaturedProducts: builder.query({
      query: () => {
        return `${PRODUCTS_URL}/featured`;
      },
      keepUnusedDataFor: 5,
    }),
    getBestSellingProducts: builder.query({
      query: () => {
        return `${PRODUCTS_URL}/bestselling`;
      },
      keepUnusedDataFor: 5,
    }),
    getIsTrendingProducts: builder.query({
      query: () => {
        return `${PRODUCTS_URL}/trending`;
      },
      keepUnusedDataFor: 5,
    }),
    getNewlyArrivedProducts: builder.query({
      query: () => {
        return `${PRODUCTS_URL}/new`;
      },
      keepUnusedDataFor: 5,
    }),
    getForYouProducts: builder.query({
      query: () => {
        return `${PRODUCTS_URL}/for-you`;
      },
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetProductRatingCountsByCategoryQuery,
  useGetDeliveryTypeByCategoryQuery,
  useGetShippingPreferenceByCategoryQuery,
  useGetBrandsByCategoryQuery,
  useGetFilteredProductsByCategoryQuery,
  useGetNewlyArrivedProductsByCategoryQuery,
  useGetSaleByCategoryQuery,
  useGetProductByIdQuery,
  useGetSimilarProductsOfASingleProductQuery,
  useGetNewlyArrivedProductsQuery,
  useGetBestSellingProductsQuery,
  useGetFeaturedProductsQuery,
  useGetIsTrendingProductsQuery,
  useGetForYouProductsQuery,
} = productsApiSlice;
