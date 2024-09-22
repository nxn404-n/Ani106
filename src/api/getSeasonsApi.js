import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getSeasonsData = createAsyncThunk('seasonalAni/getSeasonsData', async (url, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${url}/seasons`);
    // The api response is giving an array with 108 items so im making it shorter because I only want 50 items and here each items means each year
    return response.data.data.slice(0, 50);
  } catch (error) {
    return rejectWithValue(error.message || "Something went wrong")
  }
})

export default getSeasonsData;