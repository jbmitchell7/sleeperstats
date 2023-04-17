import { createSelector } from "@ngrx/store";
import { LeagueState } from "./league/league.reducer"

export interface AppState {
    league: LeagueState
}

export const selectLeague = (state: AppState) => state.league;

export const selectLeagueId = createSelector(
    selectLeague,
    (state: LeagueState) => state.league?.league_id
)