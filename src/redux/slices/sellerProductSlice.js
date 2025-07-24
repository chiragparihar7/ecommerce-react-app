import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const sellerProductSlice = createSlice({
  name: "sellerProduct",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    addProductSuccess: (state, action) => {
      state.loading = false;
      state.products.push(action.payload); // 👈 Add the new product to the list
    },
    setProducts: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    productError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setLoading,
  addProductSuccess,
  setProducts,
  productError,
} = sellerProductSlice.actions;

export default sellerProductSlice.reducer;
