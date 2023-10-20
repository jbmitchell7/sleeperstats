import { createAction, props } from '@ngrx/store';
import { Roster } from '../../interfaces/roster';

export const getRostersSuccess = createAction(
  '[Rosters] getRostersSuccess',
  props<{ rosters: Roster[] }>()
);

export const getRostersFailure = createAction(
  '[Rosters] getRostersFailure',
  props<{ error: string }>()
);

export const clearRosterData = createAction('[Roster] clearRosterData');
