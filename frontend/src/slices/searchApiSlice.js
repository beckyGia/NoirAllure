import { SEARCH_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const searchApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    searchProducts: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: SEARCH_URL,
        params: {
          keyword,
          pageNumber,
        },
      }),
      providesTags: ["Search"],
      keepUnusedDataFor: 5,
      refetchOnMountOrArgChange: true,
    }),
  }),
});

export const { useSearchProductsQuery } = searchApiSlice;
