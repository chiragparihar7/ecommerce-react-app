// redux/slices/adminSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: null,
  token: null,
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    adminLoginSuccess: (state, action) => {
      state.loading = false;
      state.admin = action.payload.admin;
      state.token = action.payload.token;
    },
    adminAuthFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
    adminLogout: (state) => {
      state.admin = null;
      state.token = null;
    },
  },
});

export const {
  setAdminLoading,
  adminLoginSuccess,
  adminAuthFailed,
  adminLogout,
} = adminSlice.actions;

export default adminSlice.reducer;
