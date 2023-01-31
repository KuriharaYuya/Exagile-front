import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import thunk from "redux-thunk";
import appointReducer from "./reducers/appoints";
import characterReducer from "./reducers/character";
import insightsReducer from "./reducers/insights";
import faqReducer from "./reducers/faq";
const store = configureStore({
  reducer: {
    authReducer,
    appointReducer,
    characterReducer,
    faqReducer,
    insightsReducer,
  },
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
