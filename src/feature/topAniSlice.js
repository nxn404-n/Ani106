import { createSlice } from "@reduxjs/toolkit";
import { fetchTopAni } from "../api/topAniApi";

const initialState = {
  topAnidata: [],
  topAniStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};
const topAniSlice = createSlice({
  name: 'topAni',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopAni.pending, (state) => {
        state.topAniStatus = 'loading';
      })
      .addCase(fetchTopAni.fulfilled, (state, { payload }) => {
        state.topAniStatus = 'succeeded';
        state.topAnidata = payload;
      })
      .addCase(fetchTopAni.rejected, (state, { payload }) => {
        state.topAniStatus = 'failed';
        state.error = payload;
    })
  }
});

export default topAniSlice.reducer;