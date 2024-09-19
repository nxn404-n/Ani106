import { createSlice } from "@reduxjs/toolkit";
import fetchSearchData from '../api/searchApi';

const initialState = {
  data: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSearchData.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.data = payload;
      })
      .addCase(fetchSearchData.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload;
    })
  }
})

export default searchSlice.reducer;