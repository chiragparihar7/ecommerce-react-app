import { createSlice } from "@reduxjs/toolkit";

const tokenFromStorage = localStorage.getItem("adminToken");
const adminFromStorage = localStorage.getItem("adminInfo");

const initialState = {
  admin: adminFromStorage ? JSON.parse(adminFromStorage) : null, // ✅ saved admin info
  token: tokenFromStorage || null, // ✅ saved token
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
      state.admin = action.payload.admin; // e.g. { name, email }
      state.token = action.payload.token;

      // ✅ Save to localStorage
      localStorage.setItem("adminToken", action.payload.token);
      localStorage.setItem("adminInfo", JSON.stringify(action.payload.admin));
    },
    adminAuthFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;

      // ✅ Clear bad state if needed
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminInfo");
    },
    adminLogout: (state) => {
      state.token = null;
      state.admin = null;
      state.loading = false;
      state.error = null;

      // ✅ Clear localStorage
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminInfo");
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
