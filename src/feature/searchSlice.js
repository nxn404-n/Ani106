import { createSlice } from "@reduxjs/toolkit";
import fetchSearchData from '../api/searchApi';

const initialState = {
  searchData: [],
  searchShow: false,
  searchFor: '',
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    deleteSearchData: (state) => {
      state.data = [];
    },
    setSearchShowTrue: (state) => {
      state.searchShow = true;
    },
    setSearchShowFalse: (state) => {
      state.searchShow = false;
    },
    setSearchFor: (state, { payload }) => {
      state.searchFor = payload;
    },
    setSearchData: (state, { payload }) => {
      state.searchData = payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSearchData.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.searchData = payload;
      })
      .addCase(fetchSearchData.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload;
    })
  }
})

export const { deleteSearchData,setSearchShowTrue, setSearchShowFalse, setSearchFor, setSearchData } = searchSlice.actions;

export default searchSlice.reducer;