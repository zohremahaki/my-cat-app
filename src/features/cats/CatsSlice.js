import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// آدرس پایه API
const BASE_URL = "https://api.thecatapi.com/v1/images/search";

// thunk برای گرفتن تصاویر گربه‌ها
export const fetchCats = createAsyncThunk(
  "cats/fetchCats",
  async ({ categoryId, limit = 10 }) => {
    const res = await fetch(`${BASE_URL}?limit=${limit}&category_ids=${categoryId}`);
    const data = await res.json();
    return data;
  }
);

const catsSlice = createSlice({
  name: "cats",
  initialState: {
    items: [],
    status: "initial",
    error: null,
  },
  reducers: {
    clearCats: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCats.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCats.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = [...state.items, ...action.payload];
      })
      .addCase(fetchCats.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearCats } = catsSlice.actions;
export default catsSlice.reducer;
