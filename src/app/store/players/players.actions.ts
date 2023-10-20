import { createAction, props } from '@ngrx/store';
import { LeagueUser } from '../../interfaces/leagueuser';

export const getPlayersSuccess = createAction(
  '[Players] getPlayersSuccess',
  props<{ players: LeagueUser[] }>()
);

export const getPlayersFailure = createAction(
  '[Players] getPlayersFailure',
  props<{ error: string }>()
);

export const clearPlayersData = createAction('[Player] clearPlayersData');
