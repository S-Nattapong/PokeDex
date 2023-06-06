import { configureStore } from "@reduxjs/toolkit";
import teamReducer from "./teamSlice";
import winnerReducer from "./winnerSlice";

export const store = configureStore({
  reducer: {
    team: teamReducer,
    winner: winnerReducer,
  },
});
