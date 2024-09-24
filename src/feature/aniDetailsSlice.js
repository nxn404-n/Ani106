import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  animeData: [],
  showDetails: false,
}

const aniDetailsSlice = createSlice({
  name: 'aniDetails',
  initialState,
  reducers: {
    setShowDetails: (state) => {
      state.showDetails = !state.showDetails;
    },
    setData: (state, { payload }) => {
      state.animeData = payload;
    },
    clearAnimeData: (state) => {
      state.animeData = [];
    }
  }
})

export const { setShowDetails, setData, clearAnimeData } = aniDetailsSlice.actions;

export default aniDetailsSlice.reducer;