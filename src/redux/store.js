import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import sellerReducer from "./slices/sellerSlice";
import sellerProductReducer from "./slices/sellerProductSlice";
import adminReducer from "./slices/adminSlice";


const adminPersistConfig = {
  key: "admin", 
  storage,
  
};

const rootReducer = combineReducers({
  seller: sellerReducer,
  sellerProduct: sellerProductReducer,
 admin: persistReducer(adminPersistConfig, adminReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

export const persistor = persistStore(store);
