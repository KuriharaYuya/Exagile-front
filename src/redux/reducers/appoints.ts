import { createSlice } from "@reduxjs/toolkit";
import { Appoint, Appoints } from "../../utils/type";

const appointsSlice = createSlice({
  name: "appoints",
  initialState: { appoints: [{}], editing: {} } as {
    appoints: Appoints;
    editing: Appoint;
  },
  reducers: {
    updateAppoints: (state, action) => {
      state.appoints = action.payload;
      return state;
    },
    updateEditingAppoint: (state, action) => {
      state.editing = action.payload;
      return state;
    },
  },
});

export const { updateAppoints, updateEditingAppoint } = appointsSlice.actions;

export default appointsSlice.reducer;
