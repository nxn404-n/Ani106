import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchSeasonalAniData = createAsyncThunk('seasonalAni/fetchSeasonalAniData', async ({ url, season, year }, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${url}/seasons/${year}/${season}`);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.message || "Something went wrong")

  }
})

export default fetchSeasonalAniData;