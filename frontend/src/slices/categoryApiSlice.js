import { CATEGORIES_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPrimaryCategories: builder.query({
      query: () => `${CATEGORIES_URL}`,
      providesTags: ["Categories"], // Marks data as "Category" for caching
      keepUnusedDataFor: 5, // Keeps data cached for 60 seconds
    }),
    getCategoryHierarchyAndSubcategories: builder.query({
      query: (linkName) => `${CATEGORIES_URL}/${linkName}`,
      keepUnusedDataFor: 5,
      providesTags: ["Category"],
    }),
    getCategoryHierarchyForSingleProduct: builder.query({
      query: (productId) => `${CATEGORIES_URL}/product/${productId}`,
      keepUnusedDataFor: 5,
      providesTags: ["Category"],
    }),
  }),
});

export const {
  useGetPrimaryCategoriesQuery,
  useGetCategoryHierarchyAndSubcategoriesQuery,
  useGetCategoryHierarchyForSingleProductQuery,
} = categoryApiSlice;
