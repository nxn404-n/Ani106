import { createSlice } from "@reduxjs/toolkit";
import fetchNewAnime from "../api/newAniApi";

const initialState = {
  newAnimeData: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const newAnimeSlice = createSlice({
  name: 'newAnime',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewAnime.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNewAnime.fulfilled, (state, {payload}) => {
        state.status = 'succeeded';
        state.newAnimeData = payload;
      })
      .addCase(fetchNewAnime.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload;
    })
  }
})

export default newAnimeSlice.reducer;