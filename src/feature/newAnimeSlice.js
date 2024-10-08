import { createSlice } from "@reduxjs/toolkit";
import fetchNewAnime from "../api/newAniApi";

const initialState = {
  newAnimeData: [],
  newAnimeStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const newAnimeSlice = createSlice({
  name: 'newAnime',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewAnime.pending, (state) => {
        state.newAnimeStatus = 'loading';
      })
      .addCase(fetchNewAnime.fulfilled, (state, {payload}) => {
        state.newAnimeStatus = 'succeeded';
        state.newAnimeData = payload;
      })
      .addCase(fetchNewAnime.rejected, (state, { payload }) => {
        state.newAnimeStatus = 'failed';
        state.error = payload;
    })
  }
})

export default newAnimeSlice.reducer;