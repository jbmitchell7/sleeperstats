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
  on(getManagersSuccess, (state, result) => {
    const avatarUrl = 'https://sleepercdn.com/avatars/thumbs';
    const defaultAvatar ='4f4090e5e9c3941414db40a871e3e909';
    const managers = result.players.map(p => {
      return {
        ...p,
        avatarUrl: `${avatarUrl}/${p.avatar ?? defaultAvatar}`
      };
    });
    return {
      managers,
      isLoading: false,
      isLoaded: true,
      errorMessage: '',
    }
  }),
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
