import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from '../features/categories/CategoriesSlice'
// import catsReducer from '../features/cats/CatsSlice'

const categoriesReducer=(state={}, action)=>state

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
  },
});
// export const store = configureStore({
//   reducer: {
//     cats: catsReducer,
//     categories: categoriesReducer,
//   },
// });
