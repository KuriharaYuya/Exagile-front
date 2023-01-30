import { createSlice } from "@reduxjs/toolkit";
import {
  initialAppointState,
  initialCharacterState,
  initialTagModalState,
} from "../../utils/initialStates";
import {
  Appoint,
  Appoints,
  Characters,
  Faq,
  Insights,
  TagModalState,
} from "../../utils/type";

const appointsSlice = createSlice({
  name: "appoints",
  initialState: {
    appoints: [{}],
    editing: initialAppointState,
    characters: [initialCharacterState],
    characterTags: [initialCharacterState],
    modalCharacter: initialTagModalState,
    faqs: { inspiredFaqs: undefined, appliedFaqs: undefined },
    insights: [{}],
  } as {
    appoints: Appoints;
    editing: Appoint;
    characters: Characters;
    characterTags: Characters;
    modalCharacter: TagModalState;
    faqs: { inspiredFaqs: Faq[] | undefined; appliedFaqs: Faq[] | undefined };
    insights: Insights;
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
    updateCharacters: (state, action) => {
      state.characters = action.payload;
      return state;
    },
    updateCharacterTags: (state, action) => {
      state.characterTags = action.payload;
      return state;
    },
    updateModalCharacter: (state, action) => {
      state.modalCharacter = action.payload;
      return state;
    },
    updateFaqs: (state, action) => {
      state.faqs = action.payload;
      return state;
    },
    updateInsights: (state, action) => {
      state.insights = action.payload;
      return state;
    },
  },
});

export const {
  updateAppoints,
  updateEditingAppoint,
  updateCharacters,
  updateCharacterTags,
  updateModalCharacter,
  updateFaqs,
  updateInsights,
} = appointsSlice.actions;

export default appointsSlice.reducer;
