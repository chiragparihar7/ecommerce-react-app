import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import adminReducer from "./slices/adminSlice";
import sellerReducer from "./slices/sellerSlice";
import sellerProductReducer from "./slices/sellerProductSlice";
import userReducer from "./slices/userSlice";
import cartReducer from "./slices/cartSlice";

// --- Persist config ---
const persistConfig = {
  key: "root",
  storage,
};

// --- Combine reducers ---
const rootReducers = combineReducers({
  seller: sellerReducer,
  sellerProduct: sellerProductReducer,
  admin: adminReducer,
  user: userReducer,
  cart: cartReducer, // Not persisted via redux-persist, handled manually
});

// --- Create persisted reducer ---
const persistedReducer = persistReducer(persistConfig, rootReducers);

// --- Configure store ---
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});


// --- Persistor instance ---
export const persistor = persistStore(store);
