import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  seller: null,
  token: null,
  loading: false,
  error: null,
};

const sellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },

    // Register Seller
    registerSuccess: (state, action) => {
      // state.loading = false;
      // state.seller = action.payload.seller;
      // state.token = action.payload.token;
      // localStorage.setItem("token", action.payload.token); 
    },

    // Login Seller
    loginSuccess: (state, action) => {
      state.loading = false;
      state.seller = action.payload.seller;
      state.token = action.payload.token;
      // localStorage.setItem("token", action.payload.token);
    },

    // Handle Errors
    authFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    // Logout Seller
    sellerLogout: (state) => {
      state.seller = null;
      state.token = null;
      localStorage.removeItem("token"); 
    },
  },
});

export const {
  setLoading,
  registerSuccess,
  loginSuccess,
  authFailed,
  sellerLogout,
} = sellerSlice.actions;

export default sellerSlice.reducer;
