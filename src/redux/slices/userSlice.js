import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Holds user info like name, email
  token: null, // Auth token (JWT or similar)
  loading: false, // Indicates loading state during auth API calls
  error: null, // Stores error messages
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },

    setUserToken: (state, action) => {
      state.token = action.payload;
    },

    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.user.token;
    },

    authFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    userLogout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const {
  setLoading,
  registerSuccess,
  loginSuccess,
  authFailed,
  userLogout,
} = userSlice.actions;

export default userSlice.reducer;
