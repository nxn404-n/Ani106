import { createSlice } from "@reduxjs/toolkit";
import fetchSeasonalAniData from "../api/seasonalAniApi";

const initialState = {
  data: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
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
        state.data = payload;
      })
      .addCase(fetchSeasonalAniData.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.date = payload;
    })
  }
})

export default seasonalAniSlice.reducer;