import { createSlice } from "@reduxjs/toolkit";
import { fetchTopAni } from "../api/topAniApi";

const initialState = {
  topAnidata: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
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
        state.status = 'loading';
      })
      .addCase(fetchTopAni.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.topAnidata = payload;
      })
      .addCase(fetchTopAni.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload;
    })
  }
});

export default topAniSlice.reducer;