import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: false,
  reducers: {
    login: (state) => true,
    logout: (state) => false,
  },
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
