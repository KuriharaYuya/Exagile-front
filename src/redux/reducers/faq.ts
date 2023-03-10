import { createSlice } from "@reduxjs/toolkit";
import { Faq, UserManipulateOpts } from "../../utils/type";
const faqsSlice = createSlice({
  name: "faqs",
  initialState: {
    faqs: [{ faq: {}, tags: [{}] }],
    length: 0,
    manipulateOpts: { sort: {}, filter: {} },
  } as {
    faqs: [{ faq: Faq; tags: { name: string }[] }];
    length: number;
    manipulateOpts: UserManipulateOpts["faqs"];
  },
  reducers: {
    updateFaqIndex: (state, action) => {
      state = action.payload;
      return state;
    },
    updateUserManipulateOpts: (state, action) => {
      state.manipulateOpts = action.payload;
      return state;
    },
  },
});

export const { updateFaqIndex, updateUserManipulateOpts } = faqsSlice.actions;

export default faqsSlice.reducer;
