import { createAction, props } from "@ngrx/store";
import { Roster } from "src/app/interfaces/roster";

export const setRosters = createAction('[Roster] Set Rosters', props<{rosters: Roster[]}>());