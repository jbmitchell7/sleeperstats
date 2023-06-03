import { createAction, props } from '@ngrx/store';

export const leagueEntryRequest = createAction(
  '[Login] leagueEntryRequest',
  props<{ leagueId: string }>()
);
