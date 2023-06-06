import { createSlice } from "@reduxjs/toolkit";

const winnerSlice = createSlice({
  name: "winner",
  initialState: null,
  reducers: {
    setWinner: (state, action) => {
      return action.payload;
    },
  },
});

export const { setWinner } = winnerSlice.actions;
export default winnerSlice.reducer;