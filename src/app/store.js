import { configureStore } from "@reduxjs/toolkit";
import topAniReducer from "../feature/topAniSlice";
import searchReducer from "../feature/searchSlice";
import seasonalAniReducer from "../feature/seasonalAniSlice";

const store = configureStore({
  reducer: {
    topAni: topAniReducer,
    search: searchReducer,
    seasonalAni: seasonalAniReducer,
  }
})

export default store;