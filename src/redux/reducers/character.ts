import { createSlice } from "@reduxjs/toolkit";
import {
  initialCharacterState,
  initialTopicState,
} from "../../utils/initialStates";
import { Character, CharacterTopics } from "../../utils/type";

const characterSlice = createSlice({
  name: "character",
  initialState: {
    character: initialCharacterState,
    topics: [initialTopicState],
  } as { character: Character; topics: CharacterTopics },
  reducers: {
    updateCharacterDetails: (state, action) => {
      state.character = action.payload;
      console.log(action.payload);
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
