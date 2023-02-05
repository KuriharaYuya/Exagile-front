import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import thunk from "redux-thunk";
import appointReducer from "./reducers/appoints";
import characterReducer from "./reducers/character";
import insightsReducer from "./reducers/insights";
import faqReducer from "./reducers/faq";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const rootReducer = combineReducers({
  authReducer,
  appointReducer,
  characterReducer,
  faqReducer,
  insightsReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authReducer"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
export default store;
