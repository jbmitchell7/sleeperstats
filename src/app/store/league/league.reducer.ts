import { createReducer, on } from "@ngrx/store";
import { Roster } from "src/app/interfaces/roster";
import { getLeagueRequest, getLeagueSuccess } from "./league.actions";
import { League } from "src/app/interfaces/league";

export interface DataInterface {
  isLoading: boolean,
  isLoaded: boolean,
  errorMessage: string
}

export interface RosterState extends DataInterface {
  rosters?: Roster[]
}

export interface LeagueState extends DataInterface {
  league?: League
}

export const initialLeagueState: LeagueState = {
  isLoading: false,
  isLoaded: false,
  errorMessage: ''
}

export const leagueReducer = createReducer(
  initialLeagueState,
  on(getLeagueRequest, (state) => ({
    ...state,
    isLoading: true,
    isLoaded: false,
  })),
  on(getLeagueSuccess, (state, result) => ({
    league: result.league,
    isLoading: false,
    isLoaded: true,
    errorMessage: ''
  })),
)

