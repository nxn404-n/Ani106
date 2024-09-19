import { configureStore } from "@reduxjs/toolkit";
import topAniReducer from "../feature/topAniSlice";

const store = configureStore({
  reducer: {
    topAni: topAniReducer,
  }
})

export default store;