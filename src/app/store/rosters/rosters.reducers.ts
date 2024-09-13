import { Roster } from '../../data/interfaces/roster';
import { DataInterface, initialDataInterfaceState } from '../selectors';
import {
  clearRosterData,
  getPlayersFailure,
  getPlayersRequest,
  getPlayersSuccess,
  getRostersFailure,
  getRostersSuccess,
} from './rosters.actions';
import { createReducer, on } from '@ngrx/store';

export interface RosterState extends DataInterface {
  rosters: {[key: string]: Roster};
}

export const initialRosterState: RosterState = {
  rosters: {},
  ...initialDataInterfaceState,
};

export const rostersReducer = createReducer(
  initialRosterState,
  on(getRostersSuccess, (_, action) => {
    let rosters: {[key: string]: Roster} = {};
    action.rosters.forEach((r, i) => rosters[r.owner_id] = action.rosters[i]);
    return {
      rosters,
      isLoading: false,
      isLoaded: true,
      errorMessage: '',
    }
  }),
  on(getRostersFailure, (_, action) => ({
    rosters: {},
    isLoading: false,
    isLoaded: true,
    errorMessage: action.error,
  })),
  on(clearRosterData, () => ({
    ...initialRosterState,
  })),
  on(getPlayersRequest, (state) => ({
    ...state,
    isLoading: true,
    isLoaded: false
  })),
  on(getPlayersSuccess, (state, action) => {
    const team = state.rosters[+action.id];
    return {
      ...state,
      isLoaded: true,
      isLoading: false,
      rosters: {
        ...state.rosters,
        [action.id]: {
          ...team,
          playerData: action.players
        }
      }
    }
  }),
  on(getPlayersFailure, (state) => ({
    ...state,
    isLoading: false
  }))
);
