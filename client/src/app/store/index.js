import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import authReducer from "../../features/auth/authSlice";
import uiSliceReducer from "../../features/ui/uiSlice";
import productsSliceReducer from "../../features/products/productsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiSliceReducer,
    products: productsSliceReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
