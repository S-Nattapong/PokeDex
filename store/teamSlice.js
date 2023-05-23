import { createSlice } from "@reduxjs/toolkit";

const teamSlice = createSlice({
  name: "team",
  initialState: {
    team: [],
  },
  reducers: {
    addToTeam: (state, action) => {
      if (state.team && state.team.length < 6) {
        state.team.push(action.payload);
      }
    },
    removeFromTeam: (state, action) => {
      state.team = state.team.filter((pokemon) => pokemon.id !== action.payload.id);
    },
    clearTeam: (state) => {
      state.team = [];
    },
  },
});

export const { setTeamName,addToTeam, removeFromTeam, clearTeam } = teamSlice.actions;
export const selectTeam = (state) => state.team.team;
export default teamSlice.reducer;
