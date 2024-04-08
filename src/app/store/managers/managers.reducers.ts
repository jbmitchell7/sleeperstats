import { LeagueUser } from '../../interfaces/leagueuser';
import { DataInterface, initialDataInterfaceState } from '../selectors';
import { createReducer, on } from '@ngrx/store';
import {
  clearManagersData,
  getManagersFailure,
  getManagersSuccess,
} from './managers.actions';

export interface ManagerState extends DataInterface {
  managers: LeagueUser[];
}

export const initialRosterState: ManagerState = {
  managers: [],
  ...initialDataInterfaceState,
};

export const managersReducer = createReducer(
  initialRosterState,
  on(getManagersSuccess, (state, result) => ({
    managers: result.players,
    isLoading: false,
    isLoaded: true,
    errorMessage: '',
  })),
  on(getManagersFailure, (state, result) => ({
    managers: [],
    isLoading: false,
    isLoaded: true,
    errorMessage: result.error,
  })),
  on(clearManagersData, () => ({
    ...initialRosterState,
  }))
);
