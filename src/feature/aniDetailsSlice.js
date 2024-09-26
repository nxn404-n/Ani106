import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  animeData: [],
  showDetails: false,
}

const aniDetailsSlice = createSlice({
  name: 'aniDetails',
  initialState,
  reducers: {
    setShowDetails: (state, { payload }) => {
      state.showDetails = payload;
    },
    setData: (state, { payload }) => {
      state.animeData = payload;
    },
  }
})

export const { setShowDetails, setData } = aniDetailsSlice.actions;

export default aniDetailsSlice.reducer;