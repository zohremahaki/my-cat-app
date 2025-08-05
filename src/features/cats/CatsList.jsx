
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
  items: [],          // لیست عکس‌ها
  status: "initial",  // وضعیت درخواست (initial, loading, succeeded, failed)
  error: null,        // پیام خطا در صورت وجود
  page: 0,            // صفحه فعلی (برای بارگذاری بیشتر)
};
export const fetchCats = createAsyncThunk(
  "cats/fetchCats",
  async ({ categoryId, page }, thunkAPI) => {
    const response = await fetch(
      `https://api.thecatapi.com/v1/images/search?limit=10&page=${page}&category_ids=${categoryId}`
    );
    const data = await response.json();
    return data;
  }
);
const catsSlice = createSlice({
  name: "cats",
  initialState,
  reducers: {
    clearCats: (state) => {
      state.items = [];
      state.page = 0;
      state.status = "initial";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCats.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCats.fulfilled, (state, action) => {
        state.status = "succeeded";
        // اگر page == 0 یعنی دسته‌بندی جدید، کل لیست رو جایگزین کنیم
        if (state.page === 0) {
          state.items = action.payload;
        } else {
          // بارگذاری بیشتر: عکس‌های جدید رو به انتهای لیست اضافه کن
          state.items = [...state.items, ...action.payload];
        }
        state.page += 1;  // صفحه بعدی رو افزایش بده
      })
      .addCase(fetchCats.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearCats } = catsSlice.actions;
export default catsSlice.reducer;
