import { createSlice } from "@reduxjs/toolkit";
import {
  initialCharacterState,
  initialTopicState,
} from "../../utils/initialStates";
import {
  Character,
  CharacterTopics,
  Communities,
  TopicIdea,
} from "../../utils/type";

const communitiesState = [
  {
    userId: "",
    id: "",
    characterId: "",
    name: "",
  },
];

const characterSlice = createSlice({
  name: "character",
  initialState: {
    character: initialCharacterState,
    communities: communitiesState,
    topics: [initialTopicState],
    topicIdeas: { ideas: [{}], length: 0 },
  } as {
    character: Character;
    communities: Communities;
    topics: CharacterTopics;
    topicIdeas: { ideas: TopicIdea[]; length: number };
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
    updateTopicIdeas: (state, action) => {
      state.topicIdeas = action.payload;
      return state;
    },
  },
});

export const {
  updateCharacterDetails,
  updateTopics,
  updateCommunities,
  updateTopicIdeas,
} = characterSlice.actions;

export default characterSlice.reducer;
