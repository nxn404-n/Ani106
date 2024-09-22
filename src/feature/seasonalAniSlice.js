import { createSlice } from "@reduxjs/toolkit";
import fetchSeasonalAniData from "../api/seasonalAniApi";
import getSeasonsData from "../api/getSeasonsApi";

const initialState = {
  seasonalAniData: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  // This are for the seasons dropdown menu
  seasons: [],
  seasonsStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  seasonsError: null,
};

const seasonalAniSlice = createSlice({
  name: 'seasonalAni',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSeasonalAniData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSeasonalAniData.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.seasonalAniData = payload;
      })
      .addCase(fetchSeasonalAniData.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload;
      })
    // This reducers are for getting seasons
      .addCase(getSeasonsData.pending, (state) => {
        state.seasonsStatus = 'loading';
    })
      .addCase(getSeasonsData.fulfilled, (state, { payload }) => {
        state.seasonsStatus = 'succeeded';
        state.seasons = payload;
    })
      .addCase(getSeasonsData.rejected, (state, { payload }) => {
        state.seasonsStatus = 'failed';
        state.error = payload;
    })
  }
})

export default seasonalAniSlice.reducer;