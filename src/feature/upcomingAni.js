import { createSlice } from "@reduxjs/toolkit";
import fetchUpcomingAni from "../api/upcomingAniApi";

const initialState = {
  upcomingAnidata: [],
  upcomingAnimeStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const upcomingAni = createSlice({
  name: 'upcomingAni',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpcomingAni.pending, (state) => {
        state.upcomingAnimeStatus = 'loading';
      })
      .addCase(fetchUpcomingAni.fulfilled, (state, { payload }) => {
        state.upcomingAnimeStatus = 'succeeded';
        state.upcomingAnidata = payload;
      })
      .addCase(fetchUpcomingAni.rejected, (state, { payload }) => {
        state.upcomingAnimeStatus = 'failed';
        state.error = payload;
    })
  }
})

export default upcomingAni.reducer;