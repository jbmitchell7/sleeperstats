import { createAction, props } from "@ngrx/store";
import { League } from "src/app/interfaces/league";

export const getLeagueRequest = createAction('[League] getLeagueRequest', props<{leagueId: string}>());

export const getLeagueSuccess = createAction('[League] getLeagueSuccess', props<{league: League}>());

export const getLeagueFailure = createAction('[League] getLeagueFailure', props<{error: string}>());