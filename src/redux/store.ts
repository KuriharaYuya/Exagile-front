import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import thunk from "redux-thunk";

const store = configureStore({
  reducer: authReducer,
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
