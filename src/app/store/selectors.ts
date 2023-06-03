import { LeagueState } from './league/league.reducer';
import { PlayerState } from './players/players.reducers';
import { RosterState } from './rosters/rosters.reducers';

export interface DataInterface {
  isLoading: boolean;
  isLoaded: boolean;
  errorMessage: string;
}

export const initialDataInterfaceState: DataInterface = {
  isLoading: false,
  isLoaded: false,
  errorMessage: '',
};

export interface AppState {
  leagueData: LeagueState;
  rosterData: RosterState;
  playersData: PlayerState;
}

export const selectApp = (state: AppState) => state;

export const selectLeague = (state: AppState) => state.leagueData.league;

export const selectRosters = (state: AppState) => state.rosterData.rosters;
