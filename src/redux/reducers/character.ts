import { createSlice } from "@reduxjs/toolkit";
import {
  initialCharacterState,
  initialTopicState,
} from "../../utils/initialStates";

const characterSlice = createSlice({
  name: "character",
  initialState: {
    character: initialCharacterState,
    topics: initialTopicState,
  },
  reducers: {
    updateCharacterDetails: (state, action) => {
      state.character = action.payload;
      return state;
    },
    updateTopics: (state, action) => {
      state.topics = action.payload;
      return state;
    },
  },
});

export const { updateCharacterDetails, updateTopics } = characterSlice.actions;

export default characterSlice.reducer;
