import { configureStore } from "@reduxjs/toolkit";
import topAniReducer from "../feature/topAniSlice";
import searchReducer from "../feature/searchSlice";

const store = configureStore({
  reducer: {
    topAni: topAniReducer,
    search: searchReducer,
  }
})

export default store;