
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import sellerReducer from "./slices/sellerSlice";
import sellerProductReducer from "./slices/sellerProductSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import userReducer from "./slices/userSlice";


const PersistConfig = {   
  key: "root",
  storage,
};

const rootReducers = combineReducers({
  seller: sellerReducer,
  sellerProduct: sellerProductReducer,
  user: userReducer
});

const persistedReducer = persistReducer(PersistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // to ignore persist warnings
    }),
});

export const persistor = persistStore(store);
