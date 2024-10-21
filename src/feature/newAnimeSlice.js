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
  reducers: {
    // This reducer is for testing
    setNewAnimeData: (state, { payload }) => {
      state.newAnimeData = payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewAnime.pending, (state) => {
        state.newAnimeStatus = 'loading';
      })
      .addCase(fetchNewAnime.fulfilled, (state, { payload }) => {
        state.newAnimeStatus = 'succeeded';
        state.newAnimeData = payload;
      })
      .addCase(fetchNewAnime.rejected, (state, { payload }) => {
        state.newAnimeStatus = 'failed';
        state.error = payload;
      })
  }
});

export const { setNewAnimeData } = newAnimeSlice.actions;

export default newAnimeSlice.reducer;