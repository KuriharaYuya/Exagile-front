import { createSlice } from "@reduxjs/toolkit";
import { Insights } from "../../utils/type";

const insightsSlice = createSlice({
  name: "insights",
  initialState: {
    reviewInsights: {},
  } as { reviewInsights: Insights },
  reducers: {
    updateInsights: (state, action) => {
      state.reviewInsights = action.payload;
      return state;
    },
  },
});

export const { updateInsights } = insightsSlice.actions;

export default insightsSlice.reducer;
