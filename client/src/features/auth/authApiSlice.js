import { apiSlice } from "../../app/api/apiSlice";
import { setIsLoading } from "../ui/uiSlice";
import { logOut, setCredentials } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/signin",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    getUserAuth: builder.query({
      query: () => "/auth/user",
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        dispatch(setIsLoading(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(
            setCredentials({
              user: data.user,
              accessToken: data.accessToken,
              authFetched: true,
            })
          );
          dispatch(setIsLoading(false));
        } catch (error) {
          dispatch(
            setCredentials({
              user: null,
              accessToken: null,
              authFetched: true,
            })
          );
          dispatch(setIsLoading(false));
          console.log("Error fetching user");
        }
      },
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/signup",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    logOut: builder.mutation({
      query: () => "/auth/logout",
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logOut());
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useGetUserAuthQuery,
  useRegisterMutation,
  useLogOutMutation,
} = authApiSlice;
