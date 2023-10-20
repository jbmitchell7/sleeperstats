import { Roster } from '../../interfaces/roster';
import { DataInterface, initialDataInterfaceState } from '../selectors';
import {
  clearRosterData,
  getRostersFailure,
  getRostersSuccess,
} from './rosters.actions';
import { createReducer, on } from '@ngrx/store';

export interface RosterState extends DataInterface {
  rosters: Roster[];
}

export const initialRosterState: RosterState = {
  rosters: [],
  ...initialDataInterfaceState,
};

export const rostersReducer = createReducer(
  initialRosterState,
  on(getRostersSuccess, (state, result) => ({
    rosters: result.rosters,
    isLoading: false,
    isLoaded: true,
    errorMessage: '',
  })),
  on(getRostersFailure, (state, result) => ({
    rosters: [],
    isLoading: false,
    isLoaded: true,
    errorMessage: result.error,
  })),
  on(clearRosterData, () => ({
    ...initialRosterState,
  }))
);
