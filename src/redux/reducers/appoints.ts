import { createSlice } from "@reduxjs/toolkit";
import { Appoints } from "../../utils/type";

const appointsSlice = createSlice({
  name: "appoints",
  initialState: { appoints: [{}] } as { appoints: Appoints },
  reducers: {
    updateAppoints: (state, action) => {
      console.log(state, action);
      state.appoints = action.payload;
      return state;
    },
  },
});

export const { updateAppoints } = appointsSlice.actions;

export default appointsSlice.reducer;
