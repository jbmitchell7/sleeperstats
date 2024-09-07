import { createReducer, on } from '@ngrx/store';
import {
  clearLeagueData,
  getLeagueFailure,
  getLeagueSuccess,
} from './league.actions';
import { League } from '../../data/interfaces/league';
import { DataInterface, initialDataInterfaceState } from '../selectors';

export interface LeagueState extends DataInterface {
  league: League;
}

export const initialLeagueState: LeagueState = {
  league: {} as League,
  ...initialDataInterfaceState,
};

export const leagueReducer = createReducer(
  initialLeagueState,
  on(getLeagueSuccess, (state, result) => ({
    league: result.league,
    isLoading: false,
    isLoaded: true,
    errorMessage: '',
  })),
  on(getLeagueFailure, (state, result) => ({
    league: {} as League,
    isLoading: false,
    isLoaded: true,
    errorMessage: result.error,
  })),
  on(clearLeagueData, () => ({
    ...initialLeagueState,
  }))
);
