import { LeagueUser } from '../../data/interfaces/leagueuser';
import { DataInterface, initialDataInterfaceState } from '../selectors';
import { createReducer, on } from '@ngrx/store';
import {
  clearManagersData,
  getManagersFailure,
  getManagersSuccess,
} from './managers.actions';

export interface ManagerState extends DataInterface {
  managers: {[key:string]: LeagueUser};
}

export const initialRosterState: ManagerState = {
  managers: {},
  ...initialDataInterfaceState,
};

export const managersReducer = createReducer(
  initialRosterState,
  on(getManagersSuccess, (_, result) => {
    const avatarUrl = 'https://sleepercdn.com/avatars/thumbs';
    const defaultAvatar ='4f4090e5e9c3941414db40a871e3e909';
    const managersWithAvatars = result.players.map(p => {
      return {
        ...p,
        avatarUrl: `${avatarUrl}/${p.avatar ?? defaultAvatar}`
      };
    });
    let managers: {[key:string]: LeagueUser} = {};
    result.players.forEach((p,i) => managers[p.user_id] = managersWithAvatars[i]);
    return {
      managers,
      isLoading: false,
      isLoaded: true,
      errorMessage: '',
    }
  }),
  on(getManagersFailure, (state, result) => ({
    managers: {},
    isLoading: false,
    isLoaded: true,
    errorMessage: result.error,
  })),
  on(clearManagersData, () => ({
    ...initialRosterState,
  }))
);
