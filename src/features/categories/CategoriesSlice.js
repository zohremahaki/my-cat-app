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
  selectedCategory: null, // 🔹 اضافه شد
  status: "initial",
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories", // درست
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed"; // درست شد
        state.error = action.error.message;
      });
  },
});

export const { setSelectedCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
