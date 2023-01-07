import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import thunk from "redux-thunk";
import appointReducer from "./reducers/appoints";
const store = configureStore({
  reducer: { authReducer, appointReducer },
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
