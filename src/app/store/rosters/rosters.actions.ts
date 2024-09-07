import { createAction, props } from '@ngrx/store';
import { Roster } from '../../data/interfaces/roster';

export const getRostersSuccess = createAction(
  '[Rosters] getRostersSuccess',
  props<{ rosters: Roster[] }>()
);

export const getRostersFailure = createAction(
  '[Rosters] getRostersFailure',
  props<{ error: string }>()
);

export const clearRosterData = createAction('[Roster] clearRosterData');

export const getPlayersRequest = createAction(
  '[Rosters] getPlayersRequest',
  props<{sport: string; managerId: string; ids: string[] }>()
);

export const getPlayersSuccess = createAction(
  '[Rosters] getPlayersSuccess',
  props<{id: string; players: any[] }>()
);

export const getPlayersFailure = createAction(
  '[Rosters] getPlayersFailure',
  props<{ error: string }>()
);
