import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isLoggedIn: boolean;
  currentUser: any | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
  currentUser: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.currentUser = action.payload;
      return state;
    },
    logoutSuccess: (state) => {
      state.isLoggedIn = false;
      state.currentUser = null;
      return state;
    },
  },
});

// TODO: ここでActionをexportしてると同時に、redux/actions/authでも定義してるから、こっちでexportするのが正しい
// Reduxの考え方かな。
export const { loginSuccess, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;
