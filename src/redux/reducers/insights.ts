import { createSlice } from "@reduxjs/toolkit";
import { Insights } from "../../utils/type";

const insightsSlice = createSlice({
  name: "insights",
  initialState: {
    reviewInsights: { insights: [], length: 0 },
    concernInsights: { insights: [], length: 0 },
    archiveInsights: { insights: [], length: 0 },
  } as {
    reviewInsights: { insights: Insights; length: number };
    concernInsights: { insights: Insights; length: number };
    archiveInsights: { insights: Insights; length: number };
  },
  reducers: {
    updateLength: (state, action) => {
      state.reviewInsights.length = action.payload;
      return state;
    },
    updateInsights: (state, action) => {
      state.reviewInsights.insights = action.payload;
      return state;
    },
    updateConcernInsights: (state, action) => {
      state.concernInsights.insights = action.payload;
      return state;
    },
    updateArchiveInsights: (state, action) => {
      state.archiveInsights = action.payload;
      return state;
    },
  },
});

export const {
  updateInsights,
  updateLength,
  updateConcernInsights,
  updateArchiveInsights,
} = insightsSlice.actions;

export default insightsSlice.reducer;
