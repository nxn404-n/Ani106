import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTopAni = createAsyncThunk("topAni/fetchTopAni", async (url, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${url}/top/anime?limit=15`)
    return response.data.data
  } catch (error) {
    return rejectWithValue(error.message || "Something went wrong")
  }
})