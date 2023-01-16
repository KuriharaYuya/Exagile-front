import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import thunk from "redux-thunk";
import appointReducer from "./reducers/appoints";
import characterReducer from "./reducers/character";
const store = configureStore({
  reducer: { authReducer, appointReducer, characterReducer },
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
