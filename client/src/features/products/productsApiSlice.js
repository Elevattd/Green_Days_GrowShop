import { apiSlice } from "../../app/api/apiSlice";
import { setIsLoading } from "../ui/uiSlice";
import { getAllProducts } from "./productsSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.mutation({
      query: () => "/products",
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        dispatch(setIsLoading(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(getAllProducts(data));
          dispatch(setIsLoading(false));
        } catch (err) {
          console.log(err);
          dispatch(setIsLoading(false));
        }
      },
    }),
  }),
});

export const { useGetProductsMutation } = productApiSlice;
