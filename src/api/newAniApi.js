import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchNewAnime = createAsyncThunk('newAnime/fetchNewAnime', async (url, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${url}/seasons/now`);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.message || "Something went wrong")
  }
})

export default fetchNewAnime;