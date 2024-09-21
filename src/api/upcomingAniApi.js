import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchUpcomingAni = createAsyncThunk('upcomingAni/fetchUpcomingAni', async (url, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${url}/seasons/upcoming`);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.message || "Something went wrong")
  }
});

export default fetchUpcomingAni;