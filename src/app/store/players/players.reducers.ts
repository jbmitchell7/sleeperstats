import { LeagueUser } from '../../interfaces/leagueuser';
import { DataInterface, initialDataInterfaceState } from '../selectors';
import { createReducer, on } from '@ngrx/store';
import {
  clearPlayersData,
  getPlayersFailure,
  getPlayersSuccess,
} from './players.actions';

export interface PlayerState extends DataInterface {
  players: LeagueUser[];
}

export const initialRosterState: PlayerState = {
  players: [],
  ...initialDataInterfaceState,
};

export const playersReducer = createReducer(
  initialRosterState,
  on(getPlayersSuccess, (state, result) => ({
    players: result.players,
    isLoading: false,
    isLoaded: true,
    errorMessage: '',
  })),
  on(getPlayersFailure, (state, result) => ({
    players: [],
    isLoading: false,
    isLoaded: true,
    errorMessage: result.error,
  })),
  on(clearPlayersData, () => ({
    ...initialRosterState,
  }))
);
