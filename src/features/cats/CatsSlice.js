import { createSlice } from "@reduxjs/toolkit";
const initialState = {};
export const catSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    showCats: () => {},
  },
});
export const { showCats } = catSlice.actions;
export default catSlice.reducer;
