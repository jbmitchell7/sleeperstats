import { createReducer, on } from "@ngrx/store";
import { Roster } from "src/app/interfaces/roster";
import { setRosters } from "./league.actions";

export interface RosterState  {
    rosters: Roster[],
    isLoading: boolean,
    isLoaded: boolean
}

export const initialRosterState: RosterState = {
    rosters: [],
    isLoading: false,
    isLoaded: false
}

export const rostersReducer = createReducer(
    initialRosterState,
    on(setRosters, (state, result) =>  ({
        rosters: result.rosters,
        isLoading: false,
        isLoaded: true
    })),
)

