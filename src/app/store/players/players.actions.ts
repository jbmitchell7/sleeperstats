import { createAction, props } from "@ngrx/store";

export const getPlayersRequest = createAction(
  '[Players] getPlayersRequest',
  props<{sport: string; ids: string[] }>()
);

export const getPlayersSuccess = createAction(
  '[Players] getPlayersSuccess',
  props<{players: any[] }>()
);

export const getPlayersFailure = createAction(
  '[Players] getPlayersFailure',
  props<{ error: string }>()
);
