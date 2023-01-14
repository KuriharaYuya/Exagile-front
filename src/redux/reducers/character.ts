import { createSlice } from "@reduxjs/toolkit";
import { initialCharacterState } from "../../utils/initialStates";

const characterSlice = createSlice({
  name: "character",
  initialState: {
    character: initialCharacterState,
  },
  reducers: {
    updateCharacterDetails: (state, action) => {
      state.character = action.payload;
      console.log(action.payload);
      return state;
    },
  },
});

export const { updateCharacterDetails } = characterSlice.actions;

export default characterSlice.reducer;
