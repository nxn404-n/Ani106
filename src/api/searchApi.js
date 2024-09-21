import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// It takes the value of the input box and use the api to seach the anime
const fetchSearchData = createAsyncThunk('search/fetchSearchData', async ({ url, value }, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${url}/anime?q=${value}`);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.message || "Something went wrong")
  }
})

export default fetchSearchData;