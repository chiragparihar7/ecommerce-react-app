import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: null,         // will contain { name, email }
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
      state.admin = action.payload.admin; // { name, email }
      state.token = action.payload.token;
    },
    adminAuthFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
    adminLogout: (state) => {
      state.token = null;
      state.admin = null;
    },  
  },
});

export const {
  setAdminLoading,
  adminLoginSuccess,
  adminAuthFailed,
  adminLogout, // ✅ Fixed here
} = adminSlice.actions;

export default adminSlice.reducer;
