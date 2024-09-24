import { configureStore } from "@reduxjs/toolkit";
import topAniReducer from "../feature/topAniSlice";
import searchReducer from "../feature/searchSlice";
import seasonalAniReducer from "../feature/seasonalAniSlice";
import aniDetailsReducer from "../feature/aniDetailsSlice";
import upcomingAniReducer from "../feature/upcomingAni";
import newAnimeReducer from "../feature/newAnimeSlice";

const store = configureStore({
  reducer: {
    topAni: topAniReducer,
    search: searchReducer,
    seasonalAni: seasonalAniReducer,
    aniDetails: aniDetailsReducer,
    upcomingAni: upcomingAniReducer,
    newAnime: newAnimeReducer,
  }
})

export default store;