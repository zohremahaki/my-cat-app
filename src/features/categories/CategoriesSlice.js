import { createSlice } from "@reduxjs/toolkit";
const initialState = {};
export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers:{
    showCats:()=>{}
  }
});
export const{showCats}=categoriesSlice.actions
export default categoriesSlice.reducer