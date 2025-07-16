import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from '../features/categories/CategoriesSlice'
import catsReducer from '../features/cats/CatsSlice'

export const store = configureStore({
  reducer: {
    cats: catsReducer,
    categories: categoriesReducer,
  },
});
