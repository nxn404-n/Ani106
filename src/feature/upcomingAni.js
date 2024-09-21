import { createSlice } from "@reduxjs/toolkit";
import fetchUpcomingAni from "../api/upcomingAniApi";

const initialState = {
  data: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const upcomingAni = createSlice({
  name: 'upcomingAni',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpcomingAni.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUpcomingAni.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.data = payload;
      })
      .addCase(fetchUpcomingAni.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload;
    })
  }
})

export default upcomingAni.reducer;