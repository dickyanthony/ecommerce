import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";

export const store = configureStore({
  reducer: { userReducer },
  devTools: process.env.NODE_ENV !== "production",
});

export const RootState = store.getState();
export const AppDispatch = store.dispatch;
