import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const res = await fetch("https://api.thecatapi.com/v1/categories");
    const data = await res.json();
    return data;
  }
);
const initialState = {
  categories: [],
  status: "initial",
  error: null,
};
const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    // showCats: () => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "faild";
        state.error = action.error.message;
      });
  },
});
// export const { showCats } = categoriesSlice.actions;
export default categoriesSlice.reducer;
