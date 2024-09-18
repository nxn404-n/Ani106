import { configureStore } from "@reduxjs/toolkit";
import homepageReducer from "../feature/homepageSlice";

const store = configureStore({
  reducer: {
    homepage: homepageReducer,
  }
})

export default store;