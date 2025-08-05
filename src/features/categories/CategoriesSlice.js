import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const res = await fetch("https://api.thecatapi.com/v1/categories");
    return await res.json();
  }
);

const initialState = {
  items: [],
  status: "initial",
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories", // 🔹 اینجا درست شد
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload; // 🔹 اینجا درست شد
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed"; // 🔹 املای failed درست شد
        state.error = action.error.message;
      });
  },
});

export default categoriesSlice.reducer;
