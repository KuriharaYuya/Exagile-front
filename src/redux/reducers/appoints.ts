import { createSlice } from "@reduxjs/toolkit";
import {
  initialAppointState,
  initialCharacterState,
} from "../../utils/initialStates";
import { Appoint, Appoints, Character, Characters } from "../../utils/type";

const appointsSlice = createSlice({
  name: "appoints",
  initialState: {
    appoints: [{}],
    editing: initialAppointState,
    characters: [initialCharacterState],
    characterTags: [initialCharacterState],
    modalCharacter: initialCharacterState,
  } as {
    appoints: Appoints;
    editing: Appoint;
    characters: Characters;
    characterTags: Characters;
    modalCharacter: Character;
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
  },
});

export const {
  updateAppoints,
  updateEditingAppoint,
  updateCharacters,
  updateCharacterTags,
  updateModalCharacter,
} = appointsSlice.actions;

export default appointsSlice.reducer;
