import { createSlice } from "@reduxjs/toolkit";
import { Appoint, Appoints, Characters } from "../../utils/type";

const initialAppointState = {
  id: "",
  title: "",
  desc: "",
  content: "",
  start: "",
  end: "",
};

const appointsSlice = createSlice({
  name: "appoints",
  initialState: {
    appoints: [{}],
    editing: initialAppointState,
    characters: [{}],
    characterTags: [{}],
  } as {
    appoints: Appoints;
    editing: Appoint;
    characters: Characters;
    characterTags: Characters;
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
      console.log(action.payload);
      return state;
    },
  },
});

export const {
  updateAppoints,
  updateEditingAppoint,
  updateCharacters,
  updateCharacterTags,
} = appointsSlice.actions;

export default appointsSlice.reducer;
