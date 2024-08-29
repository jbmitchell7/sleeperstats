import { Roster } from '../../interfaces/roster';
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
  rosters: Roster[];
}

export const initialRosterState: RosterState = {
  rosters: [],
  ...initialDataInterfaceState,
};

export const rostersReducer = createReducer(
  initialRosterState,
  on(getRostersSuccess, (state, action) => ({
    rosters: action.rosters,
    isLoading: false,
    isLoaded: true,
    errorMessage: '',
  })),
  on(getRostersFailure, (state, action) => ({
    rosters: [],
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
    const team = state.rosters.find(r => r.owner_id === action.id);
    if (!team || team.playerData?.length) {
      return state;
    }
    const unchanged = state.rosters.filter(r => r.owner_id !== action.id);
    return {
      ...state,
      isLoaded: true,
      isLoading: false,
      rosters: [
        ...unchanged,
        {
          ...team,
          playerData: action.players
        }
      ]
    }
  }),
  on(getPlayersFailure, (state) => ({
    ...state,
    isLoading: false
  }))
);
