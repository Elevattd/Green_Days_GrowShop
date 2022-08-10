import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
  },
  reducers: {
    getAllProducts: (state, action) => {
      const products = action.payload;
      state.products = [...products];
    },
  },
});

export const { getAllProducts } = productSlice.actions;

export default productSlice.reducer;
export const selectProducts = (state) => state.products.products;
