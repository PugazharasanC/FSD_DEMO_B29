import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import { appApi } from "../features/applicationApi";

const store = configureStore({
  reducer: {
    [appApi.reducerPath]: appApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appApi.middleware),
});

export default store;
