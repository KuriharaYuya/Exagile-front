import { createSlice } from "@reduxjs/toolkit";
import {
  initialCharacterState,
  initialTopicState,
} from "../../utils/initialStates";
import { Character, CharacterTopics, Communities } from "../../utils/type";

const communitiesState = [
  {
    userId: "",
    id: "",
    characterId: "",
  },
];

const characterSlice = createSlice({
  name: "character",
  initialState: {
    character: initialCharacterState,
    communities: communitiesState,
    topics: [initialTopicState],
  } as {
    character: Character;
    communities: Communities;
    topics: CharacterTopics;
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
    updateCommunities: (state, action) => {
      state.communities = action.payload;
      return state;
    },
  },
});

export const { updateCharacterDetails, updateTopics, updateCommunities } =
  characterSlice.actions;

export default characterSlice.reducer;
