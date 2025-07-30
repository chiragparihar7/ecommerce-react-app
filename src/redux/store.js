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
  whitelist: ["user"] // Only persist user; cart is handled manually
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

// --- Load cart from localStorage (used in preloadedState) ---
const loadCart = () => {
  try {
    const serialized = localStorage.getItem("cartItems");
    return serialized ? JSON.parse(serialized) : [];
  } catch {
    return [];
  }
};

// --- Save cart to localStorage ---
const saveCart = (state) => {
  try {
    const serialized = JSON.stringify(state.cart.items);
    localStorage.setItem("cartItems", serialized);
  } catch {}
};

// --- Configure store ---
export const store = configureStore({
  reducer: persistedReducer,
  preloadedState: {
    cart: { items: loadCart() }
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// --- Save cart on state change ---
store.subscribe(() => saveCart(store.getState()));

// --- Persistor instance ---
export const persistor = persistStore(store);
